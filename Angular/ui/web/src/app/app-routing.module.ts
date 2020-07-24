import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceNewComponent } from './device-new/device-new.component';


const routes: Routes = [
  {
    path: 'device',
    component: DevicesComponent,
    data: { title: 'Devices' }
  },
  {
    path: 'device-detail/:id',
    component: DeviceDetailComponent,
    data: { title: 'Device' }
  },
  {
    path: 'device-new',
    component: DeviceNewComponent,
    data: { title: 'New Device' }
  }, 
  {
    path: '',
    redirectTo: '/device',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
