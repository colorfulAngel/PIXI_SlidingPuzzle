import Container = PIXI.Container;
import Point = PIXI.Point;
import { Board } from "../core/Board";
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { GameIcon } from "./GameIcon";
import { SoundMgr } from "../core/SoundMgr";
import { Utility } from "../core/Utility";

export let board: Board;
export let reloadTimes: number = 3;
export let puzzleLength: number = 3;  // 3x3 puzzle
export let pieceLentgh: number;

export class PuzzlePiece{
    sprite_id: string;
    arr_id: number;
    constructor(_sprite_id: string, _arr_id: number){
        this.sprite_id = _sprite_id;
        this.arr_id = _arr_id;
    }
}

enum MoveDirecEnum{
    UP, DOWN, LEFT, RIGHT, NONE
}

export class GameBoard extends Container{

    private pathHistory = [];
    private valueHistory = [];
    private puzzleStates : Array<PuzzlePiece> = [];
    private blankPieceIdx: number;

    constructor(){
        super();
        this.createNewGame();
        this.x = 350;
        this.y = 95;
        
        // eventEmitter.on(GameFlowEvent.ReloadBoardRequest, this.reloadBoard);
        // eventEmitter.on(GameFlowEvent.ShowTargetRequest, this.showTips);
        eventEmitter.on(GameFlowEvent.RevertBackRequest, this.revertBoard);
        eventEmitter.on(GameFlowEvent.CreateNewGameRequest, this.createNewGame);
    }
    createNewGame = () => {
        this.pathHistory = [];
        this.valueHistory = [];
        this.puzzleStates = [];
        this.blankPieceIdx = 8;

        reloadTimes = 3;
        puzzleLength = 3;
        pieceLentgh = (Math.round(350/puzzleLength * 100) / 100);
    
        board = new Board();
        this.drawBoardPuzzle();
        eventEmitter.emit(GameFlowEvent.GameRoundStart);
    }
    revertBoard = () => {}
    // reloadBoard = () => {}
    showTips = () => {}
    cancelTips = () => {}
    initPuzzles = () => {
        let arr: Array<PuzzlePiece> = [];
        for(let i = 0; i < puzzleLength*puzzleLength-1; i++){
            let row = Math.floor(i/puzzleLength);
            let col = i%puzzleLength;
            let spriteID = row.toString()+col.toString();
            arr.push(new PuzzlePiece(spriteID, i));
        }

        this.shuffle(arr);

        // add blank piece and set it to center
        arr.splice(8, 0, new PuzzlePiece("22", 8));
        return arr;
    }
    drawBoardPuzzle = () => {
        this.removeChildren();
        this.puzzleStates = this.initPuzzles();
        
        // check if board is solvable
        let canSolve: boolean = this.boardCanSolve(this.puzzleStates.map(x => x.arr_id));
        let tryReload = 0;
        while(!canSolve && tryReload < 10){
            this.puzzleStates = this.initPuzzles();
            canSolve = this.boardCanSolve(this.puzzleStates.map(x => x.arr_id));
            tryReload++;
        }
        console.log("canSolve: "+canSolve+", tryReload:"+tryReload);

        // create puzzle icons
        this.createIcons();

        window.onkeydown = this.keydownHandler;
    }
    createIcons = () => {
        this.puzzleStates.forEach((piece, idx) => {
            // if(piece.sprite_id != "00") {
            if(piece.sprite_id != "22") {

                piece.arr_id = idx;
                this.createIcon(piece.sprite_id, piece.arr_id);
            }
        });
    }
    boardCanSolve = (arr) => {
        let invPars = Utility.getInvArr(arr);
        // 若逆數對  數量為偶數 --> 有解, 奇數 --> 無解
        return (invPars%2 == 0);
    }
    keydownHandler = (e) => {
        var event = window.event ? window.event : e;
        if(event.keyCode == 37){
            // LEFT, blank swap right
            let rightIdx = this.blankPieceIdx+1;
            if(rightIdx < this.puzzleStates.length
                && Math.floor(rightIdx/puzzleLength) == Math.floor(this.blankPieceIdx/puzzleLength)){
                let sprite_id = this.puzzleStates[rightIdx].sprite_id;
                SoundMgr.play('Sound_select');
                this.swapIcons(sprite_id, rightIdx);
            }
            else{
                SoundMgr.play('Sound_select_error');
            }
        }
        else if(event.keyCode == 39){
            // RIGHT, blank swap left
            let leftIdx = this.blankPieceIdx-1;
            if(leftIdx >= 0 && Math.floor(leftIdx/puzzleLength) == Math.floor(this.blankPieceIdx/puzzleLength)){
                let sprite_id = this.puzzleStates[leftIdx].sprite_id;
                SoundMgr.play('Sound_select');
                this.swapIcons(sprite_id, leftIdx);
            }
            else{
                SoundMgr.play('Sound_select_error');
            }
        }
        else if(event.keyCode == 38){
            // UP, blank swap down
            let downIdx = this.blankPieceIdx+puzzleLength;
            if(downIdx < this.puzzleStates.length){
                let sprite_id = this.puzzleStates[downIdx].sprite_id;
                SoundMgr.play('Sound_select');
                this.swapIcons(sprite_id, downIdx);
            }
            else{
                SoundMgr.play('Sound_select_error');
            }
        }
        else if(event.keyCode == 40){
            // DOWN, blank swap up
            let upIdx = this.blankPieceIdx-puzzleLength;
            if(upIdx >= 0){
                let sprite_id = this.puzzleStates[upIdx].sprite_id;
                SoundMgr.play('Sound_select');
                this.swapIcons(sprite_id, upIdx);
            }
            else{
                SoundMgr.play('Sound_select_error');
            }
        }
        else{
            // Invalid keys
            SoundMgr.play('Sound_select_error');
        }
    }
    createIcon = (sprite_id, arr_id) => {
        let icon = new GameIcon(sprite_id, arr_id);
        this.addChild(icon);
        let iconClickHandler = () =>{
            // check valid move direction
            let direction = this.getMoveDirection(arr_id);
            if(direction == MoveDirecEnum.NONE){
                SoundMgr.play('Sound_select_error');
            }
            else{
                SoundMgr.play('Sound_select');
                this.swapIcons(sprite_id, arr_id);
            }
        }
        icon.on("click", iconClickHandler);
        icon.on("tap", iconClickHandler);
    }
    swapIcons = (sprite_id: string, arr_id:number)=>{
        this.removeChild(this.getChildByName("corgi_" + sprite_id));

        this.swapPieces(this.puzzleStates, this.blankPieceIdx, arr_id);
        this.puzzleStates[arr_id].arr_id = arr_id;
        this.puzzleStates[this.blankPieceIdx].arr_id = this.blankPieceIdx;
        
        this.createIcon(sprite_id, this.blankPieceIdx);
        this.blankPieceIdx = arr_id;

        let pass = this.checkGameEnd();
        if(pass){
            eventEmitter.emit(GameFlowEvent.GamePass);
        }
    };
    checkGameEnd = () => {
        for(let i = 0; i < this.puzzleStates.length; i++){
            let x = this.puzzleStates[i];
            let idArr = x.sprite_id.split('');
            let actual_arr_id = +idArr[0]*puzzleLength+(+idArr[1]);
            if(i != actual_arr_id){
                return false;
            }
        }
        return true;
    }
    getMoveDirection = (clickIdx) => {
        let blankRow = Math.floor(this.blankPieceIdx/puzzleLength);
        let clickRow = Math.floor(clickIdx/puzzleLength)
        // UP
        if(this.blankPieceIdx - puzzleLength == clickIdx)
            return MoveDirecEnum.UP;
        // DOWN
        else if(this.blankPieceIdx + puzzleLength == clickIdx)
            return MoveDirecEnum.DOWN;
        // LEFT
        else if(this.blankPieceIdx - 1 == clickIdx
            && blankRow == clickRow)
            return MoveDirecEnum.LEFT;
        // RIGHT
        else if(this.blankPieceIdx + 1 == clickIdx
            && blankRow == clickRow)
            return MoveDirecEnum.RIGHT;
        else
            return MoveDirecEnum.NONE;
    }
    shuffle = (array) => {
        let m = array.length;
        let i;
        while(m){
            // Pick a remaining element
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element
            this.swapPieces(array, m, i);
        }
        return array;
    }

    swapPieces = (array: Array<PuzzlePiece>, m, i) => {
        let t = array[m];
        array[m] = array[i];
        array[i] = t;
    }


}