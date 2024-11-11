import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Post } from '../DTO/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}
  createPost(post: Post): Observable<any> {
    return this.httpClient.post(
      'http://localhost/finalProject/api/Post/createPost',
      post
    );
  }
  getPosts(): Observable<any> {
    return this.httpClient.get(
      'http://localhost/finalProject/api/Post/GetAllPost'
    );
  }
  getPostsByUserId(userId: number): Observable<any> {
    return this.httpClient.get(
      `http://localhost/finalProject/api/Post/getPostBuUserId?userId=${userId}`
    );
  }
}
