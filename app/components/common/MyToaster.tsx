import { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

const MyToaster: NextPage = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'border-2 border-purple-600',
        success: { className: 'border-2 border-lime-500' },
        error: { className: 'border-2 border-red-600' },
      }}
    />
  );
};

export default MyToaster;
