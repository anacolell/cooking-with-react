import React from "react";

export default function SearchBox({ sortRecipes }) {
  return (
    <>
      <div>
        <select onChange={(e) => sortRecipes(e.target.value)}>
          <option value="name">Sort by</option>
          <option value="nameaz">Name, A-Z</option>
          <option value="nameza">Name, Z-A</option>
          <option value="oldest">Created (oldest)</option>
          <option value="newest">Created (newest)</option>
        </select>
      </div>
    </>
  );
}
