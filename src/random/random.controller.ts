import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { YesNoMessageQuery } from './yes-no-message.query';

@Controller({
    path: 'random',
    version: '1'
})
export class RandomController {

    @Get('yes-no')
    getYesNoMessage(@Query() queryParams: YesNoMessageQuery) : string {
        return `Yes message: ${queryParams.yes}, No message: ${queryParams.no}, Chances: ${queryParams.chances}`
    }


}
