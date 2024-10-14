'use client';

import Tag from '@/components/common/Tag';
import IngredientCard from '@/components/recipes/IngredientCard';
import { RecipeType } from '@/lib/types/Recipe';
import React, { useEffect, useState } from 'react';

const page = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  async function fetchRecipeDetails() {
    try {
      setLoading(true);

      const dbResponse = await fetch(`/api/recipes/${params.id}`);
      const recipeDetails = await dbResponse.json();

      if (recipeDetails) {
        setRecipe(recipeDetails);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center my-10">
      {recipe && <h1 className="text-5xl font-bold mb-8">{recipe.name}</h1>}

      {recipe && (
        <img
          src={recipe.image}
          className="max-w-96 max-h-96 rounded-lg mb-10"
        />
      )}

      <div className="flex gap-8 mb-10 text-sm">
        <div>
          <span className="font-semibold text-slate-600">
            Calories Per Serving:
          </span>
          {recipe && <span>{recipe.caloriesPerServing}</span>}
        </div>

        <div>
          <span className="font-semibold text-slate-600">
            Cook Time (min):{' '}
          </span>
          {recipe && <span>{recipe.cookTimeMinutes}</span>}
        </div>

        <div>
          <span className="font-semibold text-slate-600">Cuisine: </span>
          {recipe && <span>{recipe.cuisine}</span>}
        </div>

        <div>
          <span className="font-semibold text-slate-600">Difficulty: </span>
          {recipe && <span>{recipe.difficulty}</span>}
        </div>

        <div>
          <span className="font-semibold text-slate-600">Meal Type: </span>
          {recipe && <span>{recipe.mealType}</span>}
        </div>

        <div>
          <span className="font-semibold text-slate-600">Rating: </span>
          {recipe && <span>{recipe.rating}</span>}
        </div>
      </div>

      <hr className="w-3/4 border-t-1 border-gray-600 mb-10" />

      <div className="mb-20 w-10/12">
        <p className="font-semibold text-2xl mb-4">Ingredients:</p>
        <div className="flex gap-2 justify-start items-start">
          {recipe && recipe.ingredients && recipe.ingredients.length > 0
            ? recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <IngredientCard ingredient={ingredient} />
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="mb-20 w-9/12">
        <p className="font-semibold text-2xl text-left mb-5">Instructions:</p>
        {recipe && recipe.instructions && recipe.instructions.length > 0
          ? recipe.instructions.map((instruction, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{`${index + 1} - `}</span>
                <span>{instruction}</span>
              </div>
            ))
          : null}
      </div>

      <div className="w-10/12">
        <p className="font-semibold text-2xl mb-4">Tags:</p>
        <div className="flex gap-2 justify-start items-start">
          {recipe && recipe.tags && recipe.tags.length > 0
            ? recipe.tags.map((tag, index) => (
                <div key={index}>
                  <Tag tag={tag} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default page;
