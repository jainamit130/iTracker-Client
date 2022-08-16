import { Component, OnInit,Input } from '@angular/core';

import { InterviewerDetailsService } from '../../services/interviewer-details/interviewer-details.service';

@Component({
  selector: 'app-skill-box',
  templateUrl: './skill-box.component.html',
  styleUrls: ['./skill-box.component.css'],
})
export class SkillBoxComponent implements OnInit {
  //panelDetails!: any;
  @Input() panelDetails:any;
  // mailid = 'bhavika.solanki@accolitedigital.com';
  public userDetails:any;
  mailid='';

  constructor(private interviwerDetailsService: InterviewerDetailsService) {}

  ngOnInit(): void {
    // const storage = localStorage.getItem('google_auth');
    // if(storage){
    //   this.userDetails=JSON.parse(storage);
    // }
    // this.mailid=this.userDetails.email;
    // this.interviwerDetailsService
    //   .getPanelDetails(this.mailid)
    //   .subscribe((panelDetails) => (this.panelDetails = panelDetails));
  }
}
