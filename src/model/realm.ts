import Realm from 'realm';

export class FavoriteWord extends Realm.Object<FavoriteWord> {
  word!: string;
  majorName!: string;
  favoriteWords!: string[];

  static schema: Realm.ObjectSchema = {
    name: 'FavoriteWord', 
    primaryKey: 'word',
    properties: {
      word: 'string',
      majorName: 'string',
    },
  };
}

// Singleton instance
let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open({
    schema: [FavoriteWord], 
    schemaVersion: 1,
  });

  return realmInstance;
};
