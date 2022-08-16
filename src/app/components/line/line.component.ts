import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {
  faCalendar = faCalendar;
  @Input() heading: String;
  @Input() subhead: String;
  @Input() per: String;
  @Input() prevYear:String;

  constructor() {}

  ngOnInit(): void {
    if(this.per==''){
      this.per='150';
    }
    if(this.prevYear==''){
      this.prevYear='100';
    }
  }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Last Quarter',
            data: [this.per, this.prevYear],
            backgroundColor: 'rgba(234,96,7,0.8)',
            pointBackgroundColor: 'rgb(0,0,0)',
            borderColor: 'rgba(234,96,7,0.8)',
            fill: false,
          },
        ],
        labels: ['2021', '2022'],
      },
    });
  }
}
