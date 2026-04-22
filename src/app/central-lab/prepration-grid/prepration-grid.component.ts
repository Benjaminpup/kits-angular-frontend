import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-prepration-grid',
  templateUrl: './prepration-grid.component.html',
  styleUrls: ['./prepration-grid.component.css']
})
export class PreprationGridComponent implements OnInit {
  data: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  protocolDetails: any[]= [];
  allprotocolDetails: any[] = [];
isAscendingSort: boolean = true;
isAscendingSort1: boolean = true;

  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''
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

  constructor(private route: Router, private protocol: ProtocolService, private messageService: MessageService ) { }

  ngOnInit(): void {
  this.getProtocolDetails();
  }

  siteCreate(){
    this.route.navigate(['/home/cro/protocol'])
  }
  // view(id:string){

    
  //   this.route.navigate(['/home/cro/kitPrepration',id, 'protocol'])
  // }
  edit(id:string){
  this.data= ''
 
  this.protocol.getPreparationById(id).subscribe(
    (data: any) => {
      this.data = data
    
      // this.route.navigate(['/home/centralLab/kitPrepration', id, 'edit'])
    },
    (err: any) => {
    
      // this.route.navigate(['/home/centralLab/kitPrepration', id, 'add'])
    }
  );

  setTimeout(() => {
    if(this.data){
      this.route.navigate(['/home/centralLab/kitPrepration', id, 'edit'])
    }
    else{
      this.route.navigate(['/home/centralLab/kitPrepration', id, 'add'])
    }
  }, 1000);
  console.log(this.data)
 

 
  }
  // pCreate(){
  //   this.route.navigate(['/home/centralLab/kitPrepration', id])
  // }
  // In your component.ts
toggleSorting() {
  this.isAscendingSort = !this.isAscendingSort;
  // Implement your sorting logic here based on the current sorting state.
}
toggleSorting1() {
  this.isAscendingSort1 = !this.isAscendingSort1;
  // Implement your sorting logic here based on the current sorting state.
}

  getProtocolDetails(){
   this.protocol.getProtocol().subscribe((data:any)=>{
      console.log(data)
      this.protocolDetails = data
      this.allprotocolDetails = data
      this.totalCount = this.protocolDetails.length
    })

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
          (siteData.protocol_id && siteData.protocol_id.toLowerCase().includes(filterValue)) ||
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
