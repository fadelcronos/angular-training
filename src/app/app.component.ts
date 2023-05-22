import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Post } from './../model/Data.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/service/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('postFormUpdate') postFormUpdate: NgForm;
  @ViewChild('postForm') postForm: NgForm;
  loadedPosts = [];
  showLoading = false;
  postUrl = environment.apiUrl + 'post.json';
  error = null;
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    this.showLoading = true;
    this.postService.createPost(postData).subscribe(
      {
        next: () => {
        }, error: (err) => {
          this.error = err;
          this.error = null;
        }, complete: () => {
          this.showLoading = false;
          this.onFetchPosts();
        }
      }
    );
  }

  onFetchPosts() {  
    this.showLoading = true;
    this.postService.fetchPostData()
    .pipe(
      map(resData => {
        const postArray: Post[] = [];
        for (const key in resData) {
          postArray.push({
            ...resData[key],
            id: key
          })
        }
        return postArray;
      })
    )
    .subscribe({
      next: (data) => {
        this.loadedPosts = data;
      }, error: (err) => {
        this.error = err;
      }, complete: () => {
        this.showLoading = false;
      }
    })
  }

  onClearPosts() {
    this.showLoading = true;
    this.postService.deletePosts().subscribe({
      next: (response) => {
        this.loadedPosts = [];
      }, error: () => {

      }, complete: () => {
        this.showLoading = false;
        this.postFormUpdate.reset();
        this.postForm.reset();
        this.onFetchPosts();
      }
    })    
  }

  onUpdatePost(postData: Post) {
    this.showLoading = true;
    this.postService.updatePost(postData).subscribe({
      next: (response) => {
      }, error: () => {
  
      }, complete: () => {
        this.showLoading = false;
        this.onFetchPosts();
      }
    }
    );
  }

  onClickData(data: Post) {
   this.postFormUpdate.form.patchValue(data);
  }

  ngOnDestroy(): void {
  }
}
