import { CharacterRole, CharacterType } from '../../common/models/enums';

export const characterData = async () => [
    {
        id: '08bee141-9254-4fa5-a5dd-7eb2f4f7bff9',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'Сикакунагай',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: 'этот парень был из тех, за кем летает стерх',
    },
    {
        id: '07730046-340c-4052-9a38-853216c283be',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'КтоУгодноСан',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.BACKGROUND,
        description: 'главный антагонист Сикакунагай',
    },
];
