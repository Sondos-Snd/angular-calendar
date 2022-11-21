import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  fullEvents=[
    {
      title: 'Client X',
      startEvent: '16/11/2022 08:00',
      endEvent:
        '16/11/2022 10:15',
      resourceId: 1,
      ressName:"Ress 1",
      type:'Type_5'
    },
    {
      title: 'Client Y',
      startEvent: '16/11/2022 08:00',
      endEvent:
        '16/11/2022 10:00',
      resourceId: 2,
      ressName:"Ress 2",
      type:'Type_1'
    },
    {
      title: 'Pause déjenuer',
      startEvent: '16/11/2022 10:30',
      endEvent:
        '16/11/2022 15:15',
      resourceId: 2,
      ressName:"Ress 2",
      type:'Type_2'
    },
    {
      title: 'Réunion',
      startEvent: '16/11/2022 16:30',
      endEvent:
        '16/11/2022 18:15',
      resourceId: 2,
      ressName:"Ress 2",
      type:'Type_3'
    },
    {
      title: '1ére activité',
      startEvent: '16/11/2022 14:00',
      endEvent:
        '16/11/2022 16:45',
      resourceId: 4,
      ressName:"Ress 4",
      type:'Type_2'
    },
    {
      title: 'Client Z',
      startEvent: '16/11/2022 17:30',
      endEvent:
        '16/11/2022 20:00',
      resourceId: 4,
      ressName:"Ress 4",
      type:'Type_3'
    },
    {
      title: 'Autre',
      startEvent: '16/11/2022 19:00',
      endEvent:
        '16/11/2022 20:00',
      resourceId: 4,
      ressName:"Ress 4",
      type:'Type_4'
    },
    {
      title: 'Activité externe',
      startEvent: '16/11/2022 08:00',
      endEvent:
        '16/11/2022 20:00',
      resourceId: 5,
      ressName:"Ress 5",
      type:'Type_5'
    },
    {
      title: 'Activité externe',
      startEvent: '16/11/2022 10:45',
      endEvent:
        '16/11/2022 17:45',
      resourceId: 7,
      ressName:"Ress 7",
      type:'Type_4'
    },
    {
      title: 'Autre activité',
      startEvent: '16/11/2022 17:45',
      endEvent:
        '16/11/2022 20:00',
      resourceId: 7,
      ressName:"Ress 7",
      type:'Type_2'
    },
    {
      title: 'Demo',
      startEvent: '16/11/2022 16:30',
      endEvent:
        '16/11/2022 17:00',
      resourceId: 6,
      ressName:"Ress 6",
      type:'Type_2'
    },
  ];


  public getEvents(selectedDate?:any,type?:any) { 

    if(type){
      return this.fullEvents.filter(data => data.type.includes(type.split(' ')[1]));
    }else{
      return this.fullEvents;
    }
      
  }




}