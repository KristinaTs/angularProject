import {Injectable} from "@angular/core";

@Injectable()
export class SharedCommunicationService {

    private state = {};

    public setState(object) {
        const copyObject = {...object};

        let keys = Object.keys(copyObject);
        if (keys) {
            keys.forEach(key => {
                this.state[key] = copyObject[key];
            })
        }
    }

    public getState() {
        console.log(this.state);
        return {...this.state};
    }

}