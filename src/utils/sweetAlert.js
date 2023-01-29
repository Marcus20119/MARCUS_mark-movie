import Swal from 'sweetalert2';

export function loadingAlert() {
  Swal.fire({
    title: 'Loading...',
    text: 'Please wait',
    imageUrl: '/imgs/loading-gif.gif',
    imageHeight: '60px',
    showConfirmButton: false,
    allowOutsideClick: false,
    scrollbarPadding: false,
  });
}

export function successAlert({ title = '', text = '' }) {
  return new Promise(async resolve => {
    try {
      await Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        scrollbarPadding: false,
        confirmButtonColor: '#FF3D71',
      });
      resolve();
    } catch (err) {
      console.log(err);
    }
  });
}
export function neededSignInAlert(handleShowModelLogIn = () => {}) {
  Swal.fire({
    title: 'Sign In is needed!',
    text: 'You need to sign in to do this action!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FF3D71',
    cancelButtonColor: '#cccccc30',
    confirmButtonText: 'Sign In!',
    scrollbarPadding: false,
  }).then(async result => {
    if (result.isConfirmed) {
      handleShowModelLogIn();
    }
  });
}
