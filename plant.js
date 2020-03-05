// Referenced code by Daniel Shiffman
// Tutorial: https://youtu.be/KkyIDI6rQJI

class Plant {

  constructor(image){
    this.x = random(0,(width-50)); //randomly place seed wherever
    this.y = 0;
    this.animation = image;
    this.planted = false;
    this.gotRain = false;
    this.gotSun = false;
    this.careCycle = 0;
  }

  show() {
    if (!this.planted && this.y < 750) {
      this.y+=0.3; //drop seed at constant rate
    } else {
      this.planted = true;
    }
    image(this.animation,this.x,this.y);
  }

   hasSun() {
     this.gotSun = true;
   }

   hasRain(cloudX) {
      if (
      (this.x > (cloudX + 456)) ||
      ((this.x + 150) < cloudX)) {
          return false;
      }
     return true;
   }

  grow(newImage) {
    var xDist = (newImage.width - (this.animation).width);
    this.x = this.x - (xDist/2);
    this.y = this.y - (newImage.height - (this.animation).height);
    this.animation = newImage;
  }

  reset(){
    this.gotRain = false;
    this.gotSun = false;
  }

}
