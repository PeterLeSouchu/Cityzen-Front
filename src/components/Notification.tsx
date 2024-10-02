import { Slide, ToastContainer } from 'react-toastify';

function Notification() {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
}
export default Notification;
