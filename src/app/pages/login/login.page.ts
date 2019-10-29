import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public userLogin: User = {};
  public userRegister: User = {};

  constructor(
    public keyboard: Keyboard,
    public auth: AuthService,
    public msg: MessageService
  ) { }

  ngOnInit() { }

  mouseEvent(event: any) {
    if (event.target.innerHTML === "Login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
    // console.log(event);
  }

  async login() {
    await this.msg.presentLoading();

    try {
      await this.auth.login(this.userLogin);
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

  async register() {
    await this.msg.presentLoading();

    try {
      await this.auth.register(this.userRegister);
    } catch (error) {
      let message: string;

      switch (error.code) {
        case 'auth/argument-error':
          message = 'Os campos estão vazios ou não foram preenchidos corretamente.'
          break;
        
        case 'auth/email-already-in-use':
          message = 'O e-mail informado já está sendo usado!'
          break;

        case 'auth/invalid-email':
          message = 'O formato de e-mail informado é inválido!'
          break;

        case 'auth/invalid-password':
          message = 'A senha precisa ter ao menos 6 caracteres!'
          break;
      }

      this.msg.presentToast(message);
      // console.error(error);
    } finally {
      this.msg.loading.dismiss();
    }
  }

}
