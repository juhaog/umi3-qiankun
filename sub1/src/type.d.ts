export {};
// Type definitions for history 4.7.2
// Project: https://github.com/mjackson/history
// Definitions by: Sergey Buturlakin <https://github.com/sergey-buturlakin>, Nathan Brown <https://github.com/ngbrown>, Young Rok Kim <https://github.com/rokoroku>, Daniel Nixon <https://github.com/danielnixon>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
export as namespace History;
type ParsedQuery = Record<string, string | string[] | null>;

export type Action = 'PUSH' | 'POP' | 'REPLACE';
export type UnregisterCallback = () => void;

export interface History<HistoryLocationState = LocationState> {
  length: number;
  action: Action;
  location: Location<HistoryLocationState>;
  push(path: Path, state?: HistoryLocationState): void;
  push(location: LocationDescriptorObject<HistoryLocationState>): void;
  replace(path: Path, state?: HistoryLocationState): void;
  replace(location: LocationDescriptorObject<HistoryLocationState>): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(
    prompt?: boolean | string | TransitionPromptHook<HistoryLocationState>,
  ): UnregisterCallback;
  listen(listener: LocationListener<HistoryLocationState>): UnregisterCallback;
  createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}

export interface Location<S = LocationState> {
  pathname: Pathname;
  search: Search;
  state: S;
  hash: Hash;
  key?: LocationKey;
  query?: ParsedQuery;
}

export interface LocationDescriptorObject<S = LocationState> {
  pathname?: Pathname;
  search?: Search;
  state?: S;
  hash?: Hash;
  key?: LocationKey;
  query?: ParsedQuery;
}

export namespace History {
  export type LocationDescriptor<S = LocationState> =
    | Path
    | LocationDescriptorObject<S>;
  export type LocationKey = string;
  export type LocationListener<S = LocationState> = (
    location: Location<S>,
    action: Action,
  ) => void;
  type PoorMansUnknown = {} | null | undefined;
  export type LocationState = PoorMansUnknown;
  export type Path = string;
  export type Pathname = string;
  export type Search = string;
  export type TransitionHook<S = LocationState> = (
    location: Location<S>,
    callback: (result: any) => void,
  ) => any;
  export type TransitionPromptHook<S = LocationState> = (
    location: Location<S>,
    action: Action,
  ) => string | false | void;
  export type Hash = string;
  export type Href = string;
}

export type LocationDescriptor<S = LocationState> =
  History.LocationDescriptor<S>;
export type LocationKey = History.LocationKey;
export type LocationListener<S = LocationState> = History.LocationListener<S>;
export type LocationState = History.LocationState;
export type Path = History.Path;
export type Pathname = History.Pathname;
export type Search = History.Search;
export type TransitionHook<S = LocationState> = History.TransitionHook<S>;
export type TransitionPromptHook<S = LocationState> =
  History.TransitionPromptHook<S>;
export type Hash = History.Hash;
export type Href = History.Href;

declare global {
  interface Window {
    _QIANKUN_YD: any;
    __POWERED_BY_QIANKUN__: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __webpack_public_path__?: string;
    __MAIN_HISTORY__: History<History.PoorMansUnknown>;
  }
}
