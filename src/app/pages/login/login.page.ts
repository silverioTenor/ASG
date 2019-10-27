import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(public keyboard: Keyboard) { }

  ngOnInit() { }

  mouseEvent(event: any) {
    if (event.target.innerHTML === "Login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
    // console.log(event);
  }

}
