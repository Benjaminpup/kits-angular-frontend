import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from '../cros.service';
import { takeLast } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-test-create',
  templateUrl: './lab-test-create.component.html',
  styleUrls: ['./lab-test-create.component.css']
})
export class LabTestCreateComponent implements OnInit {
  countries: any
  stateenable: boolean | undefined;
  districtEnable: boolean | undefined;
  states: any
  createdName: any;
  changedName: any;
  submitZipcodeData:any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  myData: any;
  classifications = [];
  public isEdit: boolean = false;
  public id: any = '';
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  getcroData: any;
  mobile: any;
  view: boolean = false;
  constructor( private location: Location, private cro: CrosService, private admin: AdminService, 
    private _activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,
    private messageService: MessageService, private dataService: DataService
  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        cro.getLabById(data.id).subscribe((data: any) => {
          this.getcroData = data
          this.getUser()
          this.labTestCreateForm.patchValue({
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
          this.labTestCreateForm.controls['cro_code'].disable()
          // this.labTestCreateForm.controls['cro_name'].disable()
          // this.labTestCreateForm.controls['legal_cro_name'].disable()
          // this.labTestCreateForm.controls['email'].disable()

        });
        if (data.val == 'view') {
          this.view = true
          this.labTestCreateForm.disable()

        }
        else {

        }

      }
    });

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
  public labTestCreateForm: FormGroup = new FormGroup({
    cro_code: new FormControl("", [Validators.required]),
    cro_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    legal_cro_name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    address_1: new FormControl("", [Validators.required]),
    // classification: new FormControl(""),
    zipcode: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{5,6}$')]),
 
    country: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    district:new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    // city: new FormControl("", [Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]),
    // district: new FormControl("",Validators.pattern(/^[A-Za-z ]+$/)),
    // zip_code: new FormControl("", [Validators.required]),
    // country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    website: new FormControl("", [Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/)]),
    mobile_telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // Validators.required,
    // Validators.email,
    // this.emailDomainValidator.bind(this)

    // website: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.pattern(
    //     /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    //   ) // Regular expression pattern for URL validation
    // ]),

    // mobile_telephone: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('[0-9]{10}')
    // ]),
    
  });

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

  ngOnInit(): void {


    // this.countries = this.dataService.getCountries();
    // this.labTestCreateForm.get('country')?.valueChanges.subscribe(country => {

    //   this.getStatesForCountry(country);
    //   this.stateenable = true
    // });
    // this.labTestCreateForm.get('region')?.valueChanges.subscribe(country => {

    //   // this.getStatesForCountry(country);
    //   this.districtEnable = true
    // });
  }
  onZipcodeChange(): void {
    const zipcode = this.labTestCreateForm.get('zipcode')?.value ?? '';
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
          this.labTestCreateForm.patchValue({
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
  // getStatesForCountry(country: any) {
  //   const payload = {
  //     country: country
  //   }

  //   const getStatesObservable$ = this.dataService.getAllStatesAPI(payload).pipe(takeLast(1));;
  //   getStatesObservable$.subscribe((res: any) => {
  //     console.log(res)
  //     if (res && res.body && res.body.states) {
  //       this.states = this.dataService.getStates(res.body.states);
  //       // this.addToStatesList(res.body.states, country);
  //     }

  //   });

  // }

  shouldShowRequired(controlName: string): boolean {
    const control = this.labTestCreateForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {

    const control = this.labTestCreateForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.labTestCreateForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.labTestCreateForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }
  reset() {
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.labTestCreateForm.reset()
    }
  }
  toTitleCase(str: string): string {

    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  submit() {

    if (this.labTestCreateForm.controls['cro_name'].value) {
      this.labTestCreateForm.controls['cro_name'].setValue(this.toTitleCase(this.labTestCreateForm.controls['cro_name'].value));
    }
    if (this.labTestCreateForm.controls['legal_cro_name'].value) {
      this.labTestCreateForm.controls['legal_cro_name'].setValue(this.toTitleCase(this.labTestCreateForm.controls['legal_cro_name'].value));
    }
    if (this.labTestCreateForm.controls['address_1'].value) {
      this.labTestCreateForm.controls['address_1'].setValue(this.toTitleCase(this.labTestCreateForm.controls['address_1'].value));
    }
    // if (this.labTestCreateForm.controls['address_2'].value) {
    //   this.labTestCreateForm.controls['address_2'].setValue(this.toTitleCase(this.labTestCreateForm.controls['address_2'].value));
    // }
    // if (this.labTestCreateForm.controls['city'].value) {

    //   this.labTestCreateForm.controls['city'].setValue(this.toTitleCase(this.labTestCreateForm.controls['city'].value));
    // }
    // if (this.labTestCreateForm.controls['district'].value) {

    //   this.labTestCreateForm.controls['district'].setValue(this.toTitleCase(this.labTestCreateForm.controls['district'].value));

    // }

    if (this.labTestCreateForm.controls['mobile_telephone'].value === '' || this.labTestCreateForm.controls['mobile_telephone'].value === null) {
      this.mobile = ''
    }
    else {
      this.mobile = this.labTestCreateForm.controls['mobile_telephone'].value.toString()
    }
    if(this.labTestCreateForm.controls['mobile_telephone'].value){
      if (this.labTestCreateForm.controls['mobile_telephone'].invalid) {
   
        Object.keys(this.labTestCreateForm.controls).forEach(key => {
          this.labTestCreateForm.get(key)?.markAsTouched();
        });
   
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Valid Mobile Number' });
      }
    }
    if (this.labTestCreateForm.invalid) {
      Object.keys(this.labTestCreateForm.controls).forEach(key => {
        this.labTestCreateForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });
    }
    else {
      console.log(this.labTestCreateForm)
      const obj: any = {
        "cro_code": this.labTestCreateForm.controls['cro_code'].value,
        "cro_name": this.labTestCreateForm.controls['cro_name'].value,
        "legal_cro_name": this.labTestCreateForm.controls['legal_cro_name'].value,
        "address_1": this.labTestCreateForm.controls['address_1'].value,
        "city": this.labTestCreateForm.controls['city'].value,
        "district": this.labTestCreateForm.controls['district'].value,
        "region": this.labTestCreateForm.controls['state'].value,
        "zip_code": this.labTestCreateForm.controls['zipcode'].value,
        "country": this.labTestCreateForm.controls['country'].value,
        "office_telephone": this.labTestCreateForm.controls['office_telephone'].value,
        "mobile_telephone": this.mobile,
        "extension": this.labTestCreateForm.controls['extension'].value,
        "email": this.labTestCreateForm.controls['email'].value,
        "website": this.labTestCreateForm.controls['website'].value
      }
      if (this.isEdit) {
        obj.cro_id = this.id
        this.cro.updateLabDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Lab Updated Successfully' });
            }, 1000);


            this.router.navigate(['/home/cro/labGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
      }
      else {
        this.cro.CreateLabDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Lab Added Successfully' });
            }, 1000);

            this.router.navigate(['/home/cro/labGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
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
      if (numericValue.length > 12) {
        numericValue = numericValue.slice(0, 12);
      }
    }
    else {
      if (numericValue.length > 16) {
        numericValue = numericValue.slice(0, 16);
      }
    }

    input.value = numericValue;

  }
  goBack() {
    console.log("hi")
    this.location.back();
  }

}



