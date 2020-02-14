import { EnvService } from './../services/env.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imgBase64: string;

  constructor(private envService: EnvService) {}

  ngOnInit(): void {
    this.envService.Get_ScannedImage().subscribe(res => {
      this.imgBase64 = res;
    });
    this.envService.Get_PrintStatu().subscribe(res => {
      console.log(res);
    });
  }
}
