import { ResourcesList } from "./ResourcesList";
import { eventEmitter } from "../Main";
import { CoreEvent } from "./Event";
import { loaders } from "pixi.js";

export class Loader
{
    public static loader: PIXI.loaders.Loader;
    public static failedFiles: Array<string> = [];
    public static completedFiles: Array<string> = [];
    public static resources: PIXI.loaders.Resource;

    public static load(){
        this.loader = new PIXI.loaders.Loader();
        //this.loader.add(ResourcesList.img).add(ResourcesList.sound).load(() =>{});

        ResourcesList.img.forEach(x => {
            this.loader.add(x.id, x.path);
        });
        this.loader.load((loader, resources) => {
            this.resources = resources;
        });

        // 取得下載進度
        this.loader.onProgress.add((e) => {
            jQuery("#loadingPercent").html("Loading..." + Math.floor(e.progress) + "%");
        });

        // 處理載入失敗檔案
        this.loader.onError.add((t, e, r) => {
            console.log("Failed to load "+ r.name);
        });

        //每個檔案載入時都會呼叫
        this.loader.onLoad.add((e, t) => {
            this.completedFiles.push(t.name);
        });

        // 下載完成後返回 Main.ts
        this.loader.onComplete.add(() => {
            if(this.failedFiles.length == 0){
                //隱藏loading page
                jQuery("#loadingPage").hide();
                eventEmitter.emit(CoreEvent.AssetsLoadComplete);
            }
            else{
                jQuery("#loadingPercent").html("Loading...failed: could not load "+ this.failedFiles);
            }
        });
    }
}