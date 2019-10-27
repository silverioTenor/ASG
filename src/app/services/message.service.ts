import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public loading: any;
  public toast: any;
  
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({ message, duration: 2000 });
    this.toast.present();
  }
}
