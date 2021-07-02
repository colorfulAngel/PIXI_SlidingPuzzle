// import { Howl, Howler } from "howler";
import { ResourcesList } from "./ResourcesList";

export class SoundMgr {
    static isMute: boolean = false;
    private static soundList: Array<SoundInfo> = new Array<SoundInfo>();

    public static load(){
        ResourcesList.sound.forEach(x => {
            let info = new SoundInfo(x.id, x.path);
            this.soundList.push(info);
        });
    }
    public static play(id, loop=false){
        this.soundList.forEach(x => {
            if(x.soundID == id){
                x.sound.loop(loop);
                x.sound.play();
            }
        });
    }
    public static mute(value: boolean){
        this.isMute = value;
        Howler.mute(this.isMute);
    }
}

class SoundInfo{
    public soundID: string;
    public path: string;
    public sound: Howl;

    constructor(_id: string, url: string){
        this.soundID = _id;
        this.path = url;
        this.load();
    }
    public load(){
        this.sound = new Howl({src: this.path});
    }
}