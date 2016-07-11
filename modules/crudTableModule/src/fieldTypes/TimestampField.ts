export class TimestampField {
    Date:Date;

    type = "timestamp";

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    constructor() {};

}