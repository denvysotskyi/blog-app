import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component'
import { HomePageComponent } from './home-page/home-page.component'
import { PostPageComponent } from './post-page/post-page.component'
import { ErrorPageComponent } from "./error-page/error-page.component"

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'post/:id',
        component: PostPageComponent
      }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '/error'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
