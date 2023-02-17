import { IsBoolean } from '@nestjs/class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('NotificationsType')
@ObjectType('Notifications')
export class Notifications {
    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Sound in notifications',
        defaultValue: true,
    })
    sound: boolean;

    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate about new episodes',
        defaultValue: true,
    })
    new_episode: boolean;

    /*@IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate about friends activity',
        defaultValue: true,
    })
    friends_activity: boolean;

    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate about new messages',
        defaultValue: true,
    })
    messages: boolean;
                                                                                ПОКА НЕРЕАЛИЗУЕМО!
    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate, when someone wants add you to friends',
        defaultValue: true,
    })
    new_friends: boolean;

    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate, when someone mention you in discuss',
        defaultValue: true,
    })
    mentions: boolean;

    @IsBoolean()
    @Field(() => Boolean, {
        description: 'Notificate, when someone likes you',
        defaultValue: true,
    })
    likes: boolean;*/
}
