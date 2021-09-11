import { IsString, IsAscii, IsInt, Min, Max, Matches, MinLength, MaxLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class YesNoMessageQuery {
    @IsOptional()
    @IsString()
    @Matches(/^(\w|\d|\s|:|<value>|!|\.|\?|\x25)+$/)
    @MaxLength(50)
    yes: string = 'yes';

    @IsOptional()
    @IsString()
    @Matches(/^(\w|\d|\s|:|<value>|!|\.|\?|\x25)+$/)
    @MaxLength(50)
    no: string = 'no';

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    chances: number = 50;
}

export class RandomMessageQuery {
    @IsString()
    @IsAscii()
    messages: string;
}