import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder,
              private store: Store<fromStore.UserState> ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  submit(): void {
    console.log(this.registerForm.value);
    const payload = {
      username: btoa(this.registerForm.value.username),
      password: btoa(this.registerForm.value.password)
    };
    console.log(payload);
    this.store.dispatch(new fromStore.Register(payload));
  }

}
