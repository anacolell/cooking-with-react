import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import RecipeCreate from "./RecipeCreate";
import SearchBox from "./SearchBox";
import SortMenu from "./SortMenu";
import Footer from "./Footer";
import axios from "axios";
import "../css/app.css";

export const RecipeContext = React.createContext();

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState();
  const [createForm, setCreateForm] = useState(false);

  function handleCreateForm() {
    setCreateForm(!createForm);
  }

  const selectedRecipe = recipes.find(
    (recipe) => recipe._id === selectedRecipeId
  );

  useEffect(() => {
    getRecipes();
  }, []);

  function getRecipes() {
    axios
      .get("/api")
      .then((response) => {
        const allRecipes = response.data;
        setRecipes(allRecipes);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
    handleCreateForm,
  };

  function handleRecipeSelect(_id) {
    setSelectedRecipeId(_id);
  }

  function handleRecipeAdd(newRecipeData) {
    axios({
      url: "/api/save",
      method: "POST",
      data: newRecipeData,
    })
      .then(() => {
        console.log(newRecipeData);
        console.log("Data has been sent to the server");
      })
      .catch(() => {
        console.log("Internal server error");
      })
      .then(getRecipes());
    handleCreateForm();
  }

  function handleRecipeChange(_id, recipe) {
    axios.put("/api/put/" + _id, recipe);
    getRecipes();
  }

  function handleRecipeDelete(id) {
    axios.delete("api/delete/" + id).then((res) => {
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    });
  }

  function handleRecipeSearch(input) {
    setSearchText(input);
  }

  const filteredRecipes =
    searchText != null
      ? recipes.filter((r) => r.name.toLowerCase().includes(searchText))
      : recipes;

  function sortRecipes(type) {
    const types = {
      nameaz: "name",
      nameza: "name",
      oldest: "createdAt",
      newest: "createdAt",
    };
    const sortProperty = types[type];
    const sorted = [...recipes].sort((a, b) => {
      if (type === "newest" || type === "nameza") {
        return b[sortProperty].localeCompare(a[sortProperty]);
      } else {
        return a[sortProperty].localeCompare(b[sortProperty]);
      }
    });
    setRecipes(sorted);
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <div className="banner">
        <div className="banner-container">
          <h1 className="title">Recipely</h1>
          <p className="subtitle">Simple recipes that make you feel good</p>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <div className="add-btn-container">
            <button className="btn btn-add" onClick={handleCreateForm}>
              Add recipe
            </button>
          </div>
          <div className="filterbox">
            <SearchBox />
            <SortMenu sortRecipes={sortRecipes} />
          </div>
        </div>
        {createForm && <RecipeCreate />}
        <RecipeList recipes={recipes} filteredRecipes={filteredRecipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </div>
      <Footer />
    </RecipeContext.Provider>
  );
}

// const sampleRecipes = [
//   {
//     id: 1,
//     image: "/img/poke.jpg",
//     name: "Poke Bowl",
//     servings: 3,
//     cookTime: "1:45",
//     instructions:
//       "1. Cut all the ingredients\n2. Put them in a bowl\n3. Enjoy your Poke bowl!",
//     ingredients: [
//       {
//         id: 1,
//         name: "Tofu",
//         amount: "1 Block",
//       },
//       {
//         id: 2,
//         name: "Tomatoes",
//         amount: "1",
//       },
//     ],
//     author: "Ana",
//     vegan: true,
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=506&q=80",
//     name: "Raspberry Ice Cream",
//     servings: 3,
//     cookTime: "0:45",
//     instructions:
//       "1. Blend raspberries and milk\n2. Put mixture in the freezer for 40 minutes\n3. Enjoy your raspberry ice cream!",
//     ingredients: [
//       {
//         id: 1,
//         name: "Frozen raspberries",
//         amount: "500 g",
//       },
//       {
//         id: 2,
//         name: "Milk of your choice",
//         amount: "1 Liter",
//       },
//     ],
//     author: "Ana",
//     vegan: true,
//   },
// ];

export default App;
