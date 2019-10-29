import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  public userPassword: User = {};

  constructor(
    public keyboard: Keyboard,
    public auth: AuthService,
    public msg: MessageService,
    public router: Router
  ) { }

  ngOnInit() { }

  async forgotPassword() {
    await this.msg.presentLoading();

    try {
      await this.auth.forgotPassword(this.userPassword);

      this.router.navigate(['/login']);
    } catch (error) {
      let message: string;

      switch (error.code) {
        case 'auth/argument-error':
          message = 'Os campos estão vazios ou não foram preenchidos corretamente.'
          break;

        case 'auth/invalid-email':
          message = 'O formato de e-mail informado é inválido!'
          break;

        case 'auth/invalid-password':
          message = 'A senha precisa ter ao menos 6 caracteres!'
          break;

        case 'auth/user-not-found':
          message = 'O usuário informado não existe!'
          break;
      }

      this.msg.presentToast(message);
      // console.error(error);
    } finally {
      this.msg.loading.dismiss();
    }
  }

}
