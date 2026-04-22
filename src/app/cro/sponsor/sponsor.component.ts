import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { MessageService } from 'primeng/api';
import { takeLast } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  states: any;
  stateenable: boolean | undefined;
  countries: any;
  districtEnable: boolean | undefined;
  edits: boolean = false;
  data: any;
  createdName: any;
  changedName: any;
  submitZipcodeData:any;
  view: boolean = false;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


  public isEdit: boolean = false;
  public id: any = '';
  myData: { text: any; value: any; }[] = [];
  mobile: any;
  sponsorDetails: [] = [];
  autoCode = '';
  contactForm: any
  public sponsorForm: FormGroup = new FormGroup({
    sponsor_code: new FormControl("", [Validators.required, Validators.minLength(5)]),
    existing_sponsor_code: new FormControl("", [Validators.required, Validators.minLength(5)]),
    sponsor_name: new FormControl("", [Validators.required, Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    legal_sponsor_name: new FormControl("", [Validators.required, Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
    address_1: new FormControl("", [Validators.required]),
    // address_2: new FormControl(""),
    zipcode: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{5,6}$')]),
 
    country: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    district:new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    // city: new FormControl("", [Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]),
    // district: new FormControl("",Validators.pattern(/^[A-Za-z ]+$/)),
    // region: new FormControl("", [Validators.required]),
    // zip_code: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    // country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    website: new FormControl("", [Validators.pattern(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/)]),
    mobile_telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    // oemails: new FormControl(''),
  });
  editcontactsForm: any
  contactDetails: [] = []
  // view: boolean = false;
  table: boolean = false;
  tableE: boolean = false;


  constructor(
    private route: Router,
    private _cro: CrosService,
    private _activatedRoute: ActivatedRoute,
    private admin: AdminService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private location: Location
  ) {
    this._activatedRoute.params.subscribe((data: any) => {

      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _cro.getSponsorById(data.id).subscribe((data: any) => {
          this.data  = data
          this.getUser()
          this.contactDetails = data.notifier_details
          if (this.contactDetails.length > 0) {
            this.tableE = true
          }

          this.setContactFormValues(this.contactDetails);

          // console.log(data.country)
          // this.sponsorForm.controls['country'].setValue(data.country)
          // this.sponsorForm.controls['country'].setValue(data.country)
          this.sponsorForm.controls['existing_sponsor_code'].disable()
          this.sponsorForm.controls['sponsor_code'].disable()
          // this.sponsorForm.controls['legal_sponsor_name'].disable()
          this.sponsorForm.controls['email'].disable()
          this.sponsorForm.patchValue({
            sponsor_code: data?.sponsor_code ?? '',
            sponsor_name: data?.sponsor_name ?? '',
            legal_sponsor_name: data?.legal_sponsor_name ?? '',
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
        });

      }
      if (data.val == 'view') {
        this.view = true
        this.sponsorForm.disable()

      }
      else {

      }
    });
  }
  ngOnInit(): void {
    // this.countries = this.dataService.getCountries();
    // this.sponsorForm.get('country')?.valueChanges.subscribe((country: any) => {

    //   this.getStatesForCountry(country);
    //   this.stateenable = true

    // });
    // this.sponsorForm.get('region')?.valueChanges.subscribe((country: any) => {

    //   // this.getStatesForCountry(country);
    //   this.districtEnable = true
    // })

    this.contactForm = this.formBuilder.group({
      contacts: this.formBuilder.array([])
    });

    this.editcontactsForm = this.formBuilder.group({
      editcontacts: this.formBuilder.array([]),
    });
    if (this.isEdit === true) {

    } else {
      this.getSponsorDetails()
    }
  }
  onZipcodeChange(): void {
    const zipcode = this.sponsorForm.get('zipcode')?.value ?? '';
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
          this.sponsorForm.patchValue({
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
        if (val.user_id === this.data.created_by) { 
          this.createdName = val.first_name + ' ' + val.last_name 
        }
       if (val.user_id === this.data.changed_by) {        
          this.changedName = val.first_name + ' ' + val.last_name
        }
      })
    })
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
  removeeditsponser(j: number) {
    this.editcontactsForm.get('editcontacts').removeAt(j);
  }

  removeSponsor(j: number) {
    this.contactForm.get('contacts').removeAt(j);
  }
  setContactFormValues(contacts: any[]) {
    const contactFormArray = this.editcontactsForm.get('editcontacts') as FormArray;

    while (contactFormArray.length) {
      contactFormArray.removeAt(0);
    }

    this.contactDetails.forEach((contact: any) => {

      const editcontactsForm = this.formBuilder.group({
        first_name: [contact.first_name],
        last_name: [contact.last_name],
        email: [contact.email],
        contact: [contact.contact],
        designation: [contact.designation],
        editable: [contact.editable]

      });

      contactFormArray.push(editcontactsForm);
    });
    if (this.view === true) {
      contactFormArray.controls.forEach((control) => {
        control.disable();
      });

      this.editcontactsForm.disable();
    }
  }
  get contactControls() {
    return (this.contactForm.get('contacts') as FormArray).controls;
  }

  createContacte() {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      designation: [''],
      editable: ['']

    });
  }
  createContact() {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      designation: [''],
      editable: ['true']

    });
  }

  addContact() {
    this.table = true
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.push(this.createContact());
  }
  addContacte() {
    this.tableE = true
    const contacts = this.editcontactsForm.get('editcontacts') as FormArray;
    contacts.push(this.createContacte());
    this.edits = !this.edits;
  }
  getSponsorDetails() {
    this._cro.getsponsors().subscribe(
      (data: any) => {
        this.sponsorDetails = data.length + 1
        this.autoCode = 'SP00' + this.sponsorDetails
        this.sponsorForm.controls['sponsor_code'].setValue(this.autoCode)
        this.sponsorForm.controls['sponsor_code'].disable()
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }
  reset() {
 
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.sponsorForm.reset()
    }
  }
  toTitleCase(str: string): string {

    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

 























  submit() {
    console.log(this.sponsorForm);
    console.log(this.submitZipcodeData)
    // this.sponsorForm.controls['sponsor_name'].setValue(this.capitalizeFirstLetter(this.sponsorForm.controls['sponsor_name'].value));
    // this.sponsorForm.controls['legal_sponsor_name'].setValue(this.capitalizeFirstLetter(this.sponsorForm.controls['legal_sponsor_name'].value));
    // // Assign the trimmed contacts to the notifier_details property of the obj object

    if (this.sponsorForm.controls['sponsor_name'].value) {
      this.sponsorForm.controls['sponsor_name'].setValue(this.toTitleCase(this.sponsorForm.controls['sponsor_name'].value));
    }
    if (this.sponsorForm.controls['legal_sponsor_name'].value) {
      this.sponsorForm.controls['legal_sponsor_name'].setValue(this.toTitleCase(this.sponsorForm.controls['legal_sponsor_name'].value));
    }
    if (this.sponsorForm.controls['address_1'].value) {
      this.sponsorForm.controls['address_1'].setValue(this.toTitleCase(this.sponsorForm.controls['address_1'].value));
    }
    // if (this.sponsorForm.controls['address_2'].value) {
    //   this.sponsorForm.controls['address_2'].setValue(this.toTitleCase(this.sponsorForm.controls['address_2'].value));
    // }
    // if (this.sponsorForm.controls['city'].value) {

    //   this.sponsorForm.controls['city'].setValue(this.toTitleCase(this.sponsorForm.controls['city'].value));

    // }
    // if (this.sponsorForm.controls['district'].value) {

    //   this.sponsorForm.controls['district'].setValue(this.toTitleCase(this.sponsorForm.controls['district'].value));

    // }
    if (this.sponsorForm.controls['mobile_telephone'].value === '' || this.sponsorForm.controls['mobile_telephone'].value === null) {
      this.mobile = ''
    }
    else {
      this.mobile = this.sponsorForm.controls['mobile_telephone'].value.toString()
    }


    if (this.sponsorForm.controls['email'].invalid) {

      Object.keys(this.sponsorForm.controls).forEach(key => {
        this.sponsorForm.get(key)?.markAsTouched();
      });

      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Valid Email' });
    }
    // If email is valid (matches email pattern), show a success toast message
    // else if (this.sponsorForm.invalid) {
    //   Object.keys(this.sponsorForm.controls).forEach(key => {
    //     this.sponsorForm.get(key)?.markAsTouched();
    //   });

    //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });
    // }
    else {

      const obj: any = {
        "sponsor_code": this.sponsorForm.controls['sponsor_code'].value,
        "existing_sponsor_code": this.sponsorForm.controls['existing_sponsor_code'].value,
        "sponsor_name": this.sponsorForm.controls['sponsor_name'].value,
        "legal_sponsor_name": this.sponsorForm.controls['legal_sponsor_name'].value,
        "address_1": this.sponsorForm.controls['address_1'].value,
        // "address_2": this.sponsorForm.controls['address_2'].value,
        "city": this.sponsorForm.controls['city'].value,
        "district": this.sponsorForm.controls['district'].value,
        "region": this.sponsorForm.controls['state'].value,
        "zip_code": this.sponsorForm.controls['zipcode'].value,
        "country": this.sponsorForm.controls['country'].value,
        "office_telephone": this.sponsorForm.controls['office_telephone'].value,
        "mobile_telephone": this.mobile,
        "extension": this.sponsorForm.controls['extension'].value,
        "email": this.sponsorForm.controls['email'].value,
        "website": this.sponsorForm.controls['website'].value,
        "user_id": sessionStorage.getItem('userid'),
        

      }

      if (this.isEdit) {
        obj.sponsor_id = this.id
        console.log("payload here",obj)
        const trimmedContactse = this.editcontactsForm.value.editcontacts.map((contact: any) => {
          return {
            ...contact,
            email: contact.email.trim(),
            editable: 'true'
          };
        });
        obj.notifier_details = trimmedContactse
        this._cro.updateSponsorDetails(obj).subscribe(
          (data: any) => {
            console.log("update data",data,obj)
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sponsor Updated Successfully' });
            }, 1000);

            this.route.navigate(['/home/cro/sponsorGrid'])

          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
      }
      else {
        
        const trimmedContacts = this.contactForm.value.contacts.map((contact: any) => {
          return {
            ...contact,
            email: contact.email.trim()
          };
        });


        obj.notifier_details = trimmedContacts

        this._cro.CreateSponsorDetails(obj).subscribe(

          (data: any) => {
            console.log(obj,"obgggggggggggggggggggggggggg")

            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sponsor Added Successfully' });
            }, 1000);
            this.route.navigate(['/home/cro/sponsorGrid'])
          },
          (err: any) => {

            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.error });

          }
        )
      }
    }

  }

  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['gmail.com', 'officemails.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null; // Return null for valid email format
  }

  validateMobileNumber(input: any, phone: any) {
    let inputValue = input.value.trim();

    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if (phone === 'mobile') {
      if (numericValue.length > 20) {
        numericValue = numericValue.slice(0, 20);
      }
    }
    else {
      if (numericValue.length > 20) {
        numericValue = numericValue.slice(0, 20);
      }
    }

    input.value = numericValue;

  }


  goBack() {
    console.log("hi")
    this.location.back();
  }

}