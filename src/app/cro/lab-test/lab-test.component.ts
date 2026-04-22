import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css']
})
export class LabTestComponent implements OnInit {
  breadcrumb: string = 'Lab Test';
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  LabDetails: any[] = [];
  allLabDetails: any;
  materials: any[] = [];
  allmaterials: any;
  page = 1;
  pageM =1;
  totalCount = 0
  pageSize = 10;
  pageSizeM = 10;
  p = 1;
  searchText = '';
  searchTextm = '';
  lab: boolean = true;
  isViewMode: boolean = false;
  public isEdit: boolean = false;


  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  material: boolean = false;
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
 
  public labForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    lab_test: new FormControl("", [Validators.required]),
    classification: new FormControl("", [Validators.required]),
  })
  disableaddbtn: boolean = true
  labFormval: boolean = false;
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;
  disableAdd: boolean = true
  totalCountmaterial = 0;
  selectedIndex = 0;
  classifications = ['Select Classification','Classification 1', 'Classification 2'];
  constructor(private route: Router, private _cro: CrosService,  private location: Location,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.labDetailsData();
    this.meterialsData()
    if (sessionStorage.getItem('tab') === 'yes') {
      this.yes();
    }
    else {
      this.selectedIndex = 0;
      sessionStorage.setItem('tab', '');
    }

  }
  yes() {
    if (this.selectedIndex === 0) {

      this.selectedIndex = this.selectedIndex + 1;
      this.meterialsData()
      this.breadcrumb = 'Material'
    }

    sessionStorage.setItem('tab', '');
  }
  showLab() {
    this.lab = true
    this.material = false
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
  showMat() {
    this.lab = false
    this.material = true
  }
  // edit1(id: any, val: any) {
  //   this.route.navigate(['/home/cro/labTestGrid', id, val])
  // }

  edit1(id: any, val: any) {
    this.route.navigate(['/home/cro/labTestGrid']); 
    this.labFormval = true;  
    this.isViewMode = false;  // Reset view mode when entering edit mode 
    this._cro.getTestDetailsById(id).subscribe(
      (data: any) => {
        console.log('Fetched data:', data); 
        this.labForm.setValue({
          id: id, 
          lab_test: data.name, 
          classification: data.classfication 
        });
        this.labForm.enable(); // Ensure the form is enabled for editing
      },
      (error: any) => {
        console.error('Failed to fetch lab test details:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load lab test details.' });
      }
    );
  }
  
  edit(id: any, val: any) {
    console.log("hii")
    this.route.navigate(['/home/cro/updateLabTest', id, val])
  }
  view(id: string) {
    console.log("hii")
    this.isViewMode = true; 
    this.route.navigate(['/home/cro/labTestGrid', id, 'view']);
  
    this._cro.getTestDetailsById(id).subscribe(
      (data: any) => {
        this.labForm.setValue({
          id: id, 
          lab_test: data.name, 
          classification: data.classfication 
        });
        if (this.isViewMode) {
          this.labForm.disable(); 
        } else {
          this.labForm.enable();
        }
      },
      (error: any) => {
        console.error('Failed to fetch lab test details:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load lab test details.' });
      }
    );
  }
  

  
  materialCreate() {
    this.route.navigate(['/home/cro/createLabTest'])

  }
  
 
  labCreate() {
    // this.route.navigate(['/home/cro/createlabtest'])
    this.labFormval = true
    this.disableAdd = false
    this.disableaddbtn = false
    this.isViewMode = false; // Reset view mode

  }
  labDetailsData() {
    this._cro.getLabTests().subscribe((data: any) => {
      this.LabDetails = data
      this.allLabDetails = data
      this.totalCount = this.LabDetails.length
    })
  }
  onTabChange(event: any) {
   
    if(event.index === 0){
      this.breadcrumb = 'Lab Test'
    }
    else{
      this.breadcrumb = 'Material'
    }
  }
  
  meterialsData() {
    this._cro.meterials().subscribe((data: any) => {
      this.materials = data
      this.allmaterials = data
      this.totalCountmaterial = this.materials.length
    })
  }
  reset() {
    if (this.isEdit === true) {
      window.location.reload()
    }
    else {
      this.labForm.reset()
    }
  }

