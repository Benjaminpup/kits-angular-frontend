import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/data.service';
import { takeLast } from 'rxjs';
import { Location } from '@angular/common';
// import { AdminService } from '../admin.service';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  status: any[] = [];

  isEdit: boolean = false;

  // readonly passwordPattern: RegExp = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[!@#$%^&*()]).{8,}$/;
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    last_name: new FormControl("", Validators.pattern(/^[A-Za-z ]+$/)),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    ]),
    role: new FormControl("", [Validators.required]),
    sId: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    status: new FormControl(''),
  });

  options: string[] = ['Admin', 'CRO', 'Sponsor', 'CRA', 'Site Coordinator', 'Central Lab-Preparation', 'Central Lab-Verification', 'Central Lab-Distribution', 'Central Lab-Acknowledgement', 'Central Lab-Reports',];
  id: any;
  getUserData: any;
  sponsorDetails: any[] = [];
  sponsor: boolean = false;
  site: boolean = false;
  showPassword = false;

  siteDetails: any;
  idValue: any;
  view: boolean = false;
  countries: { key: number; name: string; }[] | undefined;
  states: { key: any; name: any; }[] | undefined;
  emailvalue: any;
  createdName: any;
  changedName: any;
  location: any;
  // passwordControl!: FormControl<any>;
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder,
    private _cro: CrosService,
    private messageService: MessageService,
    private dataService: DataService,
    private locationroute:Location
  ) {

  }
  getStatesObservable$ = null;

  ngOnInit(): void {
    this.countries = this.dataService.getCountries();
    this.userForm.get('country')?.valueChanges.subscribe(country => {
      this.getStatesForCountry(country);
    }); 

    this.status = [{
      'label': 'Active', 'id': 'active'
    },
    { 'label': 'In Active', 'id': 'inactive' }]
    // this.passwordControl = this.userForm.get('password') as FormControl;
    this.activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;

        this.adminService.getUserbyId(data.id).subscribe((data: any) => {
          this.getUserData = data.body;
          this.getUser()
         
          // this.getUserData.status = 'inactive'
          this.userForm.patchValue(this.getUserData);

          if (this.getUserData.role === 'admin' || this.getUserData.role === 'admin') {
            this.userForm.controls['role'].setValue('Admin')
          }
          this.userForm.controls['email'].disable();
          this.userForm.controls['role'].disable();
          // this.roleChange(event);
          if (this.getUserData.role === 'CRO') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()

          }
          else if (this.getUserData.role === 'Sponsor') {
            console.log(this.getUserData.sponsor_id)
            this.sponsor = true
            this.site = false
            this.getSponsorDetails()
            this.userForm.controls['sId'].setValue(this.getUserData.sponsor_id)
            this.userForm.controls['sId'].setValidators(Validators.required)
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'CRA') {



            this.sponsor = false
            this.site = true
            this.getSitedetails()
            this.userForm.controls['sId'].setValidators(Validators.required)
            this.userForm.controls['sId'].updateValueAndValidity()
            this.userForm.controls['sId'].setValue(this.getUserData.site_id)

          }
          else if (this.getUserData.role === 'Site Coordinator') {



            this.sponsor = false
            this.site = true
            this.getSitedetails()
            this.userForm.controls['sId'].setValidators(Validators.required)
            this.userForm.controls['sId'].updateValueAndValidity()
            this.userForm.controls['sId'].setValue(this.getUserData.site_id)

          }
          else if (this.getUserData.role === 'Central Lab-Preparation') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'Central Lab-Verification') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'Central Lab-Distribution') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'Central Lab-Acknowledgement') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'Central Lab-Reports') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
          }
          else if (this.getUserData.role === 'CRO') {
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()

          }
        });
      } else {
        this.isEdit = false;
      }
      if (data.val == 'view') {
        this.view = true
        this.userForm.disable()

      }
      else {

      }
      
    });

  }
  getUser() {
    console.log(this.getUserData.created_by)
    this.adminService.getUser().subscribe((data: any) => {
      data.filter((val:any) => {
        if (val.user_id === this.getUserData.created_by) { 
          this.createdName = val.first_name + ' ' + val.last_name 
        }
       if (val.user_id === this.getUserData.changed_by) {        
          this.changedName = val.first_name + ' ' + val.last_name
        }
      })
    })

  }

  roleChange(event: any) {

    this.idValue = event.target.value
    if (this.idValue === 'CRO') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Sponsor') {
      this.sponsor = true
      this.site = false
      this.getSponsorDetails()
      this.userForm.controls['sId'].setValidators(Validators.required)
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'CRA') {

      this.sponsor = false
      this.site = true
      this.getSitedetails()
      this.userForm.controls['sId'].setValidators(Validators.required)
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Site Coordinator') {

      this.sponsor = false
      this.site = true
      this.getSitedetails()
      this.userForm.controls['sId'].setValidators(Validators.required)
      this.userForm.controls['sId'].updateValueAndValidity()

    }


    else if (this.idValue === 'Central Lab') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()
    }
    else if (this.idValue === 'CRO') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Central Lab-Distribution') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Central Lab-Verification') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Central Lab-Preparation') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }
    else if (this.idValue === 'Admin' || this.idValue === 'admin') {
      this.sponsor = false
      this.site = false
      this.userForm.controls['sId'].clearValidators()
      this.userForm.controls['sId'].updateValueAndValidity()

    }

  }
  getStatesForCountry(country: any) {
    const payload = {
      country: country
    }

    const getStatesObservable$ = this.dataService.getAllStatesAPI(payload).pipe(takeLast(1));;
    getStatesObservable$.subscribe((res: any) => {
      console.log(res)
      if (res && res.body && res.body.states) {
        this.states = this.dataService.getStates(res.body.states);
        // this.addToStatesList(res.body.states, country);
      }

    });

  }
  getSitedetails() {
    this._cro.getSites().subscribe((data: any) => {

      this.siteDetails = data
    })

  }
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
  get passwordControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }
  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null;
  }
  getSponsorDetails() {
    this._cro.getsponsors().subscribe(
      (data: any) => {
        this.sponsorDetails = data
        console.log(data)
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
  }
  toTitleCase(str: string): string {

    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  reset() {
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.userForm.reset()
    }
  }
  goBack() {
    this.locationroute.back();
  }

  submit(): void {
    if (this.userForm.controls['first_name'].value === '' || this.userForm.controls['first_name'].value === undefined || this.userForm.controls['first_name'].value === null) {
    }
    else {
      this.userForm.controls['first_name'].setValue(this.toTitleCase(this.userForm.controls['first_name'].value));

    }
    if (this.userForm.controls['last_name'].value === '' || this.userForm.controls['last_name'].value === undefined || this.userForm.controls['last_name'].value === null) {
    }
    else {
      this.userForm.controls['last_name'].setValue(this.toTitleCase(this.userForm.controls['last_name'].value));
    }
    if (this.userForm.controls['email'].value === '' || this.userForm.controls['email'].value === undefined || this.userForm.controls['email'].value === null) {

    }
    else {
      this.emailvalue = this.userForm.controls['email'].value.toLowerCase();
    }


    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();

      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });

    } else {
      const userObj: any = {
        first_name: this.userForm.controls['first_name'].value,
        last_name: this.userForm.controls['last_name'].value,
        email: this.emailvalue,
        password: this.userForm.controls['password'].value,
        role: this.userForm.controls['role'].value,
        created_by: sessionStorage.getItem('userid')
      };
      if (this.idValue === 'CRA') {
        userObj.site_id = this.userForm.controls['sId'].value
        userObj.sponsor_id = ''
      }
      else if (this.idValue === 'Site Coordinator') {
        userObj.site_id = this.userForm.controls['sId'].value
        userObj.sponsor_id = ''
      }
      else if (this.idValue === 'Sponsor') {
        userObj.sponsor_id = this.userForm.controls['sId'].value
        userObj.site_id = ''
      }
      else {
        userObj.site_id = ''
        userObj.sponsor_id = ''
      }


      // 37e820d4-0098-4dd0-9c6b-a38db965062d

      if (this.isEdit) {

        userObj.status = this.userForm.controls['status'].value
        if (this.getUserData.role === 'CRA') {
          userObj.site_id = this.userForm.controls['sId'].value

          userObj.sponsor_id = ''
        }
        else if (this.getUserData.role === 'Site Coordinator') {
          userObj.site_id = this.userForm.controls['sId'].value
          userObj.sponsor_id = ''
        }

        else if (this.getUserData.role === 'Sponsor') {
          userObj.sponsor_id = this.userForm.controls['sId'].value
          userObj.site_id = ''
        }
        else {
          userObj.site_id = ''
          userObj.sponsor_id = ''
        }

        this.adminService.getUserUpdate(this.id, userObj).subscribe(
          (data: any) => {


            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'User Updated Successfully' });
            }, 1000);

            this.router.navigate(['/home/admin/userGrid']);
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });

          }
        );
      } else {
        userObj.status = 'active'


        this.adminService.createUser(userObj).subscribe(
          (data: any) => {
            console.log('User creation successful:', data);
        
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'User Added Successfully' });
            }, 1000);
        
            this.router.navigate(['/home/admin/userGrid']);
          },
          (err: any) => {
            console.error('User creation failed:', err);
        
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
        
      }
      // console.log(userObj)
    }
  }
  validateAlpha(input: any, phone: any) {
    let inputValue = input.value.trim();

    // Remove non-alphabetic characters
    let alphabeticValue = inputValue.replace(/[^a-zA-Z]/g, '\s');

    // Update the input field with the alphabetic value
    input.value = alphabeticValue;

    // Display an error message if non-alphabetic characters were removed
    if (inputValue !== alphabeticValue) {
      // this.messageService.add({severity:'error', summary:'', detail:'Take Alphabetic Values Only'});


      // You can also prevent form submission here if needed
      // For example: input.form.submit() or return false;
    }
  }
 

}