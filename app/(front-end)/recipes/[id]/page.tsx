'use client';

import Tag from '../../components/common/Tag';
import IngredientCard from '../../components/recipes/IngredientCard';
import { useEffect, useState } from 'react';

interface Recipe {
  name: string;
  image: string;
  caloriesPerServing: number;
  cookTimeMinutes: number;
  cuisine: string;
  difficulty: string;
  mealType: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  async function fetchRecipeDetails() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://dummyjson.com/recipes/${params.id}`
      );
      const recipeDetails: Recipe = await apiResponse.json();

      console.log(recipeDetails);

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

  if (loading) {
    return (
      <h3 className="font-extrabold text-3xl">
        Loading recipe details! Please wait...
      </h3>
    );
  }

  if (!recipe) {
    return <h3 className="font-extrabold text-3xl">Recipe not found.</h3>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="text-5xl font-bold mb-8">{recipe.name}</h1>
      <img src={recipe.image} className="max-w-96 max-h-96 rounded-lg mb-10" />

      <div className="flex gap-8 mb-10 text-sm">
        <div>
          <span className="font-semibold text-slate-600">
            Calories Per Serving:{' '}
          </span>
          <span>{recipe.caloriesPerServing}</span>
        </div>

        <div>
          <span className="font-semibold text-slate-600">
            Cook Time (min):{' '}
          </span>
          <span>{recipe.cookTimeMinutes}</span>
        </div>

        <div>
          <span className="font-semibold text-slate-600">Cuisine: </span>
          <span>{recipe.cuisine}</span>
        </div>

        <div>
          <span className="font-semibold text-slate-600">Difficulty: </span>
          <span>{recipe.difficulty}</span>
        </div>

        <div>
          <span className="font-semibold text-slate-600">Meal Type: </span>
          <span>{recipe.mealType}</span>
        </div>

        <div>
          <span className="font-semibold text-slate-600">Rating: </span>
          <span>{recipe.rating}</span>
        </div>
      </div>

      <hr className="w-3/4 border-t-1 border-gray-600 mb-10" />

      <div className="mb-20 w-10/12">
        <p className="font-semibold text-2xl mb-4">Ingredients:</p>
        <div className="flex gap-2 justify-start items-start">
          {recipe.ingredients && recipe.ingredients.length > 0
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
        {recipe.instructions && recipe.instructions.length > 0
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
          {recipe.tags && recipe.tags.length > 0
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

export default Page;
