import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    
  }

  canActivate(): any {
    if (!this._adminService.isAuthenticated(['Administrador','Auxiliar'])) {
      this._router.navigate(['/autenticacion']);
      return false;
    } else return true;
  }
  
}
