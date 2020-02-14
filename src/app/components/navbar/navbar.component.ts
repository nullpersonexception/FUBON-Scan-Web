import { EnvService } from './../../services/env.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private envService: EnvService) {}

  ngOnInit(): void {}

  Process_StartScan() {
    this.envService.Process_ScantoImage();
    this.envService.Set_PrintStatu(true);
  }
}
