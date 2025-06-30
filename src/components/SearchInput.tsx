'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

//------------------------------------------------------------
// - COMPONENTE
export default function SearchInputComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query') || '')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()
      if (query) params.set('query', query)
      router.push(`/?${params.toString()}`)
    }, 600)

    return () => clearTimeout(timeout)
  }, [query , router])

  //------------------------------------------------------------  
  // - RENDERIZAÇÃO
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar filmes..."
      className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
    />
  )
}
