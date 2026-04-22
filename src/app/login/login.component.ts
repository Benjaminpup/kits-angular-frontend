import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../applicationadmin/admin.service';
import { Router } from '@angular/router';
import { password1 } from 'src/password';
import { ThisReceiver } from '@angular/compiler';
import { MessageService } from 'primeng/api'
import 'bootstrap';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  forgotPassword:boolean = false;
  enableFields: boolean = false;
  showPassword: boolean = false;
  showPasswordc: boolean = false;
  @ViewChild('myModal') myModal: any;
  disableFields: boolean = false;
  emailvalue: any;
  emailvaluef: any;
  valid: boolean = false;
  constructor(private admin: AdminService, private route: Router, private formBuilder: FormBuilder,
    private messageService: MessageService, private elementRef: ElementRef,private renderer: Renderer2) { }
 
  loginForm!: FormGroup;
  forgetForm!: FormGroup;
  submitted = false;
 
 
 
  // Other methods...
 
  goBack() {
    this.enableFields = !this.enableFields;
  }
 
 
  // resendOTP() {
  //   // Logic to resend OTP to the user's email
  //   this.otpService.sendOTP(this.loginForm.get('username').value).subscribe(
  //     response => {
  //       console.log('OTP resent successfully');
  //     },
  //     error => {
  //       console.error('Error resending OTP', error);
  //     }
  //   );
  // }
 
 
 
 
 
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: [''],
 
    },
    );
    this.forgetForm = this.formBuilder.group({
      email1: ['', [Validators.required, Validators.email]],
      otp: [''],
      npassword: ['', [Validators.required, Validators.minLength(8)]],
      // npassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validators: password1('npassword', 'confirmPassword')
      })
 
  }
  reset() {
 
    if (this.forgetForm.controls['otp'].value === undefined || this.forgetForm.controls['otp'].value === '') {
      // alert('Please Enter Confirm Password')
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please Enter OTP' });
      this.valid = false
    }
    else if (this.forgetForm.controls['npassword'].value === '' || this.forgetForm.controls['npassword'].value === undefined) {
      // alert('Please Enter Password')
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please Enter New Password' });
      this.valid = false
    }
    else if (this.forgetForm.controls['confirmPassword'].value === undefined || this.forgetForm.controls['confirmPassword'].value === '') {
      // alert('Please Enter Confirm Password')
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please Enter Confirm Password' });
      this.valid = false
    }
   
    else {
      this.valid = true
      this.disableFields = true
    this.resetn()
   
   
      // const obj = {
      //   email: this.emailvaluef,
      //   password: this.forgetForm.controls['confirmPassword'].value,
      //   otp: 123456
      // }
 
      // this.admin.reset(obj).subscribe(
      //   (data: any) => {
      //     this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Password Reset Successfully' });
 
      //     this.route.navigate(['/login']);
      //     console.log(data);
      //     sessionStorage.setItem('role', data.role);
      //     sessionStorage.setItem('access_token', data.access_token);
      //     this.myModal.hide();
      //     this.reset()
      //   },
      //   (err: any) => {
      //     console.log(err); // Log the specific error message to the console
      //     this.valid = false
      //     this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Error occurred while resetting password' });
      //   }
      // );
      // ;
   
    }
 
  }
  resetn() {    
      this.disableFields = true
 
      const obj = {
        email: this.emailvaluef,
        password: this.forgetForm.controls['confirmPassword'].value,
        is_forgot:true,
        otp:  Number(this.forgetForm.controls['otp'].value)
      }
 
      this.admin.reset(obj).subscribe(
        (data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Password Reset Successfully',life: 10000 });
           setTimeout(() => {
          window.location.reload();
        }, 1000);
         
          this.route.navigate(['/login']);
          sessionStorage.setItem('role', data.role);
          sessionStorage.setItem('access_token', data.access_token);
          this.myModal.hide();
       
       
        },
        (err: any) => {
          console.log(err); // Log the specific error message to the console
          this.valid = false
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
        }
      );
     
   
   
 
  }
  login() {
    this.messageService.clear()
    const obj = {
      username: this.emailvalue,
      password: this.loginForm.controls['password'].value,
      clear_session: true,
      otp:  this.loginForm.controls['otp'].value
    }
    if(this.loginForm.controls['otp'].value === '' || this.loginForm.controls['otp'].value === undefined || this.loginForm.controls['otp'].value === null){
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter OTP' });
 
    }
    else{
      if(this.loginForm.controls['password'].value === '' || this.loginForm.controls['password'].value === undefined || this.loginForm.controls['password'].value === null){
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Password' });
 
      }
      else{
    this.admin.login(obj).subscribe(
      (data: any) => {
        console.log(data)
        // this.route.navigate(['/home'])
     
        console.log(data.role)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('userid', data.user_id)
        sessionStorage.setItem('access_token', data.access_token)
        // this.route.navigate(['/home/cro/dashboards'])
 
        this.admin.getUserbyId(data.user_id).subscribe((data: any) => {
          console.log(data);
          sessionStorage.setItem('firstName', data.body.first_name)
          sessionStorage.setItem('lastName', data.body.last_name)
          sessionStorage.setItem('email', data.body.email)
          sessionStorage.setItem('siteId', data.body.site_id)
          sessionStorage.setItem('sponsorId', data.body.sponsor_id)
          sessionStorage.setItem('fullName', data.body.first_name + ' '+data.body.last_name)
          this.route.navigate(['/home/cro/dashboards'])
        });
       
      },
     
      (err: any) => {
         console.log(err,"error from login")
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
      }
    }
  }
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
  set() {
  this.messageService.clear()
    this.emailvaluef = this.forgetForm.controls['email1'].value.toLowerCase();
    if(this.emailvaluef === '' || this.emailvaluef === undefined || this.emailvaluef === null){
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter User Name' });
 
    }
    else{
      this.disableFields = true
    const obj = {
      username: this.emailvaluef,
      clear_session: 'false',
      password: '',
      otp: ''
 
    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'OTP sent to your Email' });
 
        this.disableFields = true
        // this.route.navigate(['/home'])
      },
      (err: any) => {
 
        this.disableFields = false
 
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    ),
      this.admin['set'](obj).subscribe(
        (data: any) => {
          this.disableFields = true
          // this.route.navigate(['/home'])
        },
        (err: any) => {
 
          this.disableFields = false
 
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
        }
      )
    }
 
  }
  validateOTP(input: any, OTP: any) {
    let inputValue = input.value.trim();
   
    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');
 
    if(OTP ==='otp'){
    if (numericValue.length > 6) {
        numericValue = numericValue.slice(0, 6);
    }
  }
  input.value = numericValue;
}
 
  otp() {
    this.messageService.clear();
    this.emailvalue = this.loginForm.controls['username'].value.toLowerCase();
    if(this.emailvalue === '' || this.emailvalue === undefined || this.emailvalue === null){
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter User Name/Email' });
 
    }
    else{
    this.enableFields = true
    const obj = {
      username: this.emailvalue,
      password: '',
      clear_session: '',
      otp: ''
    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
 
        this.enableFields = true
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'OTP has been sent to your e-mail and it will be validate for the next 2 minutes.' });
 
 
        // this.route.navigate(['/home'])
      },
      (err: any) => {
 
        this.enableFields = false
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
 
      }
    )
  }
}
 
}