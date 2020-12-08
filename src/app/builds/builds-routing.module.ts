import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildsPage } from './builds.page';

const routes: Routes = [
  {
    path: '',
    component: BuildsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildsPageRoutingModule {}
