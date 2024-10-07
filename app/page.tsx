import { Skeleton } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <h1 className="font-extrabold text-4xl mb-20">
        Welcome To My Food Recipe App
      </h1>
      <button className="bg-green-100 p-5 rounded-lg">
        <Link href="/recipes">Show The Recipes</Link>
      </button>
    </div>
  );
}
