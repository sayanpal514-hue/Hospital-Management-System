"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPTH_TO_CHECK = exports.ignoredClientHeaderTokens = exports.preConnectionCodes = exports.genericClasses = exports.redirectCodes = exports.decodeCodes = exports.requestBodyCodes = exports.requestCodes = exports.connectionCodes = exports.decodeAnyProtosInArray = exports.decodeProtobufAny = exports.getProtoNameFromFullName = void 0;
exports.checkTelemetryEnabled = checkTelemetryEnabled;
exports.camelToSnakeCase = camelToSnakeCase;
exports.toCamelCase = toCamelCase;
exports.toLowerCamelCase = toLowerCamelCase;
exports.makeUUID = makeUUID;
const PROTO_TYPE_PREFIX = 'type.googleapis.com/';
const NUM_OF_PARTS_IN_PROTO_TYPE_NAME = 2;
const randomUUID = () => globalThis.crypto?.randomUUID() || require('crypto').randomUUID();
/**
 * Checks if telemetry tracing is enabled.
 *
 * If `GOOGLE_SDK_NODE_ENABLE_TRACING` is explicitly set, then the client option
 * doesn't matter (only the environment variable determines whether tracing is enabled).
 * The client option is only checked if the environment variable isn't set.
 *
 * Tracing can be enabled purely through environment variables without
 * requiring client libraries to pass generator parameters, as metadata
 * is resolved dynamically at runtime.
 *
 * If the environment variable is not set, tracing requires the client option
 * and the client must have supplied `internalTelemetryInfo` (the extra protoc param).
 *
 * @param settings
 * @returns true if telemetry tracing is enabled, false otherwise
 */
function checkTelemetryEnabled(settings) {
    // `process` is undeclared in browsers and some edge runtimes, where reading
    // it would throw a ReferenceError rather than yield undefined, so it is
    // reached through a `typeof` guard and stands in as an empty environment.
    const env = typeof process === 'object' && typeof process.env === 'object'
        ? process.env
        : {};
    const envOptIn = env.GOOGLE_SDK_NODE_ENABLE_TRACING?.trim();
    if (envOptIn !== undefined && envOptIn !== '') {
        const lower = envOptIn.toLowerCase();
        return lower === 'true' || lower === '1';
    }
    const clientOptIn = Boolean(settings?.enableTelemetryTracing ||
        settings?.otherArgs?.enableTelemetryTracing);
    return (clientOptIn && settings?.otherArgs?.internalTelemetryInfo !== undefined);
}
function words(str, normalize = false) {
    if (normalize) {
        // strings like somethingABCSomething are special case for protobuf.js,
        // they should be split as "something", "abc", "something".
        // Deal with sequences of capital letters first.
        str = str.replace(/([A-Z])([A-Z]+)([A-Z])/g, (str) => {
            return (str[0] +
                str.slice(1, str.length - 1).toLowerCase() +
                str[str.length - 1]);
        });
    }
    // split on spaces, non-alphanumeric, or capital letters
    // note: we keep the capitalization of the first word (special case: IPProtocol)
    return str
        .split(/(?=[A-Z])|[^A-Za-z0-9.]+/)
        .filter(w => w.length > 0)
        .map((w, index) => (index === 0 ? w : w.toLowerCase()));
}
/**
 * Converts the first character of the given string to lower case.
 */
function lowercase(str) {
    if (str.length === 0) {
        return str;
    }
    return str[0].toLowerCase() + str.slice(1);
}
/**
 * Converts a given string from camelCase (used by protobuf.js and in JSON)
 * to snake_case (normally used in proto definitions).
 */
function camelToSnakeCase(str) {
    // Keep the first position capitalization, otherwise decapitalize with underscore.
    const wordsList = words(str);
    if (wordsList.length === 0) {
        return str;
    }
    const result = [wordsList[0]];
    result.push(...wordsList.slice(1).map(lowercase));
    return result.join('_');
}
/**
 * Capitalizes the first character of the given string.
 */
