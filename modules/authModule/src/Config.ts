export class Config {

  static $inject = ["localStorageServiceProvider"];

  constructor(s: ng.local.storage.ILocalStorageServiceProvider) {
    s.setPrefix("auth");
  }

}
