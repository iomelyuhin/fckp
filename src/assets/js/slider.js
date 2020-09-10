document.addEventListener(`DOMContentLoaded`, function () {
  function sliderRun(
		jsslider, 
		jssliderList, 
		jssliderTrack, 
		jsslides, 
		jsarrows,
		jspagination,
		dotsname,
		dotsClass) {
    const slider = document.querySelector(jsslider)
    const sliderList = slider.querySelector(jssliderList)
    const sliderTrack = slider.querySelector(jssliderTrack)
    const slides = slider.querySelectorAll(jsslides)
    const arrows = slider.querySelector(jsarrows)
    const prev = arrows.children[0]
    const indexSlideText = arrows.children[1]
    const next = arrows.children[2]
    const slideWidth = slides[0].offsetWidth
    const pagination = document.querySelector(jspagination)
    let slideIndex = 0
    let posInit = 0
    let posX1 = 0
    let posX2 = 0
    let posY1 = 0
    let posY2 = 0
    let posFinal = 0
    let isSwipe = false
    let isScroll = false
    let allowSwipe = true
    let transition = true
    let nextTrf = 0
    let prevTrf = 0
    const lastTrf = (slides.length - 1) * slideWidth
    const posThreshold = slides[0].offsetWidth * 0.35
    const trfRegExp = /([-0-9.]+(?=px))/
    const getEvent = function () {
      return event.type.search(`touch`) !== -1 ? event.touches[0] : event
    }
    const slide = function () {
      if (transition) {
        sliderTrack.style.transition = `transform .5s`
      }
      sliderTrack.style.transform = `translate3d(-${
        slideIndex * slideWidth
      }px, 0px, 0px)`

      prev.classList.toggle(`disabled`, slideIndex == 0)
      next.classList.toggle(`disabled`, slideIndex == (slides.length - 1))
      switchDots(slideIndex)

    }
    const swipeStart = function () {
      let evt = getEvent();

      if (allowSwipe) {
        transition = true;

        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;

        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;

        sliderTrack.style.transition = "";

        document.addEventListener("touchmove", swipeAction);
        document.addEventListener("mousemove", swipeAction);
        document.addEventListener("touchend", swipeEnd);
        document.addEventListener("mouseup", swipeEnd);

        sliderList.classList.remove("grab");
        sliderList.classList.add("grabbing");
			}
			switchDots(slideIndex)
			
    };
    const swipeAction = function () {
      const evt = getEvent()
      const style = sliderTrack.style.transform
      const transform = +style.match(trfRegExp)[0]

      posX2 = posX1 - evt.clientX
      posX1 = evt.clientX

      posY2 = posY1 - evt.clientY
      posY1 = evt.clientY

      // определение действия свайп или скролл
      if (!isSwipe && !isScroll) {
        const posY = Math.abs(posY2)
        if (posY > 7 || posX2 == 0) {
          isScroll = true
          allowSwipe = false
        } else if (posY < 7) {
          isSwipe = true
        }
      }

      if (isSwipe) {
        // запрет ухода влево на первом слайде
        if (slideIndex == 0) {
          if (posInit < posX1) {
            setTransform(transform, 0)
            return
          } else {
            allowSwipe = true
          }
        }


        // запрет ухода вправо на последнем слайде
        if (slideIndex === (slides.length - 1)) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf)
            return
          } else {
            allowSwipe = true
          }
        }

        // запрет протаскивания дальше одного слайда
        if (
          (posInit > posX1 && transform < nextTrf) ||
            (posInit < posX1 && transform > prevTrf)
        ) {
          reachEdge()
          return
        }

        // двигаем слайд
        sliderTrack.style.transform = `translate3d(${
          transform - posX2
        }px, 0px, 0px)`
			}
			switchDots(slideIndex)
			
    }
    const swipeEnd = function () {
      posFinal = posInit - posX1

      isScroll = false
      isSwipe = false

      document.removeEventListener(`touchmove`, swipeAction)
      document.removeEventListener(`mousemove`, swipeAction)
      document.removeEventListener(`touchend`, swipeEnd)
      document.removeEventListener(`mouseup`, swipeEnd)

      sliderList.classList.add(`grab`)
      sliderList.classList.remove(`grabbing`)

      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--
          } else if (posInit > posX1) {
            slideIndex++
          }
        }

        if (posInit !== posX1) {
          allowSwipe = false
          slide()
        } else {
          allowSwipe = true
        }
      } else {
        allowSwipe = true
			}
			switchDots(slideIndex)
    }
    const setTransform = function (transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`
        }
      }
			allowSwipe = false
			switchDots(slideIndex)
			
    }
    const reachEdge = function () {
      transition = false
      swipeEnd()
			allowSwipe = true
			switchDots(slideIndex)
			
    }

    sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`
    sliderList.classList.add(`grab`)

    sliderTrack.addEventListener(`transitionend`, () => {
      allowSwipe = true
      indexSlideText.innerHTML = `${slideIndex + 1}/${slides.length}`

    })
    slider.addEventListener(`touchstart`, (event) => swipeStart(event))
    slider.addEventListener(`mousedown`, (event) => swipeStart(event))

    arrows.addEventListener(`click`, function (event) {
      const target = event.target
      // console.log(event.target.classList)

      if (target.classList.contains(`next`)) {
        slideIndex++
      } else if (target.classList.contains(`prev`)) {
        slideIndex--
      } else {
        return
      }

			slide()
			switchDots(slideIndex)
			
      // indexSlideText.innerHTML = `${slideIndex + 1}/${slides.length}`;

    })

    if (slider.querySelector(jspagination)) {

      slider.querySelector(jspagination).addEventListener(`click`, function (e) {
        const dotts = slider.querySelectorAll('.' + dotsname)
        dotts.forEach((dot) => {
          dot.classList.remove(`active`)
        })
        slideIndex = e.target.getAttribute(`data-slide-index`)
        e.target.classList.add(`active`)
        slide()
      })
    }

    function switchDots(index) {
      const dotts = slider.querySelectorAll('.' + dotsname)
      dotts.forEach((dot) => {
        dot.classList.remove(`active`)
        if (dot.dataset.slideIndex == index) {
          dot.classList.add(`active`)
        }
      })
    }
		// indexSlideText.innerHTML = `${slideIndex + 1}/${slides.length}`;
    for (let i = 0; i < slides.length; i++) {

      const dot = document.createElement(`button`)
      dot.classList.add(dotsClass)
      dot.classList.add(dotsname)
      dot.setAttribute(`data-slide-index`, i)
      pagination.append(dot)
    }
    document.querySelectorAll('.'+dotsname)[0].classList.add(`active`)
	}
	
// ====================================================
// ====================Вызов слайдеров=================
// ====================================================
// !слайдер на главной hero
if (document.querySelector(`.js__slider`)) {
	sliderRun(
		`.js__slider`,
		`.js__slider-list`,
		`.js__slider-track`,
		`.js__slide`,
		`.js__slider-arrows`,
		`.js__slider-pagination`,
		`js_dot`,
		`hero__slider-pagination-item`
    )
	}
	
// !слайдер новости
  if (document.querySelector(`.js__news-slider`)) {
    sliderRun(
      `.js__news-slider`,
      `.js__news-slider-list`,
      `.js__news-slider-track`,
      `.js__news-slide`,
      `.js__news-slider-arrows`,
			`.js__news-slider-pagination`,
			`js_news-dot`,
			`news__slider-pagination-item`
    )
  }


  // if (document.querySelector(`.js__partners-slider`)) {

  //   sliderRun(
  //     `.js__partners-slider`,
  //     `.js__partners-slider-list`,
  //     `.js__partners-slider-track`,
  //     `.js__partners-slide`,
  //     `.js__partners-slider-arrows`
  //   )
  // }
})
