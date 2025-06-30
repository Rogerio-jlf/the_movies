import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IParams {
  params: {
    id: string;
  };
}

interface Genre {
  id: number;
  name: string;
}

const DetailsMoviePage = async ({params}:IParams) => {

  const [movieResponse, VideosResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`),
    fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${params.id}/videos?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`)
  ]);

  if (!movieResponse.ok || !VideosResponse.ok) {
    return notFound();
  }

  const dataMovies = await movieResponse.json();
  const dataVideos = await VideosResponse.json();

  const trailer = dataVideos.results.find((video: { type: string; site: string }) =>
    video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Voltar para a lista de filmes
      </Link>
      <h1 className="text-3xl font-bold mb-4">{dataMovies.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${dataMovies.poster_path}`}
          alt={dataMovies.title}
          width={300}
          height={450}
          className="rounded"
        />
        <div>
          <p className="mb-4 text-gray-200">{dataMovies.overview}</p>
          <p><strong>Lançamento:</strong> {dataMovies.release_date}</p>
          <p><strong>Nota:</strong> {dataMovies.vote_average}</p>
          <p><strong>Duração:</strong> {dataMovies.runtime} min</p>
          <p><strong>Gêneros:</strong> {dataMovies.genres.map((g: Genre) => g.name).join(', ')}</p>
        </div>
      </div>

      {trailer && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsMoviePage;