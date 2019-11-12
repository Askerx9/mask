import gsap from "gsap";
import * as PIXI from 'pixi.js'

export default class imageToFullscreenTransition {

  constructor (element) {
    this.element  = document.querySelector(element)
    this.children = this.element.children
    this.length = this.children.length
    this.index = 0

    // MASK
    this.layoutProp = this.getItemLayoutProp(this.children[this.index].querySelector('.carousel__img'))
    this.mask = {
      p1: {x: this.layoutProp.x + this.layoutProp.width + 100, y: this.layoutProp.y},
      p2: {x: this.layoutProp.x + this.layoutProp.width + 100, y: this.layoutProp.y},
      p3: {x: this.layoutProp.x + this.layoutProp.width + 100, y: this.layoutProp.y + this.layoutProp.height},
      p4: {x: this.layoutProp.x + this.layoutProp.width + 100, y: this.layoutProp.y + this.layoutProp.height},
    }

    this.maskToFullScreen = {
      p1: {x: 0, y: 0},
      p2: {x: window.innerWidth, y: 0},
      p3: {x: window.innerWidth, y: window.innerHeight},
      p4: {x: 0, y: window.innerHeight},
    }

    // DOM
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: window.devicePixelRatio || 1,
      // antialias: true,
      // backgroundColor: 0x1099bb,
      // transparent: true,
      // preserveDrawingBuffer: true
      backgroundColor: 0x1099b, transparent: 'notMultiplied'
    });

    this.app.renderer._backgroundColorRgba[3] = 0.0;
    // this.app.stage.interactive = true;

    this.loader = new PIXI.Loader();
    this.loadImage()

    this.bg = null;
    this.maskGraphics = new PIXI.Graphics();

    document.body.append(this.app.view)

    // ANIMATION
    // this.app.ticker.add(this.animation())

    // INIT
    this.draw()

    setTimeout(() => {
      this.updateIn()
    }, 2000);

    setTimeout(() => {
      this.toFullScreen()
    }, 6000);

  }

  updateIn () {
    const x = this.layoutProp.x
    const x2 = this.layoutProp.x + this.layoutProp.width
    const tl = gsap.timeline({onUpdate: this.animation.bind(this)})
    tl.to(this.bg, {x: this.app.screen.width / 2, duration: 1.5, ease: "expo.out"}, 'start')
    tl.to(this.mask.p1, {x: x, duration: 1.5, ease: "expo.out"}, 'start')
    tl.to(this.mask.p2, {x: x2, duration: 1.5, ease: "expo.out"}, 'start')
    tl.to(this.mask.p3, {x: x2, duration: 1.5, ease: "expo.out"}, 'start')
    tl.to(this.mask.p4, {x: x, duration: 1.5, ease: "expo.out"}, 'start')
  }

  toFullScreen () {
    const x = this.layoutProp.x
    const tl = gsap.timeline({onUpdate: this.animation.bind(this)})
    tl.to(this.mask.p1, {x: this.maskToFullScreen.p1.x, y: this.maskToFullScreen.p1.y, duration: 1, ease: "expo.out"}, 'start')
    tl.to(this.mask.p2, {x: this.maskToFullScreen.p2.x, y: this.maskToFullScreen.p2.y, duration: 1, ease: "expo.out"}, 'start')
    tl.to(this.mask.p3, {x: this.maskToFullScreen.p3.x, y: this.maskToFullScreen.p3.y, duration: 1, ease: "expo.out"}, 'start')
    tl.to(this.mask.p4, {x: this.maskToFullScreen.p4.x, y: this.maskToFullScreen.p4.y, duration: 1, ease: "expo.out"}, 'start')
  }

  animation () {
    this.maskGraphics
    .clear()
    .beginFill(0x555555)
    .moveTo(this.mask.p1.x, this.mask.p1.y)
    .lineTo(this.mask.p2.x, this.mask.p2.y)
    .lineTo(this.mask.p3.x, this.mask.p3.y)
    .lineTo(this.mask.p4.x, this.mask.p4.y)
    .endFill()

  }

  draw () {

    const container = new PIXI.Container();
    container.x = 0;
    container.y = 0;

    this.loader.load((loader, resources) => {

      this.bg = PIXI.Sprite.from(resources['img'+this.index].url)
      const texture = resources['img'+this.index].texture
      const scale = Math.max(window.innerWidth / texture.width, window.innerHeight/ texture.height);

      this.bg.anchor.set(0.5);
      this.bg.x = (this.app.screen.width / 2) - 100;
      this.bg.y = this.app.screen.height / 2;
      this.bg.scale.set(scale, scale)

      container.addChild(this.bg)
    })

    this.app.stage.addChild(container)



    this.app.stage.addChild(this.maskGraphics);

    this.maskGraphics.beginFill(0x555555)

    this.maskGraphics.moveTo(this.mask.p1.x, this.mask.p1.y)
    this.maskGraphics.lineTo(this.mask.p2.x, this.mask.p2.y)
    this.maskGraphics.lineTo(this.mask.p3.x, this.mask.p3.y)
    this.maskGraphics.lineTo(this.mask.p4.x, this.mask.p4.y)

    this.maskGraphics.endFill()

    this.maskGraphics.x = 0;
    this.maskGraphics.y = 0;
    this.maskGraphics.lineStyle(0);

    container.mask = this.maskGraphics;

  }

  drawCoverImageCentered (img) {
    const scale = Math.max(window.innerWidth / img.width, window.innerHeight/ img.height);
    const x = (window.innerWidth / 2) - (img.width / 2) * scale;
    const y = (window.innerHeight/ 2) - (img.height / 2) * scale;

    return this.ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }

  setCanvas () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.style.position = "fixed"
    this.canvas.style.top = 0
    this.canvas.style.left = 0
    this.canvas.style.zIndex = -1
  }

  getImageUrl () {
    const imgURLs = []

    for (let i = 0; i < this.children.length; i++) {
      const el = this.children[i];
      imgURLs.push(el.querySelector('img'))
    }

    return imgURLs
  }

  loadImage () {
    const imgsUrls = this.getImageUrl()
    const imgs = []

    imgsUrls.forEach((img, index) => {
      this.loader.add(
        `img${index}`,
        img.src
      )
      // imgs.push(PIXI.Sprite.from(img.src))
    });
  }

  getItemLayoutProp( item ) {

    const scrollT = window.scrollY
    const scrollL = window.scrollX
    const layout = item.getBoundingClientRect()

    return {
      x : layout.x - scrollL,
      y : layout.y - scrollT,
      width : layout.width,
      height : layout.height
    };

  }

}