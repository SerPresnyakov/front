export class Page {

    page: number;
    per: number;

    constructor() {}

    setPage(page: number, per: number): Page {
        this.page = page;
        this.per = per;
        return this
    }

}