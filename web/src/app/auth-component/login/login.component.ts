import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as fromStore from '../../store'
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder,
              private store: Store<fromStore.RootState> ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""]
    });
  }

  submit(){
    console.log(this.loginForm.value);
    const payload = {
      username: btoa(this.loginForm.value.username),
      password: btoa(this.loginForm.value.password)
    };
    console.log(payload);
    this.store.dispatch(new fromStore.Login(payload));
  }
}
