import Swal from 'sweetalert2';
import '@/styles/layout/sweetalert.scss';

const defaultConfig = {
  color: '#fff',
  background: '#212121',
  confirmButtonColor: '#b50205',
  confirmButtonText: '확인',
  customClass: {
    icon: 'swal2-icon',
    title: 'swal2-title',
    htmlContainer: 'swal2-text',
    popup: 'swal2-width',
    confirmButton: 'swal2-btn-confirm',
  },
};

export function sweetBasic(title, content) {
  Swal.fire({
    ...defaultConfig,
    title,
    html: content.html || content,
  });
}

export function sweetError(title, content) {
  Swal.fire({
    ...defaultConfig,
    title,
    icon: 'error',
    html: content.html || content,
  });
}

export function sweetConfirm(title, content, confirmText, cancelText = '취소') {
  return Swal.fire({
    ...defaultConfig,
    title,
    icon: 'warning',
    html: content.html || content,
    showCancelButton: true,
    cancelButtonColor: '#404040',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      icon: 'swal2-icon',
      title: 'swal2-title',
      htmlContainer: 'swal2-text',
      popup: 'swal2-width',
      confirmButton: 'swal2-btn-confirm',
      cancelButton: 'swal2-btn-cancel',
    },
  });
}

export function sweetToast(icon, title) {
  Swal.fire({
    ...defaultConfig,
    icon,
    title,
    toast: true,
    // iconColor: '#b50205',
    position: 'center-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      icon: 'swal2-icon',
      title: 'swal2-title',
      popup: 'swal2-toast-width',
      timerProgressBar: 'swal2-toast-progressBar',
    },
  });
}
