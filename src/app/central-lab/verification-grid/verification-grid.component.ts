import { Component, OnInit } from '@angular/core';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verification-grid',
  templateUrl: './verification-grid.component.html',
  styleUrls: ['./verification-grid.component.css']
})
export class VerificationGridComponent implements OnInit {
  protocolDetails: any[]= [];
  allprotocolDetails: any[] = [];
  searchText= ''
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortedColumn: string = '';
  page = 1;
  totalCount = 0
  pageSize = 10;
  heading :any;
  heading1 :any;
  iconClass: any;
  listName: any;

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
 constructor(private route: Router, private protocol: ProtocolService, private messageService: MessageService  ) { }

  ngOnInit(): void {
    this.getProtocolDetails();
    
  if(this.route.url === '/home/centralLab/kitvarificationGrid')
  {
    this.heading = 'Kit Verification'
    this.heading1 = 'Kit Verification'
    this.iconClass = 'fas fa-diagnoses';
    this.listName=' Kit Verification List'
    
  }
  else if(this.route.url === '/home/centralLab/kitDistributionGrid'){
    this.heading = 'Kit Distribution'
    this.heading1 = 'Kit Distribution'
    this.iconClass = 'fas fa-briefcase-medical';
    this.listName=' Kit Distribution List'


  }
  else if(this.route.url === '/home/centralLab/kitAcknowledgementGrid'){
    this.heading = 'Sample Acknowledgement'
    this.heading1 = 'Sample Acknow..'
    this.iconClass = 'fas fa-file-medical';
    this.listName='Sample Acknowledgement List'
  

  }
  else if(this.route.url === '/home/centralLab/kitReportGrid'){
    this.heading = 'Sample Reports'
    this.heading1 = 'Sample Reports'
    this.iconClass = 'fas fa-notes-medical';
    this.listName='Sample Reports List'
  }
    
  }
 




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
  
  siteCreate(){
    this.route.navigate(['/home/cro/protocol'])
  }
  edit(id:any){
  
  if(this.route.url === '/home/centralLab/kitvarificationGrid')
  {
      this.route.navigate(['/home/centralLab/kitVerification', id])
  }
  else if(this.route.url === '/home/centralLab/kitDistributionGrid'){
    this.route.navigate(['/home/centralLab/kitDistribution', id])

  }
  else if(this.route.url === '/home/centralLab/kitAcknowledgementGrid'){
    this.route.navigate(['/home/centralLab/sampleAcknowledgement', id])
  }
  else if(this.route.url === '/home/centralLab/kitReportGrid'){
    this.route.navigate(['/home/centralLab/sampleReports', id])
  }
    
  
}


    
  getProtocolDetails(){
    this.protocol.getPreparation().subscribe((data:any)=>{
       this.protocolDetails = data.data
       this.allprotocolDetails = data.data
      this.totalCount =  this.protocolDetails.length

     })}
    toggleSorting() {
      this.isAscendingSort = !this.isAscendingSort;
      // Implement your sorting logic here based on the current sorting state.
    }
    toggleSorting1() {
      this.isAscendingSort1 = !this.isAscendingSort1;
      // Implement your sorting logic here based on the current sorting state.
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace

      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      if (filterValue === '') {
        this.protocolDetails = this.allprotocolDetails;

      }

      else {
        this.protocolDetails = this.allprotocolDetails.filter(
          (siteData: any) =>
            (siteData.user_protocol_id && siteData.user_protocol_id.toLowerCase().includes(filterValue)) ||
            (siteData.protocol_name && siteData.protocol_name.toLowerCase().includes(filterValue)) ||
            (siteData.email && siteData.email.toLowerCase().includes(filterValue))
        );

      }
    }

    pageChange(event: number) {
      this.page = event;
      this.getProtocolDetails()
    }
  }


