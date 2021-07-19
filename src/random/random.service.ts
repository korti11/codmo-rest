import { Injectable } from '@nestjs/common';
import { YesNoMessageQuery } from './yes-no-message.query';

@Injectable()
export class RandomService {

    getYesOrNoMessage(param: YesNoMessageQuery): string {
        const prediction = Math.floor((Math.random() * 101) + 1);
        console.log(`Prediction: ${prediction}`);
        if(prediction <= param.chances) {
            return param.yes;
        } else {
            return param.no;
        }
    }

}
