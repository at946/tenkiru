import { NextPage } from "next";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

interface Props {
  roomId: string
}

const RoomInfo: NextPage<Props> = ({ roomId }) => {
  const copyUrl = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`)
    await alert('URLをクリップボードにコピーしました。\n参加者にURLをお知らせしましょう。')
  }

  return (
    <p>
      <span>Room ID: </span>
      <span>{ roomId }</span>
      <a onClick={copyUrl}>
        <FontAwesomeIcon icon={faArrowUpFromBracket} className="ml-2" />
      </a>
    </p>
  )
}

export default RoomInfo