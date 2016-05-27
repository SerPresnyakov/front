declare module api {

    interface iPageResponse<T> {
        data: T[]
    }

    interface PageFilters {
        getWhere(): string[]
    }



}