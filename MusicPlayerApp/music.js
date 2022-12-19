class Music {
    constructor(title, singer, image, file){
        this.title = title;
        this.singer = singer;
        this.image = image;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Ali Desidero", "MFÖ", "1.jpeg", "1.mp3"),
    new Music("Sarı Laleler", "MFÖ", "2.jpeg", "2.mp3"),
    new Music("Mazeretim Var", "MFÖ", "3.jpeg", "3.mp3")
]