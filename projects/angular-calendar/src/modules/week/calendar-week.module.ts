import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarWeekViewComponent } from './calendar-week-view.component';
import { CalendarCommonModule } from '../common/calendar-common.module';

export {
  CalendarWeekViewComponent,
  CalendarWeekViewEventTimesChangedEvent,
} from './calendar-week-view.component';

@NgModule({
  imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
  declarations: [
    CalendarWeekViewComponent,
  ],
  exports: [
    DragAndDropModule,
    CalendarWeekViewComponent,
  ],
})
export class CalendarWeekModule {}
