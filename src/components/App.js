import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import SearchBox from './SearchBox'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';


export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [searchText, setSearchText] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      image: '/img/default.jpg',
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id:uuidv4(), name:'', amount: '' }
      ],
      author: '',
      vegan: false
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

   function handleRecipeSearch(input) {
    setSearchText(input)
  }

  const filteredRecipes = searchText != null
  ? recipes.filter(r => r.name.toLowerCase().includes(searchText))
  : recipes
  console.log(recipes)
  console.log(filteredRecipes)
  return (
    <RecipeContext.Provider value={recipeContextValue}>
    <div className="container">
{/*      <h1 className="page-title">Yummy recipes</h1>*/}
      <SearchBox />
      <RecipeList
        recipes = {recipes}
        filteredRecipes = {filteredRecipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} /> }
      <div className="recipe-list__add-recipe-btn-container">
        <button
        className="btn btn--primary"
        onClick={handleRecipeAdd}
        >
        Add Recipe</button>
      </div>
    </div>
    </RecipeContext.Provider>
  )
}

const sampleRecipes  = [
  {
    id:1,
    image: '/img/poke.jpg',
    name: 'Poke Bowl',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Cut all the ingredients\n2. Put them in a bowl\n3. Enjoy your Poke bowl!",
    ingredients: [
      {
        id: 1,
        name: 'Tofu',
        amount: '1 Block'
      },
      {
        id: 2,
        name: 'Tomatoes',
        amount: '1'
      }
    ],
    author: 'Ana',
    vegan: true
  },
  {
    id:2,
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=506&q=80',
    name: 'Raspberry Ice Cream',
    servings: 3,
    cookTime: '0:45',
    instructions: "1. Blend raspberries and milk\n2. Put mixture in the freezer for 40 minutes\n3. Enjoy your raspberry ice cream!",
    ingredients: [
      {
        id: 1,
        name: 'Frozen raspberries',
        amount: '500 g'
      },
      {
        id: 2,
        name: 'Milk of your choice',
        amount: '1 Liter'
      }
    ],
    author: 'Ana',
    vegan: true
  }
]

export default App;

