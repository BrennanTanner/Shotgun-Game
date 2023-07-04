class HealthBar {
   constructor(scene, x, y, width, scale, scrollFactor) {
      this.fullWidth = width;
      this.x = x;
      this.y = y;
      this.scene = scene;
      this.totalHealth = 100;
      this.currentHealth = this.totalHealth;
      this.currentPercentage = 1;
      this.scrollFactor = scrollFactor;
      this.scale = scale;
   }
   create() {
      // background shadow
      this.scene.leftShadowCap = this.scene.add
         .image(this.x, this.y, 'left-cap-shadow')
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);

      this.scene.middleShadowCap = this.scene.add
         .image(
            this.scene.leftShadowCap.x + this.scene.leftShadowCap.width,
            this.y,
            'middle-shadow'
         )
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);
      this.scene.middleShadowCap.displayWidth = this.fullWidth;

      this.scene.rightShadowCap = this.scene.add
         .image(
            this.scene.middleShadowCap.x +
               this.scene.middleShadowCap.displayWidth,
            this.y,
            'right-cap-shadow'
         )
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);

      // health bar
      this.scene.leftCap = this.scene.add
         .image(this.x, this.y, 'left-cap')
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);

      this.scene.middle = this.scene.add
         .image(
            this.scene.leftCap.x + this.scene.leftCap.width,
            this.y,
            'middle'
         )
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);
      this.scene.rightCap = this.scene.add
         .image(
            this.scene.middle.x + this.scene.middle.displayWidth,
            this.y,
            'right-cap'
         )
         .setOrigin(0, 0.5)
         .setScrollFactor(this.scrollFactor);

      this.scene.leftShadowCap.depth = 1;
      this.scene.leftCap.depth = 1;
      this.scene.middleShadowCap.depth = 1;
      this.scene.middle.depth = 1;
      this.scene.rightShadowCap.depth = 1;
      this.scene.rightCap.depth = 1;

      this.setMeterPercentage();
   }

   setMeterPercentage() {
      const width = this.fullWidth * this.currentPercentage;

      this.scene.middle.displayWidth = width;
      this.scene.rightCap.x =
         this.scene.middle.x + this.scene.middle.displayWidth;
   }

   setMeterPercentageAnimated(duration = 1000) {
      const width = this.fullWidth * this.currentPercentage;
      this.scene.tweens.add({
         targets: this.scene.middle,
         displayWidth: width,
         duration,
         ease: Phaser.Math.Easing.Sine.Out,
         onUpdate: () => {
            this.scene.rightCap.x =
               this.scene.middle.x + this.scene.middle.displayWidth;

            this.scene.leftCap.visible = this.scene.middle.displayWidth > 0;
            this.scene.middle.visible = this.scene.middle.displayWidth > 0;
            this.scene.rightCap.visible = this.scene.middle.displayWidth > 0;
         },
      });
   }

   damage(points) {
      const newHealth = this.currentHealth + points;

      if (newHealth >= this.totalHealth) {
         this.currentHealth = this.totalHealth;
      } else {
         this.currentHealth = newHealth;
      }

      this.currentPercentage = this.currentHealth / this.totalHealth;
      this.setMeterPercentageAnimated();
   }
}

export default HealthBar;
