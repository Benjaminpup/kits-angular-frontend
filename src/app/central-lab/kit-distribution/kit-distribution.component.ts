import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-distribution',
  templateUrl: './kit-distribution.component.html',
  styleUrls: ['./kit-distribution.component.css']
})
export class KitDistributionComponent implements OnInit {
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
  sponsers: Array<any> = [];



  constructor(private protocolService: ProtocolService, private _activatedRoute:ActivatedRoute,
    private messageService: MessageService, private croService: CrosService, private formBuilder: FormBuilder   ,private router: Router) {
   


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
  // preprationData = ['Not Verified', 'Verified']
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
    this.croService.getSites().subscribe((sites) => {

      this.sponsersData(sites);

    });
    this.protocolService.getPreparation().subscribe((protocols) => {
      console.log(protocols);

      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });

    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {

        this.id = data.id;
       
        this.getprotocolDetails(this.id)

      }
     
    });

  }
  getprotocolDetails(id: any) {
    this.scount = ''
    this.protocolService.getProtocolId(this.id).subscribe((protocols) => {
      this.uuid = this.id;
      this.protocolService.getPreparationById(this.id).subscribe((protocolsData) => {
        console.log(protocolsData);
        this.skDetails = protocolsData.data.screening_kit_details
        this.vkDetails = protocolsData.data.visit_kit_details
        console.log(this.vkDetails);


    
      console.log(protocols);
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
         
            const siteControl = visitKitListArray.at(j).get('siteId');
            if (siteControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                siteControl.patchValue(vkDetailForRowAndTab.site_id);
               
            }
            const vkDetailForRowAndTab = this.vkDetails[i][j];

            const formControl = visitKitListArray.at(j);

            if (vkDetailForRowAndTab.collection === 'Collected') {



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
          const statusControl = visitKitListArray.at(j).get('status');
          if (statusControl) {
            const vkDetailForRowAndTab = this.vkDetails[i][j];
            statusControl.patchValue(vkDetailForRowAndTab.verification_status);
            statusControl.disable()
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
    
  checkdistribution(selectedValue: any, rowIndex: number) {
    const siteControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.siteId');
    const verificationControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.status');
    if (selectedValue.target.value) {
     if(verificationControl.value === 'Not Verified'){
        alert('You cannot assign site until and unless Kit verification is completed');
        siteControl.setValue('');
      }
    }
  }
  checkdistributionv(cardIndex: number, rowIndex: number) {
    const item = this.vMatDetails[cardIndex];
    const verificationControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('status');
    const siteControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('siteId');
   
    if (siteControl.value && (verificationControl.value === 'Not Verified')) {
      alert('You cannot assign site until and unless Kit verification is completed');  
      siteControl.setValue('');
    }
  }
  
 

  createVisitKitGroup() {
  
    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],
      siteId: [''],
      status: [''],
      expiryDate:['']
      

    });

  }
  printLabel(i: any) {



    const siteId = this.ScreenKitForm.get('screenKitList').controls[i].get('siteId').value;



    const printSection = document.getElementById('printSection');
    if (printSection) {
      const printContent = printSection.innerHTML;
      const printWindow = window.open('', '', 'height=500,width=500');
      if (printWindow) {
        const printDocument = printWindow.document;
        printDocument.write(`
            <html>
            <head>
              <title>Print</title>
              <style>
                /* Custom styling for the print output */
                /* Add any necessary styles for your specific requirements */
              </style>
            </head>
            <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
            <p><strong>Protocol Id:</strong> ${this.protocolIdDetails.protocol_id}</p>
            <p><strong>Site Id:</strong> ${siteId}</p>
          

              <script>
                setTimeout(() => {
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                }, 100);
              </script>
            </body>
            </html>
          `);
      }
    }

  }
  printLabelm(tabIndex: number, rowIndex: number) {
    const selectedTab = this.vMatDetails[tabIndex];
    const matdetails = selectedTab.visits;



    const selectedRow = selectedTab.visitsList.controls[rowIndex];


    // Access the values of the selected row
    const siteId = selectedRow.get('siteId').value;
  

    const printSection = document.getElementById('printSection');
    if (printSection) {
      const printContent = printSection.innerHTML;
      const printWindow = window.open('', '', 'height=500,width=500');
      if (printWindow) {
        const printDocument = printWindow.document;
        printDocument.write(`
            <html>
            <head>
              <title>Print</title>
              <style>
                /* Custom styling for the print output */
                /* Add any necessary styles for your specific requirements */
              </style>
            </head>
            <body>
       
          </body>
          <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
          <p><strong>Protocol Id:</strong> ${this.protocolIdDetails.protocol_id}</p>
          <p><strong>site Id:</strong> ${siteId}</p>
              <script>
                setTimeout(() => {
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                }, 100);
              </script>
            </body>
            </html>
          `);
      }
    }
  }
  adjustScreenKitRows(count: number, skDetails:any) {
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
       
          this.ScreenKitForm.get('screenKitList').controls[i].get('siteId').patchValue(skDetails[i].site_id);
       
       
        }
        if (i < skDetails.length) {

          if (skDetails[i].collection) {

            if (skDetails[i].collection === 'Collected') {

              this.ScreenKitForm.get('screenKitList').controls[i].get('siteId').disable()

            }

          }
          this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(skDetails[i].kitId)
          this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').patchValue(skDetails[i].ckitId);
          this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').patchValue(skDetails[i].expiryDate);
          this.ScreenKitForm.get('screenKitList').controls[i].get('status').patchValue(skDetails[i].verification_status);
          this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').patchValue(skDetails[i].prepration);
          this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').disable()
          this.ScreenKitForm.get('screenKitList').controls[i].get('status').disable()

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



  
  addScreenKitData(record: string) {


    return this.formBuilder.group({
      siteId: [''],
      ckitId: [''],
      kitId: [''],
      prepration: [''],
      status: [''],
      expiryDate:['']
    

    });
  }




  ProtoData(Protocols: any) {
    Protocols.data.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });

    console.log(this.protocols);
  }


  sponsersData(sponsers:any) {

    sponsers.forEach((sponser: any) => {



      this.sponsers.push(sponser);

    });


    console.log(this.sponsers)

  }

  SubmitData() {
    console.log(this.skDetails);
this.ScreenKitForm.get('screenKitList').enable()

    this.vmdetails = []
    for (let i = 0; i < this.vMatDetails.length; i++) {
this.vMatDetails[i].visitsList.enable()
      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

    }


    for (let i = 0; i < this.vkDetails.length; i++) {


      this.vkDetails[i].forEach((protocol: any, index: any) => {
        for (let j = 0; j < this.vMatDetails.length; j++) {
          // this.vMatDetails.forEach((data:any,index: any)=>{
          console.log(this.vMatDetails[j].visitsList.value[index].status);
          protocol.site_id = this.vMatDetails[i].visitsList.value[index].siteId
          // protocol.verification_status = false
        }

      })

    }




    this.skDetails.forEach((protocol: any, index: any) => {

      // this.vMatDetails.forEach((data:any,index: any)=>{
        // protocol.verification_status = false
      protocol.site_id = this.ScreenKitForm.value.screenKitList[index].siteId
    })





    const data = {
      "protocol_id": this.uuid,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails


    }


    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
    
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail:'Kit Distribution Updated Successfully' });
        this.router.navigate(['/home/centralLab/kitDistributionGrid'])  
      },
      (err: any) => {
       
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail:err.errorr.message });
        
      }
    );


  }




}
















