import { ButtonBase } from "./ButtonBase";
import { SoundMgr } from "../core/SoundMgr";

export class FBBtn extends ButtonBase {
    constructor(){
        super('Button','FB', 277, 210);
    }
    public trigger(){
        window.open('https://www.facebook.com/', 'FaceBook');
        // SoundMgr.play("About");
    }
}