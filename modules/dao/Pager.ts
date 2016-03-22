
export class Pager {

  data: any[] = [];
  total: number = 0;

  constructor(
      public page: number,
      public per: number
  ) {}

}
