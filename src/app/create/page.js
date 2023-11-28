//page.js 는 약속된 것.
'use client'

import { useRouter } from 'next/navigation'

export default function Create() {
  const router = useRouter()
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const title = e.target.title.value //name이 title인 것의 value
        const body = e.target.body.value
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + 'topics', options)
          .then(res => res.json())
          .then(result => {
            const lastid = result.id
            router.push(`/read/${lastid}`)
            router.refresh() //서버컴포넌트 강제로 다시 렌더링
          })
      }}
    >
      <p>
        <input type="text" name="title" placeholder="제목" />
      </p>
      <p>
        <textarea name="body" placeholder="내용"></textarea>
      </p>
      <p>
        <input type="submit" value="등록" />
      </p>
    </form>
  )
}
