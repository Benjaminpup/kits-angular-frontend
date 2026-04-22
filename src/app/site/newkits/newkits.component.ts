import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-newkits',
  templateUrl: './newkits.component.html',
  styleUrls: ['./newkits.component.css']
})
export class NewkitsComponent implements OnInit {
  totalCountR =  0;
  reports: boolean = false;
  subject: boolean = false;
  inventory: boolean= false;
  inventoryData: any;
  totalCountI: any;
  id: any;
  
  display: boolean = false;
  pdfValuesview: any;
  heading: string = '';
  craname: any = '';
  variants: any;
  uniquePatientIds: any;
  uniquePatientAge: any
  uniquePatientIdsr: any;
  inventoryfiltered: any;
  variantsReports: any;
  descriptionReports: any;
  reportsfiltered: any;
  subjectsfiltered: any;
  variantssubjects: any;
  name: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  classifications = ['Select CRA','Eliot', 'Ruffel'];
  Age = [10,20, 30, 40, 50, 60,70];
  Age1 = [10,20, 30, 40, 50, 60,70];
  Gender =  ['Male','Female']
  site= ['S001', 'S0002', 'S0003', 'S0004']
  Study = ['20001-002', '20001-001', '20001-007']
  visit = ['Visit1', 'Visit2', 'Visit3', 'Visit4','Visit5', 'Visit6']
  access = ['314321346', '254321346', '654321346','554321346']
  subjectDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText: any
  isMenuOpen: boolean = false;
  reportsDetails: any;
 