confirm2(id: any, name: any){
  //console.log(id)
  Swal.fire({
    title: `Are you sure you want to delete the Lab Test '${name}'?`,
    text: "Please note that this cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deletelab(id)
      this._cro.getLabTests().subscribe((data: any) => {
        this.LabDetails = data
        this.allLabDetails = data
        this.totalCount = this.LabDetails.length
      })    
      Swal.fire(
            'Deleted!',
            'Your file has been deleted successfully.',
            'success'
        )
    }
  })
}
confirm3(id: any, name: any){
  //console.log(id)
  Swal.fire({
    title: `Are you sure you want to delete the  '${name}'?`,
    text: "Please note that this cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.deleteMaterial(id)
      this._cro.meterials().subscribe((data: any) => {
        this.materials = data
        this.allmaterials = data
        this.totalCountmaterial = this.materials.length
      })    
      Swal.fire(
            'Deleted!',
            'Your file has been deleted successfully.',
            'success'
        )
    }
  })
}

  pageChangem(event: number) {
    this.pageM = event;
    this.meterialsData()

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.LabDetails = this.allLabDetails;
    }
    else {
      this.LabDetails = this.allLabDetails.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.classfication && labDetails.classfication.toLowerCase().includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  applyFilterm(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.materials = this.allmaterials;
    }
    else {
      this.materials = this.allmaterials.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.size && labDetails.size.includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  submit() {
    this.labForm.controls['lab_test'].setValue(this.capitalizeFirstLetter(this.labForm.controls['lab_test'].value));
    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Lab Test Code' });
    }
    else {
      const data: any =
      {
        "name": this.labForm.get('lab_test')?.value,
        "classfication": this.labForm.get('classification')?.value,
        "created_by": sessionStorage.getItem('userid')
      }
      this._cro.createTestDetails(data).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Lab Test Results Added Successfully' });
          this.labForm.reset()
          if (this.route.url === '/home/cro/labTestGrid') {
            this.route.navigate(['/home/cro/labTestGrid'])
            this.labDetailsData()
          }
          else {
            this.route.navigate(['/home/cro/labTestgrid'])
            this.labDetailsData()
          }
          this.labFormval = false
          this.disableAdd = true
          this.disableaddbtn = true
          this.searchText =''
        },
        (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });


        }
      );
    }

  }
  // deletelab(id: any) {
  //   this._cro.deleteLab(id).subscribe(
  //     (data: any) => {
  //       console.log(data)
  //       this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Test Results Deleted Successfully' });
  //       this.labDetailsData()
  //     });

  // }
  deletelab(id: any) {
    this._cro.deleteLab(id).subscribe(
      (data: any) => {
        console.log('Delete successful:', data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test Results Deleted Successfully' });
        this.labDetailsData(); // Refresh the lab details after deletion
        
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
shouldShowRequired(field: string): boolean {
  const control = this.labForm.get(field);
  return control ? control.errors?.['required'] && control.touched : false;
}

deleteMaterial(id: any) {
  this._cro.deleteMaterial(id).subscribe(
    (data: any) => {
      console.log('Delete successful:', data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test Results Deleted Successfully' });
      this.labDetailsData(); // Refresh the lab details after deletion
      
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

  pageChange(event: number) {
    this.page = event;
    this.labDetailsData()
  }

  updateLabTest() {
    // Ensure the form is valid before submission
    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
      return;
    }
  
    // Prepare the data to be sent to the API
    const data: any = {
      "id": this.labForm.get('id')?.value,  // Assuming you have an ID field for the lab test
      "name": this.labForm.get('lab_test')?.value,
      "classification": this.labForm.get('classification')?.value,
      "updated_by": sessionStorage.getItem('userid')
    };
  
    // Call the updateTestDetails service
    this._cro.updateTestDetails(data).subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lab Test Updated Successfully' });
        this.route.navigate(['/home/cro/labTestGrid']);  // Redirect back to the grid or wherever needed
        this.labDetailsData();  // Refresh the lab details after updating
        this.isViewMode = false; // Reset view mode
      },
      (error: any) => {
        console.error('Update failed:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update lab test.' });
      }
    );
  }
  goBack() {
    console.log("hi")
    this.location.back();
    
  }
}
