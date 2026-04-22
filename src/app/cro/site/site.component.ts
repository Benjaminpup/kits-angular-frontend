import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  isAscendingSorta: boolean = true;
  isAscendingSortb: boolean = true;
  subjectDetails: any;
  dataCra: any;
  basicOptions: any;
  chartOptions: any
  tabledisplay: boolean = true
  crasiteenable : boolean = false
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
 
  siteDetails: any[]= [];
  uniqueCombinedArray: any[]= [];
  allSiteDetails: any[] = [];
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;

  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''
  display: boolean = false;
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortedColumn: string = '';
  sort(Column: string) {
  
    if (this.sortedColumn === Column)
    {
      this.sortDirection *= -1;
    }
    else(this.sortedColumn = Column)
    {
      this.sortDirection *= 1;
    }   
  } 
  compareValues(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
 
  basicData: any;


  constructor(private route: Router, private _cro:CrosService, private messageService: MessageService, private protocol: ProtocolService) { }

  ngOnInit(): void {
  this.getSitedetails();
 
  
 
  }
  dashboard(data: any){
    this.crasiteenable = true
    this.tabledisplay = false
    this.getsubjectDetails(data.protocol_id)
}
change(){
  this.crasiteenable = false
  this.tabledisplay = true

}
  getsubjectDetails(val:any) {
    this.subjectDetails= []
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

    this.protocol.dashboardtable(val).subscribe(
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

  toggleSortingb(){
   
    this.isAscendingSortb = !this.isAscendingSortb;
  }
  toggleSortinga(){
  
    this.isAscendingSorta = !this.isAscendingSorta;
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    
    this.isAscendingSort1 = !this.isAscendingSort1;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting2() {
    this.isAscendingSort2 = !this.isAscendingSort2;
    // Implement your sorting logic here based on the current sorting state.
  }
  siteCreate(){
    this.route.navigate(['/home/cro/addSite'])
  }
  edit(id:string, val: string){
    this.route.navigate(['/home/cro/updateSite',id, val])
  }
  getSitedetails(){
   this._cro.getSites().subscribe((data:any)=>{
      console.log(data)
      this.siteDetails = data
      this.allSiteDetails = data
      this.totalCount =  this.siteDetails.length
    })

  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   if (filterValue === '') {
  //     this.siteDetails = this.allSiteDetails;
  //   }
  //   else {
  //     this.siteDetails = this.allSiteDetails.filter(
  //       (siteData: any) =>
  //         (siteData.site_data_code && siteData.site_data_code.toLowerCase().includes(filterValue)) ||
  //         (siteData.site_data_name && siteData.site_data_name.toLowerCase().includes(filterValue)) ||
  //         (siteData.email && siteData.email.toLowerCase().includes(filterValue))
  //     );
  //   }
  // }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.siteDetails = this.allSiteDetails;
    }
    else {
      this.siteDetails = this.allSiteDetails.filter(
        (cro: any) =>
          (cro.site_data_code && cro.site_data_code.toLowerCase().includes(filterValue)) ||
          (cro.site_data_name && cro.site_data_name.toLowerCase().includes(filterValue)) ||
          (cro.email && cro.email.toLowerCase().includes(filterValue))
      );
    }

  }


study(id: any) {
  console.log(id);
  
  this.display = true;
  this.protocol.getPreparationBySId(id).subscribe((data: any) => {
    const uniqueScreeningData = this.getUniqueObjects(data.screening_data, 'user_protocol_id');
    const uniqueVisitData = this.getUniqueObjects(data.visit_data, 'user_protocol_id');

    const newScreeningObj: { uniqueScreeningData: any[] } = { uniqueScreeningData: [] };
    const newVisitObj: { uniqueVisitData: any[] } = { uniqueVisitData: [] };

    uniqueScreeningData.forEach((obj: any) => {
      newScreeningObj.uniqueScreeningData.push(obj);
    });

    uniqueVisitData.forEach((obj: any) => {
      newVisitObj.uniqueVisitData.push(obj);
    });
    const combinedArray = newScreeningObj.uniqueScreeningData.concat(newVisitObj.uniqueVisitData);

    this.uniqueCombinedArray = this.getUniqueObjects(combinedArray, 'user_protocol_id');
  });
  this.crasiteenable = false
    this.tabledisplay = true
}

// getUniqueObjects function remains the same as mentioned in the previous response

  getUniqueObjects(arr: any[], uniqueProperty: string): any[] {
    const uniqueObjects: any[] = [];
    const uniqueValues: Set<any> = new Set();
  
    arr.forEach((obj: any) => {
      const value = obj[uniqueProperty];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueObjects.push(obj);
      }
    });
  
    return uniqueObjects;
  }
 
  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }
  pageChange(event: number) {
    this.page = event;
    this.getSitedetails()
  }
  confirm2(id: any, name: any){
    console.log(id, name)
    Swal.fire({
      title: `Are you sure you want to delete ${name}'s record ?`,
      text: "Please note that this cannot be undone!",
      iconHtml: '<img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style="height:5rem">',
      showCancelButton: true,
      confirmButtonColor: '#0073aa',
      cancelButtonColor: '#fff 1px solid black',
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletesite(id)
        this._cro.getSites().subscribe((data: any) => {
          this.siteDetails = data
          this.allSiteDetails = data
          this.totalCount =  this.siteDetails.length
        })    
        Swal.fire(
              'Deleted!',
              'Your file has been deleted successfully.',
              'success'
          )
      }
    })
  }
  deletesite(id: any) {
    this._cro.deleteSiteById(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Site Deleted Successfully' });
        this.allSiteDetails = data // Refresh the lab details after deletion
        
      },
      (error: any) => {
        console.error('Delete failed:', error);
        
        // Check for a 401 Unauthorized error
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
          // You may choose to navigate to the login page if necessary
          // this.route.navigate(['/login']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete test results' });
        }
      }
    );
}
}
