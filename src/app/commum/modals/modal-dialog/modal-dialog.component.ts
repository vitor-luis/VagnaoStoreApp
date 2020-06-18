import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LottieAnimationViewModule } from "ng-lottie"
import { BsModalRef } from "ngx-bootstrap/modal"

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  @Input() message: string
  @Output() action = new EventEmitter
  lottieConfig: any

  constructor(private _bsModalRef: BsModalRef) {
    LottieAnimationViewModule.forRoot()
    this.lottieConfig = {
      path: 'assets/animations/alert.json',
      autoplay: true,
      loop: false
    }
  }

  decline() {
    this.action.emit(false)
    this.close()
  }

  confirm() {
    this.action.emit(true)
    this.close()
  }

  close() {
    this._bsModalRef.hide()
  }

}
