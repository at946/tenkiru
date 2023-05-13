import { NextPage } from 'next';
import styles from './loading.module.scss';

const Loading: NextPage = () => {
  return (
    <div role='alert' aria-busy='true' aria-label='入室中...' className={styles.loading}>
      <progress className='progress is-primary'></progress>
      <p className='has-text-weight-bold'>入室中...</p>
    </div>
  );
};

export default Loading;
