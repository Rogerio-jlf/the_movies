// app/api/genres/route.ts
export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`
  )

  const data = await res.json()
  return Response.json(data.genres)
}
