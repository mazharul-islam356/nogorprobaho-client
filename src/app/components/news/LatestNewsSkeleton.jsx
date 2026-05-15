// Skeleton Component
const NewsSkeleton = () => (
  <div className="group bg-white rounded-xs overflow-hidden shadow-sm animate-pulse">
    {/* Image Skeleton */}
    <div className="relative w-full h-40 sm:h-44 md:h-48 bg-gray-100" />

    {/* Content Skeleton */}
    <div className="p-3 sm:p-4 flex flex-col gap-2">
      {/* Title Skeleton */}
      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 rounded w-1/2"></div>

      {/* Description Skeleton */}
      <div className="space-y-2 mt-2">
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between mt-2">
        <div className="h-3 bg-gray-100 rounded w-16"></div>
        <div className="h-3 bg-gray-100 rounded w-12"></div>
      </div>
    </div>
  </div>
);

export default NewsSkeleton;
