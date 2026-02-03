import { inject } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadService } from "./load.service";

export const loadInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  if (!req) {
    return next(req);
  }

  const loader = inject(LoadService)
  loader.show();
  return next(req).pipe(finalize(() => loader.hide()));
}

