import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CustomJsonPipe } from '../custom-json.pipe';
@Component({
  selector: 'app-submit-dialog',
  standalone: true,
  
  imports: [MatDialogTitle, MatDialogContent, CommonModule, CustomJsonPipe],
  templateUrl: './submit-dialog.component.html',
  styleUrl: './submit-dialog.component.scss',
})
export class SubmitDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
