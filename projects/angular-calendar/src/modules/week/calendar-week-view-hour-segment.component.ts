import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekViewHourSegment } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-week-view-hour-segment',
  template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale"
      let-segmentHeight="segmentHeight"
      let-isTimeLabel="isTimeLabel"
      let-daysInWeek="daysInWeek"
    >
      <div class="cal-hour-segment">
        <div class="cal-time" *ngIf="isTimeLabel">{{ segment.resource }}</div>
      </div>
    </ng-template>

    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale,
        segmentHeight: segmentHeight,
        isTimeLabel: isTimeLabel,
        daysInWeek: daysInWeek
      }"
    >
    </ng-template>
  `,
})
export class CalendarWeekViewHourSegmentComponent {
  @Input() segment: CalendarEvent;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() isTimeLabel: boolean;

  @Input() daysInWeek: number;

  @Input() customTemplate: TemplateRef<any>;
}
