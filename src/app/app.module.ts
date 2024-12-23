import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { CalendarService } from './calendar/calendar.service';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EditEventDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule ,
    MatSidenavModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    DragDropModule,
    MatDialogModule
  ],
  providers: [
    { provide: NativeDateAdapter, useClass: NativeDateAdapter } ,
    CalendarService ,
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
