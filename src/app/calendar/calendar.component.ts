import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { EditEventDialogComponent } from '../edit-event-dialog/edit-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date  =  new Date();;
  events: any[] = [];
  newEvent: any = {};
  hours: string[] = [];
  titleError: string = '';
  dateError: string = '';
  timeError: string = '';

  constructor(private calendarService: CalendarService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadEvents();
    this.generateHours();
  }

  loadEvents() {
    this.events = this.calendarService.getEvents();
  }

  generateHours() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
  }

  addEvent() {
    this.validateForm();

    if (!this.titleError && !this.dateError && !this.timeError) {
      this.events.push({ ...this.newEvent });
      this.calendarService.saveEvents(this.events);
      this.newEvent = {};
      this.titleError = '';
      this.dateError = '';
      this.timeError = '';
  }
}

  validateForm() {
    this.titleError = this.validateField(this.newEvent.title, 'Title');
    this.dateError = this.validateField(this.newEvent.date, 'Date');
    this.timeError = this.validateField(this.newEvent.time, 'Time');
  }

  validateField(value: string, fieldName: string): string {
    return !value ? `${fieldName} is required` : '';
  }

  deleteEvent(event: any) {
    const index = this.events.indexOf(event);
    if (index >= 0) {
      this.events.splice(index, 1);
      this.calendarService.saveEvents(this.events);
    }
  }

  onSelect(event: Date ) {
    this.selectedDate = event;
  }

  getEventsForHour(hour: any): any[] {
    try{
      const dates:any[] = [];
      const рtime = hour.split(':')[0];
      if (!this.events || !this.selectedDate) {
        return [];
      }
      this.events.forEach((event)=>{
        const tp = event.time.split(':')[0];
        const eventDate = new Date(event.date); 
        if (tp == рtime && eventDate.getDate() == this.selectedDate.getDate()  ){ 
          dates.push(event)     
        }
      })
      return dates 
    }catch(err){console.log(err) }
    return []
  }

  onDragEnd(event: CdkDragEnd, eventData: any) {
    const intervalInMinutes = 60;
    const distanceMoved = event.distance.y;
    const intervalsMoved = distanceMoved / 60 * intervalInMinutes;
    if (intervalsMoved !== 0) {
      const newTime = this.addMinutes(eventData.time, intervalsMoved-25);
      eventData.time = newTime;
      this.updateEvent(eventData);
    }
  }

  addMinutes(time: string, minutes: number): string {
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    date.setMinutes(date.getMinutes() + minutes);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  updateEvent(updatedEvent: any) {
    let index:number =-1;
    let i :number = 0;
    this.events.forEach((event)=>{
      if (event.title === updatedEvent.oldTitle && event.date === updatedEvent.oldDate && event.time == updatedEvent.oldTime){
        index = i;
      }
      i++
    })
    if (index !== -1) {
      this.events[index] = updatedEvent;
      this.calendarService.saveEvents(this.events);
    }
  }
  openEditDialog(event: any): void {
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '250px',
      data: { ...event }
    });

    dialogRef.afterClosed().subscribe((result)  => {
      if (result) {
        this.updateEvent(result);
      }
    });
  }
}

