import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-view-sites',
  templateUrl: './view-sites.component.html',
  styleUrls: ['./view-sites.component.css']
})
export class ViewSitesComponent implements OnInit {
  heading: string='';
  name: any;
  heading1: any;
  listName: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  protocolDetails: any[] = [];
  allprotocolDetails: any[] = [];
  page = 1;
  totalCount = 0
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;

  pageSize = 10;
  p = 1;
  searchText = ''
  email: string | null;
  ID: any;
  uniqueCombinedArray: any[] = [];
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  iconClass: any;
  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
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

  constructor(private route: Router, private protocol: ProtocolService, private croService: CrosService) { 
    this.email =sessionStorage.getItem('email')
  }

  ngOnInit(): void {
   this.study()
   this.croService.getSiteById(sessionStorage.getItem('siteId')).subscribe((data: any) => {
    this.ID = data.site_data_code
    this.name = data.site_data_name


  });
   if (this.route.url === '/home/site/viewCRA') {
    this.heading = 'Sample Collection'
    this.heading1 = 'Sample Collection'
    this.iconClass = 'fas fa-vial';
    this.listName='Sample Collection List'
  }
  else if (this.route.url === '/home/site/viewCRAAcknowledgement') {
    this.heading = 'Acknowledgement By Site'
    this.heading1 = 'Acknowl By Site'
    this.iconClass = 'fas fa-file-prescription';
    this.listName='Acknowledgement List'
  } 
  else if (this.route.url === '/home/site/viewcraAcknowledgement') {
    this.heading = 'Lab Reports'
    this.heading1 = 'Lab Reports'
    this.iconClass = 'fas fa-vials';
    this.listName='Lab Reports List'
  } 
  else if (this.route.url === '/home/site/viewSubject') {
    this.heading = 'Study Subject'
    this.heading1 = 'Study Subject'
    this.iconClass = 'fas fa-laptop-medical';
    this.listName='Study Subject List'
  } 
 
    }
    toggleSorting() {
      this.isAscendingSort = !this.isAscendingSort;
      // Implement your sorting logic here based on the current sorting state.
    }
    toggleSorting1() {
      this.isAscendingSort1 = !this.isAscendingSort1;
    }
  siteCreate(){
      this.route.navigate(['/home/cro/protocol'])
    }
  view(id: string){
      this.route.navigate(['/home/cro/protocolView', id])
    }
    edit(id: string) {
      if (this.route.url === '/home/site/viewCRA') {
        this.route.navigate(['/home/site/sampleCollection', id])
      } 
      else if (this.route.url === '/home/site/viewCRAAcknowledgement') {
        this.route.navigate(['/home/site/studySiteAcknowledgement', id])
     }
     else if (this.route.url === '/home/site/viewcraAcknowledgement') {
      this.route.navigate(['/home/site/labReports', id])
   }
   else if (this.route.url === '/home/site/viewSubject') {
    this.route.navigate(['/home/site/newkits', id])
  }
    }
    study() {
      this.protocol.getPreparationBySId(sessionStorage.getItem('siteId')).subscribe((data: any) => {
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
        this.totalCount = this.uniqueCombinedArray.length
        this.allprotocolDetails = this.getUniqueObjects(combinedArray, 'user_protocol_id');
      });
      
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
      applyFilter(filterValue: string) {
        console.log(this.uniqueCombinedArray)
        console.log(this.allprotocolDetails)
          filterValue = filterValue.trim(); // Remove whitespace
          filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
          if(filterValue === '') {
          this.uniqueCombinedArray = this.allprotocolDetails;
        }
        else {
          this.uniqueCombinedArray = this.allprotocolDetails.filter(
            (siteData: any) =>
              (siteData.protocol_id && siteData.user_protocol_id.toLowerCase().includes(filterValue)) ||
              (siteData.protocol_name && siteData.protocol_name.toLowerCase().includes(filterValue)) ||
              (siteData.email && siteData.email.toLowerCase().includes(filterValue))
          );
        }
      } pageChange(event: number) {
    this.page = event;
    // this.getProtocolDetails()
  }
}
