"use client";

import React, { useState, useEffect } from "react";
import { Cross } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateAdminUiUpdateMutation } from "@/redux/services/userReducers";
import { toast } from "sonner";

const UpdateCompsModal = ({ setUpdateBannerModal }: { setUpdateBannerModal: Function }) => {
  const [updateAdminUiUpdate,{isLoading,error,data}] = useUpdateAdminUiUpdateMutation();
  const [isChanged, setIsChanged] = useState(false);

  const [bannerData, setBannerData] = useState<Record<string, File | null>>({
    heroL: null,
    heroSM: null,
    banner1: null,
    banner2: null,
    banner3: null,
  });

  const [bannerDataPreview, setBannerDataPreview] = useState<Record<string, string>>({
    heroL: "/assets/bbgif.gif",
    heroSM: "/assets/phoneGif.gif",
    banner1: "/assets/men.jpg",
    banner2: "/assets/women.jpg",
    banner3: "/assets/all.jpg",
  });

  /** Close modal */
  const closeModal = () => setUpdateBannerModal(false);

  /** Handle file input changes */
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files?.length) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setBannerData((prev) => ({ ...prev, [name]: file }));
    setBannerDataPreview((prev) => ({ ...prev, [name]: previewUrl }));
  };

  /** Submit selected files */
  /** Submit selected files */
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Step 1: Get Cloudinary signature
    const res = await fetch("/api/cloudinary/signature");
    const sigData = await res.json();

    const uploadPromises = Object.entries(bannerData).map(async ([key, file]) => {
      if (!file) return null;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sigData.api_key);
      formData.append("timestamp", sigData.timestamp);
      formData.append("signature", sigData.signature);
      formData.append("folder", "banners");
      formData.append(
        "resource_type",
        file.type.startsWith("video/") ? "video" : "image"
      );

      // Step 2: Upload directly to Cloudinary
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/${
          file.type.startsWith("video") ? "video" : "image"
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (uploadData.secure_url) {
        return { key, url: uploadData.secure_url, public_id: uploadData.public_id };
      }
      return null;
    });

    const uploaded = (await Promise.all(uploadPromises)).filter(Boolean);

    // Step 3: Prepare URLs for DB update
    const updateData: Record<string, { url: string; public_id: string }> = {};
    uploaded.forEach((item: any) => {
      updateData[item.key] = {
        url: item.url,
        public_id: item.public_id,
      };
    });

    // Step 4: Send URLs to backend
    const { data, error } = await updateAdminUiUpdate(updateData);

    if (data?.success) {
      toast.success(data.message);
      setIsChanged(false);
    } else {
      toast.error("Update failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong during upload");
  }
};


  /** Enable submit button only if something changed */
  useEffect(() => {
    setIsChanged(Object.values(bannerData).some((value) => value !== null));

    if(data?.success)
    {
      toast.success(data?.message)
    }

    if (error && "data" in error) {
      const errorMessage = (error.data as { message: string })?.message;
      toast.error(errorMessage)
    }


  }, [bannerData,data?.success,error]);

  return (
    <div className="p-4 flex flex-col justify-center items-center h-full mx-auto relative backdrop-blur-md bg-white/20 border border-white/30 rounded-md">
      <Cross
        className="absolute top-2 right-2 hover:scale-110 rotate-45 cursor-pointer"
        onClick={closeModal}
      />

      <h2 className="text-2xl text-white mb-3">Update Banners</h2>

      <form className="max-w-full md:max-w-[70%]" onSubmit={handleSubmit}>
        {/* HERO SECTIONS */}
        <FileInput label="Hero Large" name="heroL" onChange={changeHandler} />
        <MediaPreview src={bannerDataPreview.heroL} file={bannerData.heroL} />

        <FileInput label="Hero Mobile" name="heroSM" onChange={changeHandler} />
        <MediaPreview src={bannerDataPreview.heroSM} file={bannerData.heroSM} />

        {/* SMALL BANNERS */}
        <div className="flex justify-between gap-2">
          {["banner1", "banner2", "banner3"].map((name) => (
            <FileInput key={name} label={name[0].toUpperCase()+"-"+name[name.length-1].toLocaleUpperCase()} name={name} onChange={changeHandler} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 my-3">
          {["banner1", "banner2", "banner3"].map((name) => (
            <MediaPreview key={name} src={bannerDataPreview[name]} file={bannerData[name]} small />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isChanged}
          className={`bg-blue-600 text-white px-4 py-2 rounded-md transition w-full ${
            isChanged ? "hover:bg-blue-700" : "opacity-60 cursor-not-allowed"
          }`}
        >
          {isLoading?"Updating...":"Update UI"}
        </button>
      </form>
    </div>
  );
};

/** File upload button */
const FileInput = ({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <>
    <label
      htmlFor={name}
      className="inline-flex justify-center items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-xl w-full gap-2"
    >
      <UploadIcon />
      {label}
    </label>
    <input
      type="file"
      accept="image/*,video/*"
      id={name}
      name={name}
      hidden
      onChange={onChange}
    />
  </>
);

/** Video/Image preview */
const MediaPreview = ({
  src,
  file,
  small = false,
}: {
  src: string;
  file: File | null;
  small?: boolean;
}) => (
  <div className="relative w-fit mx-auto">
    {file instanceof File && file.type.startsWith("video") ? (
      <video
        src={src}
        controls
        autoPlay
        muted
        loop
        className={`object-cover rounded-lg ${small ? "aspect-square w-full" : "w-[400px] h-[400px] my-4"}`}
      />
    ) : (
      <img
        src={src}
        alt="preview"
        className={`object-cover rounded-lg ${small ? "aspect-square w-full" : "w-[400px] h-[400px] my-4"}`}
      />
    )}
    <CloseIcon className="absolute -top-2 -right-2 hover:scale-110 cursor-pointer border border-white rounded-full bg-black p-1" />
  </div>
);

/** Upload icon */
const UploadIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

export default UpdateCompsModal;
