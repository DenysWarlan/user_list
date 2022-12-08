import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './components/user/user-details.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { RouterModule, Routes } from '@angular/router';
import {CardModule} from "primeng/card";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  { path: 'user/:id', component: UserDetailsComponent },
];

@NgModule({
  declarations: [UserDetailsComponent, UsersComponent],
  imports: [
    HttpClientModule,
    TableModule,
    CommonModule,
    RouterModule.forChild(routes),
    PaginatorModule,
    MultiSelectModule,
    CardModule,
  ],
  exports: [UsersComponent, UserDetailsComponent, RouterModule],
  providers: [UserService],
})
export class UsersModule {}
