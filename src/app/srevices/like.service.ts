import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { like } from '../DTO/like';
@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private httpClient: HttpClient) {}
  createLike(like: like): Observable<any> {
    return this.httpClient.post(
      'http://localhost/finalProject/api/Like/createLike',
      like
    );
  }
  toggleLike(postId: number, userId: string): Observable<any> {
    debugger;
    const url = `http://localhost/finalProject/api/Like/like?postId=${postId}&userId=${userId}`;

    return this.httpClient.post(url, {});
  }
  getLikeCount(postId: number): Observable<number> {
    return this.httpClient.get<number>(
      `http://localhost/finalProject/api/Like/count/${postId}`
    );
  }

  getLikedUsers(postId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `http://localhost/finalProject/api/Like/users/${postId}`
    );
  }
}
