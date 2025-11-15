import { SylverQolModule } from "../types";
import hello from "./hello";
import wallsAsColumn from "./walls_as_column";
import rollGroupInitiative from "./roll_group_initiative";
import resetTokenImg from "./reset_token_img";

export function OnInitModule(module: SylverQolModule) {
    module.globalHandle = new GlobalHandle();
    // Expose the sylverqol handle globally
    (globalThis as any).sylverqol = module.globalHandle;
}

export class GlobalHandle {
    public hello = hello;
    public wallsAsColumn = wallsAsColumn;
    public rollGroupInitiative = rollGroupInitiative;
    public resetTokenImg = resetTokenImg;
}
