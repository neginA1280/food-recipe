import { NextResponse } from 'next/server';
import Recipe from '@/lib/models/Recipe';
import dbConnect from '@/lib/config/mongoose';

// GET request to fetch a specific recipe by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connect to the database

    // Fetch the recipe with the given ID from the params
    const recipe = await Recipe.findById(params.id);

    // If recipe not found, return a 404 response
    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Return the found recipe as a JSON response
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching recipe' },
      { status: 500 }
    );
  }
}
