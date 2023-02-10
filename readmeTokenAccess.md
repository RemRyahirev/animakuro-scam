# Token_Access
- Add auth middleware

## User_Profile
### Mutation
- createUserProfile
- updateFavouriteAnimes
- updateFavouriteAuthors
- updateFavouriteCharacters
- updateFavouriteGenres
- updateFavouriteStudios
### Query
- getUserProfileList
- getUserProfile


## User_Folder
### Query
- getUserFolderByUserId
### Mutation
- createUserFolder

## User_Collection
### Query
- getUserCollectionListByUserId
- getUserCollectionList
- getUserCollection
### Mutation
- createUserCollection

## User
### Query
- getUserById
### Mutation
- updateUser

## Statistic
### Query
- getUserStatisticFolder
- getUserStatisticFavourite

## Auth_Session
### Mutation
- createAuthSession
# Validation
## User_Profile
### Mutation
- createUserProfile
- updateUserProfile
- deleteUserProfile
- updateFavouriteAnimes
- updateFavouriteAuthors
- updateFavouriteCharacters
- updateFavouriteGenres
- updateFavouriteStudios
### Query
- getUserProfileList
- getUserProfile


## User_Folder
### Query
- getUserFolderByUserId
- getUserFolderList
- getUserFolder
### Mutation
- createUserFolder
- updateUserFolder
- deleteUserFolder

## User_Collection
### Query
- getUserCollectionListByUserId
- getUserCollectionList
- getUserCollection
### Mutation
- createUserCollection
- updateUserCollection
- deleteUserCollection

## User
### Query
- getUsersByEmail
- getUser
- getUserList
- getUserById
### Mutation
- updateUser
- createUser


## Studio
### Mutation
- createStudio
- updateStudio
- deleteStudio

## Statistic
### Query
- getUserStatisticFolder
- getUserStatisticFavourite

## Profile_Settings
### Query
- getProfileSettingsById
- getProfileSettingsList

### Mutation
- createProfileSettings
- updateProfileSettings
- deleteProfileSettings

## Opening_Ending
### Mutation
- createOpeningEnding
- updateOpeningEnding
- deleteOpeningEnding


## Genre
### Mutation
- createGenre
- updateGenre
- deleteGenre

## Character
### Mutation
- createCharacter
- updateCharacter
- deleteCharacter

## Author
### Mutation
- createAuthor
- updateAuthor
- deleteAuthor

## Auth_Session
### Query
- getAuthSession
- getAuthSessionList
### Mutation
- createAuthSession
- updateAuthSession
- deleteAuthSession


## Anime
### Mutation
- createAnime
- updateAnime
- addRelatedAnime
- updateRelatedAnime
- deleteRelatedAnime
- addSimilarAnime
- updateSimilarAnime
- deleteSimilarAnime
- deleteAnime

## Airing_Schedule
### Mutation
- createAiringSchedule
- updateAiringSchedule
- deleteAiringSchedule