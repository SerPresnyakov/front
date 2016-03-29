export interface credentials {
    email: string,
    password: string
}

interface token {
    code: string,
    expire: Date
}

interface successLogin {
    userId: number;
    token: token
}

export class AuthService {

    static serviceName = "mjrAuthService";

    static $inject = ["$http", "localStorageService"];

    constructor(
      private $http: ng.IHttpService,
      private $localStorage: ng.local.storage.ILocalStorageService) {}

    login(cred: credentials): ng.IPromise<Boolean> {

      return this.$http.post("/api/auth/login", cred).then((res: ng.IHttpPromiseCallbackArg<successLogin>) => {
        this.$localStorage.set("token", `${res.data.userId}:${res.data.token.code}`);
        return true
      }).catch((err) => {
        console.warn(`AuthService.Login: ${err}`);
        return false
      })

    }

    logout(): ng.IPromise<any> {

      return this.$http.post("/api/auth/logout", {}).then(() => {
        this.$localStorage.remove('token');
      }, (err) => {
        console.warn(`AuthService.Logout: ${err}`); throw err
      })

    }

    me(): ng.IPromise<any> {

      return this.$http.get("/api/auth/me").then((res: ng.IHttpPromiseCallbackArg<any>) => {
        return res.data.data
      })

    }

}
