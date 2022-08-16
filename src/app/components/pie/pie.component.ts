import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Chart } from 'chart.js';
import { GraphstatService } from 'src/app/services/graphstat/graphstat.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit {
  faCalendar = faCalendar;
  @Input() heading: String;
  @Input() subhead: String;
  @Input() per: any;
  @Input() prevMonth:any;
 
  constructor() {}
  // myDate = new Date();
  // startRange:number;
  // endRangeTemp =new Date();
  // endRange:number;

  ngOnInit(): void {
    // this.Graphstatservice.getDetails(this.mailid,
    //   this.startRange.toString(),
    //   this.endRange.toString()
    //   ).subscribe((data2) => {
    //   this.stats = data2;
    
   // });
    if(this.per==''){
      this.per='30';
    }
    if(this.prevMonth==''){
      this.prevMonth='20';
    }
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    const labels = ['Jan', 'Feb'];

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Initial Month',
            data: [this.per, this.prevMonth],
            backgroundColor: ['rgb(180,180,191)', 'rgba(59,125,221,0.5)'],
            borderColor: ['rgb(0, 0, 0)', 'rgb(59, 125, 221,255)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
