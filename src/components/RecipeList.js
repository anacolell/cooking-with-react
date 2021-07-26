import React, { useContext }from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList({recipes}) {
  const { handleRecipeAdd } = useContext(RecipeContext)
  return (
    <>
    <h1 className="page-title">Best recipes</h1>
    <div className="recipe-list">
        {recipes.map(recipe => {
          return <Recipe key={recipe.id} {...recipe}/>
        })}
    </div>
   <div className="recipe-list__add-recipe-btn-container">
      <button
      className="btn btn--primary"
      onClick={handleRecipeAdd}
      >
      Add Recipe</button>
    </div>
    </>
  )
}
