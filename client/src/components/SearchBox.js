import React, { useContext } from "react";
import { RecipeContext } from "./App";
import { BsSearch } from "react-icons/bs";

export default function SearchBox() {
  const { handleRecipeSearch } = useContext(RecipeContext);
  return (
    <div className="search-wrapper">
      <div className="search-icon">
        <BsSearch />
      </div>
      <input
        className="searchbox"
        type="text"
        placeholder="Search a recipe"
        onChange={(e) => handleRecipeSearch(e.target.value)}
      />
    </div>
  );
}
