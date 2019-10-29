import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public loading: any;
  public toast: any;
  public alert: any;
  
  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) { }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({ message, duration: 2000 });
    this.toast.present();
  }

  async presentAlert(message: string) {
    this.alert = await this.alertCtrl.create({
      header: 'Aviso!',
      message,
      buttons: ['OK']
    });

    await this.alert.present();
  }
}
