import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UsersState } from '../../store/users.state';
import {GetUserDetails, ToggleFavorite} from '../../store/users.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  public user$: Observable<User | null> = this.store.select(UsersState.user);
  public id: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  public backToList(): void {
    this.router.navigate(['/users']);
  }

  public toggleFavorite(id: number): void {
    this.store.dispatch(new ToggleFavorite(id));
  }

  private getUserDetails() {
    if (!!this.id) {
      this.store.dispatch(new GetUserDetails(+this.id));
    }
  }
}
