import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormStateService } from './form-state.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
  ],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  genders: { name: string; key: string }[] = [
    { name: 'Male', key: 'male' },
    { name: 'Female', key: 'female' },
    { name: 'Other', key: 'other' },
    { name: 'Prefer not to say', key: 'nosay' },
  ];

  cities: { name: string; key: string }[] = [
    { name: 'Gouna', key: 'gouna' },
    { name: 'Tallinn', key: 'tallinn' },
    { name: 'Doha', key: 'doha' },
    { name: 'Dubai', key: 'dubai' },
  ];

  countryCodes: { name: string; key: string }[] = [
    { name: 'Egypt (+20)', key: '+20' },
    { name: 'Estonia (+372)', key: '+372' },
    { name: 'Qatar (+974)', key: '+974' },
    { name: 'UAE (+971)', key: '+971' },
  ];

  agreed: boolean = false;
  constructor(private fb: FormBuilder, private formStateService: FormStateService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: [''],
      city: [''],
    });
  }

  ngOnInit(): void {
    this.formStateService.initialize(this.form);
    this.form.valueChanges.subscribe(() => {
      this.formStateService.saveState(this.form); // Pass the form to saveState
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
