declare module api {

    interface iPageResponse {
        data: any[]
    }

    interface PageFilters {
        getWhere(): string[]
    }

}