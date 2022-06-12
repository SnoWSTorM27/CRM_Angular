import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Теперь вы можете зайти в систему используя свои данные
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные', 'yellow accent-2')
      } else if (params['accessDenied']) {
        //Для начала авторизуйтесь в системе
        MaterialService.toast('Для начала авторизуйтесь в системе', 'red darken-1 rounded')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново', 'red darken-1 rounded')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']) ,
      (error) => {
        MaterialService.toast(error.error.message, 'red darken-1 rounded')
        this.form.enable()
      },
      () => MaterialService.toast('Вы вошли', 'green rounded')
    )
  }


}
