import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const CustomDeckSetting: NextPage = () => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false)

  return (
    <div>
      <button className="button is-rounded is-inverted is-primary ml-2" onClick={() => setModalIsActive(true)} data-testid="customDeckSettingIcon">
        <FontAwesomeIcon icon={faScrewdriverWrench} />
      </button>
      { modalIsActive && (
        <div className="modal is-active" data-testid="customDeckSettingModal">
          <div className="modal-background" onClick={() => setModalIsActive(false)}></div>
          <div className="modal-content">
            Hello
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setModalIsActive(false)}></button>
        </div>
      )}
    </div>
  )
}

export default  CustomDeckSetting;