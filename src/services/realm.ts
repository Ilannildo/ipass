import Realm from 'realm';
import { AuthSchema } from '../schemas/AuthSchema';
import { UserSchema } from '../schemas/UserSchema';
// import { AuthSchema } from '../schemas/AuthSchema';

// export function getRealm() {
//   return Realm.open({
//     schema: [AuthSchema],
//   });
// }
const key = new Int8Array(64);

export function getRealm() {
  return Realm.open({
    schema: [UserSchema, AuthSchema],
    encryptionKey: key,
  });
}
