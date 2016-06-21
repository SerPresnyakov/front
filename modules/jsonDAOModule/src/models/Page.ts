import iPage = ak.json_dao.iPage;

export class Page implements iPage {

    page: number;
    per: number;

    constructor() {}

    setPage(page: number, per: number): Page {
        this.page = page;
        this.per = per;
        return this
    }

}