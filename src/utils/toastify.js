import { toast } from 'react-toastify';

/**
 * @param {string} message
 */

export function successToast(message) {
  toast.success(message, {
    autoClose: 400,
    delay: 100,
    hideProgressBar: true,
  });
}
export function warningToast(message) {
  toast.warning(message, {
    autoClose: 400,
    delay: 100,
    hideProgressBar: true,
  });
}
export function errorToast(message) {
  toast.error(message, {
    autoClose: 400,
    delay: 100,
    hideProgressBar: true,
  });
}
