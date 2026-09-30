/**
 * Copyright 2026 Google LLC
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
import { StaticTraceContext } from './TracerHelper';
import { CallSettings } from '../gax';
export declare const DEFAULT_GCP_REPO = "googleapis/google-cloud-node";
/**
 * Derives the GCP client service name from an NPM package name.
 */
export declare function extractClientServiceFromPackageName(name: string): string;
/**
 * Derives the GCP service name from a protobuf apiName (e.g. google.cloud.redis.v1.CloudRedis).
 */
export declare function extractServiceFromApiName(apiName: string): string | undefined;
/**
 * Extracts static metadata from CallSettings headers or apiName.
 */
export declare function extractFromSettings(settings?: CallSettings): StaticTraceContext;
/**
 * Extracts static metadata from process environment variables.
 */
export declare function extractFromEnvironment(): StaticTraceContext;
/**
 * Clears the cached static metadata. Used primarily in unit tests.
 */
export declare function clearMetadataCache(): void;
/**
 * Resolves static trace context dynamically at runtime by inspecting CallSettings,
 * environment variables, and standard defaults.
 *
 * Precedence: environment variables > compile-time internalTelemetryInfo > dynamic resolution from settings.
 *
 * @param {CallSettings} [settings] - Call settings for the RPC invocation.
 * @param {string} [_callerFilePath] - Optional explicit path to the caller source file (deprecated).
 * @returns {StaticTraceContext} The resolved static trace context.
 */
export declare function resolveStaticTraceContext(settings?: CallSettings, _callerFilePath?: string): StaticTraceContext;
