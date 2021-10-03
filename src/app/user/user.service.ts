import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from './user';
import { AddUserRequest } from './adduser';
import { DeleteUserRequest } from './deleteuser';
import { tap } from 'rxjs/operators';
import { IUserType } from './usertype';

/**
 * Service class that handles the user related operations
 */
@Injectable({
    providedIn:"root"
})
export class UserService{
    private loginUrl: string = "api/userLogin";
    private addUserUrl: string = "api/addUser";
    private deleteUserUrl: string = "api/deleteUser";
    private getAllUsersUrl: string = "api/getAllUsers";
    private getAllUserTypesUrl: string = "api/getAllUserType";
    private USER_COOKIE: string= "userCookie";

    redirectUrl: string;
    user: User;

    constructor(private http: HttpClient, private cookieService: CookieService){
    }

    public login(userName: string, password: string):Observable<User>{
        let param:any={'userName':userName, 'password':btoa(password)};
        return this.http.get<User>(this.loginUrl,{params: param}).pipe(
            tap(user=> {
                console.log(JSON.stringify(user));
                this.cookieService.set(this.USER_COOKIE, JSON.stringify(user), .125);
            })
        );
    }

    public addUser(addUserRequest: AddUserRequest): Observable<User>{
        return this.http.post<User>(this.addUserUrl, addUserRequest).pipe(
            tap(newUser => {
                console.log("New user added: "+newUser);
            })
        );
    }

    public deleteUser(deleteUserRequest: DeleteUserRequest): Observable<boolean>{
        return this.http.post<boolean>(this.deleteUserUrl, deleteUserRequest).pipe(
            tap(status => {
                console.log("Delete status: "+status);
            })
        );
    }

    public getAllUsers():Observable<User[]>{
        let param:any={'userId':this.user.userId, 'sessionId':this.user.sessionId};
        return this.http.get<User[]>(this.getAllUsersUrl,{params: param}).pipe(
            tap(users => {
                console.log(JSON.stringify(users));
            })
        );
    }

    public getAllUserTypes():Observable<IUserType[]>{
        let param:any={'userId':this.user.userId, 'sessionId':this.user.sessionId};
        return this.http.get<IUserType[]>(this.getAllUserTypesUrl, {params: param}).pipe(
            tap(userTypes=>{
                console.log(JSON.stringify(userTypes));
            })
        );
    }

    public isLoggedIn(): boolean{
        if(! this.user){
            if(this.cookieService.get(this.USER_COOKIE))
                this.user = JSON.parse(this.cookieService.get(this.USER_COOKIE));
        }

        return !!this.user;
    }

    public getUser(): User {
        return this.user;
    }
    public setUser(value: User) {
        this.user = value;
    }

    public logout(): void{
        this.cookieService.deleteAll('/','/');
        this.cookieService.deleteAll('../ ');
        this.cookieService.delete(this.USER_COOKIE,'/','/');
        this.user = null;
    }
    
    public setRedirectUrl(url: string): void{
        this.redirectUrl = url;
    }



}

