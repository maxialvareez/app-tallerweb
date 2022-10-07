import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { GroupsModule } from './groups/groups.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'    
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then( m=> m.AuthModule)
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: ()=> import('./protected/protected.module').then( m=> m.ProtectedModule),
  //   canActivate: [ValidarTokenGuard],
  //   canLoad: [ValidarTokenGuard]
  // },

  {
    path:'groups',
    loadChildren:() => import('./groups/groups.module').then(m => m.GroupsModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },

  {
    path:'404',
    component: ErrorPageComponent
  }, 
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
