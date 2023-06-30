import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardUserComponent } from './dashboard-user.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardUserComponent
  }
]

@NgModule({
  declarations: [DashboardUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgApexchartsModule
  ]
})

export class DashboardModule { }
