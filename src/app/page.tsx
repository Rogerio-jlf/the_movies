import HeaderComponent from '@/components/Header'
import MovieCardComponent from '@/components/MovieCard'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface IMovie {
  id: number
  title: string
  poster_path: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; genre?: string; year?: string; sort?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const searchQuery = searchParams.query || ''
  const genreId = searchParams.genre || ''
  const year = searchParams.year || ''
  const sort = searchParams.sort || 'popularity.desc'

const baseURL = `${process.env.NEXT_PUBLIC_TMDB_API_URL}/${searchQuery ? 'search/movie' : 'discover/movie'}`
const queryParams = new URLSearchParams({
  api_key: process.env.TMDB_API_KEY!,
  language: 'pt-BR',
  page: currentPage.toString(),
  sort_by: sort,
})

  if (searchQuery) queryParams.set('query', searchQuery)
  if (genreId) queryParams.set('with_genres', genreId)
  if (year) queryParams.set('primary_release_year', year)

  const res = await fetch(`${baseURL}?${queryParams.toString()}`, {
    cache: 'no-store',
  })

  const data = await res.json()

  //------------------------------------------------------------  
  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {searchQuery
          ? `🔎 Resultados para "${searchQuery}"`
          : `🎬 Filmes Populares (Página ${currentPage})`}
      </h1>

      {/* Formulário de busca */}
      <HeaderComponent />

      {/* Lista de filmes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {Array.isArray(data.results) && data.results.length > 0 ? (
          data.results.map((filme: IMovie) => (
            <MovieCardComponent
              key={filme.id}
              id={filme.id}
              title={filme.title}
              poster_path={filme.poster_path || ''}

            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            Nenhum filme encontrado.
          </p>
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-4">
        {currentPage > 1 && (
          <Link
            href={`/?page=${currentPage - 1}${
              searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''
            }`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            <ArrowLeft className="inline mr-2" />
            Anterior
          </Link>
        )}
        {currentPage < data.total_pages && (
          <Link
            href={`/?page=${currentPage + 1}${
              searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : ''
            }`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Próxima
            <ArrowRight className="inline ml-2" />
          </Link>
        )}
      </div>
    </main>
  )
}
