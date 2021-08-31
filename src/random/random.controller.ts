import { Controller, Get, Header, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RandomService } from './random.service';
import { YesNoMessageQuery } from './yes-no-message.query';

@Controller({
    path: 'random',
    version: '1'
})
export class RandomController {

    constructor(private service: RandomService) { }

    @Get('yes-no')
    @Header('Cache-Control', 'none')
    getYesNoMessage(@Query() queryParams: YesNoMessageQuery) : string {
        return this.service.getYesOrNoMessage(queryParams);
    }

    @Get('random-chatter/:channel')
    @Header('Cache-Control', 'none')
    async getRandomChatter(@Param('channel') channel: string): Promise<string> {
        return this.service.getRandomChatter(channel);
    }

}
