import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';



import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( 
    private us: UsuarioService,
    private router: Router,
    
    ){
      
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.us.setToken();
      return this.us
      .isLog()
      .map((e) => {
        if (e) {
          return true;
        }
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return Observable.of(false);
      });
    }
    
  }
  