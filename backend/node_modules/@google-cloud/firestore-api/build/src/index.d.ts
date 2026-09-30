import * as v1 from './v1';
import * as v1beta1 from './v1beta1';
declare const FirestoreClient: typeof v1beta1.FirestoreClient;
type FirestoreClient = v1beta1.FirestoreClient;
export { v1, v1beta1, FirestoreClient };
declare const _default: {
    v1: typeof v1;
    v1beta1: typeof v1beta1;
    FirestoreClient: typeof v1beta1.FirestoreClient;
};
export default _default;
import * as protos from '../protos/protos';
export { protos };
