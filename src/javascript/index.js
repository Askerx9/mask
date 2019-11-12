import imageToFullscreenTransition from './components/imageToFullscreenTransition'

document.addEventListener('DOMContentLoaded', () => {

  new imageToFullscreenTransition('.carousel')

  const carouselItem = document.querySelector('.carousel__item')

  setTimeout(() => {
    carouselItem.classList.add('active')
  }, 2000);
  setTimeout(() => {
    carouselItem.classList.add('out')
  }, 6000);
//   const imgMask = document.querySelector('.carousel__img')
//   const img = document.querySelector('.bckg_img')

//   const layoutProp = getItemLayoutProp( imgMask )

//   const clipPropFirst = `polygon(
//     ${( layoutProp.left + layoutProp.width + 100 )}px ${layoutProp.top}px,
//     ${( layoutProp.left + layoutProp.width + 100 )}px ${layoutProp.top}px,
//     ${( layoutProp.left + layoutProp.width + 100 )}px ${( layoutProp.top + layoutProp.height )}px,
//     ${( layoutProp.left + layoutProp.width + 100 )}px ${( layoutProp.top + layoutProp.height )}px)`

//   const clipPropStep = `polygon(
//     ${layoutProp.left}px ${layoutProp.top}px,
//     ${( layoutProp.left + layoutProp.width )}px ${layoutProp.top}px,
//     ${( layoutProp.left + layoutProp.width )}px ${( layoutProp.top + layoutProp.height )}px,
//     ${layoutProp.left}px ${( layoutProp.top + layoutProp.height )}px)`

//   const clipPropLast = `polygon(
//     0px 0px,
//     ${window.innerWidth}px 0px,
//     ${window.innerWidth}px ${window.innerHeight}px,
//     0px ${window.innerHeight}px)`



//   // TweenMax.set(img, {clipPath: clipPropFirst})



//   document.querySelector('.run').addEventListener('click', () => {
//     carouselItem.classList.add('active')
//     // TweenMax.to(img, 1.5,  {clipPath: clipPropStep, delay: -1})
//   })



//   carouselItem.addEventListener('click', () => {
//     carouselItem.classList.add('out')
//     // TweenMax.to(img, 1,  {clipPath: clipPropLast})
//   })
})

// function getItemLayoutProp( item ) {

// 	const scrollT = window.scrollY
//   const scrollL = window.scrollX
//   const layout = item.getBoundingClientRect()

// 	return {
// 		left : layout.x - scrollL,
// 		top : layout.y - scrollT,
// 		width : layout.width,
// 		height : layout.height
// 	};

// }
