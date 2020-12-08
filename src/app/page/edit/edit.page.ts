import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Build } from 'src/app/model/build';
import { BuildsService } from 'src/app/services/builds.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  build: Build = {name: '', switchManufacturer: '', keycaps: '', format: '', lubed: false, description: '', value: 0 , url: ''};
  
  constructor(
    private buildsService: BuildsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.build = this.buildsService.getBuild(+id)
    }
  }

  saveBuild() {
    this.buildsService.saveBuild(this.build);
    this.router.navigateByUrl('/builds');
  }
}
