import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private storageKey = 'calendar-events';

  constructor() { }

  saveEvents(events: any[]) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(events));
      } 
    }
   
  getEvents() {
    if (typeof localStorage !== 'undefined') {
    const eventsString = localStorage.getItem(this.storageKey);
    return eventsString ? JSON.parse(eventsString) : [];
  }
}
}
