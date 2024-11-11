import { Component, OnInit } from '@angular/core';
import { PostService } from '../srevices/post.service';
import { AccountService } from '../srevices/account.service';
import { Post } from '../DTO/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comment } from '../DTO/comment';
import { CommentService } from '../srevices/comment.service';
import Swal from 'sweetalert2';
import { LikeService } from '../srevices/like.service';
import { like } from '../DTO/like';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedinUser: any;
  posts: Post[] = [];
  createPostForm!: FormGroup;
  commentForm!: FormGroup;
  postImage: any;
  like!: like;
  isLikedMap: { [key: number]: boolean } = {};
  showLikesPopup: { [postId: number]: boolean } = {};
  readonly defaultAvatar = 'assets/images/default-avatar.jpg';

  constructor(
    private postService: PostService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private CommentService: CommentService,
    private LikeService: LikeService
  ) {}

  ngOnInit() {
    const storedUserInfo = localStorage.getItem('loggedInUser');
    this.loggedinUser = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    console.log('User' + this.loggedinUser);
    //this.getUserInfo();
    this.loadPosts();
    this.buildCreatePostForm();
    this.buildCreateCommentForm();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        debugger;
        this.posts = data;
        console.log(data);
        // this.postService.setPosts(this.posts);
        this.posts.forEach((p) => {
          this.isLikedMap[p.postId] = this.checkIfLiked(p.postId);
        });
      },
      error: () => {
        console.log('Error retrieving posts');
      },
    });
  }

  showLikesList(postId: number) {
    this.showLikesPopup[postId] = true;
  }

  closePopup(postId: number) {
    this.showLikesPopup[postId] = false;
  }
  //////////////////////////////
  toggleLike(postId: number) {
    this.LikeService.toggleLike(postId, this.loggedinUser.id).subscribe(
      (isLiked) => {
        this.isLikedMap[postId] = isLiked;
      }
    );
  }

  checkIfLiked(postId: number): boolean {
    return this.isLikedMap[postId] || false;
  }

  isLiked(postId: number): boolean {
    return this.isLikedMap[postId] || false;
  }
  /////////////////////////////////
  buildCreatePostForm() {
    this.createPostForm = this.formBuilder.group({
      contentText: ['', [Validators.required]],
      contentImage: [''],
    });
  }

  createPost() {
    if (this.createPostForm.valid) {
      const newPost = new Post();
      newPost.contentText = this.createPostForm.value.contentText;
      newPost.contentImage = this.postImage;
      newPost.createdAt = new Date();
      newPost.userId = this.loggedinUser.id;
      newPost.user = this.loggedinUser;

      this.postService.createPost(newPost).subscribe({
        next: (data) => {
          console.log('Post created successfully', data);
          this.loadPosts();
          this.createPostForm.reset();

          Swal.fire({
            icon: 'success',
            title: 'Post Created!',
            text: 'Your post has been posted successfully.',
            confirmButtonText: 'OK',
          });
        },
        error: (err) => {
          console.log('Error creating post', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  buildCreateCommentForm() {
    this.commentForm = this.formBuilder.group({
      contentText: ['', [Validators.required]],
    });
  }
  onFileSelected(file: any) {
    debugger;
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_event) => {
      console.log(reader.result);
      this.postImage = reader.result;
    };
  }

  createComment(postId: number) {
    debugger;
    if (this.commentForm.valid) {
      const newComment = new comment();
      newComment.content = this.commentForm.value.contentText;
      newComment.userId = this.loggedinUser.id;
      newComment.postId = postId;
      this.CommentService.createCommentservice(newComment).subscribe({
        next: (data) => {
          debugger;
          console.log('comment created successfully', data);
          debugger;
          this.loadPosts();
          this.commentForm.reset();
        },
        error: (err) => {
          console.log('Error creating comment', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  getProfileImage(): string {
    return this.loggedinUser?.profileImage || this.defaultAvatar;
  }
}
