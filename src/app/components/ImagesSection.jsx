"use client";

import { useRef } from "react";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";

export const ImagesSection = ({
  newImages,
  setNewImages,
  existingImages,
  setExistingImages,
}) => {
  const inputRef = useRef();

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setNewImages((prev) => [...prev, ...fileArray]);
  };

  const handleBrowse = () => inputRef.current.click();

  const handleRemoveNewImage = (index) =>
    setNewImages((prev) => prev.filter((_, i) => i !== index));

  const handleRemoveExistingImage = (url) =>
    setExistingImages((prev) => prev.filter((img) => img !== url));

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold">Uploaded Image</h2>

      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* upload grid */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 h-50">
          {/* First column - 2 large */}
          {[0, 1].map((i) => (
            <div
              key={i}
              onClick={handleBrowse}
              className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:border-gray-400 transition h-full"
            >
              <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Drop your image here, or
                <span className="text-blue-600 ml-1">Browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports: JPG, JPEG, PNG
              </p>
            </div>
          ))}
        </div>
        {/* Second column - 3 small stacked */}
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              onClick={handleBrowse}
              className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-gray-400 transition flex-1"
            >
              <ImagePlus className="w-6 h-6 text-gray-400 mb-1" />
              <p className="text-xs text-gray-600">
                Drop your image here, or
                <span className="text-blue-600 ml-1">Browse</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Preview for new images */}
      {newImages.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">New Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {newImages.map((img, i) => (
              <div key={i} className="relative group">
                <Image
                  src={URL.createObjectURL(img)}
                  width={200}
                  height={200}
                  alt="preview"
                  className="rounded-md object-cover h-24 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
