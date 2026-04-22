import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AdminService } from '../applicationadmin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addprofile: boolean = false
  updatepassword: boolean = false
  passwordvisible: boolean = false;
  showPassword: boolean = false;
  showPassword1: boolean = false;

  @ViewChild('myModal') myModal: any;


  menuItems: any[] = [];
  profileval: boolean = false;
  fullName: any
  log: boolean = false;

  toggleSubItems(item: any) {
    this.menuItems.forEach(menuItem => {
      if (menuItem !== item) {
        menuItem.expanded = false;
      }
    });
    item.expanded = !item.expanded;
  }


  constructor(private messageService: MessageService, private admin: AdminService, private route: Router,
    private formBuilder: FormBuilder, private confirmationService: ConfirmationService, private router: Router) {
    this.isSidebarShrunk = false;



  }

  public showSubheadings = false;
  public updatepasswordForm: FormGroup = new FormGroup({
    passwordDetails: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    otp: new FormControl("", [Validators.required]),
    // oldpassword: new FormControl("", [Validators.required]),
    passwordp: new FormControl("", [Validators.required, Validators.minLength(8)]),
    passwordu: new FormControl("", [Validators.required, Validators.minLength(8)])
    // confirmPassword: new FormControl("", [Validators.required]),

    


  });
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
  cancel() {
    this.confirmationService.close();
  }
  confirm2(){
    Swal.fire({
      title: `Are you sure you want to Logout?`,
      text: "Please note that this cannot be undone!",
      iconHtml: '<img src="https://us.123rf.com/450wm/tmricons/tmricons2009/tmricons200900258/155062880-vector-logout-icon-exit-sign-or-register-logout-button-sign-out.jpg?ver=6" style="height:5rem; border-radius: 50%;">',  
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
        this.clear()
       
       
      }
    })
  }













  // confirm2() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to Logout?',
  //     header: 'Logout Confirmation',
  //     icon: 'pi pi-info-circle',
  //     accept: () => {
  //       this.clear()
  //     },
      // reject: (type: any) => {
        // switch(type) {
        //     case ConfirmEventType.REJECT:
        //         this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        //     break;
        //     case ConfirmEventType.CANCEL:
        //         this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
        //     break;
        // }
  //     }
  //   });
  // }
  role: any
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  isfullscreen = false;
  croRole: boolean = false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')

    this.fullName = sessionStorage.getItem('fullName')
    if (this.role === 'Admin' || this.role === 'admin') {
      this.menuItems = [


        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home'},
        { label: 'CRO', link: '/home/admin/croGrid', icon: 'fas fa-user'   },
        { label: 'USERS', link: '/home/admin/userGrid', icon: 'fas fa-users' },
   
      ];
    }
    else if (this.role === 'CRO') {
      this.menuItems = [


        { label: 'Dashboard', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'Sponsor', link: '/home/cro/sponsorGrid', icon:'fas fa-handshake' },
        { label: 'Site', link: '/home/cro/siteGrid', icon:'fas fa-hospital' },
        { label: 'Lab Test', link: '/home/cro/labTestGrid', icon:'fas fa-vial' },
        { label: 'Lab Creation', link: '/home/cro/labGrid', icon:'fas fa-flask' },
        { label: 'Study Summary', link: '/home/cro/protocolGrid', icon:'fas fa-microscope' },

      ];
    }  else if (this.role === 'Central Lab-Preparation') {
      this.menuItems = [
        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'KIT PREPARATION', link: '/home/centralLab/kitPreparationGrid',icon:'fas fa-toolbox' },
      ];
    }
    else if (this.role === 'Central Lab-Verification') {
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'KIT VERIFICATION', link: '/home/centralLab/kitvarificationGrid', icon:'fas fa-check-circle' },
      ];
    }
    else if (this.role === 'Central Lab-Distribution') {
      this.menuItems = [
        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'KIT DISTRIBUTION', link: '/home/centralLab/kitDistributionGrid', icon:'fas fa-box-open' },
      ];
    }else if (this.role === 'CRA') {
      this.menuItems = [

        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'SAMPLE COLLECTION', link: '/home/site/viewCRA', icon:'fas fa-syringe' },

      ];
    }
    else if (this.role === 'Site Coordinator') {
      this.menuItems = [

        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'ACKNOWLEDGEMENT BY SITE', link: '/home/site/viewCRAAcknowledgement',icon:'fas fa-check-square' },
        { label: 'LAB REPORTS', link: '/home/site/viewcraAcknowledgement', icon:'fas fa-file-alt' },
        { label: 'STUDY SUBJECT', link: '/home/site/viewSubject',icon:'fas fa-id-card'  },
        { label: 'KIT INVENTORY', link: '/home/site/inventory',icon:'fas fa-info-circle' }

      ];
    }
    else if (this.role === 'Central Lab-Acknowledgement') {
      this.menuItems = [

        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'SAMPLE ACKNOWLEDGEMENT', link: '/home/centralLab/kitAcknowledgementGrid',icon:'fas fa-file-pdf' },

      ];
    }
    else if (this.role === 'Central Lab-Reports') {
      this.menuItems = [
        { label: 'DASHBOARD', link: '/home/cro/dashboards',  icon: 'fas fa-home' },
        { label: 'SAMPLE REPORTS', link: '/home/centralLab/kitReportGrid', icon:'fas fa-files-alt'  },
      ];
    }
    else if (this.role === 'Sponsor') {
      this.menuItems = [
 
        { label: 'DASHBOARD', link: '/home/cro/dashboards' ,  icon: 'fas fa-home' },
        { label: 'SPONSOR', link: '/home/Sponsor/sponsorStudies', icon:'fas fa-handshake' }

      ];
    }
     

    const navLinks = document.querySelectorAll('.nav-link');
    const collapses = document.querySelectorAll('.collapse');

    navLinks.forEach(navLink => {
      navLink.addEventListener('click', () => {
        const currentCollapse = navLink.nextElementSibling as HTMLElement;

        collapses.forEach(collapse => {
          if (collapse !== currentCollapse) {
            collapse.classList.remove('show');
          }
        });
      });
    });
  }
  openfullscreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (!this.isfullscreen) {
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      this.isfullscreen = true;
    } else {
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      this.isfullscreen = false;

    }




  }

  showLogout: boolean = false;
  toggleLogout() {
    this.showLogout = !this.showLogout
  }
  first_name: any;
  last_name: any;
  email: any;
  profile() {
    this.addprofile = true;
    this.first_name = sessionStorage.getItem('firstName'),
      this.last_name = sessionStorage.getItem('lastName'),
      this.email = sessionStorage.getItem('email'),
      this.role = sessionStorage.getItem('role')
  }


  emailvaluef: any
  set() {
    this.passwordvisible = true
    this.emailvaluef = this.updatepasswordForm.controls['email'].value.toLowerCase();
    const obj = {
      username: this.emailvaluef,
      clear_session: 'false',
      password: '',
      otp: Number(this.updatepasswordForm.controls['otp'].value),

    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'OTP sent to your Email' });

        // this.route.navigate(['/home'])
      },
      (err: any) => {
        this.passwordvisible = false
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });

      }
    ),
      this.admin['set'](obj).subscribe(
        (data: any) => {
          this.passwordvisible = true

          // this.route.navigate(['/home'])
        },
        (err: any) => {
          this.passwordvisible = false
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
        }
      )

  }

  reset() {
    this.passwordvisible = true
    const obj = {

      email: sessionStorage.getItem('email'),
      password: this.updatepasswordForm.controls['passwordu'].value,
      otp: Number(this.updatepasswordForm.controls['otp'].value),
      prev_password: this.updatepasswordForm.controls['passwordp'].value
      // is_forgot: false

    }

    if (this.updatepasswordForm.controls['passwordp'].value === '' || this.updatepasswordForm.controls['passwordp'].value === undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please Enter Password' });
    }

    else {

      this.admin.reset(obj).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Password Updated Successfully' });
          this.updatepasswordForm.reset();

          console.log(data);
          this.updatepassword = false
          this.passwordvisible = false
          this.myModal.hide();

        },
        (err: any) => {
          console.log(err); // Log the specific error message to the console
          this.updatepassword = false

          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Error occurred while resetting password' });
        }
      );
      ;

    }

  }
  updaten() {
    // this.log=true
    this.confirm2()
    // this.updatepasswordForm.controls['email'].setValue(sessionStorage.getItem('email'))
  }

  update() {
    this.passwordvisible = false

    this.updatepasswordForm = new FormGroup({
      passwordDetails: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      otp: new FormControl("", [Validators.required]),
      // oldpassword: new FormControl("", [Validators.required]),
      passwordp: new FormControl("", [Validators.required, Validators.minLength(8)]),
      passwordu: new FormControl("", [Validators.required, Validators.minLength(8)])
      // confirmPassword: new FormControl("", [Validators.required]),
    });
    this.updatepassword = true
    this.updatepasswordForm.controls['email'].setValue(sessionStorage.getItem('email'))
  }
  validateOTP(input: any, OTP: any) {
    let inputValue = input.value.trim();

    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if (OTP === 'otp') {
      if (numericValue.length > 6) {
        numericValue = numericValue.slice(0, 6);
      }
    }
    input.value = numericValue;
  }
  clear() {

    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
  sidebarToggle!: HTMLElement;
  sidebar!: HTMLElement;
  isSidebarShrunk: boolean;


  ngAfterViewInit() {
    this.sidebarToggle = document.getElementById('sidebar-toggle')!;
    this.sidebar = document.getElementById('sidebar')!;

    if (this.sidebarToggle && this.sidebar) {
      this.sidebarToggle.addEventListener('click', () => {
        if (this.isSidebarShrunk) {
          this.sidebar.style.width = '175px'; // Expand the sidebar
        } else {
          this.sidebar.style.width = '70px'; // Shrink the sidebar
        }

        this.isSidebarShrunk = !this.isSidebarShrunk;
      });
    }
   

  }
}