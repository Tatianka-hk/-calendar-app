import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent implements OnInit {
  dataI: any = {}; 
  titleError: string = '';
  dateError: string = '';
  timeError: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ,

  ) { }
  ngOnInit(): void {
    this.dataI = this.data;
    this.data.oldTime = this.data.time
    this.data.oldTitle = this.data.title
    this.data.oldDate = this.data.date
  }
  
  validateForm() {
    this.titleError = this.validateField(this.data.title, 'Title');
    this.dateError = this.validateField(this.data.date, 'Date');
    this.timeError = this.validateField(this.data.time, 'Time');
  }

  validateField(value: string, fieldName: string): string {
    return !value ? `${fieldName} is required` : '';
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.validateForm()
    if (!this.titleError && !this.dateError && !this.timeError) {
    this.dialogRef.close(this.data);
    this.titleError = '';
    this.dateError = '';
    this.timeError = '';
   }
  }
}