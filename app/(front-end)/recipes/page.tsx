'use client';

import React, { useEffect, useState } from 'react';
import RecipeCard, { Recipe } from '../components/recipes/RecipeCard';
import { Box, Grid2, Skeleton, Typography } from '@mui/material';

interface RecipeApiResponse {
  recipes: Recipe[];
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function fetchRecipes(): Promise<void> {
    try {
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/recipes');
      const recipesData: RecipeApiResponse = await apiResponse.json();
      // console.log(recipesData.recipes);

      if (recipesData?.recipes) {
        setRecipes(recipesData.recipes);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="font-extrabold text-3xl text-center my-10">My Recipes</h1>
      <div className="flex justify-center items-center">
        <ul className="grid grid-cols-4 gap-10 mb-10">
          {loading
            ? recipes.map((_, index) => (
                <li key={index}>
                  <Box sx={{ width: 250, height: 300 }}>
                    <Skeleton width="60%" />
                    <Skeleton variant="rectangular" height={200} width={250} />
                  </Box>
                </li>
              ))
            : recipes.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard recipe={recipe} loading={loading} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
