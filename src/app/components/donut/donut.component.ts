import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css'],
})
export class DonutComponent implements OnInit {
  @Input() heading: String;
  @Input() subhead: String;
  @Input() per: any;
  faCalendar = faCalendar;
 
  constructor() {}

  ngOnInit(): void { 
    if(this.per==''){
      this.per='80';
    }
  }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'My First Dataset',
            data: [this.per],
            backgroundColor: [
              'rgb(180,180,191)',
                          ],
            hoverOffset: 4
          },
        ],
        labels: ['Quater'],
      },
    });
  }
}
