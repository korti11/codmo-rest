import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { ChatterList, Chatters } from 'src/entities';
import { RandomMessageQuery, YesNoMessageQuery } from './query.paramters';

@Injectable()
export class RandomService {
    private readonly logger = new Logger(RandomService.name);

    constructor(private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cache: Cache) {}

    private randomNumber(max: number, min: number = 0): number {
        return Math.floor(Math.random() * max) + min;
    } 


    getYesOrNoMessage(param: YesNoMessageQuery): string {
        const prediction = this.randomNumber(101);
        if(prediction >= param.chances) {
            return param.yes.replace('<value>', prediction.toString());
        } else {
            return param.no.replace('<value>', prediction.toString());
        }
    }

    getRandomMessage(param: RandomMessageQuery) {
        const messages = param.messages.split(';');
        const index = this.randomNumber(messages.length);
        return messages[index];
    }

    async getRandomChatter(channel: string): Promise<string> {
        const chatters = await this.getChatters(channel);
        let users = chatters.vips;
        users = users.concat(chatters.moderators);
        users = users.concat(chatters.staff);
        users = users.concat(chatters.admins);
        users = users.concat(chatters.global_mods);
        users = users.concat(chatters.viewers);

        const randomIndex = Math.floor(Math.random() * (users.length + 1));
        return users[randomIndex];
    }

    private async getChatters(channel: string): Promise<Chatters> {
        let result: ChatterList = await this.cache.get(channel);
        if(result === undefined || result === null) {
            this.logger.log(`Couldn't find the chat list for channel ${channel}. Trying to get it from Twitch!`);
            const response: Observable<AxiosResponse<ChatterList>> = this.httpService.get(`https://tmi.twitch.tv/group/user/${channel}/chatters`);
            result = await (await response.toPromise()).data
            await this.cache.set(channel, result, { ttl: 60 });
        }

        return result.chatters;
    }

}
