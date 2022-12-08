import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from '../../list/service/user.service';
import {
  GetUserDetails,
  GetUserDetailsFailure,
  GetUserDetailsSuccess,
  GetUsers,
  GetUsersFailure,
  GetUsersSuccess,
  ToggleFavorite,
} from './users.actions';
import { catchError, map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser, User } from '../models/user';
import { Pagination } from '../models/pagination';

export interface UsersStateModel {
  users: User[];
  user: User | null;
  favorites: number[];
  error: HttpErrorResponse | null;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
}

const defaults: UsersStateModel = {
  users: [],
  user: null,
  error: null,
  loaded: false,
  loading: false,
  pagination: {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 10,
  },
  favorites: [],
};

@State<UsersStateModel>({
  defaults,
  name: 'users',
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}

  @Action(GetUsers)
  public getUsers(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: GetUsers
  ): Observable<void | Observable<void>> {
    patchState({
      loading: true,
    });

    return this.userService.getUsers(payload).pipe(
      map((payload: IUser) => dispatch(new GetUsersSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetUsersFailure(error))
      )
    );
  }

  @Action(GetUsersSuccess)
  public getUsersSuccess(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUsersSuccess
  ): void {
    patchState({
      loading: false,
      loaded: true,
      users: payload.users,
      pagination: payload.pagination,
      error: null,
    });
  }

  @Action(GetUsersFailure)
  public getUsersFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUsersFailure
  ): void {
    patchState({
      loading: false,
      loaded: true,
      users: [],
      error: payload,
    });
  }

  @Action(ToggleFavorite)
  public toggleFavorite(
    { patchState, getState }: StateContext<UsersStateModel>,
    { payload }: ToggleFavorite
  ): void {
    const {favorites, users, user} = this.userService.toggleFavorite(getState().favorites, getState().users, getState().user, payload)

    patchState({
      favorites,
      users,
      user,
    });
  }

  @Action(GetUserDetails)
  public getUserDetails(
    { dispatch, patchState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetails
  ): Observable<void | Observable<void>> {
    return this.userService.getUserDetails(payload).pipe(
      map((payload: User) => dispatch(new GetUserDetailsSuccess(payload))),
      catchError((error: HttpErrorResponse) =>
        dispatch(new GetUserDetailsFailure(error))
      )
    );
  }

  @Action(GetUserDetailsSuccess)
  public getUserDetailsSuccess(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetailsSuccess
  ): void {
    patchState({
      user: payload,
      error: null,
    });
  }

  @Action(GetUserDetailsFailure)
  public getUserDetailsFailure(
    { patchState }: StateContext<UsersStateModel>,
    { payload }: GetUserDetailsFailure
  ): void {
    patchState({
      user: null,
      error: payload,
    });
  }

  @Selector()
  public static loaded({ loaded }: UsersStateModel): boolean {
    return loaded;
  }

  @Selector()
  public static loading({ loading }: UsersStateModel): boolean {
    return loading || false;
  }

  @Selector()
  public static pagination({ pagination }: UsersStateModel): Pagination | null {
    return pagination;
  }

  @Selector()
  public static users({ users }: UsersStateModel): User[] {
    return !!users?.length ? users : ([] as User[]);
  }

  @Selector()
  public static favorites({ favorites }: UsersStateModel): number[] {
    return !!favorites?.length ? favorites : ([] as number[]);
  }

  @Selector()
  public static user({ user }: UsersStateModel): User | null {
    return user;
  }
}
