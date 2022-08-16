import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { InterviewerDetailsService } from 'src/app/services/interviewer-details/interviewer-details.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(private socialAuthService : SocialAuthService,private router:Router,private interviwerDetailsService: InterviewerDetailsService) { }
  panelDetails: any;
  public userDetails:any;
  mailid='';

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.userDetails=JSON.parse(storage);
    }
    this.mailid=this.userDetails.email;
    this.interviwerDetailsService
      .getPanelDetails(this.mailid)
      .subscribe((panelDetails) => {
        this.panelDetails = panelDetails;
      });
  }

 
  onLogout(){
    this.socialAuthService.signOut();
    setTimeout(() => {
      this.router.navigate(['signin']);
    }, 500);
  }
}
  