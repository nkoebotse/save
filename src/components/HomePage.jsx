import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '' // Added image field
  });

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleAddRecipe = () => {
    axios.post('http://localhost:5000/recipes', newRecipe)
      .then(response => {
        setRecipes([...recipes, response.data]);
        setNewRecipe({
          name: '',
          ingredients: '',
          instructions: '',
          category: '',
          prepTime: '',
          cookTime: '',
          servings: '',
          image: ''
        });
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  const handleDeleteRecipe = (id) => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Recipe List</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => setSearchTerm(searchTerm)}>Search</button>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />
      <textarea
        placeholder="Ingredients"
        value={newRecipe.ingredients}
        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
      />
      <textarea
        placeholder="Instructions"
        value={newRecipe.instructions}
        onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newRecipe.category}
        onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Preparation Time"
        value={newRecipe.prepTime}
        onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cooking Time"
        value={newRecipe.cookTime}
        onChange={(e) => setNewRecipe({ ...newRecipe, cookTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Servings"
        value={newRecipe.servings}
        onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newRecipe.image}
        onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
      />
      <button onClick={handleAddRecipe}>Add Recipe</button>
  
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id} className="recipe-item">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <p>Category: {recipe.category}</p>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Cooking Time: {recipe.cookTime}</p>
            <p>Servings: {recipe.servings}</p>
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
