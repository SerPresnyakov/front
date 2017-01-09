import {Page} from "./Page";
import iFilter = ak.jsonDaoModule.iFilter;
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iRelation = ak.jsonDaoModule.iRelation;

export abstract class AbstractSource<M> {

    $http: ng.IHttpService;
    $q: ng.IQService;

    constructor(
        public crudUrl: string,
        public tableName: string,
        public inj: ng.auto.IInjectorService
    ) {
        this.$http = this.inj.get<ng.IHttpService>("$http");
        this.$q = this.inj.get<ng.IQService>("$q");
    }

    getFullPage(filters: iFilter, rels: iRelation[] = []): ng.IPromise<M> {
        return this.getPage(new Page().setPage(1, 100), filters, rels)
    }

    getPage(page:Page, filters: iFilter, rels: iRelation[] = []): ng.IPromise<M> {
        let result = this.$q.defer<M>();
        //noinspection TypeScriptValidateTypes
        this.$http
            .post(this.crudUrl, {
                get:{
                    pager: page,
                    filters: filters,
                    $:{rels: rels}
                },
            },{
                params:{
                    table: this.tableName
                }
            })
            .then((res: ng.IHttpPromiseCallbackArg<M>) => result.resolve(res.data))
            .catch((err) => result.reject(err));

        return result.promise
    };

    getOne(filters: iFilter, rels: iRelation[] = []): ng.IPromise<M> {
        let deffer = this.$q.defer<M>();
        this.getPage(new Page().setPage(1, 1), filters, rels)
            .then((res) => {
                if (res) deffer.resolve(res[0]);
                else deffer.reject("Not found") })
            .catch((err) => deffer.reject(err));
        return deffer.promise
    };

    getById(id: number, rels: iRelation[] = []): ng.IPromise<M> {
        return this.getOne({fields:[{field: "base.id", op: "eq", value: id}]}, rels)
    }

    create(doc: M): ng.IPromise<any> { return this.modify(doc, "insert") }
    upsert(doc: M): ng.IPromise<any> { return this.modify(doc, "upsert") }
    update(doc: Object): ng.IPromise<any> { return this.modify(doc, "update") }
    remove(doc: Object): ng.IPromise<any> { return this.modify(doc, "delete") }

    modify<T>(doc: T, method: string): ng.IPromise<any> {
        let result = this.$q.defer<any>();

        this.$http
            .post(`${this.crudUrl}`, {
                [method]:{
                    data: doc
                },
            },{
                params:{
                    table: this.tableName
                }
            })
            .then((res: ng.IHttpPromiseCallbackArg<any>) => result.resolve(res.data))
            .catch((err: ng.IHttpPromiseCallbackArg<string>) => result.reject(err));

        return result.promise
    }

}