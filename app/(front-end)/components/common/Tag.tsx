interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <div className="bg-slate-100 p-2 font-light text-sm rounded-xl text-gray-600">
      {tag}
    </div>
  );
};

export default Tag;
