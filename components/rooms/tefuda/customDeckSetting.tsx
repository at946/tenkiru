import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Card } from '../../../interfaces/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

interface Props {
  updateCustomDeck: (values: Array<string | number>) => void;
}

const CustomDeckSetting: NextPage<Props> = ({ updateCustomDeck }) => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const customDeckCards: Card[] | undefined = useAppSelector((state) => state.room.customDeck);
  const [customDeckText, setCustomDeckText] = useState<string>(customDeckCards?.join('\n') || '');

  useEffect(() => {
    setCustomDeckText(customDeckCards?.join('\n') || '');
  }, [customDeckCards]);

  const closeModal = (): void => {
    setCustomDeckText(customDeckCards?.join('\n') || '');
    setModalIsActive(false);
  };

  const saveCustomDeck = (): void => {
    updateCustomDeck(customDeckText.split('\n'));
    setModalIsActive(false);
  };

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
          <div className='modal-background' onClick={closeModal}></div>
          <div className='modal-content'>
            <div className='box'>
              <div className='field'>
                <div className='control'>
                  <textarea
                    rows={10}
                    value={customDeckText}
                    className='textarea'
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setCustomDeckText(e.target.value)
                    }
                    data-testid='customDeckSettingModalTextarea'
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button
                    className='button is-primary is-rounded'
                    data-testid='customDeckSettingModalSaveButton'
                    onClick={saveCustomDeck}
                    disabled={!customDeckText.replace(/\s+/g, '')}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className='modal-close is-large'
            aria-label='close'
            onClick={closeModal}
            data-testid='customDeckSettingModalCloseButton'
          ></button>
        </div>
      )}
    </div>
  );
};

export default CustomDeckSetting;
