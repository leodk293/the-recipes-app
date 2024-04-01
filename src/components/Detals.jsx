import React, { useState, useEffect } from 'react';
import './styles.css'
import { useParams } from 'react-router-dom';

export default function Details() {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        async function fetchRecipeDetails() {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const result = await response.json();
                if (result.meals && result.meals.length > 0) {
                    const recipe = result.meals[0];
                    setRecipeDetails(recipe);
                    
                } else {
                    console.log("Aucune recette trouvée pour l'ID spécifié");
                }
            } catch (error) {
                console.log("Erreur lors de la récupération des détails de la recette:", error);
            }
        }

        fetchRecipeDetails();
    }, [id]);

    return (
        <div>
            {recipeDetails && (
                <div className='global-container'>
                    <h1>{recipeDetails.strMeal}</h1>

                    <div className="format">
                        <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
                        <div className="format-text">
                            <p><span style={{ fontWeight: "bolder", textDecoration: "underline", fontSize: "20px" }}>Instructions </span>:{recipeDetails.strInstructions}</p>
                            <a target='_blank' href={recipeDetails.strYoutube}>WATCH THE VIDEO</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
