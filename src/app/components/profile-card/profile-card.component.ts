import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterviewerDetailsService } from '../../services/interviewer-details/interviewer-details.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
 userDetails:any;
@Input() panelDetails :any
  constructor
  (private interviwerDetailsService: InterviewerDetailsService)
  {}

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.userDetails=JSON.parse(storage);
    }
  }
}
