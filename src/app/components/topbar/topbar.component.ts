import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @Input() name!: string;
  @Input() image!: string;
  @Output() signoutBtn = new EventEmitter();

  public userDetails:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if(storage){
      this.userDetails=JSON.parse(storage);
    }
  }
  signOut() {
   this.signoutBtn.emit();
  }
}
