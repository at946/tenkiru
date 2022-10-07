import { NextPage } from "next";

interface Style {
  [prop: string]: any
}

interface Props {
  value: number | string | null
  additionalClassName?: string
  additionalStyle?: Style
}

const Card: NextPage<Props> = ({ value, additionalClassName, additionalStyle }) => {
  const className: string = `
    box
    is-flex
    is-justify-content-center
    is-align-items-center
    is-size-3
    has-text-weight-bold
    m-2
  `

  const style: Style = {
    width: '100px',
    minWidth: '100px',
    aspectRatio: '1 / 1.4',
  }

  return (
    <div
      className={`${className} ${additionalClassName || ''}`}
      style={{...style, ...additionalStyle }}
    >
      { value }
    </div>
  )
}

export default Card