export default function showIngredients({ingredients, fetchRecipe}){
  
  const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ))

  return (
    <div className="ingredients-container">
      <h2>Ingredients on hand</h2>
      <ul>{ingredientsList}</ul>
      {ingredients.length >= 3 && <div className="getRecipe">
        <div className="textContainer">
        <p>Generate an instant recipe with your list of ingredients</p>
        <p>Get how many recipes you want and enjoy!</p>
        </div>
        <button onClick={() => fetchRecipe()} className="buttonRecipe">Get a recipe</button>
      </div>}

  </div>

  )
    
}
