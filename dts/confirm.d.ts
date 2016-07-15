declare module angular.confirm {

  interface IConfirmService {
    (options: IConfirmOptions): ng.IPromise<any>
  }

  interface IConfirmOptions {
    text?: string
    title?: string
    ok?: string
    cancel?: string
  }

}
