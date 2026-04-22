import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../sponsor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protocal',
  templateUrl: './protocal.component.html',
  styleUrls: ['./protocal.component.css']
})
export class ProtocalComponent implements OnInit {
  sponsorDetails: any[] = []
  constructor(private route:Router,
    private _sponsor:SponsorService) { }

  ngOnInit(): void {
    // this.getProtocolDetails();
  }

  // getProtocolDetails(){
  //   this._sponsor.getProtocols().subscribe(
  //     (data:any)=>{
  //     this.sponsorDetails = data
  //      console.log(data)
  //     },
  //     (err:any)=>{
  //       alert(err.error.message)
  //     }
  //   )
  // }
}
