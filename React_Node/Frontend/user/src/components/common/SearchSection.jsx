// components/SearchSection.jsx
import { useState } from "react";

const SearchSection = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", search, "Category:", category);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 p-4 bg-gray-100 flex-wrap">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded border "
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full max-w-sm "
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchSection;
