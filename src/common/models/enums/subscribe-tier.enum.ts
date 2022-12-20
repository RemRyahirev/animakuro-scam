import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

// ! Второй экземпляр находится в схеме Призмы! Меняем тут - не забываем и там!
export enum SubscribeTier{
    FREE_ACCOUNT = 'FREE_ACCOUNT', // никакой подписки
    BASIC = 'BASIC',       // базовая
    SILVER = 'SILVER',  // серебряный уровень
    GOLD = 'GOLD',    // золотой уровень
    PLATINUM = 'PLATINUM',    // платиновый уровень
}

registerEnumType(SubscribeTier, {
    name: 'SubscribeTier',
});

