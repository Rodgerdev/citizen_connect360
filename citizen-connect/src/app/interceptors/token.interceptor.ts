import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpInterceptorFn } from "@angular/common/http";
import { Observable } from "rxjs";

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    console.log('Intercepted Request:', req);

    if (req.url === 'http://localhost:3000/auth/login' || req.url === 'http://localhost:3000/auth/register') {
        return next(req);
    } else {
        const token = localStorage.getItem('auth-token') as string;
        console.log('Token from localStorage:', token);

        if (token) {
            const modifiedRequest = req.clone({ headers: new HttpHeaders().append('Authorization', `Bearer ${token}`) });
            console.log('Modified Request with Token:', modifiedRequest);
            return next(modifiedRequest);
        } else {
            console.log('No token found, proceeding without attaching token');
            return next(req);
        }
    }
}
