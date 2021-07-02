import EventEmitter = PIXI.utils.EventEmitter;
import Application = PIXI.Application;
import { CoreEvent } from "./core/Event";
import { Loader } from "./core/Loader";
import { GameScene } from "./ui/GameScene";
import { SoundMgr } from "./core/SoundMgr";

export let eventEmitter: EventEmitter;
export let application: Application;

export class Main
{
    //private initCanvasW = 860;
    //private initCanvasH = 540;

    public initGame(){
        // 設定場景
        let gameCanvasContext = (<HTMLCanvasElement>jQuery("#gameCanvas")[0]);
        // width & height 必須設定數值，用變數會無法繪製
        application = new PIXI.Application(860, 540, {backgroundColor : 0x6DF7F4, view: gameCanvasContext});
       
        // 設定共用的事件傳遞元件
        eventEmitter = new EventEmitter();
        SoundMgr.load();

        eventEmitter.on(CoreEvent.AssetsLoadComplete, () => {
            jQuery("#loadingPage").hide();  // hide loading page
            SoundMgr.play('Sound_bg',true); // play music
            GameScene.draw();   // draw main game scene
        });
        Loader.load();

        // 設定適應性 (Resize)
        this.onResize();    // resize when init game
        window.onresize = this.onResize;  // resize when windowSize changes
    }

    public onResize(){
        var w = window.innerWidth;
        var h = window.innerHeight;
        var scale = Math.min(w/860, h/540);

        application.view.style.left = (w-scale*860)/2 + "px";
        application.view.style.top = (h-scale*540)/2 + "px";
        application.view.style.width = (scale*860) + "px";
        application.view.style.height = (scale*540) + "px";
    }
}