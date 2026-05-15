"use client";

import { useForm } from "react-hook-form";

export default function CategoryForm({ categories, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-md">
      {/* Name Input */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-medium text-gray-700">
          Category Name
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          placeholder="Enter category name"
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Parent Category Select */}
      <div className="flex flex-col">
        <label htmlFor="parentId" className="mb-2 font-medium text-gray-700">
          Parent Category (Optional)
        </label>
        <select
          id="parentId"
          {...register("parentId")}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Category
      </button>
    </form>
  );
}
