import { Cross } from "lucide-react";
import React from "react";

const UpdateCompsModal = () => {
  return (
    <div className="p-2 md:p-4 flex justify-center items-center flex-1 w-full h-full mx-auto relative bg-gray-900 rounded-md">
        <Cross className="absolute top-4 right-4 cursor-pointer text-white" size={24} />
      <h2 className="text-2xl textwhite">Update Banners</h2>
      <form>
        <div>
          <label
            htmlFor="heroLarge"
            className="block text-gray-300 font-medium"
          >
            Hero Large
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple={false}
            id="heroLarge"
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700
               text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none mb-4"
          />
          {/* preview of the selected sile*/}
          <div>
            <img src="" alt="heroLargePreview" className="w-full h-auto mb-4" />
          </div>
        </div>
        <div>
          <label
            htmlFor="heroMobile"
            className="block text-gray-300 font-medium"
          >
            Hero Mobile
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple={false}
            id="heroMobile"
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700
               text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none mb-4"
          />
          {/* preview of the selected sile*/}
          <div>
            <img
              src=""
              alt="heroMobilePreview"
              className="w-full h-auto mb-4"
            />
          </div>
        </div>

        <div>
          <label htmlFor="banners3" className="block text-gray-300 font-medium">
            banners 3 images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            id="banners3"
            className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700
               text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none mb-4"
          />

          {/* preview of the selected files */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src="" alt="banner1Preview" className="w-full h-auto mb-4" />
            <img src="" alt="banner2Preview" className="w-full h-auto mb-4" />
            <img src="" alt="banner3Preview" className="w-full h-auto mb-4" />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update UI
        </button>
      </form>
    </div>
  );
};

export default UpdateCompsModal;
