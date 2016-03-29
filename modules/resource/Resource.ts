import http = ng.IHttpService
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

export class Resource {

    private $http: http;
    private $q: ng.IQService;

    constructor(
        public url: string,
        public inj: ng.auto.IInjectorService
    ) {
        this.$http = inj.get<http>("$http");
        this.$q = inj.get<ng.IQService>("$q");
    }

    getList<T>(): ng.IPromise<T[]> {

        var def = this.$q.defer<T[]>();

        this.$http
            .get(this.url)
            .then((res: IHttpPromiseCallbackArg<any>) => {
                if (Array.isArray(res.data.data)) {
                    def.resolve(res.data.data)
                } else if (res.data.error) {
                    def.reject(res.data.error)
                } else {
                    throw TypeError("Unknown response")
                }
            })
            .catch((err) => def.reject(err));

        return def.promise

    }

    insert(model: Object): ng.IPromise<any> {

        var def = this.$q.defer<any>();

        def.reject("not implemented");

        return def.promise

    }

    update(id: number, model: Object): ng.IPromise<any> {

        var def = this.$q.defer<any>();

        def.reject("not implemented");

        return def.promise

    }

}