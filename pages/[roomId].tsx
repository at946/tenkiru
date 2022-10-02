import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()

  return (
    <div className='has-text-centered'>
      <section className='section'>
        <p>Room ID: { router.query.roomId }</p>
      </section>
    </div>
  )
}

export default Page