import { SylverQolModule } from "../types";
import hello from "./hello";

export function OnInitModule(module: SylverQolModule) {
    module.globalHandle = new GlobalHandle();
    // Expose the sylverqol handle globally
    (globalThis as any).sylverqol = module.globalHandle;
}

export class GlobalHandle {
    public hello = hello;
}
