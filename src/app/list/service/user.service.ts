import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pagination } from '../models/pagination';
import { IUser, ResponseUser, ResponseUsers, User } from '../models/user';

@Injectable()
export class UserService {
  private url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  public getUsers(pagination: Pagination): Observable<IUser> {
    return this.http
      .get<ResponseUsers>(
        `${this.url}/users?page=${pagination.page}&&per_page=${pagination.per_page}`
      )
      .pipe(
        map((response: ResponseUsers) => ({
          users: response.data,
          pagination: {
            page: response.page,
            per_page: response.per_page,
            total: response.total,
            total_pages: response.total_pages,
          },
        }))
      );
  }

  public getUserDetails(userId: number): Observable<User> {
    return this.http
      .get<ResponseUser>(`${this.url}/users/${userId}`)
      .pipe(map((response: ResponseUser) => response.data));
  }

  public toggleFavorite(
    favoritesList: number[],
    users: User[],
    selectUser: User | null,
    selectedId: number
  ): { favorites: number[]; users: User[]; user: User | null } {
    const isFavorite: boolean = favoritesList.some(
      (id: number) => id === selectedId
    );
    const favorites: number[] = this.setFavoritesList(
      favoritesList,
      selectedId,
      isFavorite
    );
    const newUsers: User[] = this.setUpdatedUsersList(
      users,
      selectedId,
      isFavorite
    );
    const newUser: User | null = this.setUpdatedUserDetails(
      selectUser,
      selectedId,
      isFavorite
    );

    return { favorites, users: newUsers, user: newUser };
  }

  private setFavoritesList(
    favoritesList: number[],
    selectedId: number,
    isFavorite: boolean
  ): number[] {
    favoritesList.push(selectedId);
    return isFavorite
      ? favoritesList.filter((id) => id !== selectedId)
      : favoritesList;
  }

  private setUpdatedUsersList(
    users: User[],
    selectedId: number,
    isFavorite: boolean
  ): User[] {
    return users.map((user: User) =>
      user.id === selectedId ? { ...user, isFavorite } : user
    );
  }

  private setUpdatedUserDetails(
    selectUser: User | null,
    selectedId: number,
    isFavorite: boolean
  ): User | null {
    return !!selectUser
      ? selectUser?.id === selectedId
        ? { ...selectUser, isFavorite }
        : selectUser
      : null;
  }
}
