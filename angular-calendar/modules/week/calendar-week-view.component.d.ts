import { EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WeekDay, CalendarEvent, WeekViewAllDayEvent, WeekView, WeekViewHourColumn, WeekViewTimeEvent, WeekViewHourSegment, WeekViewHour, WeekViewAllDayEventRow } from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import { CalendarEventTimesChangedEvent } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { DateAdapter } from '../../date-adapters/date-adapter';
import { DragEndEvent, DropEvent, DragMoveEvent, ValidateDrag } from 'angular-draggable-droppable';
import { PlacementArray } from 'positioning';
import * as i0 from "@angular/core";
export interface WeekViewAllDayEventResize {
    originalOffset: number;
    originalSpan: number;
    edge: string;
}
export interface CalendarWeekViewBeforeRenderEvent extends WeekView {
    header: WeekDay[];
}
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
export declare class CalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    protected cdr: ChangeDetectorRef;
    protected utils: CalendarUtils;
    protected dateAdapter: DateAdapter;
    protected element: ElementRef<HTMLElement>;
    /**
     * The current view date
     */
    viewDate: Date;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     */
    events: CalendarEvent[];
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     */
    excludeDays: number[];
    /**
     * An observable that when emitted on will re-render the current view
     */
    refresh: Subject<any>;
    /**
     * The locale used to format dates
     */
    locale: string;
    /**
     * The placement of the event tooltip
     */
    tooltipPlacement: PlacementArray;
    /**
     * A custom template to use for the event tooltips
     */
    tooltipTemplate: TemplateRef<any>;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     */
    tooltipAppendToBody: boolean;
    /**
     * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
     * will be displayed immediately.
     */
    tooltipDelay: number | null;
    /**
     * The start number of the week.
     * This is ignored when the `daysInWeek` input is also set as the `viewDate` will be used as the start of the week instead.
     * Note, you should also pass this to the calendar title pipe so it shows the same days: {{ viewDate | calendarDate:(view + 'ViewTitle'):locale:weekStartsOn }}
     * If using the moment date adapter this option won't do anything and you'll need to set it globally like so:
     * ```
     * moment.updateLocale('en', {
     *   week: {
     *     dow: 1, // set start of week to monday instead
     *     doy: 0,
     *   },
     * });
     * ```
     */
    weekStartsOn: number;
    /**
     * A custom template to use to replace the header
     */
    headerTemplate: TemplateRef<any>;
    /**
     * A custom template to use for week view events
     */
    eventTemplate: TemplateRef<any>;
    /**
     * A custom template to use for event titles
     */
    eventTitleTemplate: TemplateRef<any>;
    /**
     * A custom template to use for event actions
     */
    eventActionsTemplate: TemplateRef<any>;
    /**
     * The precision to display events.
     * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
     */
    precision: 'days' | 'minutes';
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
     */
    weekendDays: number[];
    /**
     * Whether to snap events to a grid when dragging
     */
    snapDraggedEvents: boolean;
    /**
     * The number of segments in an hour. Must divide equally into 60.
     */
    hourSegments: number;
    /**
     * The duration of each segment group in minutes
     */
    hourDuration: number;
    /**
     * The height in pixels of each hour segment
     */
    hourSegmentHeight: number;
    /**
     * The minimum height in pixels of each event
     */
    minimumEventHeight: number;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     */
    dayStartHour: number;
    /**
     * The day start minutes. Must be 0-59
     */
    dayStartMinute: number;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     */
    dayEndHour: number;
    /**
     * The day end minutes. Must be 0-59
     */
    dayEndMinute: number;
    /**
     * A custom template to use to replace the hour segment
     */
    hourSegmentTemplate: TemplateRef<any>;
    /**
     * The grid size to snap resizing and dragging of hourly events to
     */
    eventSnapSize: number;
    /**
     * A custom template to use for the all day events label text
     */
    allDayEventsLabelTemplate: TemplateRef<any>;
    /**
     * The number of days in a week. Can be used to create a shorter or longer week view.
     * The first day of the week will always be the `viewDate` and `weekStartsOn` if set will be ignored
     */
    daysInWeek: number;
    /**
     * A custom template to use for the current time marker
     */
    currentTimeMarkerTemplate: TemplateRef<any>;
    /**
     * Allow you to customise where events can be dragged and resized to.
     * Return true to allow dragging and resizing to the new location, or false to prevent it
     */
    validateEventTimesChanged: (event: CalendarEventTimesChangedEvent) => boolean;
    /**
     * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
     */
    dayHeaderClicked: EventEmitter<{
        day: WeekDay;
        sourceEvent: MouseEvent;
    }>;
    /**
     * Called when an event title is clicked
     */
    eventClicked: EventEmitter<{
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }>;
    /**
     * Called when an event is resized or dragged and dropped
     */
    eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent<any>>;
    /**
     * An output that will be called before the view is rendered for the current week.
     * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
     */
    beforeViewRender: EventEmitter<CalendarWeekViewBeforeRenderEvent>;
    /**
     * Called when an hour segment is clicked
     */
    hourSegmentClicked: EventEmitter<{
        date: Date;
        sourceEvent: MouseEvent;
    }>;
    /**
     * @hidden
     */
    days: WeekDay[];
    /**
     * @hidden
     */
    view: WeekView;
    /**
     * @hidden
     */
    refreshSubscription: Subscription;
    /**
     * @hidden
     */
    allDayEventResizes: Map<WeekViewAllDayEvent, WeekViewAllDayEventResize>;
    /**
     * @hidden
     */
    timeEventResizes: Map<CalendarEvent, ResizeEvent>;
    /**
     * @hidden
     */
    eventDragEnterByType: {
        allDay: number;
        time: number;
    };
    /**
     * @hidden
     */
    dragActive: boolean;
    /**
     * @hidden
     */
    dragAlreadyMoved: boolean;
    /**
     * @hidden
     */
    validateDrag: ValidateDrag;
    /**
     * @hidden
     */
    validateResize: (args: any) => boolean;
    /**
     * @hidden
     */
    dayColumnWidth: number;
    /**
     * @hidden
     */
    calendarId: symbol;
    /**
     * @hidden
     */
    lastDraggedEvent: CalendarEvent;
    /**
     * @hidden
     */
    rtl: boolean;
    /**
     * @hidden
     */
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;
    /**
     * @hidden
     */
    trackByHourSegment: (index: number, segment: WeekViewHourSegment) => string;
    /**
     * @hidden
     */
    trackByHour: (index: number, hour: WeekViewHour) => string;
    /**
     * @hidden
     */
    trackByWeekAllDayEvent: (index: number, weekEvent: WeekViewAllDayEvent) => string | number | CalendarEvent<any>;
    /**
     * @hidden
     */
    trackByWeekTimeEvent: (index: number, weekEvent: WeekViewTimeEvent) => string | number | CalendarEvent<any>;
    /**
     * @hidden
     */
    private lastDragEnterDate;
    /**
     * @hidden
     */
    constructor(cdr: ChangeDetectorRef, utils: CalendarUtils, locale: string, dateAdapter: DateAdapter, element: ElementRef<HTMLElement>);
    /**
     * @hidden
     */
    trackByHourColumn: (index: number, column: WeekViewHourColumn) => string | WeekViewHourColumn;
    /**
     * @hidden
     */
    trackById: (index: number, row: WeekViewAllDayEventRow) => string;
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    timeEventResizeStarted(eventsContainer: HTMLElement, timeEvent: WeekViewTimeEvent, resizeEvent: ResizeEvent): void;
    /**
     * @hidden
     */
    timeEventResizing(timeEvent: WeekViewTimeEvent, resizeEvent: ResizeEvent): void;
    /**
     * @hidden
     */
    timeEventResizeEnded(timeEvent: WeekViewTimeEvent): void;
    /**
     * @hidden
     */
    allDayEventResizeStarted(allDayEventsContainer: HTMLElement, allDayEvent: WeekViewAllDayEvent, resizeEvent: ResizeEvent): void;
    /**
     * @hidden
     */
    allDayEventResizing(allDayEvent: WeekViewAllDayEvent, resizeEvent: ResizeEvent, dayWidth: number): void;
    /**
     * @hidden
     */
    allDayEventResizeEnded(allDayEvent: WeekViewAllDayEvent): void;
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer: HTMLElement): number;
    /**
     * @hidden
     */
    dateDragEnter(date: Date): void;
    /**
     * @hidden
     */
    eventDropped(dropEvent: Pick<DropEvent<{
        event?: CalendarEvent;
        calendarId?: symbol;
    }>, 'dropData'>, date: Date, allDay: boolean): void;
    /**
     * @hidden
     */
    dragEnter(type: 'allDay' | 'time'): void;
    /**
     * @hidden
     */
    dragLeave(type: 'allDay' | 'time'): void;
    /**
     * @hidden
     */
    dragStarted(eventsContainerElement: HTMLElement, eventElement: HTMLElement, event: WeekViewTimeEvent | WeekViewAllDayEvent, useY: boolean): void;
    /**
     * @hidden
     */
    dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent): void;
    /**
     * @hidden
     */
    allDayEventDragMove(): void;
    /**
     * @hidden
     */
    dragEnded(weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent, dragEndEvent: DragEndEvent, dayWidth: number, useY?: boolean): void;
    protected refreshHeader(): void;
    protected refreshBody(): void;
    protected refreshAll(): void;
    protected emitBeforeViewRender(): void;
    protected getWeekView(events: CalendarEvent[]): WeekView;
    protected getDragMovedEventTimes(weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent, dragEndEvent: DragEndEvent | DragMoveEvent, dayWidth: number, useY: boolean): {
        start: Date;
        end: Date;
    };
    protected restoreOriginalEvents(tempEvents: CalendarEvent[], adjustedEvents: Map<CalendarEvent, CalendarEvent>, snapDraggedEvents?: boolean): void;
    protected getTimeEventResizedDates(calendarEvent: CalendarEvent, resizeEvent: ResizeEvent): {
        start: Date;
        end: Date;
    };
    protected resizeStarted(eventsContainer: HTMLElement, event: WeekViewTimeEvent | WeekViewAllDayEvent, dayWidth?: number): void;
    /**
     * @hidden
     */
    protected getAllDayEventResizedDates(event: CalendarEvent, daysDiff: number, beforeStart: boolean): {
        start: Date;
        end: Date;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarWeekViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarWeekViewComponent, "mwl-calendar-week-view", never, { "viewDate": "viewDate"; "events": "events"; "excludeDays": "excludeDays"; "refresh": "refresh"; "locale": "locale"; "tooltipPlacement": "tooltipPlacement"; "tooltipTemplate": "tooltipTemplate"; "tooltipAppendToBody": "tooltipAppendToBody"; "tooltipDelay": "tooltipDelay"; "weekStartsOn": "weekStartsOn"; "headerTemplate": "headerTemplate"; "eventTemplate": "eventTemplate"; "eventTitleTemplate": "eventTitleTemplate"; "eventActionsTemplate": "eventActionsTemplate"; "precision": "precision"; "weekendDays": "weekendDays"; "snapDraggedEvents": "snapDraggedEvents"; "hourSegments": "hourSegments"; "hourDuration": "hourDuration"; "hourSegmentHeight": "hourSegmentHeight"; "minimumEventHeight": "minimumEventHeight"; "dayStartHour": "dayStartHour"; "dayStartMinute": "dayStartMinute"; "dayEndHour": "dayEndHour"; "dayEndMinute": "dayEndMinute"; "hourSegmentTemplate": "hourSegmentTemplate"; "eventSnapSize": "eventSnapSize"; "allDayEventsLabelTemplate": "allDayEventsLabelTemplate"; "daysInWeek": "daysInWeek"; "currentTimeMarkerTemplate": "currentTimeMarkerTemplate"; "validateEventTimesChanged": "validateEventTimesChanged"; }, { "dayHeaderClicked": "dayHeaderClicked"; "eventClicked": "eventClicked"; "eventTimesChanged": "eventTimesChanged"; "beforeViewRender": "beforeViewRender"; "hourSegmentClicked": "hourSegmentClicked"; }, never, never, false>;
}
