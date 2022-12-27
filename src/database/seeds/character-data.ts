import { CharacterRole, CharacterType } from '../../common/models/enums';

export const characterData = async () => [
    {
        id: '08bee141-9254-4fa5-a5dd-7eb2f4f7bff9',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'Сикакунагай',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.MAIN,
        description: 'какую-то роль он все-таки сыграл',
    },
    {
        id: '07730046-340c-4052-9a38-853216c283be',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'КтоУгодноСан',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.BACKGROUND,
        description: 'главный антагонист хрен знает кого',
    },
    {
        id: '8646770a-e14d-4257-b304-f1dabffbf4e3',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'КтоТоЕщеСан',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.SUPPORTING,
        description: 'кому то противостоит',
    },
    {
        id: 'a7c14064-ad31-46d6-8129-7a44aab098b7',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'Первопроходец',
        importance: CharacterType.PROTAGONIST,
        role: CharacterRole.BACKGROUND,
        description: 'главный антагонист КтоТоЕщеСан',
    },
    {
        id: 'a836e064-0e87-4f34-aaf2-9b753717f6e2',
        bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
        character_name: 'Странное имя',
        importance: CharacterType.ANTAGONIST,
        role: CharacterRole.MAIN,
        description: 'главный антагонист Первопроходца',
    },
];
