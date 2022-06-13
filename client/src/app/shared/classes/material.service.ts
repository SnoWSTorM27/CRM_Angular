import { ElementRef } from "@angular/core"

declare var M

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {
  static toast(message: string, classes?: string) {
    M.toast({html: message, classes: `${classes}`})
  }

  static initializeFloatingButton(ref:ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextImputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }
}