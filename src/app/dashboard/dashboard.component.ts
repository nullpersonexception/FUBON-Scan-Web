import { EnvService } from './../services/env.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imgBase64: string | null;

  constructor(
    private envService: EnvService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    try {
      sessionStorage.removeItem('scanIMG');
    } catch (e) {}

    this.envService.Get_ScannedImage().subscribe(res => {
      if (res !== null) {
        this.sanitizer.bypassSecurityTrustUrl(res);
      }
      this.imgBase64 = res;
    });
    this.envService.Get_PrintStatu().subscribe(res => {
      console.log(res);
    });
  }
}
