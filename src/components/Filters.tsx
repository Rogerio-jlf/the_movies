'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Genre {
  id: number
  name: string
}

export default function FiltersComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [genres, setGenres] = useState<Genre[]>([])
  const [year, setYear] = useState(searchParams.get('year') || '')
  const [genre, setGenre] = useState(searchParams.get('genre') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularity.desc')

  useEffect(() => {
    fetch('/api/genres')
      .then((res) => res.json())
      .then(setGenres)
  }, [])

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap justify-between gap-7">
      {/* Gênero */}
      <select
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value)
          updateParams('genre', e.target.value)
        }}
        className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded mb-6"
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Ano */}
      <input
        type="number"
        value={year}
        onChange={(e) => {
          setYear(e.target.value)
          updateParams('year', e.target.value)
        }}
        placeholder="Ano ex: 2023"
        className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded w-[150px] mb-6"
        min="1900"
        max={new Date().getFullYear()}
      />

      {/* Ordenação */}
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value)
          updateParams('sort', e.target.value)
        }}
        className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded mb-6"
      >
        <option value="popularity.desc">Mais populares</option>
        <option value="vote_average.desc">Mais bem avaliados</option>
        <option value="release_date.desc">Mais recentes</option>
        <option value="release_date.asc">Mais antigos</option>
      </select>
    </div>
  )
}
