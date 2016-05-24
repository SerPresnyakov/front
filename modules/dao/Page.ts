interface queryParams {
    page?: number
    per?: number
    getAll?: boolean
}

export class Page implements queryParams {

    page: number;
    per: number;

    constructor() {}

    setPage(page: number, per: number): Page {
        this.page = page;
        this.per = per;
        return this
    }

}