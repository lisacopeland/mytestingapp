import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users.model';

export const baseUserUrl = 'https://reqres.in/api/users';

export interface CreateUserResponse extends User {
  createdAt: string;
}

export interface UpdateUserResponse extends User {
  updatedAt: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  date: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${baseUserUrl}\\${id}`);
  }

  getUsers(page: number = 1): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${baseUserUrl}?page=${page}`);
  }

  createUser(user: User) {
    return this.http.post<CreateUserResponse>(`${baseUserUrl}`, user);
  }

  updateUser(user: User) {
    return this.http.put<UpdateUserResponse>(
      `${baseUserUrl}\\${user.id}`,
      user
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${baseUserUrl}\\${id}`);
  }
}
