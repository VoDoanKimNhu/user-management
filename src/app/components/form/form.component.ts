import { UiService } from './../../services/ui.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, MaxLengthValidator } from '@angular/forms';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../User';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Subscription } from 'rxjs';
// import { Event } from '@angular/router';
// import { Pipe, PipeTransform } from '@angular/core';
// import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() formName!: string;
  @Input() editedUser: User | null = null;
  @Output() onStatusChange = new EventEmitter<string>;
  @Output() closeDialog = new EventEmitter<any>;
  @Output() addUser = new EventEmitter<any>;
  @Output() editUser = new EventEmitter<any>;
  @Output() deleteUser = new EventEmitter<any>;

  tasks: User[] = [];
  ttl!: String;
  formState!: string;
  profileForm!: FormGroup;
  isReadonly: boolean = true;
  
  gender!: string;
  title!: string;

  subscription!: Subscription;

  constructor(    
    private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private uiService: UiService) 
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };

      this.subscription = this.uiService.onToggle().subscribe((value) => (this.isReadonly = value));

  }

  ngOnInit(): void {
    if(this.formName == 'CREATE NEW USER') {
      this.isReadonly = false;
    }

    if(this.editedUser?.gender == 'Female') {
      this.gender='2';
    } else {
      this.gender='1';
    }

    switch (this.editedUser?.title) {
      case 'Team Lead': {
        this.title = 'teamLead';
        break;
      }
      case 'Architechture': {
        this.title = 'architechture';
        break;
      }
      case 'Web Developer': {
        this.title = 'webDev';
        break;
      }
      case 'Tester': {
        this.title = 'tester';
        break;
      }
      case 'UI/UX': {
        this.title = 'uiux';
        break;
      }
      case 'DBA': {
        this.title = 'dba';
        break;
      }
    }

    this.profileForm = new FormGroup({
      id: new FormControl(this.editedUser ? this.editedUser.id : ''),
      firstName: new FormControl(this.editedUser ? this.editedUser.firstName : '', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl(this.editedUser ? this.editedUser.lastName : '', [Validators.required, Validators.maxLength(80)]),
      dob: new FormControl(this.editedUser ? this.editedUser.dob : '', []),
      gender: new FormControl(this.editedUser ? this.gender : '2', []),
      company: new FormControl(this.editedUser ? this.editedUser.company : '', []),
      title: new FormControl(this.editedUser ? this.title : '', []),
      email: new FormControl(this.editedUser ? this.editedUser.email : '', [Validators.required, Validators.email]),
    });

    this.profileForm.valueChanges.subscribe(() => this.onStatusChange.emit(this.profileForm.status)); 

    this.profileForm.statusChanges.subscribe(formState=> {
      console.log('form status changed');
      console.log(formState);
    })
  }

  closeFormDialog() {
    this.closeDialog.emit();
  }

  onSubmit(e: any) {
    console.log('test edit');
    console.log(e);
    switch (e.value.title) {
      case 'teamLead': {
        this.ttl = 'Team Lead';
        break;
      }
      case 'architechture': {
        this.ttl = 'Architechture';
        break;
      }
      case 'webDev': {
        this.ttl = 'Web Developer';
        break;
      }
      case 'tester': {
        this.ttl = 'Tester';
        break;
      }
      case 'uiux': {
        this.ttl = 'UI/UX';
        break;
      }
      case 'dba': {
        this.ttl = 'DBA';
        break;
      }
    }

    const newUser = {
      id: e.value.id,
      firstName: e.value.firstName,
      lastName: e.value.lastName,
      bod: e.value.dob,
      gender: (e.value.gender == 1) ? 'Male' : 'Female',
      company: 'ROSEN',
      title: this.ttl,
      email: e.value.email,
      status: 'Active'
    };

    if(this.editedUser) {
      this.editUser.emit(newUser);
    } else {
      this.addUser.emit(newUser);
    }

    this.closeDialog.emit();
  }

  currentUrl!: string;

  refreshComponent(){
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    this.router.navigate([this.currentUrl]); 
 }

 onDeleteUser(e: any) {
  this.deleteUser.emit(e.value);
  this.closeDialog.emit();
 }

 handleReadonlyBtn() {
  this.uiService.handleReadonly();
 }

}
