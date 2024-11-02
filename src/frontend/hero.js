import { GameObject } from "./gameObject.js";
import { DOWN, UP, LEFT, RIGHT } from "./input.js";
import { tile_size } from "./script.js";

export class Hero extends GameObject {
  constructor({game,
    sprite,
    position,
    scale}){
    super({game,
      sprite,
      position,
      scale});

      this.speed = 100;
      this.maxFrame = 8;
      this.moving = false;
  }
    update(deltaTime) {
      let nextX = this.destinationPosition.x;
      let nextY = this.destinationPosition.y;

      const scaledSpeed = this.speed * (deltaTime / 1000);

      const distance = this.moveTowards(this.destinationPosition, scaledSpeed);

      const arrived = distance <= scaledSpeed;

      if(arrived) {
      if (this.game.input.lastKey === UP) {
        nextY -= tile_size;
        this.sprite.y = 8;
      } 
      else if (this.game.input.lastKey === DOWN) {
        nextY += tile_size;
        this.sprite.y = 10;
      } 
      else if (this.game.input.lastKey === LEFT) {
        nextX -= tile_size;
        this.sprite.y = 9;
      } 
      else if (this.game.input.lastKey === RIGHT) {
        nextX += tile_size;
        this.sprite.y = 11;
      } 

      const col = nextX / tile_size;
      const row = nextY / tile_size;
      if(this.game.world.getTile(this.game.world.level1.collisionLayer, row, col) !==1  ) {
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      }

     
    }
    if(this.game.eventUpdate && !arrived) {
      this.moving = true;
    }else {
      this.moving = false;
    }
    if(this.game.eventUpdate && this.moving) {
      this.sprite.x < this.maxFrame ? this.sprite.x++ : this.sprite.x = 1
    } else {
      this.sprite.x = 0;
    }
    
  }

}