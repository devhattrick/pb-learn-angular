import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError,tap} from 'rxjs/operators';
import {throwError,Subject} from 'rxjs';
import {User} from './user.model'

//! Response Payload
export interface AuthResponseData {
    //! kind 
    // kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http:HttpClient){}

    signup(email:string,password:string){
         return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmUfHWnH2NDsNoQ17_iOrVluQzVY6qypQ',
                {
                    email:email,
                    password:password,
                    returnSecureToken:true
                }
            ).pipe(catchError(this.handleError),tap(resData=>{
               this.handleAuthentication(
                   resData.email,
                   resData.localId,
                   resData.idToken,
                    +resData.expiresIn);
            }));
    }

    login(email:string,password:string){
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmUfHWnH2NDsNoQ17_iOrVluQzVY6qypQ',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError));
    }


    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const exprirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(
            email,
            userId,
            token,
            exprirationDate
            );
            this.user.next(user); //* ส่งค่ากลับไป ที่ user 
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage = 'error ไรไม่รู้'
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(()=>errorMessage)
                }
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This Email exists already';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'ไม่พบเมลนีิ้';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'รหัสผิดงับ';
                        break;

                }
                return throwError(()=> new Error(errorMessage))
    }
} 