import { Icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";

interface Props {
  label: string;
  icon?: Icon;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button: NextPage<Props> = ({ label, icon, isDisabled, onClick }) => {
  return (
    <button
      className="rounded-full bg-purple-600 px-4 py-2 text-white outline-none drop-shadow-md enabled:hover:bg-purple-700 enabled:hover:drop-shadow-lg enabled:focus:bg-purple-700 enabled:focus:drop-shadow-lg disabled:opacity-50"
      onClick={onClick}
      disabled={isDisabled}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      { label }
    </button>
  )
}

export default Button;