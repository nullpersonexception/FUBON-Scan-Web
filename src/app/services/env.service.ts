import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  scanner: any = (window as any).scanner;

  imgBase64: BehaviorSubject<string>;
  printStatu: BehaviorSubject<boolean>;

  constructor() {
    this.imgBase64 = new BehaviorSubject<string>('');
    this.printStatu = new BehaviorSubject<boolean>(false);
  }

  public Process_ScantoImage() {
    this.scanner.scan(this.Process_StoreImg, {
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
          jpeg_quality: '100',
        },
      ],
    });
  }

  private Process_StoreImg(successful: any, mesg: string | null, res: any) {
    console.log(successful);
    console.log(mesg);
    console.log(JSON.parse(res).output[0].result[0]);

    if (successful) {
      try {
        this.Set_ScannedImage(JSON.parse(res).output[0].result[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Failed: ' + mesg);
    }
  }

  private Set_ScannedImage(res: any): void {
    this.imgBase64.next(res);
  }

  public Get_ScannedImage(): Observable<string> {
    return this.imgBase64.asObservable();
  }

  public Set_PrintStatu(statu: boolean): void {
    this.printStatu.next(statu);
  }

  public Get_PrintStatu(): Observable<boolean> {
    return this.printStatu.asObservable();
  }
}
