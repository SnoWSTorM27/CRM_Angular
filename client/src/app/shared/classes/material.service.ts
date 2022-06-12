declare var M

export class MaterialService {
  static toast(message: string, classes?: string) {
    M.toast({html: message, classes: `${classes}`})
  }
}