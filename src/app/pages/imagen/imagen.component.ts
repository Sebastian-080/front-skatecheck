import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.scss'],
})
export class ImagenComponent  implements OnInit {

  started:boolean = false;
  imagen:string[] = [];

  constructor() { }

  ngOnInit() {}

  IniciarCamara() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      position: 'rear',
      parent: 'camera-container',
      className: 'camera-preview'
    };

    CameraPreview.start(cameraPreviewOptions).then((res) => {
      console.log('Camera Preview started', res);
      this.started = true;
    }).catch((err) => {
      console.error('Error starting camera preview', err);
    });
  }

  DetenerCamara() {
    CameraPreview.stop().then((res) => {
      console.log('Camera Preview stopped', res);
      this.started = false;
    }).catch((err) => {
      console.error('Error stopping camera preview', err);
    });
  }

  TomarFoto() {
    const CameraPreviewOptions:CameraPreviewOptions ={
    }

    CameraPreview.capture(CameraPreviewOptions).then((result:any) => {

      const base64 = "data:image/png;base64," + result.value;
      this.imagen.push(base64);
    });

  }

}
