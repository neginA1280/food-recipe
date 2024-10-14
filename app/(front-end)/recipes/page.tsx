'use client';

import RecipeCard from '@/components/recipes/RecipeCard';
import { RecipeType } from '@/lib/types/Recipe';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

function RecipesPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      const res = await fetch('/api/recipes');
      const data = await res.json();
      setRecipes(data);
    }
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
                <li key={recipe._id}>
                  <RecipeCard recipe={recipe} loading={loading} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipesPage;
