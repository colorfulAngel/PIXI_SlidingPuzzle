import { SoundMgr } from "../core/SoundMgr";
import { ButtonBase } from "./ButtonBase";
import { Loader } from "../core/Loader";

export class SoundBtn extends ButtonBase {
    private isMute: boolean = false;

    constructor(){
        super('Button', 'Sound_On', 165, 210);
        this.updateImage();
    }
    public trigger(){
        this.isMute = !this.isMute;
        SoundMgr.mute(this.isMute);
        this.updateImage();
    }

    updateImage = () => {
        if(this.isMute){
            this.texture = Loader.resources['Button'].textures['Sound_Off'];
        }
        else{
            this.texture = Loader.resources['Button'].textures['Sound_On'];
        }
    }
}