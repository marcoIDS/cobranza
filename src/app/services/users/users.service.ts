import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBase = "http://localhost:8080/"
  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get(this.apiBase+'users', {});
  }

  getUserById(userId:string){
    return this.http.get(this.apiBase+'users/'+userId, {});
  }

  deleteUser(userId:string){
    return this.http.delete(this.apiBase+'users/', { body : {userId}});
  }

  update(user:any){
    let id = user._id;
    delete user._id;
    return this.http.put(this.apiBase+'users/'+id, {user})
  }

  addUser(user:any){
    user.phone+='';
    return this.http.post(this.apiBase+'users', user);
  }
}
