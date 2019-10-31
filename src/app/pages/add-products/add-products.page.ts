import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform, NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;
  private product: Product = {};
  private productId: string = null;
  private productSubscription: Subscription

  constructor(
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorade: AngularFireStorage,
    private msg: MessageService,
    private afService: AuthService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
  ) {
    this.productId = this.activeRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() {
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => { this.product = data; })
  }

  async openGalery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
      // encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE
    }

    try {
      const fileUri: string = await this.camera.getPicture(options);

      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));

        const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));

        const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);

        const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });
        this.uploadPicture(blob);
      }
    } catch (error) {
      console.error(error);
    }
  }

  uploadPicture(blob: Blob) {
    const ref = this.afStorade.ref(this.product.name + '.jpg');
    const task = ref.put(blob);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe();
  }

  async saveProduct() {
    this.msg.presentLoading();

    this.product.userId = this.afService.getAuth().currentUser.uid;

    if (this.productId) {
      
    } else {
      this.product.createAt = new Date().getTime();

      try {
        await this.productService.addProduct(this.product);

        this.navCtrl.navigateBack('/products');
      } catch (error) {
        this.msg.presentToast('Erro ao salvar!');
      } finally {
        this.msg.loading.dismiss();
      }
    }
  }
}
