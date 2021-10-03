import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './user';
import { Router } from '@angular/router';

/**
 * Component class that handles the user login and logout page
 */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userLoginForm: FormGroup;
  public user: User;
  private loginFailed: boolean;
  public loggedIn: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.userService.isLoggedIn();
    this.userLoginForm = this.formBuilder.group(
      {
        userName:['', Validators.required],
        password:['', Validators.required]
      }
    );
  }

  public login(): void{
    this.userService.login(this.userLoginForm.get("userName").value, this.userLoginForm.get("password").value).subscribe(
      data=>{
        this.userService.setUser(data);
        this.loginFailed = false;
        if(this.userService.redirectUrl){
          this.router.navigateByUrl(this.userService.redirectUrl);
        }else{
          this.router.navigate(['welcome/home']);
        }
      }, errorData => {
        console.log("unable to login");
        this.loginFailed = true;
        this.router.navigate(['/login']);
      }
    );
  }

  public logout(): void{
    this.userService.logout();
    this.loggedIn = this.userService.isLoggedIn();
    this.router.navigate(['login']);
  }

}
