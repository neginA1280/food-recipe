interface IngredientCardProps {
  ingredient: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  return (
    <div className="bg-red-100 p-2 text-sm rounded-xl text-gray-600">
      {ingredient}
    </div>
  );
};

export default IngredientCard;
