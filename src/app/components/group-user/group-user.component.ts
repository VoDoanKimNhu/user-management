import { UiService } from './../../services/ui.service';
import { DialogData } from './../popup/DialogData';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../User'
import { faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent implements OnInit, OnChanges {
  @Input() group!: User[];
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleRight = faChevronCircleRight;

  showUsers: boolean = true;
  subscription!: Subscription;
  
  data!: DialogData;

  constructor(public dialog: MatDialog, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showUsers = value));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('group' in changes) {
      console.log(this.group[0]?.title);
    }
  }

  ngOnInit(): void {
    
  }

  openDialog(user: User): void {
    // console.log('test user param');
    // console.log(user);
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '100%',
      height: 'fit-content',
      data: {popupName: null, user: user}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      // this.popupName=result;
    });
  }

  toggleUsers() {
    this.uiService.toggleShowUser();
  }

}
