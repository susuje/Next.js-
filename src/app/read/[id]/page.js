export default async function Read({ params }) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + 'topics/' + params.id,
    {
      cache: 'no-store',
    }
  )
  const topic = await response.json()
  return (
    <>
      <h1> {topic.title} 페이지!</h1>
      {topic.body}
    </>
  )
}
