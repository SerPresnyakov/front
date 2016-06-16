import iPager = ak.json_dao.iPager;
export class Pager implements iPager {

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