 // 1 for ascending, -1 for descending
 public inventoryForm: FormGroup = new FormGroup({
  kit_type: new FormControl(""),
  from_date: new FormControl(""),
  to_date: new FormControl(""), 
 });
 public subjectForm: FormGroup = new FormGroup({
  patient_id: new FormControl(""),
  kit_type: new FormControl(""),
  age: new FormControl(""), 
  gender: new FormControl(""),
 });
 public reportsForm: FormGroup = new FormGroup({
  patient_id: new FormControl(""),
  kit_type: new FormControl(""),

  from_date: new FormControl(""),
  to_date: new FormControl(""), 
  visit: new FormControl(""), 
 });
  constructor(private route: Router,
    private admin: AdminService,
    private protocol:ProtocolService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private croService: CrosService) { }
  pageChange(event: number) {
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.page = event;
    // this.getInventorys()
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.craname =sessionStorage.getItem('fullName')
  
    
    });
    this.croService.getSiteById(sessionStorage.getItem('siteId')).subscribe((data: any) => {
     
      this.name = data.site_data_name
  
  
    });
    if (this.route.url === '/home/site/labReports'+ '/'+this.id) {
      this.heading  = 'Lab Reports'
      this.getReports()
      this.reports = true
      this.subject = false
      this.inventory = false
      this.reportsForm.get('from_date')?.valueChanges.subscribe((value) => {
        this.reportsForm.get('to_date')?.setValidators([this.validateToDate(value)]);
        this.reportsForm.get('to_date')?.updateValueAndValidity();
      });
      this.classifications = ['Select Type','Lab Result', 'Cancellation'];
    } 
    else if (this.route.url === '/home/site/newkits'+ '/'+this.id) {
      this.heading  = 'Study Subject'
      this.getsubjectDetails();
      this.subject = true
      this.reports = false
      this.inventory = false
      this.classifications = ['Select CRA','Eliot', 'Ruffel'];
   }
   else if (this.route.url === '/home/site/inventory') {
    this.getInventory();
    this.subject = false
    this.reports = false
    this.inventory = true
    this.classifications = ['Select Type','screening ', 'Visit'];
    this.inventoryForm.get('from_date')?.valueChanges.subscribe((value) => {
      this.inventoryForm.get('to_date')?.setValidators([this.validateToDate(value)]);
      this.inventoryForm.get('to_date')?.updateValueAndValidity();
    });
 }
  }
 
  openDialog(value: any){
    this.display = true;
    this.pdfValuesview = value;
  }
  validateToDate(selectedFromDate: string) {
    return (control:any) => {
      if (control.value < selectedFromDate) {
        return { invalidToDate: true };
      }
      return null;
    };
  }
  getReports(){
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.reportsfiltered = []
    const obj: any ={
      age:'',
      gender:'',
      kit_type: this.reportsForm.controls['kit_type'].value, 
      patient_id: this.reportsForm.controls['patient_id'].value,
      from_date: this.reportsForm.controls['from_date'].value,
      to_date: this.reportsForm.controls['to_date'].value,
      // visit: this.reportsForm.controls['visit'].value, 
    }
    this.protocol.kitsnsv(this.id, sessionStorage.getItem('siteId'), obj).subscribe(
      (data: any) => {
        this.reportsfiltered = data.data
        const patientIdsSetr = new Set(data.data.map((item: any) => item.patientId).filter((id:any) => id !== undefined));
        this.uniquePatientIdsr = Array.from(patientIdsSetr);
        const kitvariantr = new Set(data.data.map((item: any) => item.kit_variant).filter((id:any) => id !== undefined)); 
        this.variantsReports = Array.from(kitvariantr)
        const kitdescriptionr = new Set(data.data.map((item: any) => item.description).filter((id:any) => id !== undefined)); 
        this.descriptionReports = Array.from(kitdescriptionr)
        // console.log(this.variantsReports)
        this.totalCountR = this.reportsfiltered.length
       
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )  
  }
  getReportss(){
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.reportsDetails = []
    const obj: any ={
      age:'',
      gender:'',
      kit_type: this.reportsForm.controls['kit_type'].value, 
      patient_id: this.reportsForm.controls['patient_id'].value,
      from_date: this.reportsForm.controls['from_date'].value,
      to_date: this.reportsForm.controls['to_date'].value,
      // visit: this.reportsForm.controls['visit'].value, 
    }
    if(this.reportsForm.controls['from_date'].value  && (this.reportsForm.controls['to_date'].value === '')){
      this.messageService.add({severity:'error', summary:'Error Message', detail:'To Date is Required'});    
    }
    else if(this.reportsForm.controls['to_date'].value  && (this.reportsForm.controls['from_date'].value === '')){
      this.messageService.add({severity:'error', summary:'Error Message', detail:'From Date is Required'});
    }
    else{
    this.protocol.kitsnsv(this.id, sessionStorage.getItem('siteId'), obj).subscribe(
      (data: any) => {
        this.reportsDetails = data.data
       if(this.reportsForm.controls['kit_type'].value === ''){
         this.reportsfiltered = this.reportsDetails
        }
        else{
          this.reportsfiltered = this.reportsDetails.filter((item:any) => item.kit_variant === this.reportsForm.controls['kit_type'].value);
        }    
        this.totalCountR = this.reportsfiltered.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
    }
  }
  getsubjectDetailss() {
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.subjectDetails = []
    const obj: any ={
     age: this.subjectForm.controls['age'].value,
     gender:this.subjectForm.controls['gender'].value,
     kit_type: this.subjectForm.controls['kit_type'].value, 
     patient_id: this.subjectForm.controls['patient_id'].value,
     from_date: '',
     to_date: ''
   }
   this.protocol.kitsnsv(this.id, sessionStorage.getItem('siteId'), obj).subscribe(
     (data: any) => {
       this.subjectDetails = data.data 
       if(this.subjectForm.controls['kit_type'].value === ''){
        this.subjectsfiltered = this.subjectDetails
       }
       else{
     
         this.subjectsfiltered = this.subjectDetails.filter((item:any) => item.kit_variant === this.subjectForm.controls['kit_type'].value);
       }  
       this.totalCountR = this.subjectsfiltered.length
       
     },
     (err: any) => {
       this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
     }
   ) 
 }
  getsubjectDetails() {
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.subjectsfiltered =[]
     const obj: any ={
      age: this.subjectForm.controls['age'].value,
      gender:this.subjectForm.controls['gender'].value,
      kit_type: this.subjectForm.controls['kit_type'].value, 
      patient_id: this.subjectForm.controls['patient_id'].value,
      from_date: '',
      to_date: ''
    }
    this.protocol.kitsnsv(this.id, sessionStorage.getItem('siteId'), obj).subscribe(
      (data: any) => {
    
        this.subjectsfiltered = data.data
        const patientIdsSet = new Set(data.data.map((item: any) => item.patientId).filter((id:any) => id !== undefined));
        // Convert the Set back to an array (if needed)
        this.uniquePatientIds = Array.from(patientIdsSet);
        const patientAgesSet = new Set(data.data.map((item: any) => item.patientAge).filter((id:any) => id !== undefined));
        this.uniquePatientAge = Array.from(patientAgesSet);
        const kitvariants= new Set(data.data.map((item: any) => item.kit_variant).filter((id:any) => id !== undefined)); 
        this.variantssubjects = Array.from(kitvariants)
        console.log(this.variantssubjects)
        this.totalCountR = this.subjectsfiltered.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    ) 
  }
  resetL(){
    this.reportsForm=new FormGroup({
      patient_id: new FormControl(""),
      kit_type: new FormControl(""),
      from_date: new FormControl(""),
      to_date: new FormControl(""), 
      visit: new FormControl(""), 
    });
    this.getReports()
  }
  resets(){
    this.subjectForm = new FormGroup({
      patient_id: new FormControl(""),
      kit_type: new FormControl(""),
      age: new FormControl(""), 
      gender: new FormControl(""),
     });
     this.getsubjectDetails() 
  }
  reseti(){
    this.inventoryForm = new FormGroup({
      kit_type: new FormControl(""),
      from_date: new FormControl(""),
      to_date: new FormControl(""), 
    });
    this.getInventory()
  }
  getInventorys(){
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.inventoryData = []
    const obj: any ={
      from_date :this.inventoryForm.controls['from_date'].value,
      to_date:this.inventoryForm.controls['to_date'].value,
      kit_type:this.inventoryForm.controls['kit_type'].value
    } 
    if(this.inventoryForm.controls['from_date'].value  && (this.inventoryForm.controls['to_date'].value === '')){
      this.messageService.add({severity:'error', summary:'Error Message', detail:'To Date is Required'}); 
    }
    else if(this.inventoryForm.controls['to_date'].value  && (this.inventoryForm.controls['from_date'].value === '')){
      this.messageService.add({severity:'error', summary:'Error Message', detail:'From Date is Required'});
    }
    else{
    
      this.protocol.kitsinventory(sessionStorage.getItem('siteId'), obj).subscribe(
        (data: any) => {
          this.inventoryData = data.data
        if(this.inventoryForm.controls['kit_type'].value === ''){
         this.inventoryfiltered = this.inventoryData
        }
        else{

          this.variants = data.variants
          this.variants = Array.from(new Set(this.variants)); // Remove duplicates
          this.inventoryfiltered = this.inventoryData.filter((item:any) => item.kit_variant === this.inventoryForm.controls['kit_type'].value);
          // console.log(val)
        }
          this.totalCountR = this.inventoryfiltered.length
        },
        (err: any) => {
          this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
        } 
      ) 
      
    }
  }
  getInventory(){
    this.page = 1;
    this.totalCount = 0;
    this.pageSize = 10;
    this.inventoryData = []

    const obj: any ={
      from_date :this.inventoryForm.controls['from_date'].value,
      to_date:this.inventoryForm.controls['to_date'].value,
      kit_type:this.inventoryForm.controls['kit_type'].value
    } 
    
    this.protocol.kitsinventory(sessionStorage.getItem('siteId'), obj).subscribe(
      (data: any) => {
        this.inventoryfiltered = data.data
        this.variants = data.variants
        this.variants = Array.from(new Set(this.variants)); // Remove duplicates
        this.totalCountR = this.inventoryfiltered.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      } 
    ) 
  }
  base64String: any;
  Download(id: any, name: string) {
    console.log(id)

    this.base64String = id
    if(this.base64String == ''){
      this.base64String  = 'NOt Uploaded Any PDF'
    }

    // Convert the base64 string to a Uint8Array
    const binaryArray = Uint8Array.from(atob(this.base64String), c => c.charCodeAt(0));

    // Create a Blob from the binary data
    const blob = new Blob([binaryArray], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const link = document.createElement('a');
    link.href = url;
    link.download = name;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);

  }
 
  pdfContent: string = 'data:application/pdf;base64,...';
  viewPdf(file: any) {
   
    console.log(file)
    const url = URL.createObjectURL(file);

    // Open the PDF in a new window
    window.open(url, '_blank');
  }

 
}






  




