import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';
import { trackByWeekDayHeaderDate } from '../common/util';

@Component({
  selector: 'mwl-calendar-week-view-header',
  template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped"
      let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
      let-dragEnter="dragEnter"
    >
      <div class="cal-day-headers" role="row">
        <div
          class="cal-header"
          *ngFor="let hour of hourColumn; trackBy: trackByWeekDayHeaderDate"
          (mwlClick)="dayHeaderClicked.emit({ day: hour, sourceEvent: $event })"
          mwlDroppable
          dragOverClass="cal-drag-over"
          (drop)="
            eventDropped.emit({
              event: $event.dropData.event,
              newStart: hour.date
            })
          "
          (dragEnter)="dragEnter.emit({ date: hour.date })"
          tabindex="0"
          role="columnheader"
        >
          <b>{{ hour.day }}</b>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        days: days,
        locale: locale,
        dayHeaderClicked: dayHeaderClicked,
        eventDropped: eventDropped,
        dragEnter: dragEnter,
        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate
      }"
    >
    </ng-template>
  `,
})
export class CalendarWeekViewHeaderComponent implements OnInit {
  @Input() days: any[];

  @Input() hourColumn: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() dayHeaderClicked = new EventEmitter<{
    day: WeekDay;
    sourceEvent: MouseEvent;
  }>();

  @Output() eventDropped = new EventEmitter<{
    event: CalendarEvent;
    newStart: Date;
  }>();

  @Output() dragEnter = new EventEmitter<{ date: Date }>();

  trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;

  ngOnInit(): void {
    this.hourColumn = [
      { date: this.days[0].date, day: '08:00' },
      { date: this.days[0].date, day: '09:00' },
      { date: this.days[0].date, day: '10:00' },
      { date: this.days[0].date, day: '11:00' },
      { date: this.days[0].date, day: '12:00' },
      { date: this.days[0].date, day: '13:00' },
      { date: this.days[0].date, day: '14:00' },
      { date: this.days[0].date, day: '15:00' },
      { date: this.days[0].date, day: '16:00' },
      { date: this.days[0].date, day: '17:00' },
      { date: this.days[0].date, day: '18:00' },
      { date: this.days[0].date, day: '19:00' },
    ];
  }
}
