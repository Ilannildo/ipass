import Realm from 'realm';
import { AuthSchema } from '../schemas/AuthSchema';
import { StorageSchema } from '../schemas/StorageSchema';
import { UserSchema } from '../schemas/UserSchema';
const key = new Int8Array(64);

export function getRealm() {
  return Realm.open({
    schema: [UserSchema, AuthSchema, StorageSchema],
    encryptionKey: key,
  });
}
