'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function Update() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const router = useRouter()
  const params = useParams()
  const id = params.id
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/' + id)
      .then(res => res.json())
      .then(result => {
        setTitle(result.title)
        setBody(result.body)
      })
  }, [])
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const title = e.target.title.value //name이 title인 것의 value
        const body = e.target.body.value
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/' + id, options)
          .then(res => res.json())
          .then(result => {
            const lastid = result.id
            router.push(`/read/${lastid}`)
            router.refresh() //서버컴포넌트 강제로 다시 렌더링
          })
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="내용"
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="등록" />
      </p>
    </form>
  )
}
