import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const MAX_VISIBLE_PAGES = 5;

  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(page - 2, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    if (end - start < MAX_VISIBLE_PAGES - 1) {
      start = Math.max(end - MAX_VISIBLE_PAGES + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 m-8 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-1 rounded-lg border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        ◀
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`px-4 py-1 rounded-lg border transition-all duration-200 cursor-pointer
            ${
              page === num
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-none scale-105"
                : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
            }
          `}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-1 rounded-lg border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
