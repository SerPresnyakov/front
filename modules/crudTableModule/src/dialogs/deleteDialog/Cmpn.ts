export function getDialog($mdDialog:ng.material.IDialogService, name): ng.material.IConfirmDialog {
    return $mdDialog.confirm()
        .title('Вы действительно хотите удалить строку?')
        .ok('Удалить!')
        .cancel('Отмена')
}

