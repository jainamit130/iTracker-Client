import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private existingSlotCheck: boolean=false;
  private clickCount: number=0;
  private date: Date;
  private subjectforExistingSlotToggle=new Subject<any>();
  private subjectforClickCheck=new Subject<any>();

  constructor() { }

  toggleExistingSlot(): void {
    this.existingSlotCheck=!this.existingSlotCheck;
    if(this.existingSlotCheck==true){this.clickCount=0;}  
    this.subjectforExistingSlotToggle.next(this.existingSlotCheck);
  }

  increaseClickCount(event){
    if(event.start!=this.date)
    {
      this.clickCount=1;
      this.date=event.start;
    }
    else
      this.clickCount+=1;
    this.subjectforClickCheck.next(this.clickCount);
  }

  onToggle(): Observable<any>{
    return this.subjectforExistingSlotToggle.asObservable();
  }

  onClickCheck():Observable<any>{
    return this.subjectforClickCheck.asObservable();
  }
}


