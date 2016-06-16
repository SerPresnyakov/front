class UiHelper implements ak.utils.uiHelper {
    registerStates(module: ng.IModule, states: ak.utils.config<angular.ui.IState>[]):void {
        module.config(["$stateProvider", (stateProvider: ng.ui.IStateProvider) => {
            states.forEach(state => {
                console.info(`Регистрируем состояние '${state.name}' в модуле ${module.name}`);
                stateProvider.state(state.name, state.config)
            })
        }])
    }
}

export default new UiHelper()
