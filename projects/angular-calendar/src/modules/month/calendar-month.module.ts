import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarMonthViewComponent } from './calendar-month-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';

export {
  CalendarMonthViewComponent,
  CalendarMonthViewEventTimesChangedEvent,
} from './calendar-month-view.component';
// export { MonthViewDay as CalendarMonthViewDay } from 'calendar-utils';

@NgModule({
  imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
  declarations: [
    CalendarMonthViewComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarMonthViewComponent,
  ],
})
export class CalendarMonthModule {}
