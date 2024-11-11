import { Component } from '@angular/core';
import { AccountService } from '../srevices/account.service';
import { Router } from '@angular/router';
import { PostService } from '../srevices/post.service';
import { Post } from '../DTO/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  loggedinUser: any;
  readonly defaultAvatar = 'assets/images/default-avatar.jpg';
  readonly defaultCover = 'assets/images/light-gray-background.jpg';
  userPosts: Post[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadUserFromStorage();
    this.loadInfo();
    this.loadUserPosts();
  }

  private loadUserFromStorage(): void {
    const storedUserInfo = localStorage.getItem('loggedInUser');
    if (storedUserInfo) {
      try {
        this.loggedinUser = JSON.parse(storedUserInfo);
        console.log('Loaded user:', this.loggedinUser);
      } catch (error) {
        console.error('Error parsing stored user info:', error);
        this.loggedinUser = null;
      }
    }
  }

  loadInfo(): void {
    if (!this.loggedinUser?.username) {
      console.warn('No username available to load info');
      return;
    }

    this.accountService.getLoggedInUser(this.loggedinUser.username).subscribe({
      next: (data) => {
        this.loggedinUser = data;
        console.log('User data loaded:', data);
        this.loadUserPosts();
      },
      error: (error) => {
        console.error('Error retrieving user info:', error);
      },
    });
  }

  loadUserPosts(): void {
    debugger;
    this.postService.getPostsByUserId(this.loggedinUser.id).subscribe({
      next: (data) => {
        debugger;
        this.userPosts = data;
        console.log('User posts loaded:', data);
      },
      error: (error) => {
        console.error('Error retrieving user posts:', error);
      },
    });
  }

  getProfileImage(): string {
    return this.loggedinUser?.profileImage || this.defaultAvatar;
  }

  getCoverImage(): string {
    return this.loggedinUser?.coverImage || this.defaultCover;
  }

  handleImageError(event: Event, type: 'profile' | 'cover' | 'post'): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      type === 'post'
        ? 'assets/images/placeholder.jpg'
        : type === 'profile'
        ? this.defaultAvatar
        : this.defaultCover;
    imgElement.onerror = null;
  }
}
