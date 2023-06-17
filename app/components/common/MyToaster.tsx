import { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

const MyToaster: NextPage = () => {
  return (
    <Toaster
      toastOptions={{
        loading: { className: 'border border-purple-600' },
        success: { className: 'border border-lime-500' },
        error: { className: 'border border-red-600' },
      }}
    />
  );
};

export default MyToaster;