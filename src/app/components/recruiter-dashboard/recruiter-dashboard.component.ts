import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { recruiterdata } from 'src/app/recruiterdata';
import { Router } from '@angular/router';
import { RecruiterdetailsService } from 'src/app/services/recruiterdetails/recruiterdetails.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css'],
  providers: [DatePipe],
})
export class RecruiterDashboardComponent implements OnInit {
  ELEMENT_DATA!: recruiterdata[];
  displayedColumns: string[] = [
    'startDate',
    'endDate',
    'email',
    'skill',
    'round',
    'startTime',
    'endTime',
  ];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSourceWithPageSize = new MatTableDataSource(this.ELEMENT_DATA);
  skillFilter = null;
  roundFilter = null;
  p = 1;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  rangeStart =new FormControl();
  rangeEnd =new FormControl();

  todayDate = new Date();
  previousDate = new Date();
  currDate: number;
  yesterday: number;

  otherdate: any;
  dataLoadMsg: any;
  tableDiv: any;
  constructor(
    private recruiterdetailservice: RecruiterdetailsService,
    private datePipe: DatePipe,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.currDate = this.todayDate.getTime();
    this.previousDate.setDate(this.todayDate.getDate() - 1);
    this.yesterday = this.previousDate.getTime();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.recruiterdetailservice
      .getDetails(
        this.yesterday.toString(),
        this.currDate.toString(),
        this.skillFilter,
        this.roundFilter
      )
      .subscribe((tabledata) => {
        this.ELEMENT_DATA = tabledata;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataLoadMsg = document.getElementById("alert").setAttribute("style", "display:block;");
        // this.range.value.start = this.yesterday;
        // this.range.value.end = this.currDate;

        if(tabledata.length==0){
          document.getElementById("noDataMsg").setAttribute("style", "display:block;");
          document.getElementById("tableDiv").setAttribute("style", "display:none;");
        }
        else{
          document.getElementById("noDataMsg").setAttribute("style", "display:none;");
          document.getElementById("tableDiv").setAttribute("style", "display:block;");
        }
      });
  }

  onLogout(){
    this.socialAuthService.signOut();
    setTimeout(() => {
      this.router.navigate(['signin']);
    }, 500);
  }
  
  refreshTable() {
    this.dataLoadMsg = document.getElementById("alert").setAttribute("style", "display:none;");
    
    this.yesterday = this.range.value.start;
    this.currDate = this.range.value.end;

    if(this.yesterday == null && this.currDate== null && this.skillFilter==null && this.roundFilter==null){
      alert("Please select atleast one filter");
      return;
    }
        
    if(this.yesterday == null && this.currDate== null){
      this.currDate = this.todayDate.getTime();
      this.previousDate.setDate(this.todayDate.getDate() - 1);
      this.yesterday = this.previousDate.getTime();
      this.dataLoadMsg = document.getElementById("alert").setAttribute("style", "display:block;");
    }
    else if(this.yesterday == null && this.currDate !== null){
      alert("Please Enter the start Date");
      return;
    }
    else if(this.yesterday !== null && this.currDate == null){
      alert("Please Enter the End Date");
      return;
    }
    else{      
      this.yesterday = this.range.value.start.getTime();
      this.currDate = this.range.value.end.getTime();
    }
      
    this.recruiterdetailservice
      .getDetails(
        this.yesterday.toString(),
        this.currDate.toString(),
        this.skillFilter,
        this.roundFilter
      )
      .subscribe((tabledata) => {
        this.ELEMENT_DATA = tabledata;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;        
        
        if(tabledata.length == 0){
          document.getElementById("noDataMsg").setAttribute("style", "display:block;");
          document.getElementById("tableDiv").setAttribute("style", "display:none;");
        }
        else{
          document.getElementById("noDataMsg").setAttribute("style", "display:none;");
          document.getElementById("tableDiv").setAttribute("style", "display:block;");
        }
      });
  }
}
