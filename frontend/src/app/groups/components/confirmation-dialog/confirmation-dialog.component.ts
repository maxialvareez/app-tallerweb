import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [
  ]
})
export class ConfirmationDialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}