import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';
import { EventService } from 'src/app/Services/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Input() resource:any;
  @Input() index:any;
  @Input() date:any;
  @Input() indexQuart:any;
  
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  initialStartDay: any='';
  initialStartHour: any='';
  initialStartQuart: any='';
  initialEndDay: any='';
  initialEndHour: any='';
  initialEndQuart: any='';

  constructor(private eventService:EventService,public activeModal: NgbActiveModal,public appComponent:AppComponent) {

    
  }

  dict=[{
    hour:"08:00",
    index:0,
  },
  {
    hour:"09:00",
    index:1,
  },{
    hour:"10:00",
    index:2,
  },
  {
    hour:"11:00",
    index:3,
  },
  {
    hour:"12:00",
    index:4,
  },
  {
    hour:"13:00",
    index:5,
  },
  {
    hour:"14:00",
    index:6,
  },
  {
    hour:"15:00",
    index:7,
  },
  {
    hour:"16:00",
    index:8,
  },
  {
    hour:"17:00",
    index:9,
  }]

  selectedHour: any='';
  selectedDate: any='';
  selectedQuart: any='';

  dictQuart=[{
    hour:":00",
    index:0,
  },
  {
    hour:":15",
    index:1,
  },{
    hour:":30",
    index:2,
  },
  {
    hour:":45",
    index:3,
  },
  {
    hour:":60",
    index:4,
  },]

  fullEndTime:any='';

  ngOnInit(): void{   

    for(let value of this.dict){

      if(value.index===this.index){
        this.selectedHour=value.hour.toString();         
      }
   }

   for(let value of this.dictQuart){

    if(value.index===this.indexQuart){
      this.selectedQuart=value.hour.toString();         
    }
 }

 this.fullEndTime=moment(this.selectedHour.toString().split(':')+this.selectedQuart, 'h:mm').add(this.appComponent.slotInterval,'minutes').format('HH:mm');

   this.selectedDate=this.date.toString()
   this.initialStartDay= this.selectedDate
   this.initialStartHour= this.selectedHour.split(':')[0]
   this.initialStartQuart= this.selectedQuart



   this.initialEndDay= this.selectedDate
   this.initialEndHour= this.fullEndTime.toString().split(' ')[0].split(':')[0]
   this.initialEndQuart=':'+ this.fullEndTime.toString().split(' ')[0].split(':')[1]




  }

  eventForm = new FormGroup({
    Title: new FormControl(''),
    Resource: new FormControl(),
    eventType: new FormControl(),
    Reccurrent: new FormControl(),
    startEvent: new FormControl(),
    endEvent: new FormControl(),
    startHour: new FormControl(),
    startQuart: new FormControl(),
    endHour: new FormControl(''),
    endQuart: new FormControl(''),
  }); 

  closeCustom() {
    this.activeModal.close();
  }  

  save() {

    
    for(let value of this.dict){

      if(value.index===this.index){
        this.selectedHour=value.hour.toString();         
      }
   }

   for(let value of this.dictQuart){

    if(value.index===this.indexQuart){
      this.selectedQuart=value.hour.toString();         
    }
 }

 this.fullEndTime=moment(this.selectedHour.toString().split(':')+this.selectedQuart, 'h:mm').add(this.appComponent.slotInterval,'minutes').format('HH:mm');

   this.selectedDate=this.date.toString()
   this.initialStartDay= this.selectedDate
   this.initialStartHour= this.selectedHour.split(':')[0]
   this.initialStartQuart= this.selectedQuart



   this.initialEndDay= this.selectedDate
   this.initialEndHour= this.fullEndTime.toString().split(' ')[0].split(':')[0]
   this.initialEndQuart=':'+ this.fullEndTime.toString().split(' ')[0].split(':')[1]
    this.eventService.create((JSON.stringify(this.eventForm.value)));  
    this.passEntry.emit({ data: this.eventService.getEvents() , res:200  });  
    this.activeModal.close();
  }


}
