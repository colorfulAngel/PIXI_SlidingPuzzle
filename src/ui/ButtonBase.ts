import Sprite = PIXI.Sprite;
import { Loader } from "../core/Loader";

//add gasp
declare const TweenLite;
declare const TimelineMax;

export class ButtonBase extends Sprite{
    private _enable: boolean = true;
    public set enable(v: boolean){
        this.interactive = v;
        this.buttonMode = v;
        this.alpha = v ? 1 : 0.5;
    }
    set scaleX(v: number){
        this.scale.x = v;
    }
    set scaleY(v: number){
        this.scale.y = v;
    }
    constructor(_id: string, textureID: string, _x: number, _y: number){
        super();
        this.texture = Loader.resources[_id].textures[textureID];
        this.interactive = true;
        this.buttonMode = true;
        this.x = _x;
        this.y = _y;
        //this.anchor.set(0.5);   // set origin to center

        // Click Events
        this.on("mousedown", this.mouseDownEffect.bind(this));
        this.on("mouseup", this.mouseUpEffect.bind(this));
        this.on("mouseout", this.mouseOutEffect.bind(this));

        // The touch-sensitive surface. This may be a screen or trackpad.
        this.on("touchstart", this.mouseDownEffect.bind(this));
        this.on("touchend", this.mouseDownEffect.bind(this));

        // Trigger events
        this.on("mouseup", this.trigger.bind(this));
        this.on("touchstart", this.trigger.bind(this));
        
    }
    public trigger(){}
    public mouseDownEffect(): void{
        let animTweenTimeline = new TimelineMax();
        animTweenTimeline.add(new TweenLite(this, 0.2, 
            {
                "scaleX": 0.9,
                "scaleY": 0.9,
            }));
        animTweenTimeline.play();
    }
    public mouseUpEffect(): void{
        let animTweenTimeline = new TimelineMax();
        animTweenTimeline.add(new TweenLite(this, 0.1, 
            {
                "scaleX": 1.1,
                "scaleY": 1.1,
            }));
        animTweenTimeline.add(new TweenLite(this, 0.1, 
            {
                "scaleX": 1,
                "scaleY": 1,
            }));
        animTweenTimeline.play();
    }
    public mouseOutEffect(): void{
        this.scale.set(1,1);
    }
}