import { IsBoolean } from '@nestjs/class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Notifications {
    /**
     * Sound in notifications
     */
    @Field({ defaultValue: true })
    sound: boolean;

    /**
     * Notificate about new episodes
     */
    @Field({ defaultValue: true })
    new_episode: boolean;
}

@InputType()
export class NotificationsInputType {
    /**
     * Sound in notifications
     */
    @IsBoolean()
    @Field({ defaultValue: true })
    sound: boolean;

    /**
     * Notificate about new episodes
     */
    @IsBoolean()
    @Field({ defaultValue: true })
    new_episode: boolean;
}
