class Resources
{
    public id: string;
    public path: string;
    constructor(id, path)
    {
        this.id = id;
        this.path = path;
    }
}

export class ResourcesList
{
    public static img: Array<Resources> = [
        new Resources('background', 'assets/background.png'),
        new Resources('Button','assets/Button.json'),
        new Resources('corgi', 'assets/spritesheet.json')
    ];
    public static sound: Array<Resources> = [
        new Resources('Sound_bg','assets/bg.mp3'),
        new Resources('Sound_select_correct','assets/select_correct.mp3'),
        new Resources('Sound_select_error','assets/select_error.mp3'),
        new Resources('Sound_select','assets/select.mp3')
        // new Resources('About', 'assets/about.mp3')
    ];
}