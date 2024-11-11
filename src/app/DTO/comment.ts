import { user } from './user';

export class comment {
  // commentId!: number;
  content!: string;
  userId!: string;
  user?: user;
  postId!: number;
}
