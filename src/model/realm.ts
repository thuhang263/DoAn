import Realm from 'realm';

export class SearchedWord extends Realm.Object<SearchedWord> {
  word!: string;
  meaning!: string;
  partOfSpeech!: string;
  example!: string;
  phonetic!: string;
  audio!: string;
  searchedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'SearchedWord',
    primaryKey: 'word',
    properties: {
      word: 'string',
      meaning: 'string',
      partOfSpeech: 'string',
      example: 'string',
      phonetic: 'string',
      audio: 'string',
      searchedAt: 'date',
    },
  };
}

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open({
    schema: [SearchedWord],
    schemaVersion: 2, 
  });

  return realmInstance;
};
