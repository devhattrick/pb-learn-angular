import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService ,AuthResponseData} from "./auth.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})

export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = "";

    constructor(private authService:AuthService){

    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;

    }

    onSubmit(form:NgForm){
        // console.log('myForm',form.value);
        if(!form.valid){
            return ;
        }
        

        //* แทน email password ด้วย input
        const email = form.value.email;
        const password = form.value.password;

        let authObs:Observable<AuthResponseData>

        this.isLoading =true;
        if(this.isLoginMode){
         authObs =   this.authService.login(email,password)
        }else{
            //* ส่ง email password ไปที่ service ที่ function signup
       authObs = this.authService.signup(email,password)

        }   

        authObs.subscribe(
            resData =>{
            console.log('isRes auth',resData);
            this.isLoading =false;
            alert('Success');
        },errorMessage=>{
            console.log('auth Error',errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
            alert('Faild')
            // this.error = "Error ^%^&^%&##%"

        })

        form.reset();
    }
}