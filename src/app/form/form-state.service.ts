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

  /**
   * Initializes the form state service with the provided form.
   *
   * @param form - The form to initialize the service with.
   */
  initialize(form: FormGroup) {
    this.currentState = form.value;
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Saves the current state of the form. This method should be called whenever the form state changes.
   * The current state is pushed on to the undo stack. The redo stack is cleared to maintain state consistency.
   *
   * @param form - The form state to be saved.
   */
  saveState(form: FormGroup) {
    this.undoStack.push(this.currentState);
    this.currentState = form.value;
    this.redoStack = [];
  }

  /**
   * Performs an undo operation on the form state.
   * Undoes the last change made to the form by popping the previous state from the undo stack.
   * The current state is push on to the redo stack. The form is then set to the previous state.
   * If there are no more states in the undo stack, this method does nothing.
   *
   * @param form - The form group to undo the changes on.
   */
  undo(form: FormGroup) {
    if (this.undoStack.length > 0) {
      const previousState = this.undoStack.pop();
      this.redoStack.push(this.currentState);
      this.currentState = previousState;
      form.setValue(previousState, { emitEvent: false });
    }
  }

  /**
   * Performs a redo operation on the form state.
   * Redoes the last undo operation by popping the next state from the redo stack.
   * The current state is pushed on to the undo stack. The form is then set to the next state.
   * If there are no more states in the redo stack, this method does nothing.
   * 
   * @param form - The form group to perform the redo operation on.
   */
  redo(form: FormGroup) {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(this.currentState);
      this.currentState = nextState;
      form.setValue(nextState, { emitEvent: false });
    }
  }

  /**
   * Checks if there are any actions that can be undone.
   * @returns {boolean}
   */
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * Checks if there are any actions that can be redone.
   * 
   * @returns {boolean}
   */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
