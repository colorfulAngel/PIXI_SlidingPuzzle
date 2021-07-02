export class CoreEvent {
    public static AssetsLoadComplete: string = "AssetsLoadComplete";
}

export class GameFlowEvent {
    public static GameEndWithTimeout: string = "GameEndWithTimeout";
    public static GameEndWithGiveUp: string = "GameEndWithGiveUp";
    public static GamePass: string = "GamePass";
    public static ReloadBoardRequest: string = "ReloadBoardRequest";

    public static RevertBackRequest: string = "RevertBackRequest";
    public static BoardReload: string = "BoardReload";
    public static ShowTargetRequest: string = "ShowTargetRequest";
    public static CreateNewGameRequest: string = "CreateNewGameRequest";
    public static GameRoundStart: string = "GameRoundStart";

    //public static GameSaveProgress: string = "GameSaveProgress";
}