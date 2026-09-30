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
import { CallSettings } from './gax';
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
export declare function checkTelemetryEnabled(settings?: CallSettings): boolean;
/**
 * Converts a given string from camelCase (used by protobuf.js and in JSON)
 * to snake_case (normally used in proto definitions).
 */
export declare function camelToSnakeCase(str: string): string;
/**
 * Converts a given string from snake_case (normally used in proto definitions) or
 * PascalCase (also used in proto definitions) to camelCase (used by protobuf.js).
 * Preserves capitalization of the first character.
 */
export declare function toCamelCase(str: string): string;
/**
 * Converts a given string to lower camel case (forcing the first character to be
 * in lower case).
 */
export declare function toLowerCamelCase(str: string): string;
/**
 * Converts a given string to lower camel case (forcing the first character to be
 * in lower case).
 */
export declare function makeUUID(): `${string}-${string}-${string}-${string}-${string}`;
export declare const getProtoNameFromFullName: (fullTypeName: string) => string;
export declare const decodeProtobufAny: (anyValue: any, protobuf: protobuf.Type) => protobuf.Message<{}>;
export declare const decodeAnyProtosInArray: (protoList: Array<{}>, protobuf: protobuf.Type) => Array<{}>;
/**
 * System and network error codes mapped to CLIENT_CONNECTION_ERROR.
 */
export declare const connectionCodes: string[];
/**
 * System and client request error codes mapped to CLIENT_REQUEST_ERROR.
 */
export declare const requestCodes: string[];
/**
 * Stream and body error codes mapped to CLIENT_REQUEST_BODY_ERROR.
 */
export declare const requestBodyCodes: string[];
/**
 * Buffer error codes mapped to CLIENT_RESPONSE_DECODE_ERROR.
 */
export declare const decodeCodes: string[];
/**
 * Redirect error codes mapped to CLIENT_REDIRECT_ERROR.
 */
export declare const redirectCodes: string[];
/**
 * Generic class / constructor names that should be unwrapped to find more specific error causes.
 */
export declare const genericClasses: string[];
/**
 * Error codes indicating failures prior to network connection establishment.
 */
export declare const preConnectionCodes: string[];
/**
 * Standard or infrastructure tokens in the x-goog-api-client header that should
 * be ignored when resolving the client artifact/package name.
 */
export declare const ignoredClientHeaderTokens: string[];
/**
 * Maximum traversal depth for unwrapping nested error causes.
 */
export declare const DEPTH_TO_CHECK = 10;
