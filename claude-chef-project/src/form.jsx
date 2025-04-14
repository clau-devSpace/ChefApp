import React from "react";
import axios from 'axios';
import Ingredientslist from './ingredientslist';
import ClaudeRecipe from './clauderecipe';

export default function SendIngredients() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState();
  const [error, setError] = React.useState('');

 
  async function fetchRecipe() {
    console.log("Ingredientes a enviar:", ingredients); 
    try {
        const response = await axios.post('http://localhost:5000/get-recipe', {
            ingredients: ingredients,
        });
        setRecipe(response.data.recipe);
        setError('');
    } catch (err) {
        setError('Error al obtener la receta. Intenta de nuevo.');
        console.error(err);
    }
  }

  /* Esta es una forma mas rudimentaria para hacer lo mismo que esta abajo! function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }*/

    function Submit(formData){
      event.preventDefault();
      const newIngredient = formData.get('ingredient');
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

  return (
    <>
     <div className="form-container">
      <form action={Submit} className="form-add-ingredient">
        <input
          className="input-add-ingredient"
          type="text"
          name="ingredient"
          aria-label="add-ingredient"
          placeholder="e.g oregano"
        />

        <button type="submit" className="button-add-ingredient" >
          <span className="span">Add Ingredient</span>
        </button>

      </form>
     
       <h2 className="minimunIngredients">(Add at least 3 ingredients)</h2>
    </div>

    {ingredients.length > 0 && <Ingredientslist
     ingredients={ingredients}
     fetchRecipe={fetchRecipe}
     />}

     {error && <p style={{ color: 'red' }}>{error}</p>}

     {recipe && <ClaudeRecipe recipe={recipe} />}
    </>
   
  );
}
