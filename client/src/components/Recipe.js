import React, { useContext, useState, useEffect, useRef } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Recipe(props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  const {
    _id,
    image,
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    author,
  } = props;

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight));
  }

  useEffect(setMaxHeight, [
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
  ]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`recipe ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
      style={{ height: height }}
    >
      <div className="front" ref={frontEl} style={{ height: height }}>
        <img className="recipe__image" src={image} alt="" />
        <div className="recipe__header">
          <h3 className="recipe__title">{name}</h3>
        </div>
      </div>
      <div className="back" ref={backEl} style={{ height: height }}>
        <div className="btn-container">
          <span
            className="btn btn--edit"
            onClick={() => handleRecipeSelect(_id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
          <span
            className="btn btn--delete"
            onClick={() => handleRecipeDelete(_id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Cook Time:</span>
          <span className="recipe__value">{cookTime}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Servings:</span>
          <span className="recipe__value">{servings}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Ingredients:</span>
          <div className="recipe__value recipe__value--indented">
            <IngredientList ingredients={ingredients} />
          </div>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Instructions:</span>
          <div className="recipe__value recipe__instructions recipe__value--indented">
            {instructions}
          </div>
        </div>
        <div className="recipe__row recipe__author">
          <span className="recipe__label">Created by </span>
          <span className="recipe__value">{author}</span>
        </div>
      </div>
    </div>
  );
}
