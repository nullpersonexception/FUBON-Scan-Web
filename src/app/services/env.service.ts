import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

declare var scanner: any;

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  // scanner: any = (window as any).scanner;

  imgBase64: BehaviorSubject<string | null>;
  printStatu: BehaviorSubject<boolean>;

  constructor() {
    this.imgBase64 = new BehaviorSubject<string>('');
    this.printStatu = new BehaviorSubject<boolean>(false);
  }

  public Process_ScantoImage() {
    sessionStorage.removeItem('scanIMG');
    this.Set_ScannedImage();
    scanner.scan(this.Process_StoreImg, {
      twain_cap_setting: {
        ICAP_PIXELTYPE: 'TWPT_RGB', // Color
        ICAP_XRESOLUTION: '100',
        ICAP_YRESOLUTION: '100',
        ICAP_SUPPORTEDSIZES: 'TWSS_USLETTER', // Paper size: TWSS_USLETTER, TWSS_A4, ...
      },
      use_asprise_dialog: false,
      output_settings: [
        {
          type: 'return-base64',
          format: 'jpg',
        },
      ],
    });
  }

  public Process_StoreImg(successful: any, mesg: string | null, res: any) {
    if (!successful) {
      console.error('Failed: ' + mesg);
      return;
    }

    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf('user cancel') >= 0
    ) {
      // User cancelled.
      console.error('User cancelled');
      return;
    }

    const scannedImages = scanner.getScannedImages(res, true, false);
    sessionStorage.setItem('scanIMG', scannedImages[0].src);
  }

  public Set_ScannedImage(): void {
    const detectScanImg = setInterval(() => {
      this.imgBase64.next(sessionStorage.getItem('scanIMG'));
      if (this.imgBase64.value !== null) {
        clearInterval(detectScanImg);
      }
    }, 100);
  }

  public Get_ScannedImage(): Observable<string | null> {
    return this.imgBase64.asObservable();
  }

  public Set_PrintStatu(statu: boolean): void {
    this.printStatu.next(statu);
  }

  public Get_PrintStatu(): Observable<boolean> {
    return this.printStatu.asObservable();
  }
}
