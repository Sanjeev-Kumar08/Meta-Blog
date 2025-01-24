import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredData([]);
      return;
    }

    const res = await fetch(
      `https://tunica-blogs-backend.onrender.com/api/blog/search/${value}`
    );
    const data = await res.json();
    setFilteredData(data);
  };

  const getSingleBlog = (id) => {
    setQuery("")
    router.push(`/single-post/${id}`)
  }

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="sm350:w-[166px] w-[100px] bg-[#F4F4F5] px-4 py-1 rounded-md border-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue font-worksans"
          onChange={handleSearch}
          value={query}
        />
        <button aria-label="Search" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <img src="/search-outline.svg" alt="Search Icon" />
        </button>
      </div>
      {query.trim() !== "" && (
        <div className="absolute top-full mt-2 sm500:left-[-15rem] sm500:w-[250%] sm426:w-full w-90vw bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10 font-worksans">
          {filteredData.length > 0 ? (
            filteredData.map((blog, index) => (
              <div
                key={index + 1}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 border-b"
                onClick={() => getSingleBlog(blog.id)}
              >
                <div className="hidden sm426:block w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={blog.image}
                    alt="Blog Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 font-medium">{blog.title}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
