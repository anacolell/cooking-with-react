import React, { useState, useEffect } from "react";

export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientDelete, handleIngredientChange } = props;
  const [currentIngredient, setCurrentIngredient] = useState(ingredient);

  const handleIngredientEditInputChange = (changes) => {
    setCurrentIngredient({ ...currentIngredient, ...changes });
  };

  useEffect(() => {
    handleIngredientChange(currentIngredient.id, currentIngredient);
  }, [currentIngredient, handleIngredientChange]);

  return (
    <>
      <input
        className="recipe-edit__input"
        type="text"
        onChange={(e) =>
          handleIngredientEditInputChange({ name: e.target.value })
        }
        value={currentIngredient.name}
      />
      <input
        className="recipe-edit__input"
        type="text"
        onChange={(e) =>
          handleIngredientEditInputChange({ amount: e.target.value })
        }
        value={currentIngredient.amount}
      />
      <button
        className="btn btn--danger"
        onClick={() => handleIngredientDelete(ingredient.id)}
      >
        &times;
      </button>
    </>
  );
}
