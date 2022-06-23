import { FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PopupComponent } from '../popup/popup.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

export interface popupName {
  popupName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() openDialog_ = new EventEmitter();

  popupName!: string;

  faSearch = faSearch;
  faArrowUp = faArrowUp;

  searchControl = new FormControl();
  searchText!: string;

  sortControl = new FormControl();
  sortChoice!: string;
  isAsc!: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400), distinctUntilChanged()
      ).subscribe((val) => {
        // console.log('dashboard')
        // console.log(val);
        this.searchText = val;
      });

      this.sortControl.valueChanges
        .pipe()
        .subscribe((val) => {
            this.sortChoice=val;
            // this.isAsc=;
      })
  }

  onOpenDialog(): void {
    this.openDialog_.emit();
  }

  openDialog(): void {
    console.log('test 2');
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '100%',
      height: 'fit-content',
      data: {popupName: 'createPopup'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      this.popupName=result;
    });
  }


}
