export class Page implements jsonDAO.iPage {

    page: number;
    per: number;

    constructor() {}

    setPage(page: number, per: number): Page {
        this.page = page;
        this.per = per;
        return this
    }

}