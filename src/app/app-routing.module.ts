import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'passenger',
    pathMatch: 'full'
  },
  {
    path: 'passenger',
    loadChildren: () => import('./passenger-registration/passenger-registration.module').then(m => m.PassengerRegistrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
