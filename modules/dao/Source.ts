import {Page} from "./Page";



interface iPageResponse {
    data: any[]
    items: number
}

export interface PageFilters {
    getWhere(): string[]
}

export class Source {

    $http: ng.IHttpService;
    $q: ng.IQService;
    localStorage:ng.local.storage.ILocalStorageService;
    state;
    Restangular;
    token;

    constructor(
        protected sourceName: string,
        protected restUrl: string,
        protected inj: ng.auto.IInjectorService,
        public include: any,
        public filter: any
    ) {
        this.$http = inj.get<ng.IHttpService>("$http");
        this.$q = inj.get<ng.IQService>("$q");
        this.localStorage = inj.get<ng.local.storage.ILocalStorageService>("localStorageService");
        this.state = inj.get<ng.ui.IStateService>("$state");
        if(restUrl != "/left/client" && restUrl != "/left/pricelab/shop") {
            this.token = this.localStorage.get<string>("token");
        }
        else {
            this.token = "1:6273543320";
        }


    }

    //setFilters(){
    //    let res= "";
    //    angular.forEach(this.filter,(f)=>{
    //        if(f.fieldType.type=="str"){
    //            if (f.parent==null) {
    //                res = "base." + f.name + "_like_" + f.value + ";" + res;
    //            }
    //        }else if(f.fieldType.type == "int"){
    //            res = "base." + f.name + "_eqN_" + f.value + ";" + res;
    //        }else if(f.fieldType.type == "bool"){
    //            if(f.value) {
    //                res = "base." + f.name + "_eqB_" + f.value + ";" + res;
    //            } else {
    //                res = "base." + f.name + "_eqB_false;" + res;
    //            }
    //
    //        }
    //    });
    //    return res
    //}

    getPage(page:Page): ng.IPromise<iPageResponse> {
        let result = this.$q.defer<iPageResponse>();
        let params = page;
        if(this.filter.exist()){
            params["filter"] = this.filter.getRestFilters();
        }
        if (this.include != null) params["include"] = this.include.join(',');
        this.$http
            .get(this.restUrl, {params: params, headers:{token:this.token}})
            .then((res: ng.IHttpPromiseCallbackArg<iPageResponse>) => result.resolve(res.data))
            .catch((err) => {
                console.error(err);
                result.reject(err.data);
                if(err.status==401){
                    this.state.go("login", {from: this.state.current.name});
                }
            });

        return result.promise
    };

    getAll(): ng.IPromise<any[]> {
        return this.getPage(new Page().setGetAll()).then((res) => res.data)
    };

    getOne(id: number):ng.IPromise<any[]> {
        let params = {};
        if (this.include != null) params["include"] = this.include.join(',');
        return this.$http
            .get(`${this.restUrl}/${id}`, {
                    params: params,
                    headers: {
                        token: this.token
                    }
            })
            .then((res) => res.data)
    };

    //create(doc: M): ng.IPromise<number> {
    //    let result = this.$q.defer<number>();
    //
    //    this.$http
    //        .post(`${this.restUrl}`, doc)
    //        .then((res: ng.IHttpPromiseCallbackArg<number>) => {
    //            return result.resolve(res.data);
    //        })
    //        .catch((err: ng.IHttpPromiseCallbackArg<string>) => {
    //            result.reject(err.data)
    //        });
    //
    //    return result.promise
    //}
    //

    remove(id: number): ng.IPromise<boolean> {

        let result = this.$q.defer<boolean>();
        this.$http
            .delete(`${this.restUrl}/${id}`,{
                headers: {
                    token: this.token
                }
            })
            .then((res: ng.IHttpPromiseCallbackArg<boolean>) => {
                result.resolve(res.data);
            })
            .catch((err: ng.IHttpPromiseCallbackArg<string>) => {
                result.reject(err.data)
            });
        return result.promise

    };

    patch(id: number, doc: any): ng.IPromise<boolean> {
        let result = this.$q.defer<boolean>();
        this.$http.patch(`${this.restUrl}/${id}`, doc, { headers: {
            token: this.token
        }})
            .then((res: ng.IHttpPromiseCallbackArg<boolean>) => {
                result.resolve(res.data);
            })
            .catch((err) => {
                result.reject(err.data)
            });
        return result.promise
    }

    getToken(){
        return this.token
    }

}
