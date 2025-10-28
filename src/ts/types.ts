import { HookDefinitions } from "fvtt-hook-attacher";
import { GlobalHandle, OnInitModule as GlobalHandleOnInitModule } from "./apps/global_handle";

/**
 * Interface for the Sylver QoL module, extending Foundry's Module interface.
 */
export interface SylverQolModule extends foundry.packages.Module {
  globalHandle: GlobalHandle;
}

/**
 * Callback type for module initialization.
 */
export type OnInitModuleFunc = (module: SylverQolModule) => void;

/**
 * Contains static properties for module hooks, libWrapper patches, and hook definitions.
 */
export class SylverQolModuleHooks {
  /**
   * Iterable of callbacks to be called on module initialization.
   */
  static ON_INIT_MODULE_CALLBACKS: Iterable<OnInitModuleFunc> = [
    GlobalHandleOnInitModule,
  ];

  /**
   * Set of hook definitions to be attached.
   */
  static HOOKS_DEFINITIONS_SET: Iterable<HookDefinitions> = [
  ]
}
