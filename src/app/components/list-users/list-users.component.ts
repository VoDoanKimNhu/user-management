import { UiService } from './../../services/ui.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { groupBy, mergeMap, toArray, Subscription, config } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../User';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnChanges {
  @Input() searchText!: string;
  @Input() sortChoice!: string;

  groups: User[][] = [];
  filterGroups: User[][] = [];

  isFiltered: boolean = false;

  subscription!: Subscription;
  showUsers!: boolean;
  users!: User[];
  user!: User;

  constructor(private userService: UserService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showUsers = value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterGroups = cloneDeep(this.groups)

    // search
    if('searchText' in changes) {  
      console.log('search')
      console.log(this.filterGroups)
      console.log(this.searchText)

      for(let i=0; i<this.filterGroups.length; i++) {
        console.log('in for',this.filterGroups[i])
        this.filterGroups[i] = this.filterGroups[i].filter(
          user => {
            return ((user.firstName.toLowerCase().includes(this.searchText)) || 
            (user.lastName.toLowerCase().includes(this.searchText)) ||
            (user.email.toLowerCase().includes(this.searchText)))
          }
        )
      }
      // console.log('after search')
      console.log('after search',this.filterGroups)
      }

    // sort
    if('sortChoice' in changes) {  
      console.log('sort') 
      console.log(this.filterGroups)
      switch (this.sortChoice) {
        case 'lastName':
          this.isFiltered = true;
          this.filterGroups.forEach(
            (group) => group.sort(
              (user1, user2) => {
                let lname1 = user1.lastName.toLowerCase(),
                    lname2 = user2.lastName.toLowerCase();
                if(lname1 < lname2) {
                  return -1;
                }
                if(lname1 > lname2) {
                  return 1;
                }
                return 0;
              }
            ));
          break;
        case 'firstName':
          this.isFiltered = true;
          this.filterGroups.forEach(
            (group) => group.sort(
              (user1, user2) => {
                let fname1 = user1.firstName.toLowerCase(),
                    fname2 = user2.firstName.toLowerCase();
                if(fname1 < fname2) {
                  return -1;
                }
                if(fname1 > fname2) {
                  return 1;
                }
                return 0;
              }
            ));
          break;
        case 'email':
          this.isFiltered = true;
          this.filterGroups.forEach(
            (group) => group.sort(
              (user1, user2) => {
                let email1 = user1.email.toLowerCase(),
                    email2 = user2.email.toLowerCase();
                if(email1 < email2) {
                  return -1;
                }
                if(email1 > email2) {
                  return 1;
                }
                return 0;
              }
            ));
          break;
      }
      console.log('sortChoice', this.sortChoice);
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(
    ).subscribe((users) => 
    {
      this.users=users
    });

    this.userService.getUsers().pipe(
      mergeMap(res => res), 
      groupBy(user => user.title),
      mergeMap(groups$ => groups$.pipe(toArray()))
    ).subscribe((groups) => 
    {
      this.groups.push(groups);
    });
    this.filterGroups=this.groups
    console.log('init')
    console.log(this.groups)
    console.log(this.filterGroups)

  }
}
