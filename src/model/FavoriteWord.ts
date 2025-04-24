import Realm from "realm";

export class FavoriteWord extends Realm.Object {
  word!: string;
  majorName!: string;

  static schema: Realm.ObjectSchema = {
    name: 'FavoriteWord',
    primaryKey: 'word',
    properties: {
      word: 'string',
      majorName: 'string',
    },
  };
}

export const getRealm = async (): Promise<Realm> => {
  return await Realm.open({
    schema: [FavoriteWord],
    schemaVersion: 1,
  });
};
