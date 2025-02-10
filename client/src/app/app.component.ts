import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  IsLoggin:any=false;
  // 🔴🔴 temporary commented by ayush
  // roleName: string | null;
  constructor(private authService: AuthService, private router:Router)
  {
    // 🔴🔴 temporary commented by ayush
    // this.IsLoggin=authService.getLoginStatus;
    // this.roleName=authService.getRole;
    // if(this.IsLoggin==false)
    // {
    //   this.router.navigateByUrl('/login'); 
    
    // }
  }
  logout()
{
  this.authService.logout();
  window.location.reload();
}

}
