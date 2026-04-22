
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors, Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { takeLast } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crocreate',
  templateUrl: './crocreate.component.html',
  styleUrls: ['./crocreate.component.css']
})
export class CROcreateComponent implements OnInit {
  myData: any;
  public isEdit: boolean = false;
  public id: any = '';
  getcroData: any;
  mobile: any;
  view: boolean = false;
  countries: any;
  states: any;
  districtEnable: boolean | undefined;
  stateenable: boolean | undefined;
  createdName: any;
  changedName: any;
  submitZipcodeData:any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  constructor(private admin: AdminService,
    private _activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,
    private messageService: MessageService, private dataService: DataService, private location: Location
  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        admin.getCrobyId(data.id).subscribe((data: any) => {
          this.getcroData = data;
          console.log("edit data",data)
          this.getUser();
        
            this.CroForm.patchValue({
              cro_code: data?.cro_code ?? '',
              cro_name: data?.cro_name ?? '',
              legal_cro_name: data?.legal_cro_name ?? '',
              address_1: data?.address_1 ?? '',
              country: data?.country ?? '',
              state: data?.region ?? '',
              district: data?.district ?? '',
              city: data?.city ?? '',
              zipcode: data?.zip_code ?? '',
              office_telephone: data?.office_telephone ?? '',
              extension: data?.extension ?? '',
              email: data?.email ?? '',
              website: data?.website ?? '',
              mobile_telephone: data?.mobile_telephone ?? ''
            })
          
          this.CroForm.controls['cro_code'].disable()
          // this.CroForm.controls['cro_name'].disable()
          // this.CroForm.controls['legal_cro_name'].disable()
          // this.CroForm.controls['email'].disable()
 
        });
        if (data.val == 'view') {
          this.view = true
          this.CroForm.disable()
 
        }
        else {
 
        }
 
      }
    });
 
  }
 
 
  public CroForm: FormGroup = new FormGroup({
 
    cro_code: new FormControl("", [Validators.required]),
    cro_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    legal_cro_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    address_1: new FormControl("", [Validators.required]),
    zipcode: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{5,6}$')]),

    country: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    district:new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    website: new FormControl("", [Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/)]),
    mobile_telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
 
  });
  private capitalizeFirstLetter(value: string): string {
 
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
 
 
  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['gmail.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null; // Return null for valid email format
  }
 
  getStatesObservable$ = null;
  ngOnInit(): void {
 
 
    // this.countries = this.dataService.getCountries();
    // this.CroForm.get('country')?.valueChanges.subscribe(country => {
 
    //   this.getStatesForCountry(country);
    //   this.stateenable = true
 
    // });
    // this.CroForm.get('region')?.valueChanges.subscribe(country => {
 
      // this.getStatesForCountry(country);
    //   this.districtEnable = true
    // });
   
   
  }

  onZipcodeChange(): void {
    const zipcode = this.CroForm.get('zipcode')?.value ?? '';
    if (zipcode.length === 5 || zipcode.length === 6) {
      this.checkZipcode(zipcode);
    }
  }

  checkZipcode(zipcode: any): void {
    this.admin.getLocationbyId(zipcode).subscribe(
      (data: any) => {
        if (data.error) {
          Swal.fire(`Error: ${data.error} please enter valid zipcode`);
        } else {
          console.log("zipcodedata", data);
          this.submitZipcodeData=data;
          this.countries = data?.countries ?? [];
          this.states = data?.states ?? [];
          this.CroForm.patchValue({
            country: data?.country ?? '',
            state: data?.state ?? '',
            district: data?.district ?? '',
            city: data?.city ?? ''
          });
        }
      },
      (error: any) => {
        console.error("Error fetching location data", error);
        const errorMessage = error?.error?.message || 'An error occurred while fetching location data.';
        alert(`Error: ${errorMessage}`);
      }
    );
  }





  getUser() {
    this.admin.getUser().subscribe((data: any) => {
      data.filter((val:any) => {
        if (val.user_id === this.getcroData.created_by) {
          this.createdName = val.first_name + ' ' + val.last_name
        }
       if (val.user_id === this.getcroData.changed_by) {        
          this.changedName = val.first_name + ' ' + val.last_name
        }
      })
    })
  }
  //  getStatesForCountry(country: any) {
  //   const payload = {
  //     country: country
  //   }
 
  //   const getStatesObservable$ = this.dataService.getAllStatesAPI(payload).pipe(takeLast(1));;
  //   getStatesObservable$.subscribe((res: any) => {
  //     console.log(res)
  //     if (res && res.body && res.body.states) {
  //       console.log(res.body.states)
  //       this.states = this.dataService.getStates(res.body.states);
        // this.addToStatesList(res.body.states, country);
  //     }
 
  //   });
  // }
 
  shouldShowRequired(controlName: string): boolean {
    const control = this.CroForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
 
  shouldShowLengthError(controlName: any): boolean {
 
    const control = this.CroForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.CroForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.CroForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }
  reset() {
 
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.CroForm.reset()
    }
  }
  toTitleCase(str: string): string {
 
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  submit() {
    console.log(this.CroForm);
    console.log(this.submitZipcodeData)
    if (this.CroForm.controls['cro_name'].value) {
      this.CroForm.controls['cro_name'].setValue(this.toTitleCase(this.CroForm.controls['cro_name'].value));
    }
    if (this.CroForm.controls['legal_cro_name'].value) {
      this.CroForm.controls['legal_cro_name'].setValue(this.toTitleCase(this.CroForm.controls['legal_cro_name'].value));
    }
    // if (this.submitZipcodeData['city']) {
 
    //   this.submitZipcodeData['city'].setValue(this.toTitleCase(this.submitZipcodeData['city']));
 
    // }
    // if (this.submitZipcodeData['district']) {
 
    //   this.submitZipcodeData['district'].setValue(this.toTitleCase(this.submitZipcodeData['district']));
 
    // }
    if (this.CroForm.controls['address_1'].value) {
      this.CroForm.controls['address_1'].setValue(this.toTitleCase(this.CroForm.controls['address_1'].value));
    }
    // if (this.CroForm.controls['address_2'].value) {
    //   this.CroForm.controls['address_2'].setValue(this.toTitleCase(this.CroForm.controls['address_2'].value));
    // }
 
    if (this.CroForm.controls['mobile_telephone'].value === '' || this.CroForm.controls['mobile_telephone'].value === null) {
      this.mobile = ''
    }
    else {
      this.mobile = this.CroForm.controls['mobile_telephone'].value.toString()
    }
    if(this.CroForm.controls['mobile_telephone'].value){
    if (this.CroForm.controls['mobile_telephone'].invalid) {
 
      Object.keys(this.CroForm.controls).forEach(key => {
        this.CroForm.get(key)?.markAsTouched();
      });
 
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Valid Mobile Number' });
    }
  }
 
    if (this.CroForm.invalid) {
      Object.keys(this.CroForm.controls).forEach(key => {
        this.CroForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });
 
 
    }
    else {
      console.log(this.CroForm);
      const obj: any = {
        "cro_code": this.CroForm.controls['cro_code'].value,
        "cro_name": this.CroForm.controls['cro_name'].value,
        "legal_cro_name": this.CroForm.controls['legal_cro_name'].value,
        "address_1": this.CroForm.controls['address_1'].value,
        "city": this.CroForm.controls['city'].value,
        "district": this.CroForm.controls['district'].value,
        "region": this.CroForm.controls['state'].value,
        "zip_code": this.CroForm.controls['zipcode'].value,
        "country": this.CroForm.controls['country'].value,
        "office_telephone": this.CroForm.controls['office_telephone'].value,
        "mobile_telephone": this.mobile,
        "extension": this.CroForm.controls['extension'].value,
        "email": this.CroForm.controls['email'].value,
        "website": this.CroForm.controls['website'].value
      }
      if (this.isEdit) {
        obj.cro_id = this.id;
        console.log("payload here",obj)
        this.admin.updateCroDetaild(obj).subscribe(
          (data: any) => {
            console.log("update data",data,obj)
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'CRO Details Updated Successfully' });
            }, 1000);
 
 
            this.router.navigate(['/home/admin/croGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
      }
      else {
        this.admin.CreateCroDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'CRO Details Added Successfully' });
            }, 1000);
 
            this.router.navigate(['/home/admin/croGrid'])
          },
          (err: any) => {
 
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.error });
          }
        )
      }
    
    }
  }



















  validateMobileNumber(input: any, phone: any) {
    let inputValue = input.value.trim();
 
    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');
 
    if (phone === 'mobile') {
      if (numericValue.length > 20) {
        numericValue = numericValue.slice(0, 12);
      }
    }
    else {
      if (numericValue.length > 20) {
        numericValue = numericValue.slice(0, 16);
      }
    }
 
    input.value = numericValue;
 
  }
   goBack() {
    this.location.back();
  }
 
}