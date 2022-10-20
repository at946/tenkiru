import { NextPage } from 'next';
import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Card } from '../../../interfaces/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const CustomDeckSetting: NextPage = () => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const customDeckCards: Card[] | undefined = useAppSelector((state) => state.room.customDeck);
  const customDeckText: string = customDeckCards?.join('\n') || '';

  return (
    <div>
      <button
        className='button is-rounded is-inverted is-primary ml-2'
        onClick={() => setModalIsActive(true)}
        data-testid='customDeckSettingIcon'
      >
        <FontAwesomeIcon icon={faScrewdriverWrench} />
      </button>

      {modalIsActive && (
        <div className='modal is-active' data-testid='customDeckSettingModal'>
          <div className='modal-background' onClick={() => setModalIsActive(false)}></div>
          <div className='modal-content'>
            <div className='box'>
              <textarea
                rows={10}
                defaultValue={customDeckText}
                className='textarea'
                data-testid='customDeckSettingTextarea'
              />
            </div>
          </div>
          <button
            className='modal-close is-large'
            aria-label='close'
            onClick={() => setModalIsActive(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default CustomDeckSetting;
