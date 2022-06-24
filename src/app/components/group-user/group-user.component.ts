import { UiService } from './../../services/ui.service';
import { DialogData } from './../popup/DialogData';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../User'
import { faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Subscription } from 'rxjs';

interface toggleGroupUsers {
  initState: true,
  showUsers: boolean,
  titleGroupUsers: string
}

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent implements OnInit, OnChanges {
  @Input() group!: User[];
  title!: string;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleRight = faChevronCircleRight;

  tglGroupUsers: toggleGroupUsers = {
    initState: true,
    showUsers: true,
    titleGroupUsers: ''
  }

  subscription!: Subscription;
  
  data!: DialogData;

  constructor(public dialog: MatDialog, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {(this.tglGroupUsers = value)});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('group' in changes) {
      console.log('-----');
      console.log('group',this.group);
    }
  }

  ngOnInit(): void {
    
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '100%',
      height: 'fit-content',
      data: {popupName: null, user: user}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  toggleUsers(e: any) {
    this.title = e[0].title;
    this.uiService.toggleShowUser(e[0].title);
    console.log('after service');
    console.log(this.tglGroupUsers.titleGroupUsers);
    console.log(this.title);
  }

}
