import { comment } from './comment';
import { like } from './like';
import { user } from './user';

export class Post {
  createdAt!: Date;
  contentText!: string;
  contentImage!: string;
  userId!: string;
  user!: user;
  postId!: number;
  like!: like[];
  comments!: comment[];
}
