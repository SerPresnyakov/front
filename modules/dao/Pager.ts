export class Pager {

  deffered: ng.IDeferred<any[]>;
  data: any[] = [];
  total: number = 0;

  constructor(
      public page: number,
      public per: number,
      public $q: ng.IQService
  ) {
    this.deffered = $q.defer<any[]>()
  }

}
