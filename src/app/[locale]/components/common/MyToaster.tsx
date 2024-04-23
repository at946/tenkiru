import type { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

const MyToaster: NextPage = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'border-2 border-gray-500',
        duration: 3000,
        success: { className: 'border-2 border-green-500' },
        error: { className: 'border-2 border-red-500', duration: 5000 },
      }}
    />
  );
};

export default MyToaster;
