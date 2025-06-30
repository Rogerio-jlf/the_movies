import Image from "next/image";
import Link from "next/link";

interface IMovieCard {
  id: number;
  title: string;
  poster_path: string;
}

export default function MovieCardComponent ({id, poster_path, title}: IMovieCard) {

  // RENDERIZAÇÃO  
  return (
    <>
      <Link href={`/movie/${id}`}>
        <div className="bg-gray-800 rounded shadow p-2 hover:scale-105 transition">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={300}
            height={450}
            className="rounded mb-2"
          />
          <h2 className="text-sm">{title}</h2>
        </div>
      </Link>
    </>
  );
}
