import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';
// import { saveAs } from 'file-saver';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { ActivatedRoute } from '@angular/router';

async function downloadStringAsPDF() {
  const stringToDownload = 'This is the string to be downloaded as a PDF';

  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the document
  const page = pdfDoc.addPage();

  // Embed a standard font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Set the font and size for the text
  page.setFont(font);
  page.setFontSize(12);

  // Add the string content to the page
  page.drawText(stringToDownload, { x: 50, y: 50 });

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Convert the bytes to a Blob
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element and set its attributes
  const link = document.createElement('a');
  link.href = url;
  link.download = 'downloaded-file.pdf';

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up by revoking the URL
  URL.revokeObjectURL(url);
}


document.addEventListener('DOMContentLoaded', () => {
  alert('i')
  const downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
    downloadButton.addEventListener('click', downloadStringAsPDF);
  }
});


@Component({
  selector: 'app-sample-reports',
  templateUrl: './sample-reports.component.html',
  styleUrls: ['./sample-reports.component.css']
})
export class SampleReportsComponent implements OnInit {
  screeningFullData: any;
  screeningVariant: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  id :any;
  uploadedFiles: Array<File | null> = [];
  fileURLs: Array<string | null> = [];
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
  pdfValues: Array<any> = [];
  pdfValuesv: Array<any> = [];
  base64String: any;
  display: boolean = false;
  pdfValuesview:Array<any> = [];
  displayv: boolean = false;
  pdfValuesviewv:Array<any> = [];


  constructor(private protocolService: ProtocolService,private _activatedRoute:ActivatedRoute ,private adminService: AdminService, private croService: CrosService, private formBuilder: FormBuilder) {
    sessionStorage.getItem('email')


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
  statusData = ['Pending ', 'Recieved']
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
    this.protocolService.getProtocolId(this.id ).subscribe((protocols) => {
      this.uuid =this.id ;
      this.protocolService.getPreparationById(this.id ).subscribe((protocolsData) => {
        console.log(protocolsData);
        this.skDetails = protocolsData.data.screening_kit_details
        this.vkDetails = protocolsData.data.visit_kit_details
        console.log(this.vkDetails);


      });
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
      // console.log(this.vMatDetails, 'details');
      
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

          }

          tabs.visitsList = visitKitListArray;
          this.tets.push(tabs.selectedLabTests);
        }

        this.tets.push(tabs.selectedLabTests)
      });

      for (let i = 1; i <= this.scount; i++) {
        this.adjustScreenKitRows(this.scount);
      }

    }, (err: any) => {

      this.displayValues = false
      // this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

    }
    );

  }



  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }




  createVisitKitGroup() {

    return this.formBuilder.group({
      acknowledgement: ['Pending'],
      remarks: [''],



    });

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
      acknowledgement: ['Pending'],
      remarks: [''],

    });
  }




  ProtoData(Protocols: any) {
    Protocols.data.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });

    console.log(this.protocols);
  }


  sponsersData(sponsers: any) {

    sponsers.forEach((sponser: any) => {

      this.sponsers.push(sponser);

    });

    console.log(this.sponsers)

  }

  // SubmitData() {


  //   this.vmdetails = []
  //   for (let i = 0; i < this.vMatDetails.length; i++) {
  //     this.vmdetails.push(this.vMatDetails[i].visitsList.value)

  //   }


  //   for (let i = 0; i < this.vkDetails.length; i++) {
  //     // for (let j = 0; i < this.vkDetails[i].length; j++) {
  //     // console.log(this.vkDetails[i], this.vMatDetails[j].visitsList.value[j].status);

  //     // this.vkDetails[j].push({"verification_status": 'val'})


  //     this.vkDetails[i].forEach((protocol: any, index: any) => {
  //       for (let j = 0; j < this.vMatDetails.length; j++) {
  //         // this.vMatDetails.forEach((data:any,index: any)=>{

  //         protocol.acknowledgement = this.vMatDetails[i].visitsList.value[index].acknowledgement
  //         protocol.remarks = this.vMatDetails[i].visitsList.value[index].remarks


  //       }

  //     })

  //   }

  //   this.skDetails.forEach((protocol: any, index: any) => {

  //     protocol.acknowledgement = this.ScreenKitForm.value.screenKitList[index].acknowledgement
  //     protocol.remarks = this.ScreenKitForm.value.screenKitList[index].remarks
  //     // protocol.pdf =  this.pdfValues[index].pdf

  //   })
  //   // for(let i = 0; i<this.skDetails.length; i++ ) {
  //   // for(let j=0 ; j<i; j++){
  //   // console.log(this.pdfValues[i], this.pdfValues);
  //   // this.pdfValues.forEach((k:any, index: any)=>{
  //   //   if(index != k[index].row){


  //   //     this.pdfValues.push({ row: index, pdf: 'No PDF Uploaded' });

  //   //   // }

  //   // }
  //   // })


  //   // }
  //   // this.skDetails.push(this.pdfValues)
  //   const data = {
  //     "protocol_id": this.uuid,
  //     "protocol_name": this.protoName,
  //     "screening_pdf_details": [
  //       this.pdfValues
  //     ],
  //     "visit_pdf_details": [
  //       this.pdfValuesv
  //     ],

  //     "screening_kit_details": [
  //       this.skDetails,

  //     ],
  //     "visit_kit_details": [
  //       this.vkDetails,

  //     ]
  //   }

  //   console.log(data);


  //   // const data = {
  //   //   "protocol_id": this.uuid,
  //   //   "screening_kit_details": this.skDetails,
  //   //   "visit_kit_details": this.vkDetails


  //   // }


  //   console.log(data);

  //   this.protocolService.updatePreparationById(data).subscribe(
  //     (data: any) => {
  //       alert('Sample Acknowledgement Updated Successfully');
  //     },
  //     (err: any) => {
  //       alert(err.errorr.message)
  //     }
  //   );

  // }
  fileSelected(fileInput: any, rowIndex: number): void {
    const file = fileInput.files[0];
    this.uploadedFiles[rowIndex] = file;
    this.getFileUrl(file, rowIndex);
  }

  getFileUrl(file: File, rowIndex: number): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileURL = e.target?.result as string;
      this.fileURLs[rowIndex] = fileURL;
    };
    reader.readAsDataURL(file);


  }


  openDialogv(value: any){
    this.displayv = true;
    this.pdfValuesviewv = value;
    
  }


 
  openDialog(value: any){
    this.display = true;
    this.pdfValuesview = value;
  }

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




}





























