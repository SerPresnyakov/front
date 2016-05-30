import {Page} from "./Page";

import iPageResponse = api.iPageResponse;

export abstract class AbstractSource<M> {

    $http: ng.IHttpService;
    $q: ng.IQService;

    constructor(
        protected crudUrl: string,
        protected tableName: string,
        inj: ng.auto.IInjectorService
    ) {
        this.$http = inj.get<ng.IHttpService>("$http");
        this.$q = inj.get<ng.IQService>("$q");
    }

    getPage(page:Page, filters: apiAdmin.iFilter[] = []): ng.IPromise<iPageResponse<M>> {
        let result = this.$q.defer<iPageResponse<M>>();
        this.$http
            .post(this.crudUrl, {
                method: "get",
                table: this.tableName,
                pager: page,
                filters: filters
            })
            .then((res: ng.IHttpPromiseCallbackArg<iPageResponse<M>>) => result.resolve(res.data))
            .catch((err) => {result.reject(err);console.log(err)});

        return result.promise
    };

    getOne(filters: apiAdmin.iFilter[]): ng.IPromise<M> {
        let deffer = this.$q.defer<M>();
        this.getPage(new Page().setPage(1, 1), filters)
            .then((res:iPageResponse<M>) => {
                if (res.data[0]) deffer.resolve(res.data[0]);
                else deffer.reject("Not found") })
            .catch((err) => deffer.reject(err));
        return deffer.promise
    };

    getById(id: number): ng.IPromise<M> {
        return this.getOne([{field: "base.id", op: "eq", value: id}])
    }

    create(doc: M): ng.IPromise<any> { return this.modify(doc, "create") }
    update(doc: Object): ng.IPromise<any> { return this.modify(doc, "update") }
    remove(doc: Object): ng.IPromise<any> { return this.modify(doc, "delete") }

    modify<T>(doc: T, method: string): ng.IPromise<any> {
        let result = this.$q.defer<any>();

        this.$http
            .post(`${this.crudUrl}`, {
                method: method,
                table: this.tableName,
                data: doc
            })
            .then((res: ng.IHttpPromiseCallbackArg<any>) => result.resolve(res.data))
            .catch((err: ng.IHttpPromiseCallbackArg<string>) => result.reject(err));

        return result.promise
    }

}