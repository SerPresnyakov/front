import {AuthService, credentials} from "./../AuthService"

export class LoginCtrl {

    static $inject = [AuthService.serviceName, "$state", "$scope"];

    cred: credentials = {
        email: "", password: ""
    };

    from: string;

    constructor(
        private authService: AuthService,
        private $state: ng.ui.IStateService,
        private $scope: ng.IScope
    ) {
        this.from = $state.params['from'];
    }

    options = {};

    fields: iFieldGroup[] = [
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                label: 'Логин'
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                label: 'Пароль'
            }
        }
    ];

    login() {

        this.$scope.$broadcast('schemaFormValidate');


            this.authService.login(this.cred).then((res) => {
                if (res) {
                    console.log(this.from);
                    if (this.from) {
                        this.$state.go(this.from)
                    } else {
                        this.$state.go("index.adGroups")
                    }
                } else {
                    console.log("Не могу войти в систему", "Авторизация");
                }
            })


    }

}

