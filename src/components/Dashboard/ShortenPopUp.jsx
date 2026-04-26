import Modal from '@mui/material/Modal';
import CreateNewShorten from './CreateNewShorten';
import { HiX } from 'react-icons/hi';

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </div>
      </div>
    </Modal>
  );
};

export default ShortenPopUp;