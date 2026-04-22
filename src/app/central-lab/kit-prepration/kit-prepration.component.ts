import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-prepration',
  templateUrl: './kit-prepration.component.html',
  styleUrls: ['./kit-prepration.component.css']
})
export class KitPreprationComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  date: Date | undefined;


  protocolIdDetails: any;
  screenDetails: Array<any> = [];
  sMatDetails: Array<any> = [];
  visitDetails: Array<any> = [];
  vMatDetails: Array<any> = [];
  scount: any;
  vcount: any;
  displayValues: boolean = false;

  visitRecords: Array<any> = [];
  visitRecordsRow: Array<any> = [];
  tets: Array<any> = [];

  tabs: any[] = []; // Array to hold tabs
  // activeTab: number = ''; // Active tab index
  count = 2;
  allTabsData: any[] = [];
  index: any;
  indexvalue: any;
  vmdetails: any[] = [];
  uuid: any;
  skDetails: any[] = [];
  vkDetails: any;

  id: any;
  mode: any = '';
  screeningFullData: any;
  screeningVariant: any;
  // visitKitFormGroup: FormGroup


  constructor(private protocolService: ProtocolService,
    private messageService: MessageService, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private router: Router) {
    // this.visitKitFormGroup = this.formBuilder.group({
    //   ckitId: [''],
    //   kitId: [''],
    //   prepration: [''],
    // });
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {

        this.id = data.id;
        this.mode = data.mode
        this.getprotocolDetails(this.id)

      }
      if (data.mode === 'add') {

      }
      else {
        router.navigate(['/home/centralLab/kitpreprationedit', this.id])
      }
    });


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
  preprationData = [{name:'In Progress',value:'In Progress'},
  {name:'Completed',value:'Completed'},
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
    ckitId:new FormControl (" ",[ Validators.required]),
  });
  ngOnInit() {

    this.protocolService.getProtocol().subscribe((protocols) => {
      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });



  }


  printLabel(i: any, id: any) {
    const kitId = this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').value;
    const ckitId = this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').value;
    const expirydate = this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').value;


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
              .print-container {
                display: flex;
              }
  
              .left-content {
                padding: 10px;
              }
  
              .left-content p {
                margin: 5px 0;
              }
  
              .material-table {
                margin-top: 5px;
                border-collapse: collapse;
              }
  
              .material-table td,
              .material-table th {
                border: 1px solid #ccc;
                padding: 5px;
              }
  
              .material-table th {
                background-color: #f2f2f2;
              }
              h2{
                text-align:center;
              }
              .ok{
                margin-top:30px
              }
            </style>
          </head>
          <body>
            <div class="print-container">
            <div class="left-content">
            <h2>Screening Kit</h2>
            <p><strong>Kit Id:</strong> ${kitId}</p>
            <p><strong>LabKit Id:</strong> ${ckitId}</p>
            <p><strong>Expiry Date:</strong> ${expirydate}</p>
            <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
            <p><strong>Protocol Id:</strong> ${this.protocolIdDetails.protocol_id}</p>
            
            <p><strong>Type:</strong> Screening</p>
        
            <div class=ok>
                <h4>Material</h4>
                <table class="material-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.sMatDetails
            .map(
              (item) => `
                          <tr>
                            <td>${item.material_name}</td>
                         
                            <td>${item.size}</td>
                            <td>${item.quantity}</td>
                          </tr>
                        `
            )
            .join('')}
                  </tbody>
                </table>
              </div>
              </div>

            </div>
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

  checkPreparation(selectedValue: any, rowIndex: number) {
    console.log(selectedValue.target.value)
    const kitIdControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.ckitId');
  
    const expiryDateControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.expiryDate');
    const preprationControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.prepration');
    if (selectedValue.target.value === 'Completed') {
      if (!kitIdControl.value) {
        alert('Please provide Central Lab Kit Id before selecting "Completed".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
      else if(!expiryDateControl.value){
        alert('Please provide Expiry Date before selecting "completed".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
    }
  }
  checkPreparationv(cardIndex: number, rowIndex: number) {
    const item = this.vMatDetails[cardIndex];
    const expiryDateControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('expiryDate');
    const ckitIdControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('ckitId');
    const preprationControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('prepration');

    if (preprationControl.value === 'Completed' && (!ckitIdControl.value)) {
      alert('Please provide Central Lab KitId before selecting "Completed".');
      
      preprationControl.patchValue(this.preprationData[0].value)
    }
    else if (preprationControl.value === 'Completed' && (!expiryDateControl.value)){
      alert('Please provide Expiry Date before selecting "Completed".');
      preprationControl.patchValue(this.preprationData[0].value)
    }
  }
  getprotocolDetails(id: any) {
    this.scount = ''
    this.protocolService.getProtocolId(this.id).subscribe((protocols) => {

      this.displayValues = true;
      this.protocolIdDetails = protocols.protocol
      this.protoName = this.protocolIdDetails.protocol_name
      this.preparationForm.controls['protocol_name'].disable()
      this.preparationForm.controls['protocol_name'].setValue(this.protoName)
      this.preparationForm.controls['specialInstructions'].disable()
      this.preparationForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)

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
      this.visitRecords = []
      this.visitRecordsRow = []
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
            visitKitListArray.at(j).get('kitId')?.patchValue(this.getLabKitId(i, j));



          }
          tabs.visitsList = visitKitListArray;
          this.tets.push(tabs.selectedLabTests);
        }

        this.tets.push(tabs.selectedLabTests)
      });
      this.visitRecords.forEach((visitRecordrow: any) => {
        this.visitRecordsRow.push(visitRecordrow);
      });

      for (let i = 1; i <= this.scount; i++) {
        this.adjustScreenKitRows(this.scount);
      }


    });



  }

  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }


  getLabKitId(tabIndex: number, recordIndex: number): string {
    const visitIndex = tabIndex + 1;
    return `${this.protocolIdDetails.protocol_id}V${visitIndex}00${recordIndex + 1}`;

  }
  createVisitKitGroup() {
    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: ['In Progress'],
      expiryDate: ['']

    });
  }

  printLabelm(tabIndex: number, rowIndex: number) {
    const selectedTab = this.vMatDetails[tabIndex];
    const matdetails = selectedTab.visits;
    console.log(matdetails);


    const selectedRow = selectedTab.visitsList.controls[rowIndex];


    // Access the values of the selected row
    const kitId = selectedRow.get('kitId').value;
    const ckitId = selectedRow.get('ckitId').value;
    const expirydate = selectedRow.get('expiryDate').value;

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
                .print-container {
                  display: flex;
                }
    
                .left-content {
                  padding: 10px;
                }
    
                .left-content p {
                  margin: 5px 0;
                }
    
                .material-table {
                  margin-top: 5px;
                  border-collapse: collapse;
                }
    
                .material-table td,
                .material-table th {
                  border: 1px solid #ccc;
                  padding: 5px;
                }
    
                .material-table th {
                  background-color: #f2f2f2;
                }
                h2{
                  text-align:center;
                }
                .ok{
                  margin-top:30px
                }
              </style>
            </head>
            <body>
       
          </body>
          <div class="print-container">
          <div class="left-content">
          <h2>Visit Kit</h2>
          <p><strong>Kit Id:</strong> ${kitId}</p>
          <p><strong>LabKit Id:</strong> ${ckitId}</p>
          <p><strong>Expiry Date :</strong> ${expirydate}</p>
          <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
          <p><strong>Protocol Id:</strong> ${this.protocolIdDetails.protocol_id}</p>
          <p><strong>Type:</strong> Screening</p>
          <div class=ok>
          <h4>Material</h4>
          <table class="material-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
            ${matdetails
            .map(
              (item: any) => `
              <tr>
              <td>${item.meterial_name}</td>
              <td>${item.size}</td>
              <td>${item.quantity}</td>
            </tr>
                `
            )
            .join('')}
            </tbody>
            </table>
            </div>
            </div>
          </div>
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

  getCurrentDate(): Date {
    return new Date();
  }


  adjustScreenKitRows(count: number) {

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
        // console.log(skDetails)
        this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(this.protocolIdDetails.protocol_id + 'SK001' + (i + 1))
        // if (i < skDetails.length) {
        // this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').patchValue(skDetails[i].ckitId);
        // this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').patchValue(skDetails[i].expiryDate);
        // this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').patchValue(skDetails[i].prepration);
        // const preprationValue = skDetails[i].prepration;
        // console.log('preprationValue:', preprationValue);

        // const preprationControl = this.ScreenKitForm.get('screenKitList').controls[i].get('prepration');
        // console.log('preprationControl:', preprationControl);

        // if (preprationControl instanceof FormControl) {
        //     preprationControl.patchValue(preprationValue);
        // } else {
        //     console.log('preprationControl is not a FormControl instance');
        // }
        // }


      }
    }

  }
  // ckitId: [{ value: this.protocolIdDetails.protocol_id+'sk', disabled: true }],

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
      ckitId: [''],
      kitId: [''],
      prepration: ['In Progress'],
      expiryDate: ['']

    })
  }
  




  ProtoData(Protocols: any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });


  }


  SubmitData() {
    this.vmdetails = []
    for (let i = 0; i < this.vMatDetails.length; i++) {
      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

    }



    // console.log(this.vMatDetails.visitsList.FormArray.value)
    const data = {
      "protocol_id": this.id,
      "protocol_name": this.protoName,
      "screening_kit_details": this.ScreenKitForm.value.screenKitList,
      "visit_kit_details": this.vmdetails


    }
    // sessionStorage.setItem('vmdet', JSON.stringify(data));
    console.log(this.ScreenKitForm.value.screenKitList);
    console.log(this.ScreenKitForm.value.screenKitList.length);
    console.log(data);

    this.protocolService.postPreparation(data).subscribe(

      (data: any) => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Kit Preparation Updated Successfully' });
        }, 1000);
        this.router.navigate(['/home/centralLab/kitPreparationGrid'])
      },
      (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

      }
    );

  }




}





