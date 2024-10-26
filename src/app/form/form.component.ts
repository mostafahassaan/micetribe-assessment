import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { FormStateService } from './form-state.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { genders, cities, countryCodes } from './form-data';
@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormBuilder],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class FormComponent implements OnInit {
  dialog = inject(MatDialog);
  form: FormGroup;
  genders = genders;
  cities = cities;
  countryCodes = countryCodes;

  constructor(private fb: FormBuilder, private formStateService: FormStateService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      city: ['', [Validators.required]],
      countryCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
    });
  }

  ngOnInit(): void {
    this.formStateService.initialize(this.form);
    this.form.valueChanges.subscribe(() => {
      this.formStateService.saveState(this.form); // Pass the form to saveState
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      this.undo();
    }
    if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      this.redo();
    }
  }

  openSubmitDialog(): void {
    const formData = this.form.value;
    const requestObject = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      city: formData.city,
      phone_number: formData.countryCode + '' + formData.phoneNumber,
    };

    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      data: requestObject,
    });
  }

  undo(): void {
    this.formStateService.undo(this.form); // Pass the form to undo
  }

  redo(): void {
    this.formStateService.redo(this.form); // Pass the form to redo
  }

  canUndo(): boolean {
    return this.formStateService.canUndo();
  }

  canRedo(): boolean {
    return this.formStateService.canRedo();
  }
}
