import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

/**
 * Authentication guard to prevent unautorized access
 */
@Injectable({
    providedIn:"root"
})
export class AuthGuardService implements CanActivate{
    
    constructor(private userService: UserService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(!this.userService.isLoggedIn()){
            this.router.navigate(['login']);
        }
        this.userService.setRedirectUrl(state.url);

        return this.userService.isLoggedIn();
    }
    
}