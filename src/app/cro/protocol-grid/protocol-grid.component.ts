import { Component, OnInit } from '@angular/core';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocol-grid',
  templateUrl: './protocol-grid.component.html',
  styleUrls: ['./protocol-grid.component.css']
})
export class ProtocolGridComponent implements OnInit {
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
 

  constructor(private route: Router, private protocol: ProtocolService, private messageService: MessageService) { }

  ngOnInit(): void {
  this.getProtocolDetails();
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort1 = !this.isAscendingSort1;
    // Implement your sorting logic here based on the current sorting state.
  }
  siteCreate(){
    this.route.navigate(['/home/cro/protocol'])
  }
  view(id:string){

    
    this.route.navigate(['/home/cro/protocolView',id, 'protocol'])
  }
  
  edit(id:string){
    this.route.navigate(['/home/cro/protocolUpdate',id])
  }
  pCreate(){
    this.route.navigate(['/home/cro/protocolRegistration'])
  }
  getProtocolDetails(){
   this.protocol.getProtocol().subscribe((data:any)=>{
      console.log(data)
      this.protocolDetails = data
      this.allprotocolDetails = data
      this.totalCount= this.protocolDetails.length
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
        this.deleteprotocol(id)
        this.protocol.getProtocol().subscribe((data: any) => {
          this.protocolDetails = data
      this.allprotocolDetails = data
      this.totalCount= this.protocolDetails.length
        })    
        Swal.fire(
              'Deleted!',
              'Your file has been deleted successfully.',
              'success'
          )
      }
    })
  }
  deleteprotocol(id: any) {
    this.protocol.deleteprotocolById(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test Results Deleted Successfully' });
        this.allprotocolDetails; // Refresh the protocol details after deletion
        
      },
      (error: any) => {
        console.error('Delete failed:', error);
        
        // Check for a 401 Unauthorized error
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete test results' });
        }
      }
    );
}
}
