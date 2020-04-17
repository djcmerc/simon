class Button{
    constructor(image, sound){
        this.image = image;
        this.sound = sound;
    }

    image(){
        return this.image;
    }

    playSound(){
        this.sound.play();
    }
}