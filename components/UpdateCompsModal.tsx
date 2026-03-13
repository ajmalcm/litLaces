"use client";

import React, { useState, useEffect } from "react";
import { Cross } from "lucide-react";
import { useUpdateAdminUiUpdateMutation } from "@/redux/services/userReducers";
import { toast } from "sonner";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

const UpdateCompsModal = ({ setUpdateBannerModal }: { setUpdateBannerModal: Function }) => {
  const [updateAdminUiUpdate, { isLoading, error, data }] =
    useUpdateAdminUiUpdateMutation();

  const [uploading, setUploading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [bannerData, setBannerData] = useState<Record<string, File | null>>({
    heroL: null,
    heroSM: null,
    banner1: null,
    banner2: null,
    banner3: null,
  });

  const [bannerDataPreview, setBannerDataPreview] = useState<
    Record<string, string>
  >({
    heroL: "/assets/bbgif.gif",
    heroSM: "/assets/phoneGif.gif",
    banner1: "/assets/men.jpg",
    banner2: "/assets/women.jpg",
    banner3: "/assets/all.jpg",
  });

  const closeModal = () => setUpdateBannerModal(false);

  /** -------------------------
   *  VIDEO COMPRESSION (FFmpeg)
   *  ------------------------- */
  const compressVideo = async (file: File): Promise<File> => {
    if (!ffmpeg.loaded) {
      console.log("%c⏳ Loading FFmpeg...", "color: yellow");
      await ffmpeg.load();
    }

    console.log("%c🎞 Compressing: " + file.name, "color: cyan");

    ffmpeg.writeFile("input.mp4", await fetchFile(file));

    ffmpeg.on("log", ({ message }) => {
      console.log("%c[ffmpeg] " + message, "color: gray");
    });

    ffmpeg.on("progress", ({ progress }) => {
      const percent = Math.round(progress * 100);
      console.log(`🎚 Compression progress: ${percent}%`);
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vf",
      "scale='min(720,iw)':-2",
      "-b:v",
      "1M",
      "-preset",
      "veryfast",
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");

    console.log("%c✔ Compression complete", "color: lightgreen");

    return new File([data], `compressed-${file.name}`, {
      type: "video/mp4",
    });
  };

  /** FILE SELECT HANDLER */
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files?.length) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setBannerData((prev) => ({ ...prev, [name]: file }));
    setBannerDataPreview((prev) => ({ ...prev, [name]: previewUrl }));
  };

  /** SUBMIT HANDLER */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setUploading(true);

  try {
    toast.info("Preparing upload...");

    const res = await fetch("/api/cloudinary/signature");
    const sigData = await res.json();

    // Helper: upload with progress
    const uploadWithProgress = (formData: FormData, key: string, resourceType: string) => {
      return new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/${resourceType}/upload`
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            console.log(`⬆️ Uploading ${key}: ${percent}%`);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            // attach the original field key so we can map responses back to form fields
            resolve({ ...response, key });
          } else {
            reject(xhr.responseText);
          }
        };

        xhr.onerror = () => reject(xhr.responseText);

        xhr.send(formData);
      });
    };

    const uploadPromises = Object.entries(bannerData).map(async ([key, file]) => {
      if (!file) return null;

      let uploadFile = file;

      if (file.type.startsWith("video/")) {
        toast.info(`Compressing ${key}...`);
        uploadFile = await compressVideo(file);
      }

      const resourceType = uploadFile.type.startsWith("video/") ? "video" : "image";

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("api_key", sigData.api_key);
      formData.append("timestamp", sigData.timestamp);
      formData.append("signature", sigData.signature);
      formData.append("folder", "banners");

      return await uploadWithProgress(formData, key, resourceType);
    });

    const uploaded = (await Promise.all(uploadPromises)).filter(Boolean);

    const updateData: Record<string, { url: string; public_id: string }> = {};
    uploaded.forEach((item: any) => {
      updateData[item.key] = {
        url: item.secure_url,
        public_id: item.public_id,
      };
    });

  console.log("Update payload:", updateData);
  const { data } = await updateAdminUiUpdate(updateData);

    if (data?.success) {
      toast.success("Banners updated successfully");
      setIsChanged(false);
    }
  } catch (err) {
    console.error(err);
    toast.error("Upload failed");
  }

  setUploading(false);
};


  useEffect(() => {
    setIsChanged(Object.values(bannerData).some((v) => v !== null));
  }, [bannerData]);

  return (
    <div className="p-4 flex flex-col justify-center items-center h-full mx-auto relative backdrop-blur-md bg-white/20 border border-white/30 rounded-md">
      <Cross
        className="absolute top-2 right-2 hover:scale-110 rotate-45 cursor-pointer"
        onClick={closeModal}
      />

      <h2 className="text-2xl text-white mb-3">Update Banners</h2>

      <form className="max-w-full md:max-w-[70%]" onSubmit={handleSubmit}>
        {/* Inputs */}
        <FileInput label="Hero Large" name="heroL" onChange={changeHandler} />
        <MediaPreview src={bannerDataPreview.heroL} file={bannerData.heroL} />

        <FileInput label="Hero Mobile" name="heroSM" onChange={changeHandler} />
        <MediaPreview src={bannerDataPreview.heroSM} file={bannerData.heroSM} />

        <div className="flex justify-between gap-2">
          {["banner1", "banner2", "banner3"].map((name) => (
            <FileInput
              key={name}
              label={name.toUpperCase()}
              name={name}
              onChange={changeHandler}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 my-3">
          {["banner1", "banner2", "banner3"].map((name) => (
            <MediaPreview
              key={name}
              src={bannerDataPreview[name]}
              file={bannerData[name]}
              small
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isChanged || uploading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-md w-full transition 
            ${
              !isChanged || uploading
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
        >
          {uploading ? "Uploading..." : "Update UI"}
        </button>
      </form>
    </div>
  );
};

/* ------------------------
   COMPONENTS
   ------------------------ */
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
               text-white font-semibold shadow-lg cursor-pointer transition-transform hover:scale-105 w-full gap-2"
    >
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
    {file?.type.startsWith("video") ? (
      <video
        src={src}
        className={`${small ? "w-full aspect-square" : "w-[400px] h-[400px] my-4"} rounded-lg object-cover`}
        controls
        muted
      />
    ) : (
      <img
        src={src}
        className={`${small ? "w-full aspect-square" : "w-[400px] h-[400px] my-4"} rounded-lg object-cover`}
      />
    )}
  </div>
);

export default UpdateCompsModal;
