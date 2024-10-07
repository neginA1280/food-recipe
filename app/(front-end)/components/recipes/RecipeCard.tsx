import { Box, Skeleton } from '@mui/material';
import Link from 'next/link';

export interface Recipe {
  id: number;
  name: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  loading: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  loading,
}: {
  recipe: any;
  loading: boolean;
}) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="">
      <div className="text-center p-5 rounded-lg border border-slate-200">
        {loading ? (
          <>
            <Box sx={{ width: 250, height: 300 }}>
              <Skeleton width="60%" />
              <Skeleton variant="rectangular" height={200} width={250} />
            </Box>
          </>
        ) : (
          <>
            <span className="text-center font-semibold text-slate-600">
              {recipe.name}
            </span>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="max-w-64 max-h-64 rounded-lg mt-4"
            />
          </>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
