import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private undoStack: any[] = [];
  private redoStack: any[] = [];
  private currentState: any;

  constructor() {}

  initialize(form: FormGroup) {
    this.currentState = form.value;
    this.undoStack = [];
    this.redoStack = [];
  }

  saveState(form: FormGroup) {
    this.undoStack.push(this.currentState);
    this.currentState = form.value;
    this.redoStack = []; 
  }

  undo(form: FormGroup) {
    if (this.undoStack.length > 0) {
      const previousState = this.undoStack.pop();
      this.redoStack.push(this.currentState);
      this.currentState = previousState;
      form.setValue(previousState, { emitEvent: false });
    }
  }

  redo(form: FormGroup) {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(this.currentState);
      this.currentState = nextState;
      form.setValue(nextState, { emitEvent: false });
    }
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
