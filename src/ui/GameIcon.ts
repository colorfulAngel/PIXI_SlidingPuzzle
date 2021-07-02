import Sprite = PIXI.Sprite;
import { Loader } from "../core/Loader";
import { pieceLentgh, puzzleLength } from "./GameBoard";

export class GameIcon extends Sprite{
    // constructor(id, x, y){
    constructor(sprite_id, arr_id){
        super();
        let row = Math.floor(arr_id / puzzleLength);
        let col = arr_id % puzzleLength;

        // let x = 350 + pieceLentgh * col; 
        // let y = 95 + pieceLentgh * row;
        let x = pieceLentgh * col; 
        let y = pieceLentgh * row;

        // this.texture = Loader.resources['corgi'].textures['corgi'+id+".png"];
        this.texture = Loader.resources['corgi'].textures['corgi' + sprite_id + ".png"];
        
        // this.name = "corgi_" + x + "_" + y;
        this.name = "corgi_" + sprite_id;
        this.width = this.height = pieceLentgh;
        this.x = x;
        this.y = y;
        this.buttonMode = true;
        this.interactive = true;
    }
}