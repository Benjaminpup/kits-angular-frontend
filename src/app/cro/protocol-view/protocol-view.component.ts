
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-protocol-view',
  templateUrl: './protocol-view.component.html',
  styleUrls: ['./protocol-view.component.css']
})
export class ProtocolViewComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  protocolIdDetails: any;
  screenDetails: Array<any> = [];
  sMatDetails: Array<any> = [];
  visitDetails: Array<any> = [];
  vMatDetails: Array<any> = [];
  scount: any;
  vcount: any;
  displayValues: boolean = false;
  visitTabs: Array<any> = [];
  visitRecords: Array<any> = [];
  visitRecordsRow: Array<any> = [];
  tets: Array<any> = [];
  sponsor: boolean = false;
  screeningFullData: any;
  screeningVariant: any;
  constructor(private route: Router,
    private protocolService: ProtocolService,
    private _activatedRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private admins: AdminService) { };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];
  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  preprationData = ['InProgress', 'Completed']

  /* nmModel Variables */
  selected_protocol_id: any;
  // selected_sponsor_id: any;
  // selected_cro_id: any;
  selected_sites_num: any;
  selected_patients_num: any;
  selected_site_id: any;
  selected_patient_name: any;
  selected_patient_visits: any;
  selected_skit_count: any;
  selected_vkit_count: any;
  selected_vkit_variant: any;
  screening: boolean = true;
  visit: boolean = false;
  sitesForm: any;

  public protocolForm: FormGroup = new FormGroup({
    selected_protocol_id: new FormControl("", [Validators.required]),
    selected_protocol_name: new FormControl("", [Validators.required]),
    selected_sponsor_id: new FormControl("", [Validators.required]),
    cro_study_id: new FormControl(""),
    avant_sample_size: new FormControl(""),
    global_sample_size: new FormControl("", [Validators.required]),
    screens: new FormControl("", [Validators.required]),
    total_visits: new FormControl("", [Validators.required]),
    kit_variant_count: new FormControl("", [Validators.required]),
    selected_skit_count: new FormControl("", [Validators.required]),
    // labTestValue: new FormControl("", [Validators.required]),
    specialInstructions: new FormControl(""),
    avantc: new FormControl(false),
    selected_visit_count: new FormControl("", [Validators.required]),
  })
  customerFormGroup: any;
  listItems: string[] = [];
  protoId: any
  protoName: any
  labMatTestsList: Array<any> = [];
  labMatList: any;
  materials: any;
  selectedValuev: any;
  selectedOption: any;
  public preparationForm: FormGroup = new FormGroup({
    protocolId: new FormControl("", [Validators.required]),
    protocol_name: new FormControl("", [Validators.required]),
  });
  public isEdit: boolean = false;
  public id: any = '';
  ngOnInit() {
    
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        this.getprotocolDetails(this.id)
        if (data.type === 'sponsor') {
          this.sponsor = true;
        }
        else {
          this.sponsor = false;
        }
      }
    });


  }changedName: any
  createdName: any
  getUser() {
    this.admins.getUser().subscribe((data: any) => {
      data.filter((val:any) => {
        if (val.user_id === this.protocolIdDetails.created_by) { 
          this.createdName = val.first_name + ' ' + val.last_name 
        }
       if (val.user_id === this.protocolIdDetails.changed_by) {        
          this.changedName = val.first_name + ' ' + val.last_name
        }
      })
    })
  }
  getprotocolDetails(id: any) {

    this.protocolService.getProtocolId(this.id).subscribe((protocols) => {
      
      this.displayValues = true;
      this.protocolIdDetails = protocols.protocol
     

      
      selected_sponsor_id: new FormControl("", [Validators.required]),
    
  
      this.protoName = this.protocolIdDetails.protocol_name
      this.protocolForm.controls['selected_protocol_id'].setValue(this.protocolIdDetails.protocol_id)
      this.protocolForm.controls['selected_protocol_name'].setValue(this.protoName)
      this.protocolForm.controls['cro_study_id'].setValue(this.protocolIdDetails.cro_id)
      this.protocolForm.controls['avant_sample_size'].setValue(this.protocolIdDetails.avant_sample_size)
      this.protocolForm.controls['global_sample_size'].setValue(this.protocolIdDetails.global_sample_size)
      this.protocolForm.controls['screens'].setValue(this.protocolIdDetails.no_of_screens)
      this.protocolForm.controls['total_visits'].setValue(this.protocolIdDetails.no_of_visits)
      this.protocolForm.controls['kit_variant_count'].setValue(this.protocolIdDetails.kit_variant_count)
     

      this.protocolForm.controls['selected_sponsor_id'].setValue(this.protocolIdDetails.sponsor_name)  
      this.protocolForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)
    this.protocolForm.disable()
    
      if (protocols.visit_kit_details[0].meterial_details.length > 0) {
        this.screeningFullData = protocols.visit_kit_details[0].meterial_details[0]
        this.screenDetails = this.screeningFullData.selectedLabTests
        this.sMatDetails = this.screeningFullData.visits;
        this.vMatDetails = protocols.visit_kit_details[0].meterial_details.slice(1);
        this.screeningVariant = protocols.visit_kit_details[0].meterial_details[0].kit_variant
      } else {
      }

      this.vcount = protocols.visit_kit_details[0].visit_kit_count
      this.protocolForm.controls['selected_visit_count'].setValue(this.vcount)
      this.scount = protocols.screening_kit_details[0].screening_kit_count
      this.protocolForm.controls['selected_skit_count'].setValue(this.scount)
      console.log(this.vcount, 'details');
      this.visitTabs = []
      this.visitRecords = []
      this.visitRecordsRow = []
      this.tets = []
      this.vMatDetails.forEach((tabs: any) => {
        this.tets.push(tabs.selectedLabTests)
        this.visitTabs.push(tabs.visits);
        this.visitTabs.forEach((visitRecord: any) => {

          this.visitRecords.push(visitRecord);

        });
      });


    });


  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.protocolForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }


  validateMobileNumber(input: any, phone: any) {
    let inputValue = input.value.trim();
    
    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if(phone ==='mobile'){
    if (numericValue.length > 5) {
        numericValue = numericValue.slice(0, 5);
    }
  }
  else{
    if (numericValue.length > 5) {
      numericValue = numericValue.slice(0, 5);
  }
  }
    
    input.value = numericValue;
  
}
goBack() {
  console.log("hi")
  this.location.back();
}




}