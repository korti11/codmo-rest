import { Injectable } from '@nestjs/common';
import { YesNoMessageQuery } from './yes-no-message.query';

@Injectable()
export class RandomService {

    getYesOrNoMessage(param: YesNoMessageQuery): string {
        const prediction = Math.floor((Math.random() * 101));
        if(prediction >= param.chances) {
            return param.yes.replace('<value>', prediction.toString());
        } else {
            return param.no.replace('<value>', prediction.toString());
        }
    }

}
