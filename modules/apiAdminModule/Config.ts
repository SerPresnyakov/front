export class Config {
    static $inject = [
        "$urlRouterProvider",
        "$mdThemingProvider",
        "$mdIconProvider"
    ];

    constructor(
      $url :ng.ui.IUrlRouterProvider,
      $theming :ng.material.IThemingProvider,
      $icon : ng.material.IIconProvider
    ){
        $url.when("","/");
    }
}