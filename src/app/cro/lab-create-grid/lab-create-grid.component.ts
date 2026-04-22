import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from '../cros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-create-grid',
  templateUrl: './lab-create-grid.component.html',
  styleUrls: ['./lab-create-grid.component.css']
})
export class LabCreateGridComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;

  p = 1;
  searchText: any
  allcroDetails: any;
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
 

  constructor(private route: Router,
    private cro: CrosService,
    private messageService: MessageService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.croDetails = this.allcroDetails;
    }
    else {
      this.croDetails = this.allcroDetails.filter(
        (cro: any) =>
          (cro.cro_code && cro.cro_code.toLowerCase().includes(filterValue)) ||
          (cro.cro_name && cro.cro_name.toLowerCase().includes(filterValue)) ||
          (cro.legal_cro_name && cro.legal_cro_name.toLowerCase().includes(filterValue))
      );
    }

  }
  pageChange(event: number) {
    this.page = event;
    this.getCRoDetails()
  }


  ngOnInit(): void {
    this.getCRoDetails();
  }
  labCreate() {
    this.route.navigate(['/home/cro/createlabtest'])
  }
  edit(id: string, val: string) {
   
    this.route.navigate(['/home/cro/updatecLabTest', id, val])
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting2() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  getCRoDetails() {
    this.cro.getlabs().subscribe(
      (data: any) => {
        this.croDetails = data
        this.allcroDetails = data
        console.log(data)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
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
        this.deletelab(id)
        this.cro.getlabs().subscribe((data: any) => {
          this.croDetails = data
          this.allcroDetails = data
          console.log(data)
          this.totalCount = this.croDetails.length
        })    
        Swal.fire(
              'Deleted!',
              'Your file has been deleted successfully.',
              'success'
          )
      }
    })
  }
  deletelab(id: any) {
    this.cro.deleteLabById(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lab Creation Deleted Successfully' });
        this.allcroDetails(); // Refresh the lab details after deletion
        
      },
      (error: any) => {
        console.error('Delete failed:', error);
        
        // Check for a 401 Unauthorized error
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
          // You may choose to navigate to the login page if necessary
          // this.route.navigate(['/login']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete creation' });
        }
      }
    );
}
}
