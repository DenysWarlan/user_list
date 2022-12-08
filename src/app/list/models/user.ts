import { Pagination } from './pagination';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  isFavorite?: boolean;
}

export interface IUser {
  users: User[];
  pagination: Pagination;
}

export interface ResponseUsers extends Pagination {
  data: User[];
}

export interface ResponseUser {
  data: User;
}
