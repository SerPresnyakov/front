import {Page} from "./Page";

import iPageResponse = api.iPageResponse;

export abstract class AbstractSource {

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

    getPage(page:Page, filters: Object[]): ng.IPromise<any[]> {
        let result = this.$q.defer<any[]>();
        this.$http
            .post(this.crudUrl, {
                method: "retrieve",
                table: this.tableName,
                pager: page
            })
            .then((res: ng.IHttpPromiseCallbackArg<any[]>) => result.resolve(res.data))
            .catch((err) => result.reject(err.data));

        return result.promise
    };

    getOne(id: number): ng.IPromise<Object> {
        return this.getPage(new Page().setPage(1, 1), [
            {field: "base.id", op: "eq", "value": id}
        ]).then(res => res[0])
    };

    create(doc: Object): ng.IPromise<any> { return this.modify(doc, "create") }
    update(doc: Object): ng.IPromise<any> { return this.modify(doc, "update") }
    remove(doc: Object): ng.IPromise<any> { return this.modify(doc, "delete") }

    modify(doc: Object, method: string): ng.IPromise<any> {
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