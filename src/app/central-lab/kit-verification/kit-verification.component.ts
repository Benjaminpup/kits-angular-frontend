import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-verification',
  templateUrl: './kit-verification.component.html',
  styleUrls: ['./kit-verification.component.css']
})
export class KitVerificationComponent implements OnInit {
  screeningFullData: any;
  screeningVariant: any;
  id: any;
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

  tets: Array<any> = [];

  tabs: any[] = [];

  count = 2;
  allTabsData: any[] = [];
  index: any;
  indexvalue: any;
  vmdetails: any[] = [];
  uuid: any;
  skDetails: any[] = [];
  vkDetails: any;
  value: any;
  details: any;



  constructor(private protocolService: ProtocolService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute, private router: Router) {



  };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  preprationData = [{ name: 'Not Verified', value: 'Not Verified' },
  { name: 'Verified', value: 'Verified' },
  ]
  kitIdv: any = ''
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
  ScreenKitForm: any;
  VisitKitForm: any;
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
    specialInstructions: new FormControl("", [Validators.required]),
  });
  ngOnInit() {

    this.protocolService.getPreparation().subscribe((protocols) => {
      console.log(protocols);

      this.details = protocols

      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });

    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {

        this.id = data.id;
       console.log(this.id)
        this.getprotocolDetails(this.id)

      }
     
    });
  }
    
  checkVerification(selectedValue: any, rowIndex: number) {
    const preprationControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.prepration');
    const verificationControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.status');
    if (selectedValue.target.value === 'Verified') {
     if(preprationControl.value === 'In Progress'){
        alert('You cannot change status to verified until and unless Kit Preparation is completed');
        verificationControl.patchValue(this.preprationData[0].value);
      }
    }
  }
  checkVerificationv(cardIndex: number, rowIndex: number) {
    const item = this.vMatDetails[cardIndex];
    const verificationControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('status');
    const preprationControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('prepration');
    if (verificationControl.value === 'Verified' && (preprationControl.value === 'In Progress')) {
      alert('You cannot change status to verified until and unless Kit Preparation is completed');  
      verificationControl.patchValue(this.preprationData[0].value)
    }
  }

  getprotocolDetails(id:any) {
    this.scount = ''
    this.protocolService.getProtocolId(id).subscribe((protocols) => {
    
      this.uuid = this.id;
      this.protocolService.getPreparationById(this.id).subscribe((protocolsData) => {

        this.skDetails = protocolsData.data.screening_kit_details
        console.log(this.skDetails)
        this.vkDetails = protocolsData.data.visit_kit_details
        console.log(this.vkDetails);
      
        this.displayValues = true;
        this.protocolIdDetails = protocols.protocol
        this.protoName = this.protocolIdDetails.protocol_name
        this.preparationForm.controls['protocol_name'].disable()
        this.preparationForm.controls['protocol_name'].setValue(this.protoName)
        this.preparationForm.controls['specialInstructions'].disable()
        this.preparationForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)
        // this.screenDetails = protocols.screening_kit_details[0].lab_test_ids
        // this.sMatDetails = protocols.screening_kit_details[0].meterial_details
        // this.visitDetails = protocols.visit_kit_details[0].lab_test_ids
        // this.vMatDetails = protocols.visit_kit_details[0].meterial_details
        // this.scount = protocols.screening_kit_details[0].screening_kit_count
        // this.vcount = protocols.visit_kit_details[0].visit_kit_count
        if (protocols.visit_kit_details[0].meterial_details.length > 0) {
          this.screeningFullData = protocols.visit_kit_details[0].meterial_details[0]
          this.screenDetails = this.screeningFullData.selectedLabTests
          this.sMatDetails = this.screeningFullData.visits;
          this.vMatDetails = protocols.visit_kit_details[0].meterial_details.slice(1);
          this.screeningVariant = protocols.visit_kit_details[0].meterial_details[0].kit_variant
        } else {
        }

        this.vcount = protocols.visit_kit_details[0].visit_kit_count
        // this.scount = protocols.visit_kit_details[0].visit_kit_count
        this.scount = protocols.screening_kit_details[0].screening_kit_count

        this.tets = []

        this.vMatDetails.forEach((tabs: any) => {
          tabs.visitKitFormGroup = this.formBuilder.group({

            visitKitList: this.formBuilder.array([]),
          });
          const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;
          for (let i = 1; i <= this.vcount; i++) {
            visitKitListArray.push(this.createVisitKitGroup());
            console.log(tabs.visitKitFormGroup[i]);
          }
          tabs.visitsList = visitKitListArray
          for (let i = 0; i < this.vMatDetails.length; i++) {
            const tabs = this.vMatDetails[i];
            tabs.visitKitFormGroup = this.formBuilder.group({
              visitKitList: this.formBuilder.array([]),
            });
            const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;

            for (let j = 0; j < this.vcount; j++) {
              visitKitListArray.push(this.createVisitKitGroup());

              const statusControl = visitKitListArray.at(j).get('status');
              if (statusControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                if(vkDetailForRowAndTab.verification_status)
                if(vkDetailForRowAndTab.verification_status === undefined || vkDetailForRowAndTab.verification_status === null ||vkDetailForRowAndTab.verification_status === ''){
                statusControl.patchValue(this.preprationData[0].value);
                }
                else{
                  statusControl.patchValue(vkDetailForRowAndTab.verification_status);
                }

              }

              const vkDetailForRowAndTab = this.vkDetails[i][j];
              const formControl = visitKitListArray.at(j);
              if (vkDetailForRowAndTab.site_id) {
               formControl.disable()
              }
              const kitIdControl = visitKitListArray.at(j).get('kitId');
              if (kitIdControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                kitIdControl.patchValue(vkDetailForRowAndTab.kitId);
                kitIdControl.disable()
              }
  
              const ckitIdControl = visitKitListArray.at(j).get('ckitId');
              if (ckitIdControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                ckitIdControl.patchValue(vkDetailForRowAndTab.ckitId);
                ckitIdControl.disable()
  
              }
  
              const expirydControl = visitKitListArray.at(j).get('expiryDate');
              if (expirydControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                expirydControl.patchValue(vkDetailForRowAndTab.expiryDate);
                expirydControl.disable()
              }
               
            const prepControl = visitKitListArray.at(j).get('prepration');
            if (prepControl) {
              const vkDetailForRowAndTab = this.vkDetails[i][j];
              prepControl.patchValue(vkDetailForRowAndTab.prepration);
              prepControl.disable()
            }
        
            }

            tabs.visitsList = visitKitListArray;
            this.tets.push(tabs.selectedLabTests);
          }

          this.tets.push(tabs.selectedLabTests)
        });

        for (let i = 1; i <= this.scount; i++) {
          this.adjustScreenKitRows(this.scount, this.skDetails);
        }

      }, (err: any) => {

        this.displayValues = false
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });
       

      }
      );

    });


  }



  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }




  createVisitKitGroup() {

    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],
      expiryDate:[''],
      status: ['Not Verified']

    });

  }


  adjustScreenKitRows(count: number, skDetails: any) {
    const screenKitList = this.ScreenKitForm.get('screenKitList') as FormArray;
    const currentRowCount = screenKitList.length;

    if (count < currentRowCount) {
      // Remove excess rows
      for (let i = currentRowCount - 1; i >= count; i--) {
        screenKitList.removeAt(i);
      }
    } else if (count > currentRowCount) {
      // Add new rows
      for (let i = currentRowCount; i < count; i++) {
        this.onScreenKitAdd(i);

        if (i < skDetails.length) {
          if(skDetails[i].verification_status === undefined || skDetails[i].verification_status === null ||skDetails[i].verification_status === ''){
            this.ScreenKitForm.get('screenKitList').controls[i].get('status').patchValue(this.preprationData[0].value);
             }
             else{
              this.ScreenKitForm.get('screenKitList').controls[i].get('status').patchValue(skDetails[i].verification_status);
         
             }
          // this.ScreenKitForm.get('screenKitList').controls[i].get('status').patchValue(skDetails[i].verification_status);
          if (i < skDetails.length) {
            if (skDetails[i].site_id) {
              this.ScreenKitForm.get('screenKitList').controls[i].get('status').disable()
            }
            this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(skDetails[i].kitId)
          this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').patchValue(skDetails[i].ckitId);
          this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').patchValue(skDetails[i].expiryDate);

          this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').patchValue(skDetails[i].prepration);
          this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').disable()
         
          }

        }
      }
    }



  }

  addScreenKit(record: any) {
    this.ScreenKitForm.get('screenKitList').push(this.addScreenKitData(record));
    console.log(this.ScreenKitForm.controls);
  }


  onScreenKitAdd(rec: any) {

    const control1 = this.ScreenKitForm.get('screenKitList') as FormArray;
    control1.push(this.addScreenKitData(rec));

  }



  addScreenKitData1() {
    console.log(this.uuid);
    this.protocolService.getPreparationById(this.uuid).subscribe((protocolsData) => {
      console.log(protocolsData);
      this.skDetails = protocolsData.data.screening_kit_details;
      
      this.vkDetails = protocolsData.data.visit_kit_details;
      console.log(this.vkDetails);

      outerLoop:
      for (let m = 0; m < this.skDetails.length; m++) {
        console.log(1);

        for (let n = 0; n < this.skDetails[m].length; n++) {
          console.log(m, n);
          console.log(`${this.skDetails[m][n].kitId}`);

          if (n < this.vkDetails[m].length) {

            continue outerLoop;
          }

          const visitKitGroup = this.formBuilder.group({
            ckitId: [`${this.vkDetails[m][n].kitId}`],
            kitId: [`${m}${n}`],
            prepration: [''],
            status: ['Not Verified']
          });


          visitKitGroup.get('kitId')?.patchValue(`${m}${n}`);



        }
      }

    });
  }

  addScreenKitData(record: string) {


    return this.formBuilder.group({

      status: ['Not Verified'],
      ckitId: [''],
      kitId: [''],
      prepration: [''],
      expiryDate:['']

    });
  }




  ProtoData(Protocols: any) {
    Protocols.data.forEach((protocol: any) => {
      console.log(protocol);

      this.protocols.push(protocol);

    });

    console.log(this.protocols);
  }



  SubmitData() {
    console.log(this.skDetails);

    this.ScreenKitForm.get('screenKitList').enable()
    this.vmdetails = []
    for (let i = 0; i < this.vMatDetails.length; i++) {

      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

    }


    for (let i = 0; i < this.vkDetails.length; i++) {

      this.vkDetails[i].forEach((protocol: any, index: any) => {
        for (let j = 0; j < this.vMatDetails.length; j++) {
         
          this.vMatDetails[i].visitsList.enable()
          protocol.verification_status = this.vMatDetails[i].visitsList.value[index].status
          
        }

      })

    }




    this.skDetails.forEach((protocol: any, index: any) => {

      // this.vMatDetails.forEach((data:any,index: any)=>{
      // protocol.verification_status = false
      protocol.verification_status = this.ScreenKitForm.value.screenKitList[index].status
    })





    const data = {
      "protocol_id": this.uuid,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails


    }


    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Kit Verification Updated Successfully' });
        this.router.navigate(['/home/centralLab/kitvarificationGrid'])  
      },
      (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

      }
    );

  }




}