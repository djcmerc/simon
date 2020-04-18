class Button{
    constructor(image, sound){
        this.image = image;
        this.sound = sound;

        this.playSound = function(){
            this.sound.play();
            return null;
        }
    }

    image(){
        return this.image;
    }


}