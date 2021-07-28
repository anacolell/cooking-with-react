import Recipe from './Recipe'

export default function RecipeList({recipes}) {
  return (
    <>
    <div className="recipe-list">
        {recipes.map(recipe => {
          return <Recipe key={recipe.id} {...recipe}/>
        })}
    </div>
    </>
  )
}
