import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { map } from 'rxjs/operators';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public authService: NbAuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    console.log("expectedRole "+expectedRole);
    const tokenPayload = this.authService.getToken().pipe(
        map((token: NbAuthJWTToken) => {
          console.log("token.getPayload()['role']== "+token.getPayload()['role']);
          return token.isValid() ? token.getPayload()['role'] : 'guest';
        }),
      );
  //  console.log( "canActivate->Token = [" + JSON.stringify( this.authService.getToken() ) + "]" );
 //   console.log("tokenPayload['role']  "+ JSON.stringify(tokenPayload) );
    if (
      !this.authService.isAuthenticated() || 
      tokenPayload['role'] !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}