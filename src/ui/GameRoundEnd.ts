import Container = PIXI.Container;
import { eventEmitter } from "../Main";
import { constructor } from "systemjs";
import { GameFlowEvent } from "../core/Event";

export class GameRoundEnd extends Container {
    private text: PIXI.Text;
    constructor(){
        super();
        this.interactive = true;
        this.visible = false;

        eventEmitter.on(GameFlowEvent.GameEndWithTimeout, () => {
            this.text.text = "Time is up!";
            this.text.x = 260;
            this.text.y = 200;
            this.visible = true;
        });
        eventEmitter.on(GameFlowEvent.GameEndWithGiveUp, ()=>{
            this.text.text = "Game over";
            this.text.x = 260;
            this.text.y = 200;
            this.visible = true;
        });
        eventEmitter.on(GameFlowEvent.GamePass, () => {
            this.text.text = "Congratulations! \nYou passed!";
            this.text.x = 210;
            this.text.y = 200;
            this.visible = true;
        });
        // Background
        let gt = new PIXI.Graphics();
        gt.beginFill(0x000000, 0.8);
        gt.drawRect(0, 0, 860, 540);
        gt.endFill();
        this.addChild(gt);
        // Text
        this.text = this.text = new PIXI.Text("Congratulations! \nYou passed!", {
            fontWeight: 'bold',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#ff0000',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 3
        });
        this.addChild(this.text);
        // Play again
        let btn = new PIXI.Graphics();
        btn.beginFill(0x75C7ED);
        btn.drawRoundedRect(250, 400, 115, 35, 10);
        btn.endFill();
        btn.buttonMode = true;
        btn.interactive = true;
        btn.on("mouseup", this.trigger.bind(this));
        btn.on("touchend", this.trigger.bind(this));
        this.addChild(btn);

        let newGame = new PIXI.Text("New Game", {
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Arial',
            fill: '#75C6ED',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 6
        });
        newGame.x = 255;
        newGame.y = 403;
        this.addChild(newGame);
    }

    public trigger(){
        eventEmitter.emit(GameFlowEvent.CreateNewGameRequest);
        this.visible = false;
    }
}