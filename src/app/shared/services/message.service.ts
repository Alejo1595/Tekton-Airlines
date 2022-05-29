import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
