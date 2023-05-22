import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/model/Data.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl = environment.apiUrl + 'post.json';


  constructor(private http: HttpClient) { 
   }

   createPost(data: Post) {
    return this.http.post(this.postUrl, data);
   }

   fetchPostData() {
    return this.http.get(this.postUrl);
   }

   updatePost(data: Post) {
    const dataReq = { [data.id] : {
      title: data.title,
      content: data.content
  }};
    return this.http.patch(this.postUrl, dataReq);
   }

   deletePosts() {
    return this.http.delete(this.postUrl);
   }
}
 