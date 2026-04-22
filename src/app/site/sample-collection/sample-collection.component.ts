
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements OnInit {
  name: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  statusData = ['Pending', 'Collected']
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
  email: string | null;
  ID: any;
  date: string;
  id: any;
  screeningFullData: any;
  screeningVariant: any;



  constructor(private protocolService: ProtocolService, private activatedRoute: ActivatedRoute, private router: Router,
    private messageService: MessageService, private croService: CrosService, private formBuilder: FormBuilder) {

    this.email = sessionStorage.getItem('email')
    console.log(this.email);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the actual month
    const day = currentDate.getDate();

    this.date = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;


  };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];
  uniqueCombinedArray: Array<any> = [];
  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  // preprationData = ['Not Verified', 'Verified']

  preprationData = [{ name: 'Not Collected', value: 'Not Collected' },
  { name: 'Collected', value: 'Collected' },
  ]
  sexData = [{ name: 'Male', value: 'Male' },
  { name: 'Female', value: 'Female' },
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
    protocol_name: new FormControl("", [Validators.required]),
    specialInstructions: new FormControl("", [Validators.required])
  });
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.getprotocolDetails(this.id)

    });
    // this.sponsersData()
    this.croService.getSites().subscribe((sites) => {

      this.sponsersData(sites);

    });

    this.croService.getSiteById(sessionStorage.getItem('siteId')).subscribe((data: any) => {
     
      this.ID = data.site_data_code
    

      this.name = data.site_data_name
  

    });



    this.protocolService.getPreparation().subscribe((protocols) => {
      console.log(protocols);

      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });
  }



  getprotocolDetails(id: any) {

    

    this.scount = ''

    this.protocolService.getProtocolId(id).subscribe((protocols) => {
      this.uuid = id;
      // this.protocolService.kitsns(id, sessionStorage.getItem('siteId')).subscribe((protocolsd) => {
        // alert('k')
            // this.skDetails = protocolsd.screening_data
      this.protocolService.getPreparationById(id).subscribe((protocolsData) => {
        console.log(protocolsData, 'val')
        this.skDetails = protocolsData.data.screening_kit_details
        this.vkDetails = protocolsData.data.visit_kit_details
       
       
        this.displayValues = true;
        this.protocolIdDetails = protocols.protocol
        this.protoName = this.protocolIdDetails.protocol_name
        this.preparationForm.controls['protocol_name'].disable()
        // this.preparationForm.controls['special_instructions'].disable()
        this.preparationForm.controls['protocol_name'].setValue(this.protoName)
        this.preparationForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)
        this.preparationForm.controls['specialInstructions'].disable()
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

              const vkDetailForRowAndTab = this.vkDetails[i][j];
              const formControl = visitKitListArray.at(j);

              if (vkDetailForRowAndTab.acknowledgement === 'Received') {
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
              const siteControl = visitKitListArray.at(j).get('site_id');
              if (siteControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                siteControl.patchValue(vkDetailForRowAndTab.site_id);
                siteControl.disable()

              }

              const expirydControl = visitKitListArray.at(j).get('expiryDate');
              if (expirydControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                expirydControl.patchValue(vkDetailForRowAndTab.expiryDate);
                expirydControl.disable()
              }
              const patientControl = visitKitListArray.at(j).get('patientId');
              if (patientControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                patientControl.patchValue(vkDetailForRowAndTab.patientId);

              }
              const patientNameControl = visitKitListArray.at(j).get('patientName');
              if (patientNameControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                patientNameControl.patchValue(vkDetailForRowAndTab.patientName);

              }
              const patientAgeControl = visitKitListArray.at(j).get('patientAge');
              if (patientAgeControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                patientAgeControl.patchValue(vkDetailForRowAndTab.patientAge);

              }
              const patientSexControl = visitKitListArray.at(j).get('patientSex');
              if (patientSexControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                patientSexControl.patchValue(vkDetailForRowAndTab.patientSex);

              }
              const collectionControl = visitKitListArray.at(j).get('collection');
              if (collectionControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                if (vkDetailForRowAndTab.collection) {
                  collectionControl.patchValue(vkDetailForRowAndTab.collection);
                }
                else if (vkDetailForRowAndTab.collection === undefined || vkDetailForRowAndTab.collection === null || vkDetailForRowAndTab.collection === '') {
                  collectionControl.patchValue(this.preprationData[0].value);
                }

              }
              const collectionDateControl = visitKitListArray.at(j).get('collectionDate');
              if (collectionDateControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
                collectionDateControl.patchValue(vkDetailForRowAndTab.collectionDate);

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
       

      });
    // });

    });


  }

  checkCollection(selectedValue: any, rowIndex: number) {

    const kitIdControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.patientId');
    const nameControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.patientName')
     const ageControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.patientAge')
     const sexControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.patientSex')
    const expiryDateControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.collectionDate');
    const preprationControl = this.ScreenKitForm.get('screenKitList.' + rowIndex + '.collection');
    if (selectedValue.target.value === 'Collected') {
      if (!kitIdControl.value) {
        alert('Please provide Patient Id before selecting "Collected".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
      else if (!nameControl.value) {
        alert('Please provide Patient Name before selecting "Collected".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
      else if (!ageControl.value) {
        alert('Please provide Patient Age before selecting "Collected".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
      else if (!sexControl.value) {
        alert('Please provide Patient Gender before selecting "Collected".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
      else if (!expiryDateControl.value) {
        alert('Please provide Collection Date before selecting "Collected".');
        preprationControl.patchValue(this.preprationData[0].value);
      }
    }
  }
  checkCollectionv(cardIndex: number, rowIndex: number) {
    const item = this.vMatDetails[cardIndex];
    const expiryDateControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('collectionDate');
    const ckitIdControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('patientId');
    const nameControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('patientName');
    const ageControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('patientAge');
     const sexControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('patientSex');
    const preprationControl = item.visitKitFormGroup.get('visitKitList').at(rowIndex).get('collection');

    if (preprationControl.value === 'Collected' && (!ckitIdControl.value)) {
      alert('Please provide Patient Id before selecting "Collected".');

      preprationControl.patchValue(this.preprationData[0].value)
    }
    else if (preprationControl.value === 'Collected' && (!expiryDateControl.value)) {
      alert('Please provide Collection Date  before selecting "Collected".');
      preprationControl.patchValue(this.preprationData[0].value)
    } else if (!nameControl.value) {
      alert('Please provide Patient Name before selecting "Collected".');
      preprationControl.patchValue(this.preprationData[0].value);
    }
    else if (!ageControl.value) {
      alert('Please provide Patient Age before selecting "Collected".');
      preprationControl.patchValue(this.preprationData[0].value);
    }
    else if (!sexControl.value) {
      alert('Please provide Patient Gender before selecting "Collected".');
      preprationControl.patchValue(this.preprationData[0].value);
    }
  }

  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }




  createVisitKitGroup() {

    return this.formBuilder.group({
      kitId: [''],
      site_id: [''],
      ckitId: [''],
      expiryDate: [''],
      patientId: [''],
      collection: [''],
      collectionDate: [''],
      patientName: [''],
      patientSex: [''],
      patientAge: [''],



    });

  }



  adjustScreenKitRows(count: number, skDetails: any) {
    const screenKitList = this.ScreenKitForm.get('screenKitList') as FormArray;
    const currentRowCount = screenKitList.length;

    if (count < currentRowCount) {
      // Remove excess rows
      console.log(currentRowCount, count)
      for (let i = currentRowCount - 1; i >= count; i--) {
        screenKitList.removeAt(i);
      }
    } else if (count > currentRowCount) {
      // Add new rows
      for (let i = currentRowCount; i < count; i++) {
        this.onScreenKitAdd(i);

        if (i < skDetails.length) {
        //     this.skDetails.forEach((res: any) => {
         
         
        //   if (res.site_id === this.ID) {
        //     alert('lk')
        //     this.ScreenKitForm.get('screenKitList').controls[i].disable()
            
        //   }
        //   else{
        //     this.ScreenKitForm.get('screenKitList').controls[i].enable()
        //   }
        // });
          this.ScreenKitForm.get('screenKitList').controls[i].get('collectionDate').patchValue(skDetails[i].collectionDate);
          this.ScreenKitForm.get('screenKitList').controls[i].get('patientId').patchValue(skDetails[i].patientId);
          this.ScreenKitForm.get('screenKitList').controls[i].get('patientName').patchValue(skDetails[i].patientName)
          this.ScreenKitForm.get('screenKitList').controls[i].get('patientAge').patchValue(skDetails[i].patientAge)
          this.ScreenKitForm.get('screenKitList').controls[i].get('patientSex').patchValue(skDetails[i].patientSex);

          if (skDetails[i].collection === undefined || skDetails[i].collection === null || skDetails[i].collection === '') {
            this.ScreenKitForm.get('screenKitList').controls[i].get('collection').patchValue(this.preprationData[0].value);
          }
          else {
            this.ScreenKitForm.get('screenKitList').controls[i].get('collection').patchValue(skDetails[i].collection);
          }
        }
        this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(skDetails[i].kitId)
        this.ScreenKitForm.get('screenKitList').controls[i].get('site_id').patchValue(skDetails[i].site_id)
        this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').patchValue(skDetails[i].ckitId);
        this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').patchValue(skDetails[i].expiryDate);
        this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').disable()
        this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').disable()
        this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').disable()
        if (i < skDetails.length) {
          if (skDetails[i].acknowledgement) {
            if (skDetails[i].acknowledgement === 'Received') {
              this.ScreenKitForm.get('screenKitList').controls[i].get('patientId').disable()
              this.ScreenKitForm.get('screenKitList').controls[i].get('patientName').disable()
              this.ScreenKitForm.get('screenKitList').controls[i].get('patientAge').disable()
              this.ScreenKitForm.get('screenKitList').controls[i].get('patientSex').disable()

              this.ScreenKitForm.get('screenKitList').controls[i].get('collection').disable()
              this.ScreenKitForm.get('screenKitList').controls[i].get('collectionDate').disable()
            }
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




  addScreenKitData(record: string) {
    return this.formBuilder.group({
      kitId: [''],
      ckitId: [''],
      site_id: [''],
      expiryDate: [''],
      patientId: [''],
      patientName: [''],
      patientSex: [''],
      patientAge: [''],
      collection: [''],
      collectionDate: ['']



    });
  }

  ProtoData(Protocols: any) {
    Protocols.data.forEach((protocol: any) => {
      this.protocols.push(protocol);
    });
  }
  sponsersData(sponsers: any) {
    sponsers.forEach((sponser: any) => {
      this.sponsers.push(sponser);
      this.sponsers.forEach((res: any) => {
        if (sponser.email == this.email) {

          this.ID = sponser.site_data_code


        }
      });
    });

    console.log(this.sponsers)

  }
  getCurrentDate(): Date {
    return new Date();
  }
  SubmitData() {

    this.ScreenKitForm.get('screenKitList').enable()
    this.vmdetails = []
    for (let i = 0; i < this.vMatDetails.length; i++) {
      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

    }
    for (let i = 0; i < this.vkDetails.length; i++) {
      this.vkDetails[i].forEach((protocol: any, index: any) => {
        for (let j = 0; j < this.vMatDetails.length; j++) {
          this.vMatDetails[i].visitsList.enable()
          protocol.patientId = this.vMatDetails[i].visitsList.value[index].patientId
          protocol.collection = this.vMatDetails[i].visitsList.value[index].collection
          protocol.collectionDate = this.vMatDetails[i].visitsList.value[index].collectionDate
          protocol.patientName = this.vMatDetails[i].visitsList.value[index].patientName
          protocol.patientSex = this.vMatDetails[i].visitsList.value[index].patientSex
          protocol.patientAge = this.vMatDetails[i].visitsList.value[index].patientAge

        }
      })
    }

    this.skDetails.forEach((protocol: any, index: any) => {
      // protocol.site_id = this.ID
      protocol.patientId = this.ScreenKitForm.value.screenKitList[index].patientId
      protocol.collection = this.ScreenKitForm.value.screenKitList[index].collection
      protocol.collectionDate = this.ScreenKitForm.value.screenKitList[index].collectionDate
      protocol.patientName = this.ScreenKitForm.value.screenKitList[index].patientName
      protocol.patientSex = this.ScreenKitForm.value.screenKitList[index].patientSex
      protocol.patientAge = this.ScreenKitForm.value.screenKitList[index].patientAge

    })

    const data = {
      "protocol_id": this.uuid,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails


    }


    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sample Collection Updated Successfully' });
        }, 1000);
        this.router.navigate(['/home/site/viewCRA'])



      },
      (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

      }
    );
  }




}
















