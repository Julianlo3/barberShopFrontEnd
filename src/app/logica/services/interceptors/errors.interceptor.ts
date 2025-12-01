import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const microservicio = (() => {
    if (req.url.includes('/api/barberia')) return 'Microservicio Barbería';
    if (req.url.includes('/api/auth')) return 'Microservicio Autenticación';
    if (req.url.includes('/api/usuarios')) return 'Microservicio Usuarios';
    if (req.url.includes('/api/agendamiento')) return 'Microservicio Agendamiento';
    if (req.url.includes('/servicios')) return 'Microservicio Servicios';
    return 'Microservicio desconocido';
  })();

  return next(req).pipe(
    catchError((error) => {

      console.error(`❌ Error en: ${microservicio}`);
      console.error(`Código: ${error.status}`);

      if (error.status === 0) {
        console.error(`🚫 ${microservicio} NO responde (servidor caído).`);
      }
      if (error.status === 500) {
        console.error(`🔥 Error interno en ${microservicio}.`);
      }
      if (error.status === 503) {
        console.error(`⚠️ ${microservicio} no disponible.`);
      }

      return throwError(() => error);
    })
  );
};
