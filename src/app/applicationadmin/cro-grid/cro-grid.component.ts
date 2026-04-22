import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
// import { MessageService } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-cro-grid',
  templateUrl: './cro-grid.component.html',
  styleUrls: ['./cro-grid.component.css']
})
export class CroGridComponent implements OnInit {
  // confirmationService: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText: any
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;




  isMenuOpen: boolean = false;



  allcroDetails: any;
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  // sort(column: string) {
  //   if (this.sortedColumn === column) {
  //     this.sortDirection *= -1;
  //   } else {
  //     this.sortedColumn = column;
  //     this.sortDirection = 1;
  //   }
  // }
  // compareValues(a: any, b: any) {
  //   if (a < b) {
  //     return -1;
  //   } else if (a > b) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }
  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = -this.sortDirection; // Toggle between 1 (ascending) and -1 (descending)
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1; // Default to ascending when changing columns
    }

    this.croDetails.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA === valB) {
        return 0;
      }

      if (valA === null || valA === undefined) {
        return 1;
      }

      if (valB === null || valB === undefined) {
        return -1;
      }

      return (valA < valB ? -1 : 1) * this.sortDirection;
    });
  }


  // constructor(private route: Router,
  //   private admin: AdminService,
  //   private messageService: MessageService) { }

  constructor(
    private route: Router,
    private admin: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }


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
  croCreate() {
    this.route.navigate(['/home/admin/croCreate'])
  }
  toggleSorting() {
    this.isAscendingSort = !this.isAscendingSort;
    // Implement your sorting logic here based on the current sorting state.
  }
  toggleSorting1() {
    this.isAscendingSort1 = !this.isAscendingSort1;
  }

  toggleSorting2() {
    this.isAscendingSort2 = !this.isAscendingSort2;
  }

  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/croUpdate', id, val])
  }
  getCRoDetails() {
    this.admin.getCro().subscribe(
      (data: any) => {
        this.croDetails = data.body
        this.allcroDetails = data.body
        console.log(data.body)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
  }
  confirm2(id: any, data: any) {
    console.log(id, data)
    Swal.fire({
      title: `Are you sure you want to delete ${data.cro_name}'s record ?`,
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
        this.deletecro(id)
        this.admin.getUser().subscribe((data: any) => {
          this.croDetails = data.body
          this.allcroDetails = data.body
          console.log(data.body)
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
  //  deletecro(id: any) {
  //   this.admin.deleteCro(id).subscribe(
  //     (data: any) => {
  //       console.log(data)
  //       this.messageService.add({ severity: 'success', summary: 'Success Message', detail: ' Cro Deleted Successfully' });
  //       this.allcroDetails()
  //     });

  // }
  deletecro(id: any) {
    this.admin.deleteCro(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cro Deleted Successfully' });
        this.getCRoDetails();  // Refresh the lab details after deletion

      },
      (error: any) => {
        console.error('Delete failed:', error);
        // Check for a 401 Unauthorized error
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete cro' });
        }
      }
    );
  }

}
