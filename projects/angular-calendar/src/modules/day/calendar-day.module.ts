import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarDayViewComponent } from './calendar-day-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';

export {
  CalendarDayViewComponent,
  CalendarDayViewEventTimesChangedEvent,
} from './calendar-day-view.component';


@NgModule({
  imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
  declarations: [
    CalendarDayViewComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarDayViewComponent,
  ],
})
export class CalendarDayModule {

  
  
}
