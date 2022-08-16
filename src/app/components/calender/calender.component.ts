import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  Input,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

import { SlotsService } from '../../services/slots/slots.service';

import { InterviewerDetailsService } from '../../services/interviewer-details/interviewer-details.service';

import { SlotData } from 'src/app/services/SlotDetails';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { SelectContainerComponent } from 'ngx-drag-to-select';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: 'black';
        padding: 15px;
      }
    `,
  ],
})
export class CalenderComponent implements OnInit {
  @Input() panelDetails: any;
  @ViewChild('content', { static: true }) content:
    | TemplateRef<any>
    | undefined;
    @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
  selectedValue: string = null;
  selectedRoundValue: string = null;
  checked: Boolean = false;
  selectedRecurringType: boolean = false;

  constructor(
    private modal: NgbModal,
    private slotService: SlotsService,
    private modalAnother: NgbModal,
    private subjectService: SubjectService,
    private InterviewerDetailsService: InterviewerDetailsService
  ) {}

  open(content: any) {
    this.addResponse = null;
    this.modalAnother.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  @ViewChild('modalContent', { static: true }) modalContent:
    | TemplateRef<any>
    | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  endDate: Date; // stores the end date

  pickedDate: Date; // stores the selected start date

  rangeDate: any = null;

  subscriptionForExistingSlot: Subscription;
  existingSlotCheck: boolean=false;

  subscriptionForClickCheck: Subscription;
  clickCount: number=0;

  slotData: any;

  selectedEvents: any;

  responseText: string = ' ';

  modalData:
    | {
        action: string;
        event: CalendarEvent;
      }
    | undefined;

  today = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = []; // this will be fed to the calendar view

  activeDayIsOpen: boolean = true;

  // mailid = 'bhavika.solanki@accolitedigital.com'; // will get this email when user sign in:
  public userDetails: any;
  mailid = '';

  updateFailCheck:boolean=false;

  update: boolean = false;
  id: number;

  addResponse = 0;
  deleteResponse = 0;
  monthbtn = 'btn btn-primary';
  weekbtn = 'btn btn-light';
  daybtn = 'btn btn-light';

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');
    if (storage) {
      this.userDetails = JSON.parse(storage);
    }
    this.mailid = this.userDetails.email;
    this.showSlots();

    this.subscriptionForExistingSlot=this.subjectService
    .onToggle()
    .subscribe((value)=>this.existingSlotCheck=value)

    this.subscriptionForExistingSlot=this.subjectService
    .onClickCheck()
    .subscribe((value)=>this.clickCount=value)
  }

  test(event,content,origin){
    if(origin==1){ 
      this.pickedDate=event.day.date;
      this.pickedDate.setHours(12);
      this.rangeDate={
        from:this.pickedDate,
        to:new Date(this.pickedDate.getTime()+604800000),
      }
    }
    if(origin==2){
      this.pickedDate=event.date;
      this.rangeDate={
        from:this.pickedDate,
        to:new Date(this.pickedDate.getTime()+604800000),
      }
    }
    this.selectedValue="";
    this.selectedRoundValue="";
    this.selectedRecurringType=false;
    this.update=false;
    this.open(content);
    this.subjectService.toggleExistingSlot();
  }

  dayClicked(event,target){
    this.selectedEvents = [];
    for (const i in event) {
      if(event[i].id!=undefined)
      this.selectedEvents = [this.getSlotDataById(event[i].id)];
    }
    setTimeout(()=>{ this.scroll(target); }, 4)
}

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  dateClicked({events }: {events: CalendarEvent[] },content,target): void {
    this.selectedEvents = [];
    for (const i in events) {
      this.selectedEvents = [
        ...this.selectedEvents,
        this.getSlotDataById(events[i].id),
      ];
    }
    if(this.selectedEvents.length==0)
      this.subjectService.toggleExistingSlot();
    else{
      this.scroll(target);
      this.subjectService.increaseClickCount(events[0]);
    }
    if(this.clickCount>1 && !this.existingSlotCheck){
      this.pickedDate=events[0].start;
      this.selectedValue="";
      this.selectedRoundValue="";
      this.selectedRecurringType=false;
      this.rangeDate={
        from:this.pickedDate,
        to:new Date(this.pickedDate.getTime()+604800000),
      }
      this.open(content);
    }
  }
  monthClick() {
    this.monthbtn = 'btn btn-primary';
    this.weekbtn = 'btn btn-light';
    this.daybtn = 'btn btn-light';
  }
  weekClick() {
    this.monthbtn = 'btn btn-light';
    this.weekbtn = 'btn btn-primary';
    this.daybtn = 'btn btn-light';
  }
  dayClick() {
    this.monthbtn = 'btn btn-light';
    this.weekbtn = 'btn btn-light';
    this.daybtn = 'btn btn-primary';
  }
  getSlotDataById(id: any): SlotData {
    const slot = this.slotData.find((slot) => slot.id === id);
    return slot;
  }

  addEvent(): void {
    if(this.rangeDate!=null)
    this.endDate=this.rangeDate.to;
    if (this.selectedRecurringType) {
      if (
        !(this.pickedDate.getTime() < this.today.getTime() + 1209600000 ||
        this.pickedDate.getTime() > this.today.getTime() + 3839400000
        || (this.checked == true &&
          this.endDate.getTime() > this.today.getTime() + 3839400000))
      )
      this.loadingSwalView("Adding Slots!");
      this.pickedDate = this.rangeDate.from;
      this.endDate = this.rangeDate.to;
    }
    if (this.pickedDate == null) {
      alert('Select the Date & Time');
    } else if (this.selectedRoundValue == '' || this.selectedValue == '') {
      alert('Select proper skill & round');
    }
    else if (
      this.pickedDate.getTime() < this.today.getTime() + 1209600000 ||
      this.pickedDate.getTime() > this.today.getTime() + 3839400000
      || (this.checked == true &&
        this.endDate.getTime() > this.today.getTime() + 3839400000)
    )
     {
      Swal.fire(
        'Slot Not Added!',
        'you can schedule slots only after 2 weeks Or before 1 month',
        'error');
      this.updateFailCheck=true;
    } 
   else {
        if(this.endDate==null){
          this.endDate=new Date(this.pickedDate);
          this.endDate.setTime(this.pickedDate.getTime()+3600000);
        }
        this.addingSlots(this.pickedDate, this.endDate);
        this.pickedDate = null;
        this.endDate = null;
        this.rangeDate = null;
        this.selectedEvents = null;
        this.selectedRoundValue = null;
        this.checked = false;
        this.selectedRecurringType = false;
    }
  }

  updateForm(slotToUpdate: SlotData) {
    this.update = true;
    this.id = slotToUpdate.id;
    this.selectedRoundValue = slotToUpdate.round;
    this.selectedValue = slotToUpdate.skill;
    this.selectedRecurringType = false;
    this.rangeDate=null;
    this.pickedDate = new Date(slotToUpdate.startDate);
  }

  updateEvent(endDateDragged?) {
    if (this.pickedDate == null) alert('Select the Date & Time');
    else if (this.selectedRoundValue == '' || this.selectedValue == '')
      alert('Select proper skill & round');
    else if (
      this.pickedDate.getTime() < this.today.getTime() + 1209600000 ||
      this.pickedDate.getTime() > this.today.getTime() + 3839400000
    ){
      if(this.pickedDate.getTime() < this.today.getTime() )
      Swal.fire(
        'Slot Not Updated!',
        'Sorry! past cannot be changed',
        'error'
        );
        else
        Swal.fire(
          'Slot Not Updated!',
          'Sorry! Slots for the next 15 days from today cannot be changed',
          'error'
          );
        this.updateFailCheck=true;
    }
    else if(endDateDragged!=undefined){
      const newUpatedSlot: SlotData = {
        id: this.id,
        email: this.panelDetails.email,
        skill: this.selectedValue,
        round: this.selectedRoundValue,
        startDate: this.pickedDate.getTime(),
        endDate: endDateDragged.getTime(),
        recurringType: this.selectedRecurringType,
      };
  
      var index = -1;
      this.slotData.forEach((slot, key) => {
        if (slot.id === newUpatedSlot.id) index = key;
      });

      this.loadingSwalView("Updating Slot!");
  
      this.slotService.updateSlot(newUpatedSlot).subscribe(
        (newUpatedSlot) => {
          this.slotData.splice(index, 1, newUpatedSlot);
  
          this.selectedEvents = null;
  
          this.addResponse = newUpatedSlot.status;
          if (newUpatedSlot.status == -1) {
            this.responseText =
              'SLOT NOT Updated \n SLOT TIME COINCIDES' + newUpatedSlot.status;
            Swal.fire(
              'Slot not Updated!',
              '2 Slots should not overlap',
              'error'
            );
          } else {
            this.responseText = 'SLOT Updated' + newUpatedSlot.status;
            Swal.fire(
              'Slot Updated!',
              'Successfully',
              'success'
            )
          }
          this.showSlots();
        },
        (error) => {
          this.responseText = 'NOT FOUND: ' + error.status;
          Swal.fire('NOT FOUND: ' + error.status);
        }
      );
    }
    else{
    const newUpatedSlot: SlotData = {
      id: this.id,
      email: this.panelDetails.email,
      skill: this.selectedValue,
      round: this.selectedRoundValue,
      startDate: this.pickedDate.getTime(),
      endDate: this.pickedDate.getTime() + 3600000,
      recurringType: this.selectedRecurringType,
    };

    var index = -1;
    this.slotData.forEach((slot, key) => {
      if (slot.id === newUpatedSlot.id) index = key;
    });

    this.loadingSwalView("Updating Slot!");

    this.slotService.updateSlot(newUpatedSlot).subscribe(
      (newUpatedSlot) => {
        this.slotData.splice(index, 1, newUpatedSlot);

        this.selectedEvents = null;

        this.addResponse = newUpatedSlot.status;
        if (newUpatedSlot.status == -1) {
          this.responseText =
            'SLOT NOT Updated \n SLOT TIME COINCIDES' + newUpatedSlot.status;
          Swal.fire(
            'Slot not Updated \n Already Have a Slot Scheduled on Selected Time'
          );
        } else {
          this.responseText = 'SLOT Updated' + newUpatedSlot.status;
          Swal.fire(
            'Slot Updated!',
            'Successfully',
            'success'
            );
        }
        this.showSlots();
      },
      (error) => {
        this.responseText = 'NOT FOUND: ' + error.status;
        Swal.fire('NOT FOUND: ' + error.status);
      }
    );
    }

    this.endDate = null;
    this.pickedDate = null;
    this.selectedValue = '';
    this.selectedRoundValue = '';
    this.checked = false;
    this.selectedRecurringType = false;
    this.update=false
  }

  clearText() {
    this.responseText = '';
  }

  addingSlots(start: Date, end: Date): void {
    const newSlotData = {
      email: this.panelDetails.email,
      skill: this.selectedValue,
      round: this.selectedRoundValue,
      startDate: start.getTime(),
      endDate: end.getTime(),
      recurringType: this.selectedRecurringType,
    };
    if(!this.selectedRecurringType)
      this.loadingSwalView("Adding Slot!");
    this.slotService.addSlot(newSlotData).subscribe(
      (newSlotData) => {
        this.slotData = [...this.slotData, newSlotData];

        this.addResponse = newSlotData.status;
        if (newSlotData.status == -1) {
          this.responseText =
            'SLOT NOT ADDED \n SLOT TIME COINCIDES' + newSlotData.status;
            Swal.fire(
              'Slot Not Added!',
              '2 Slots should not overlap',
              'error');
        } else {
          this.responseText = 'SLOT ADDED' + newSlotData.status;
          Swal.fire(
            'Slot Added',
            'successfully',
            'success');
        }

        this.showSlots();
      },
      (error) => {
        // this.addResponse = 'Slot Not Added';
        this.responseText = 'NOT FOUND: ' + error.status;

        // alert('NOT FOUND: ' + error.status);
        Swal.fire('NOT FOUND: ' + error.status);
      }
    );
  }

  loadingSwalView(title:string){
    Swal.fire({
      title: title,
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    
  }

  showSlots(): void {
    this.slotService.getSlot(this.mailid).subscribe(
      (slots) => {
        this.slotData = slots;
        this.events = this.getEvent(this.slotData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEvent(slotData: SlotData[]): CalendarEvent[] {
    let event: CalendarEvent[] = [];
    for (const i in slotData) {
      event = [
        ...event,
        {
          id: this.slotData[i].id,
          draggable: true,
          actions: [
            {
              label: '<dts-select-container #container="dts-select-container" [(selectedItems)]="events" (select)="showSelectedItems(events)"><dts-select-container>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.selectedEvents = [this.getSlotDataById(this.slotData[i].id)];
              },
            },
            {
              label: '<i class="fas fa-fw fa-trash-alt"></i>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.selectedEvents = [this.getSlotDataById(this.slotData[i].id)];
                if(this.slotData[i].startDate < this.today.getTime() )
                {
                  Swal.fire(
                    'Slot Cannot be deleted!',
                    'Sorry! past cannot be changed',
                    'error'
                    );
                }
                else{
                  this.events = this.events.filter((iEvent) => iEvent !== event);
                  this.deleteEvent(this.slotData[i]);
                }
              },
            },
              {
                label: '<i class="fas fa-fw fa-pencil-alt"></i>',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                  this.open(this.content); 
                  this.updateForm(slotData[i]);
                },
              },
          ],
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          title: `Skill: ${slotData[i].skill}<br>Round: ${slotData[i].round}`,
          start: new Date(slotData[i].startDate),
          end: new Date(slotData[i].endDate),
        }
      ];
    }
    return event;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let copyStartDate=event.start;
    let copyEndDate=event.end;

    event.start = newStart;
    event.end = newEnd;

    var slotData:SlotData={
      id:Number(event.id),
      email:this.panelDetails.email,
      startDate:newStart.getTime(),
      endDate:newEnd.getTime(),
      skill:event.title.slice(7,event.title.length-13),
      round:event.title.slice(event.title.length-2,event.title.length),
      recurringType:false
    }
    this.updateForm(slotData);
    this.updateEvent(newEnd);
    if(this.updateFailCheck==true)
    {
    event.start = copyStartDate;
    event.end = copyEndDate;
    this.updateFailCheck=false;
    }
    this.refresh.next();
  }

  deleteEvent(slotToDelete: SlotData) {
    if(slotToDelete.startDate < this.today.getTime() )
    {
      Swal.fire(
        'Slot Cannot be deleted!',
        'Sorry! past cannot be changed',
        'error'
        );
    }
    else{
      this.loadingSwalView("Deleting Slot!");
      this.slotService.deleteSlot(slotToDelete).subscribe(
        () => {
          this.selectedEvents = this.selectedEvents.filter(
            (slot) => slot != slotToDelete
          );
          Swal.fire(
            'Slot Deleted!',
            'Successfully',
            'success'
          );
          this.slotData = this.slotData.filter((slot) => slot != slotToDelete);
  
          this.events = this.getEvent(this.slotData);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }            
  }

  setView(view: CalendarView) {
    this.selectedEvents=[];
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.selectedEvents=[];
    this.activeDayIsOpen = false;
  }
}
