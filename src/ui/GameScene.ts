import { Loader } from "../core/Loader";
import { application } from "../Main";
import { GameBoard } from "./GameBoard";
import { GameRoundEnd } from "./GameRoundEnd";
import { PuzzleTarget } from "./PuzzleTarget";
import { ReloadBtn } from "./ReloadBtn";
import { SoundBtn } from "./SoundBtn";
import { FBBtn } from "./FBBtn";

export class GameScene{
    public static draw(){
        // 加入背景
        application.stage.addChild(PIXI.Sprite.from(Loader.resources["background"].texture));

        // 加入拼圖版面
        application.stage.addChild(new GameBoard());

        // 加入控制鈕
        application.stage.addChild(new SoundBtn());
        // application.stage.addChild(new RevertBtn());
        // application.stage.addChild(new TipBtn());
        application.stage.addChild(new ReloadBtn());
        application.stage.addChild(new FBBtn());
        // application.stage.addChild(new Stars());
        // application.stage.addChild(new Clock());

        // 加入目標圖片
        application.stage.addChild(new PuzzleTarget('corgi','corgiTarget.png',160,305));
        
        // End Scene
        application.stage.addChild(new GameRoundEnd());
    }
}