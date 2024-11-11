import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { comment } from '../DTO/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}
  createCommentservice(comment: comment): Observable<any> {
    debugger;
    return this.httpClient.post(
      'http://localhost/finalProject/api/Comment/createComment',
      comment
    );
  }
  updateInfo() {}
}
