import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // ✅ Alerta de éxito
  success(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#198754'
    });
  }

  // ⚠️ Alerta de error
  error(message: string, title: string = 'Error') {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#dc3545'
    });
  }

  // ℹ️ Alerta de información
  info(message: string, title: string = 'Información') {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd'
    });
  }

  // ❓ Confirmación (retorna una promesa)
  confirm(
    title: string,
    message: string,
    confirmText: string = 'Sí',
    cancelText: string = 'Cancelar'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d'
    }).then(result => result.isConfirmed);
  }
}
