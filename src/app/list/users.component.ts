import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUsers, ToggleFavorite } from './store/users.actions';
import { Pagination } from './models/pagination';
import { filter, Observable, take } from 'rxjs';
import { UsersState } from './store/users.state';
import { User } from './models/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  public defaultPagination: Pagination = {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 10,
  };
  public rowsPerPageOptions: number[] = [];
  public pagination$: Observable<Pagination | null> = this.store.select(
    UsersState.pagination
  );
  public users$: Observable<User[]> = this.store.select(UsersState.users);
  public loaded$: Observable<boolean> = this.store.select(UsersState.loaded);
  public loading$: Observable<boolean> = this.store.select(UsersState.loading);
  constructor(private router: Router, private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetUsers(this.defaultPagination));
    this.setRowsPerPageOptions();
  }

  public paginate($event: any): void {
    const pagination: Pagination = {
      page: $event.page + 1,
      per_page: $event.rows,
    };
    this.store.dispatch(new GetUsers(pagination));
  }

  public showDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

  public toggleFavorite(id: number): void {
    this.store.dispatch(new ToggleFavorite(id));
  }

  private setRowsPerPageOptions(): void {
    this.pagination$
      .pipe(filter(Boolean), take(2))
      .subscribe(
        (pagination: Pagination) =>
          (this.rowsPerPageOptions = [
            pagination.per_page,
            pagination.per_page * 2,
            pagination.per_page * 3,
          ])
      );
  }
}
