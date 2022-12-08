import { HttpErrorResponse } from '@angular/common/http';
import { Pagination } from '../models/pagination';
import { User } from '../models/user';

export class GetUsers {
  public static readonly type: string = '[Users] Get users';

  constructor(public payload: Pagination) {}
}

export class GetUsersSuccess {
  public static readonly type: string = '[Users] Get users success';

  constructor(public payload: { users: User[]; pagination: Pagination }) {}
}

export class GetUsersFailure {
  public static readonly type: string = '[Users] Get users failure';

  constructor(public payload: HttpErrorResponse) {}
}

export class ToggleFavorite {
  public static readonly type: string = '[Users] Set or delete as favorite';

  constructor(public payload: number) {}
}

export class GetUserDetails {
  public static readonly type: string = '[Users] Get user details';

  constructor(public payload: number) {}
}

export class GetUserDetailsSuccess {
  public static readonly type: string = '[Users] Get user details success';

  constructor(public payload: User) {}
}

export class GetUserDetailsFailure {
  public static readonly type: string = '[Users] Get user details failure';

  constructor(public payload: HttpErrorResponse) {}
}
