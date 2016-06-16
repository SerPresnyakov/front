export interface credentials {
    email: string
    password: string
}

interface token {
    code: string
    expire: Date
}

interface successLogin {
    data: {
        userId: number
        token: token
    }
}

export class AuthService {

    static $inject = ["$http", "localStorageService"];

    static serviceName = "ak.authService";

    constructor(
      private $http: ng.IHttpService,
      private $localStorage: ng.local.storage.ILocalStorageService) {}

    login(cred: credentials): ng.IPromise<Boolean> {

      return this.$http.post("/api/auth/login", cred).then((res: ng.IHttpPromiseCallbackArg<successLogin>) => {
        let token = `${res.data.data.userId}:${res.data.data.token.code}`
        this.$localStorage.set("token", token);
        this.$http.defaults.headers.common['token'] = token;
        return true
      }).catch((err) => {
        console.warn(`AuthService. Login:`, err);
        return false
      })

    }

    logout(): ng.IPromise<any> {

      return this.$http.post("/api/auth/logout", {}).then(() => {
        this.$localStorage.remove('token');
      }, (err) => {
        console.warn(`AuthService.Logout`, err); throw err
      })

    }

    me(): ng.IPromise<any> {

      return this.$http.post("/api/auth/me", {}).then((res: ng.IHttpPromiseCallbackArg<any>) => {
        return res.data.data
      })

    }

}
