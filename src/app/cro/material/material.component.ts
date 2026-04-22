import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  stackedData2: any
  subjectDetails: any;
  protocols: Array<any> = [];
  enablestudy: boolean = false;
  adminfields: boolean = false;
  verificationFields: boolean = false;
  distributionFields: boolean = false;
  subjectDetailsprotocol: any;
  protoname: any;
  basicDataProtocol: any;

  dataCraProtocol: any
  acknowledgementFields: boolean= false;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  date1: any
  enableFields: boolean = false;
  crasiteenable: boolean = false;
  disablefields: boolean = false;
  disappearfields: boolean = false;
  appearfields: boolean = false;
  sponserfields: boolean = false;

  dashboardform: any;
  myForm: any;
  tabs: any[] = []; // Array to hold tabs
  // activeTab: number = ''; // Active tab index
  count = 2;
  cards: any[] = [];
  craform: any;
  sponserForm: any;
  dataSponsor: any;


  chartOptions: any;
  sponsors: any

  role: any;
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  croRole: boolean = false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  dataCentralLabs: any;
  dataCro: any;
  dataCra: any
  stackedData: any;

  stackedOptions: any;
  dashboardsData: any;
  crocenable: boolean = false;
  cracenable: boolean = false;
  sponsorcenable: boolean = false;
  labcenable: boolean = false;
  adminc: boolean = false;
  basicData: any;
  basicData2: any;
  basicOptions: any;
  constructor(private fb: FormBuilder, private protocolService: ProtocolService, private admin: AdminService, private protocol:ProtocolService) { }

  ngOnInit() {
    this.getsubjectDetails()
   
  
    this.admin.dashboard().subscribe((data: any) => {
      this.dashboardsData = data
     

      this.dataCro = {
        labels: ['Protocols',
          'Sites',
          'Sponsors',
          'LabTests',
          'Materials'
        ],
        datasets: [
          {
            data: [this.dashboardsData.no_of_protocols, this.dashboardsData.no_of_sites, this.dashboardsData.no_of_sponsors, this.dashboardsData.no_of_lab_tests,
            this.dashboardsData.no_of_materials],

            backgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
            ],
            hoverBackgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
            ]
          }
        ]
      };
      this.dataCentralLabs = {
        labels: ['No.of Protocols',
          'No.of Kits',
          'No.of Patients',
          'Prepared Kits',
          'In Progress Kits',
          'Verified Kits',
          'Not Verified Kits',
          'Pending Samples',
          'Recieved Samples'],
        datasets: [
          {
            data: [this.dashboardsData.no_of_protocols,
            this.dashboardsData.no_of_kits,
            this.dashboardsData.no_of_patients,
            this.dashboardsData.no_of_completed_kits
              , this.dashboardsData.no_of_inprogress_kits,
            this.dashboardsData.no_of_verified_kits,
            this.dashboardsData.no_of_not_verified_kits, this.dashboardsData.no_of_pending_collections,
            this.dashboardsData.no_of_received_collections],
            backgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
              '#D0ECE7',
              '#A569BD',
              '#D7BDE2',
              '#F4ECF7'
            ],
            hoverBackgroundColor: [
              "#D98880",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE",
              '#D0ECE7',
              '#A569BD',
              '#D7BDE2',
              '#F4ECF7'
            ]
          }
        ]
      };
      this.stackedData = {
        labels: ['P0001', 'P0002', 'P0003', 'P0004', 'P0005', 'P0006', 'P0007'],
        datasets: [{
          type: 'bar',
          label: 'A',
          backgroundColor: '#42A5F5',
          data: [
            50,
            25,
            12,
            48,
            90,
            76,
            42
          ]
        }, {
          type: 'bar',
          label: 'B',
          backgroundColor: '#66BB6A',
          data: [
            21,
            84,
            24,
            75,
            37,
            65,
            34
          ]
        }, {
          type: 'bar',
          label: 'C',
          backgroundColor: '#FFA726',
          data: [
            41,
            52,
            24,
            74,
            23,
            21,
            32
          ]
        }]
      };
      this.stackedData2 = {
        labels: ['P0001'],
        datasets: [{
          type: 'bar',
          label: 'A',
          backgroundColor: '#42A5F5',
          data: [
            50,

          ]
        }, {
          type: 'bar',
          label: 'B',
          backgroundColor: '#66BB6A',
          data: [
            21,

          ]
        }]
      };

      this.stackedOptions = {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      };

      this.dataSponsor = {
        labels: ['No.of Sponsors', 'No.of Protocols'],
        datasets: [
          {
            data: [this.dashboardsData.no_of_sponsors, this.dashboardsData.no_of_protocols],
            backgroundColor: [
              "#D98880 ",
              '#F5B7B1'
            ],
            hoverBackgroundColor: [
              "#D98880 ",
              '#F5B7B1'
            ]
          }
        ]
      };


    })
    this.myForm = this.fb.group({
      tabControls: this.fb.array([]) // Create an empty FormArray
    });

    this.dashboardform = this.fb.group({
      cardControls: this.fb.array([])

    })

    this.craform = this.fb.group({
      cardControls: this.fb.array([])

    })
    this.sponserForm = this.fb.group({
      cardControls: this.fb.array([])
    })





    this.role = sessionStorage.getItem('role')
    if (this.role === 'Admin' || this.role === 'admin') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = false;
      this.adminc = false;
      this.sponserfields = false;
      this.adminfields = true
      this.crasiteenable = false;


    }
    else if (this.role === 'Sponsor') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = true;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = true;
      this.labcenable = false;
      this.adminc = false;
      this.sponserfields = true;
      this.crasiteenable = false;
    }
    else if (this.role === 'CRO') {
      this.enableFields = false;
      this.disablefields = true;
      this.disappearfields = false;
      this.appearfields = false;
      this.crocenable = true;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;


    }

    // 'Central Lab-Preparation', 'Central Lab-Verification', 'Central Lab-Distribution', 'Central Lab-Acknowledgement', 'Central Lab-Reports'
    else if (this.role === 'Central Lab-Preparation') {
      this.enableFields = true;
      this.disablefields = false;
      this.disappearfields = false
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = true;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;


    }
    else if (this.role === 'Central Lab-Acknowledgement') {
      // this.enableFields = false;
      this.acknowledgementFields = true
      // this.disablefields = false;
      // this.disappearfields = false
      // this.appearfields = false;
      // this.crocenable = false;
      // this.cracenable = false;
      // this.sponsorcenable = false;
      
      // this.adminc = false;
      // this.sponserfields = false;
      // this.crasiteenable = false;


    }
    
    else if (this.role === 'Central Lab-Verification') {
      this.verificationFields = true;
      this.disablefields = false;
      this.disappearfields = false
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = true;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;

    }
    else if (this.role === 'Central Lab-Distribution') {
      this.distributionFields = true;
      this.disablefields = false;
      this.disappearfields = false
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = true;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;

    }
    
    else if (this.role === 'CRA') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = true;
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = true;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.sponserfields = false;
      this.crasiteenable = false;

    }
    else if (this.role === 'Site Coordinator') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.crasiteenable = true;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.sponserfields = false;
      this.protocolService.getProtocol().subscribe((protocols) => {
        this.ProtoData(protocols);
      });
  
    }

  }
  ProtoData(Protocols: any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);
    });
  }
  getdashboardDetails(e: any){
    this.basicDataProtocol = {
      labels: '',
      datasets: [
        {
          label: 'Sample Collected',
          backgroundColor: '#42A5F5',
          data: [0,0]
        },

      ]
    };
    this.dataCraProtocol = {
      labels: ['No.of Screened', 'Not Screened'
      ],
      datasets: [
        {

          data: [0,0],
          backgroundColor: [
            "#D98880 ",
            '#F5B7B1',
            
          ],
          hoverBackgroundColor: [
            "#D98880 ",
            '#F5B7B1',
           
          ]
        }
      ]

    };
    this.protocols.forEach((val:any)=>{
      if(val.id === e.target.value)    
    this.protoname= val.protocol_id
    });
    this.subjectDetailsprotocol = []
   
    this.enablestudy = true
    this.getsubjectDetails()
    this.protocol.dashboardtable(e.target.value).subscribe(
      (data: any) => {
        

        this.subjectDetailsprotocol = data
        this.basicDataProtocol = {
          labels: data.bar_data.protocol_ids,
          datasets: [
            {
              label: 'Sample Collected',
              backgroundColor: '#42A5F5',
              data: this.subjectDetailsprotocol.bar_data.values
            },
    
          ]
        };
        this.dataCraProtocol = {
          labels: ['No.of Screened', 'Not Screened'
          ],
          datasets: [
            {
  
              data: this.subjectDetailsprotocol.pie_chart.values,
              backgroundColor: [
                "#D98880 ",
                '#F5B7B1'
                
              ],
              hoverBackgroundColor: [
                "#D98880 ",
                '#F5B7B1'
                
              ]
            }
          ]
  
        };
        

      },
      (err: any) => {
        // this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }

  getsubjectDetails() {
    this.basicData = {
      labels: '',
      datasets: [
        {
          label: 'Sample Collected',
          backgroundColor: '#42A5F5',
          data: [0,0]
        },

      ]
    };
    this.dataCra = {
      labels: ['No.of Screened', 'Not Screened'
      ],
      datasets: [
        {

          data: [0,0],
          backgroundColor: [
            "#D98880 ",
            '#F5B7B1',
            
          ],
          hoverBackgroundColor: [
            "#D98880 ",
            '#F5B7B1',
           
          ]
        }
      ]

    };
    this.subjectDetails = []
    this.protocol.dashboardtable('all').subscribe(
      (data: any) => {     
        this.subjectDetails = data  
       
        this.basicData = {
          labels: data.bar_data.protocol_ids,
          datasets: [
            {
              label: 'Sample Collected',
              backgroundColor: '#42A5F5',
              data: data.bar_data.values
            },
    
          ]
        };
        this.dataCra = {
          labels: ['No.of Screened', 'Not Screened'
          ],
          datasets: [
            {
  
              data: data.pie_chart.values,
              backgroundColor: [
                "#D98880 ",
                '#F5B7B1',
                '#FDEBD0 ',
                "#45B39D",
                "#A2D9CE ",
                '#D0ECE7'
              ],
              hoverBackgroundColor: [
                "#D98880 ",
                '#F5B7B1',
                '#FDEBD0 ',
                "#45B39D",
                "#A2D9CE ",
                '#D0ECE7'
              ]
            }
          ]
  
        };
  
      },
      (err: any) => {
        // this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )

  }
  }
  
 
