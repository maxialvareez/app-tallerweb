import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  styles: [`
  .container{
    margin: 10px;
  }
`]
})
export class MenuComponent  {

  constructor( private router: Router,
    private authService: AuthService) { }

logout(){
this.router.navigateByUrl('/auth');
this.authService.logout();
}

}
