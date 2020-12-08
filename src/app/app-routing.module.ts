import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'builds',
    loadChildren: () => import('./builds/builds.module').then( m => m.BuildsPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./page/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./page/edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