function capitalize(str) {
    if (str.length === 0) {
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}
/**
 * Converts a given string from snake_case (normally used in proto definitions) or
 * PascalCase (also used in proto definitions) to camelCase (used by protobuf.js).
 * Preserves capitalization of the first character.
 */
function toCamelCase(str) {
    const wordsList = words(str, /*normalize:*/ true);
    if (wordsList.length === 0) {
        return str;
    }
    const result = [wordsList[0]];
    result.push(...wordsList.slice(1).map(w => {
        if (w.match(/^\d+$/)) {
            return '_' + w;
        }
        return capitalize(w);
    }));
    return result.join('');
}
/**
 * Converts a given string to lower camel case (forcing the first character to be
 * in lower case).
 */
function toLowerCamelCase(str) {
    const camelCase = toCamelCase(str);
    if (camelCase.length === 0) {
        return camelCase;
    }
    return camelCase[0].toLowerCase() + camelCase.slice(1);
}
/**
 * Converts a given string to lower camel case (forcing the first character to be
 * in lower case).
 */
function makeUUID() {
    return randomUUID();
}
// Get proto type name removing the prefix. For example full type name: type.googleapis.com/google.rpc.Help, the function returns google.rpc.Help.
const getProtoNameFromFullName = (fullTypeName) => {
    const parts = fullTypeName.split(PROTO_TYPE_PREFIX);
    if (parts.length !== NUM_OF_PARTS_IN_PROTO_TYPE_NAME) {
        throw Error("Can't get proto name");
    }
    return parts[1];
};
exports.getProtoNameFromFullName = getProtoNameFromFullName;
// Given a proto Any and a set of protos, decode using the set of protos.
const decodeProtobufAny = (anyValue, protobuf) => {
    if (anyValue.type_url === '') {
        throw new Error('Any type_url is not set');
    }
    const typeName = (0, exports.getProtoNameFromFullName)(anyValue.type_url);
    const type = protobuf.lookupType(typeName);
    return type.decode(anyValue.value);
};
exports.decodeProtobufAny = decodeProtobufAny;
// Given list of protos, if any of them are Any proto try to decode them with protos in given protobuf.
const decodeAnyProtosInArray = (protoList, protobuf) => {
    const protoListDecoded = [];
    for (const proto of protoList) {
        if (proto.constructor.name === 'Any') {
            try {
                // Proto is Any we try to decode with protos in protobuf.
                const decodedAnyProto = (0, exports.decodeProtobufAny)(proto, protobuf);
                protoListDecoded.push(decodedAnyProto);
            }
            catch (e) {
                // Skip we can't process it.
            }
            continue;
        }
        protoListDecoded.push(proto);
    }
    return protoListDecoded;
};
exports.decodeAnyProtosInArray = decodeAnyProtosInArray;
/**
 * System and network error codes mapped to CLIENT_CONNECTION_ERROR.
 */
exports.connectionCodes = [
    'ENOTFOUND',
    'EAI_AGAIN',
    'ECONNREFUSED',
    'ECONNRESET',
    'EHOSTUNREACH',
    'ENETUNREACH',
    'ENETDOWN',
    'EPIPE',
    'UND_ERR_CONNECT_TIMEOUT',
    'UND_ERR_SOCKET',
    'CERT_HAS_EXPIRED',
    'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
    'DEPTH_ZERO_SELF_SIGNED_CERT',
    'SELF_SIGNED_CERT_IN_CHAIN',
    'ERR_TLS_CERT_ALTNAME_INVALID',
    'UNABLE_TO_GET_ISSUER_CERT',
];
/**
 * System and client request error codes mapped to CLIENT_REQUEST_ERROR.
 */
exports.requestCodes = [
    'ERR_INVALID_ARG_TYPE',
    'ERR_INVALID_URL',
    'ERR_HTTP_INVALID_HEADER_VALUE',
    'ERR_INVALID_HTTP_TOKEN',
    'ERR_INVALID_PROTOCOL',
    'ERR_INVALID_ARG_VALUE',
];
/**
 * Stream and body error codes mapped to CLIENT_REQUEST_BODY_ERROR.
 */
exports.requestBodyCodes = [
    'ERR_STREAM_WRITE_AFTER_END',
    'ERR_STREAM_DESTROYED',
    'ERR_STREAM_ALREADY_FINISHED',
    'ERR_STREAM_CANNOT_PIPE',
    'ERR_STREAM_NULL_VALUES',
    'ERR_STREAM_PREMATURE_CLOSE',
];
/**
 * Buffer error codes mapped to CLIENT_RESPONSE_DECODE_ERROR.
 */
exports.decodeCodes = ['ERR_BUFFER_OUT_OF_BOUNDS'];
/**
 * Redirect error codes mapped to CLIENT_REDIRECT_ERROR.
 */
exports.redirectCodes = [
    'ERR_TOO_MANY_REDIRECTS',
    'ERR_FR_TOO_MANY_REDIRECTS',
];
/**
 * Generic class / constructor names that should be unwrapped to find more specific error causes.
 */
exports.genericClasses = [
    'Error',
    'GoogleError',
    'Object',
    'DOMException',
];
/**
 * Error codes indicating failures prior to network connection establishment.
 */
exports.preConnectionCodes = [
    'ENOTFOUND',
    'EAI_AGAIN',
    'ECONNREFUSED',
    'ECONNRESET',
    'EHOSTUNREACH',
    'ENETUNREACH',
    'ERR_INVALID_ARG_TYPE',
    'ERR_INVALID_URL',
];
/**
 * Standard or infrastructure tokens in the x-goog-api-client header that should
 * be ignored when resolving the client artifact/package name.
 */
exports.ignoredClientHeaderTokens = [
    'gl-node',
    'gl-web',
    'grpc',
    'rest',
    'gax',
    'auth',
    'gapic',
    'gccl',
];
/**
 * Maximum traversal depth for unwrapping nested error causes.
 */
exports.DEPTH_TO_CHECK = 10;
//# sourceMappingURL=util.js.map