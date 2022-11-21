import { WeekDay } from '@angular/common';
import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { EventService } from '../../services/event.service';
import { ResourceService } from '../../services/resource.service';

import {
  CalendarEventTimesChangedEvent,
} from '../common/calendar-event-times-changed-event.interface';

export interface CalendarDayViewEventTimesChangedEvent<
  EventMetaType = any,
  DayMetaType = any
> extends CalendarEventTimesChangedEvent<EventMetaType> {

}

@Component({
  selector: 'mwl-calendar-day-view',
  templateUrl: './mwl-calendar-day-view.html',
})


export class CalendarDayViewComponent implements OnInit {

  todayDate=moment().format('D/M/YYYY');
  events: any[] = [];
  resources : any[] = [];
  timeScale: any[];
  _filterText: string='';
  filteredResources: any[] = [];

  colorGrid : any={
    Type_1:"rgb(232, 180, 69)",
    Type_2:"rgb(218, 111, 30)",
    Type_3:"rgb(215, 76, 209)",
    Type_4:"rgb(122, 106, 245)",
    Type_5:"rgb(98, 83, 214)",
  }


  constructor(private eventService:EventService, private resourceService:ResourceService) { 
  }

  onKey(event) {
     this._filterText = event.target.value;
     this.filteredResources=this.filterResources(this._filterText )
     
    }


  filterResources(filterTerm:string){

    if(filterTerm===''){
      return this.resources
    }else{
      return this.resources.filter(data => data.name.includes(filterTerm))
    }

  }

  assignRelativeEventPosition(startEvent:any,endEvent:any,type:any){
    startEvent=Math.trunc((Number(startEvent.split(' ')[1].split(':')[0])-8)*4+1)
    endEvent=Math.trunc((Number(endEvent.split(' ')[1].split(':')[0])-8)*4+1)

    return {'grid-column-start': (startEvent),'grid-column-end': (endEvent),'background-color':this.colorGrid[type],'color':'white'}
  }

  ngOnInit(): void {
    this.refetchData(this.todayDate); 
    
    this.timeScale = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];
  }

  ngOnChanges(){

    this.refetchData(this.todayDate);
  
  }

  filterType(type:any){
    if (type == "Tous"){
      this.refetchData(this.todayDate);
    }else{
      this.refetchData(this.todayDate,type);
    }   
  }


  refetchData(selectedDate:any,type?:any){  
    this.events = this.eventService.getEvents(selectedDate,type);
    this.resources = this.resourceService.getResources(selectedDate);
    this.filteredResources= this.resourceService.getResources(selectedDate);

  }


}
