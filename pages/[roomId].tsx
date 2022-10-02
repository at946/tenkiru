import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const Page: NextPage = () => {
  const router = useRouter()

  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}${router.query.roomId}`)
    await alert('URLをクリップボードにコピーしました。\n参加者にURLをお知らせしましょう。')
  }

  return (
    <div className='has-text-centered'>
      <section className='section'>
        <p>
          <span>Room ID: </span>
          <span>{ router.query.roomId }</span>
          <a  onClick={copyUrl}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="ml-2" />
          </a>
        </p>
      </section>
    </div>
  )
}

export default Page