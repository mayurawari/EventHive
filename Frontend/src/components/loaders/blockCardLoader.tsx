const SkeletonMovieDetail = () => {
  return (
    <div className="w-full h-[600px] bg-[#0b0b0b] animate-pulse">
      {/* Backdrop */}
      <div className="relative w-full h-[260px] bg-gradient-to-b from-[#141414] to-[#0b0b0b] overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />

        {/* Menu Icon */}
        <div className="absolute top-4 left-4 z-20">
          <div className="w-9 h-9 bg-gray-700/40 rounded-md" />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 -mt-16">
        <div className="bg-[#111111]/90 rounded-2xl p-6 md:p-8 border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div className="h-10 w-3/4 bg-gray-700/60 rounded-xl" />

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-700/50 rounded-md" />
                <div className="h-4 w-11/12 bg-gray-700/40 rounded-md" />
                <div className="h-4 w-10/12 bg-gray-700/40 rounded-md" />
              </div>

              {/* Meta Pills */}
              <div className="flex gap-3 pt-2">
                <div className="h-7 w-24 bg-gray-700/40 rounded-full" />
                <div className="h-7 w-28 bg-gray-700/30 rounded-full" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                <div className="flex-1 h-12 bg-gray-700/30 rounded-lg" />
                <div className="flex-1 h-12 bg-gray-700/20 rounded-lg" />
              </div>
            </div>

            {/* Poster */}
            <div className="hidden lg:flex justify-center">
              <div className="w-56 h-[300px] bg-gray-700/50 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMovieDetail;
