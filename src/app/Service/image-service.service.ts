import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor() { }

  private imageUpdatedSource = new Subject<void>();
  imageUpdated$ = this.imageUpdatedSource.asObservable();
  triggerImageUpdate() {
    this.imageUpdatedSource.next();
  }


}
