import { DialogData } from './DialogData';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from './../../User';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  users: User[] = [];
  popup!: DialogData;
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private UserService: UserService,
  ) { 
    this.user = this.data.user;
    console.log('test data dialog');
    console.log(this.data.user);

    // console.log(this?.data?.popupName);
  }

  ngOnInit(): void {
  }

  discard() {
    this.dialogRef.close();
  }

  onStatusChange(event: any): boolean {
    return event? true: false;
  }

  addUserDialog(user: User) {
    this.UserService.onCreateUser(user).subscribe((user) => this.users.push(user));
  }

  editUserDialog(user: User) {
    this.UserService.onEditUser(user).subscribe((user) => this.users.push(user));
  }

  deleteUserDialog(user: User) {
    this.UserService.onDeleteUser(user).subscribe(() => this.users=this.users.filter((t) => t.id !== user.id ));
  }
}



