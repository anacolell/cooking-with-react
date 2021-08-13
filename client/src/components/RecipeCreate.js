import React, { useContext, useState } from "react";
import axios from "axios";
import RecipeIngredientCreate from "./RecipeIngredientCreate";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RecipeCreate() {
  const [newRecipe, setNewRecipe] = useState({
    id: uuidv4(),
    image: "/img/default.jpg",
    name: "",
    servings: 1,
    cookTime: "",
    instructions: "",
    ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    author: "",
  });
  const { handleCreateForm, handleRecipeAdd } = useContext(RecipeContext);

  function handleInputCreateChange(changes) {
    setNewRecipe({ ...newRecipe, ...changes });
  }

  function handleIngredientCreateChange(id, ingredient) {
    let ingredients = newRecipe.ingredients;
    const index = ingredients.findIndex((r) => r.id === id);
    ingredients[index] = ingredient;
  }

  function handleIngredientCreateAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleInputCreateChange({
      ingredients: [...newRecipe.ingredients, newIngredient],
    });
  }

  function handleIngredientCreateDelete(id) {
    handleInputCreateChange({
      ingredients: newRecipe.ingredients.filter((i) => i.id !== id),
    });
  }

  function uploadImage(files) {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "myrecipes");

    axios
      .post("https://api.cloudinary.com/v1_1/dwlvlqpso/image/upload", formData)
      .then((response) => {
        handleInputCreateChange({ image: response.data.secure_url });
        console.log("image set");
      });
  }

  return (
    <>
      <div className="overlay" />
      <div className="recipe-edit">
        <div className="recipe-edit__details-grid">
          <label htmlFor="image" className="recipe-edit__label">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <label htmlFor="name" className="recipe-edit__label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newRecipe.name}
            onChange={(e) => handleInputCreateChange({ name: e.target.value })}
            className="recipe-edit__input"
          />
          <label htmlFor="cookTime" className="recipe-edit__label">
            Cook Time
          </label>
          <input
            type="text"
            name="cookTime"
            id="cookTime"
            value={newRecipe.cookTime}
            onChange={(e) =>
              handleInputCreateChange({ cookTime: e.target.value })
            }
            className="recipe-edit__input"
          />
          <label htmlFor="servings" className="recipe-edit__label">
            Servings
          </label>
          <input
            type="number"
            min="1"
            name="servings"
            id="servings"
            value={newRecipe.servings}
            onChange={(e) =>
              handleInputCreateChange({
                servings: parseInt(e.target.value) || "",
              })
            }
            className="recipe-edit__input"
          />
        </div>
        <div className="recipe-edit__instructions">
          <label htmlFor="instructions" className="recipe-edit__label">
            Instructions
          </label>
          <textarea
            name="instructions"
            className="recipe-edit__input"
            value={newRecipe.instructions}
            onChange={(e) =>
              handleInputCreateChange({ instructions: e.target.value })
            }
            id="instructions"
          />
        </div>
        <br />
        <div className="recipe-edit__add_ingredient">
          <label className="recipe-edit__label">Ingredients</label>
          <div onClick={() => handleIngredientCreateAdd()}>
            <FontAwesomeIcon
              className="recipe-edit__icon-add-ingredient"
              icon={faPlus}
            />
          </div>
        </div>
        <div className="recipe-edit__ingredient-grid">
          <div>Name</div>
          <div>Amount</div>
          <div></div>
          {newRecipe.ingredients.map((ingredient) => (
            <RecipeIngredientCreate
              key={ingredient.id}
              newRecipe={newRecipe}
              handleIngredientCreateChange={handleIngredientCreateChange}
              handleIngredientCreateDelete={handleIngredientCreateDelete}
              ingredient={ingredient}
            />
          ))}
        </div>
        <div className="recipe-edit__details-grid">
          <label htmlFor="author" className="recipe-edit__label">
            Created by
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={newRecipe.author}
            onChange={(e) =>
              handleInputCreateChange({ author: e.target.value })
            }
            className="recipe-edit__input"
          />
        </div>
        <div className="recipe-edit__button-container">
          <button
            className="btn btn-edit btn-edit-cancel"
            onClick={handleCreateForm}
          >
            Cancel
          </button>
          <button
            className="btn btn-edit btn-edit-update"
            onClick={() => handleRecipeAdd(newRecipe)}
          >
            Create recipe
          </button>
        </div>
      </div>
    </>
  );
}
