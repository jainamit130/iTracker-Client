import { Component, Input, OnInit } from '@angular/core';
import { GraphstatService } from 'src/app/services/graphstat/graphstat.service';
import { InterviewerDetailsService } from '../../services/interviewer-details/interviewer-details.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: ['./stat-box.component.css'],
  providers: [DatePipe]
})
export class StatBoxComponent implements OnInit {
  //panelDetails!: Interviewer;
  @Input() panelDetails :any;
  stats: any;
  statsYear:any;
  myDate = new Date();
  startRange:number;
  endRangeTemp =new Date();
  endRange:number;

  // ----- Previous Year---//
  startRangeYear:number;
  endRangeYear:number;
  endRangeTempYear =new Date();



  // mailid = 'bhavika.solanki@accolitedigital.com';
  prevMonth:any;
  prevYear:any;

  public userDetails:any;
  mailid='';

  constructor(
    private interviewerDetailsService: InterviewerDetailsService,
    private Graphstatservice: GraphstatService,
    private datePipe: DatePipe
  ) {

    // this.startRange = this.myDate.getTime();

    //       // ----- Previous Month---//

    // this.endRangeTemp.setDate(this.myDate.getDate() - 30);
    // this.endRange = this.endRangeTemp.getTime();

    //   // ----- Previous Year---//
    
    //   this.endRangeTempYear.setDate(this.myDate.getDate() - 365);
    //   this.endRangeYear = this.endRangeTempYear.getTime();

    }

    ngOnInit(): void {

      const n=""+this.startRange;
      const storage = localStorage.getItem('google_auth');
      if(storage){
        this.userDetails=JSON.parse(storage);
      }
       this.mailid=this.userDetails.email;
      
  
      this.Graphstatservice.getDetails(this.mailid).subscribe((data2) => {
        this.stats = data2;
      
      });
  
     
    }
}
