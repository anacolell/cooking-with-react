import React, { useState, useEffect } from "react";

export default function RecipeIngredientCreate(props) {
  const {
    ingredient,
    handleIngredientCreateChange,
    handleIngredientCreateDelete,
  } = props;

  const [newIngredient, setNewIngredient] = useState(ingredient);

  const handleIngredientCreateInputChange = (changes) => {
    setNewIngredient({ ...newIngredient, ...changes });
    console.log(changes);
  };

  useEffect(() => {
    handleIngredientCreateChange(newIngredient.id, newIngredient);
  }, [newIngredient, handleIngredientCreateChange]);

  return (
    <>
      <input
        className="recipe-edit__input"
        type="text"
        onChange={(e) =>
          handleIngredientCreateInputChange({ name: e.target.value })
        }
        value={newIngredient.name}
      />
      <input
        className="recipe-edit__input"
        type="text"
        onChange={(e) =>
          handleIngredientCreateInputChange({ amount: e.target.value })
        }
        value={newIngredient.amount}
      />
      <button
        className="btn btn-ingredient-delete"
        onClick={() => handleIngredientCreateDelete(ingredient.id)}
      >
        &times;
      </button>
    </>
  );
}
