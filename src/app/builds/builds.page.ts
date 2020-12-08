import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Build } from '../model/build';
import { BuildsService } from '../services/builds.service';

@Component({
  selector: 'app-builds',
  templateUrl: 'builds.page.html',
  styleUrls: ['builds.page.scss'],
})
export class BuildsPage {

  constructor(
    public buildsService: BuildsService,
    private router: Router,
    private alertController: AlertController
  ) { }

  goEditBuild(id: number) {
    this.router.navigateByUrl(`/edit${id != undefined ? '/' + id : ''}`);
  }

  deleteBuild(id: number) {
    this.buildsService.deleteBuild(id);
  }

  async presentAlertConfirm(b: Build) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar build',
      message: `¿Quieres borrar la build <strong> ${b.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteBuild(b.id);
          }
        }
      ]
    });
  
    await alert.present();
  }
}
