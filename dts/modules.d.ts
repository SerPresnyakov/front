declare interface iFilter{
    name:string,
    title:string,
    parent: string,
    formly:string,
    options: options[],
    fieldType: {
        type:string
    },
    value:string
}

interface options {
    props:string
}

declare interface iFieldGroup {
    data?: {
       [key: string]: any;
    };
    className?: string;
    elementAttributes?: string;
    form?: Object;
    key?: string | number;
    model?: string | {
        [key: string]: any;
    };
    fieldGroup?:iFieldGroup[];
    type?:string;
    options?: options;
    templateOptions?: iTemplateOptons;
    wrapper?: string | string[];
}

interface iTemplateOptons{
    //Bootstrap types
    label?: string;
    description?: string;
    [key: string]: any;
}
