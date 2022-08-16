import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  socialuser: SocialUser;
  user: any;
  userData: any;

  @Output() signinClick = new EventEmitter();

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialuser = user;
    //   console.log(this.socialuser.email);
    //   this.postSignIn(this.socialuser);
    // });
  }

   postSignIn(socialUser: any) {
    this.authenticateService.getDetails
    (socialUser.email, socialUser.authToken, socialUser.photoUrl)
      .subscribe((data) => {
        this.userData = data;
        if (this.userData.role == 'ROLE_USER' 
            && this.userData.isUser) 
        { this.router.navigate(['main-page']);} 
        else if 
        (this.userData.role == 'ROLE_ADMIN'
            && this.userData.isUser) 
        {
          this.router.navigate(['recruiter-dashboard']);
        } else {
          alert('user not authorised');
          window.location.reload();
        }
      });
  }

  signInWithGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        localStorage.setItem
        ('google_auth', JSON.stringify(data));
      });
    this.socialAuthService.authState.subscribe(
      (user) => {
      this.socialuser = user;

      this.postSignIn(this.socialuser);
    });
    this.signinClick.emit();
  }
}

// onSignIn() {
//   // console.log("srgdg");

//   this.signinClick.emit();
// }

// signInHandler():void{
//   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
//     localStorage.setItem('google_auth',JSON.stringify(data));
//     this.router.navigateByUrl('/dashboard').then();
//   })
// };
