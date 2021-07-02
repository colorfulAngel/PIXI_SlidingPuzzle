import Sprite = PIXI.Sprite;
import { Loader } from "../core/Loader";

export class PuzzleTarget extends Sprite{
    constructor(_id: string, textureID: string, _x: number, _y: number){
        super();
        this.texture = Loader.resources[_id].textures[textureID];
        this.interactive = false;
        this.buttonMode = false;
        this.x = _x;
        this.y = _y;
        // anchor default = (0,0) => top-left
        //this.anchor.set(0.5);   // set origin to center
    }
}
