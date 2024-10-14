// app/api/recipes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/config/mongoose';
import Recipe from '@/lib/models/Recipe';

export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB
    const recipes = await Recipe.find(); // Fetch all recipes
    return NextResponse.json(recipes); // Return JSON response with recipes
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching recipes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse request body
    await dbConnect(); // Connect to MongoDB
    const newRecipe = new Recipe(body); // Create new Recipe
    const savedRecipe = await newRecipe.save(); // Save the recipe in the database
    return NextResponse.json(savedRecipe, { status: 201 }); // Return the newly created recipe
  } catch (error) {
    return NextResponse.json(
      { message: 'Error saving recipe' },
      { status: 500 }
    );
  }
}
