import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  public getUserData: any;
  userDetails: any[] = [];
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;

  searchText = ''
  allUserData: any;
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
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
  constructor(private admin: AdminService, private route: Router,private messageService: MessageService ) {
    this.getUser()

  }
  
  

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.userDetails = this.allUserData;
    } else {
      this.userDetails = this.allUserData.filter((user: any) => {
        const fullName = (user.first_name + ' ' + user.last_name).toLowerCase();
        return (
          fullName.includes(filterValue) ||
          user.role.toLowerCase().includes(filterValue) ||
          user.email.toLowerCase().includes(filterValue)
        );
      });
    }
  }
//   deleteUser(id: any) {
//     this.admin.deleteUserById(id).subscribe(
//       (data: any) => {
//         console.log("hello delete",data)
//         console.log('Delete successful:', data);
//         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
//         this.allUserData(); // Refresh the lab details after deletion
        
//       },
//       (error: any) => {
//         console.error('Delete failed:', error);
//         // Check for a 401 Unauthorized error
//         if (error.status === 401) {
//           this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
//         } else {
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete cro' });
//         }
//       }
//     );
// }
//   confirm2(id: any, name: any){
//     console.log(id,name)
//     Swal.fire({
//       title: `Are you sure you want to delete the User ?`,
//       text: "Please note that this cannot be undone!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.deleteUser(id);
//         this.admin.getUser().subscribe((data: any) => {
//           this.userDetails = data
//           this.allUserData = data
//           this.totalCount = this.userDetails.length
//         })    
//         Swal.fire(
//               'Deleted!',
//               'Your file has been deleted successfully.',
//               'success'
//           )
//       }
   
//     })
//   }
  // deleteuser(id: any) {
  //   this.admin.deleteUserById(id).subscribe(
  //     (data: any) => {
  //       console.log(data)
  //       this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'User Deleted Successfully' });
  //       this.allUserData()
  //     });

  // }

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
        this.deleteUser(id)
        this.admin.getUser().subscribe((data: any) => {
          this.userDetails = data.body
        this.allUserData = data.body
        console.log(data.body)
        this.totalCount = this.userDetails.length
        })    
        Swal.fire(
              'Deleted!',
              'Your file has been deleted successfully.',
              'success'
          )
      }
    })
  } 
  deleteUser(id: any) {
    this.admin.deleteUserById(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
        this.allUserData();  // Refresh the lab details after deletion
        
      },
      (error: any) => {
        console.error('Delete failed:', error);
        // Check for a 401 Unauthorized error
        if (error.status === 401) {
          this.messageService.add({ severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized. Redirecting to login...' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
        }
      }
    );
}
  pageChange(event: number) {
   this.page = event;
    this.getUser()
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
  
  addUser() {
    this.route.navigate(['/home/admin/userCreate'])
  }
  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/userUpdate', id, val])
  }
  getUser() {
    this.getUserData = this.admin.getUser().subscribe((data: any) => {
      console.log(data)
      this.userDetails = data
      this.allUserData = data
      this.totalCount = this.userDetails.length
    })

  }

}
