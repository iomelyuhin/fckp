document.addEventListener(`DOMContentLoaded`, function () {

  // !=======================================================
  // !====================Hero slider========================
  // !=======================================================
  const controls = document.querySelectorAll(`.hero__slider-controls-item`)
  const slidesArray = document.querySelectorAll(`.hero__item`)
  let slideIndex = 0
  const pagination = document.querySelector(`.hero__slider-pagination-list`)

  controls.forEach((btn) => {
    btn.addEventListener(`click`, (e) => {
      e.preventDefault()
      if (btn.classList.contains(`hero__slider-controls-item--prev`)) {
        goToPrevSlide()
      } else {
        goToNextSlide()
      }
      // console.log(slideIndex);
    })
  })

  function goToNextSlide() {
    const activeSlide = document.querySelector(`.hero__item.active`)

    const nextSlide = activeSlide.nextSibling

    activeSlide.classList.remove(`active`)


    if (!nextSlide) {
      slidesArray[0].classList.add(`active`)
      slideIndex = 0
    } else {
      nextSlide.classList.add(`active`)
      slideIndex++
    }
    changePagination()
  }

  function goToPrevSlide() {
    const activeSlide = document.querySelector(`.hero__item.active`)

    const prevSlide = activeSlide.previousSibling

    activeSlide.classList.remove(`active`)

    if (!prevSlide) {
      slidesArray[slidesArray.length - 1].classList.add(`active`)
      slideIndex = slidesArray.length - 1
    } else {
      prevSlide.classList.add(`active`)
      slideIndex--
    }
    changePagination()
  }

  // ? Пагинация
  slidesArray.forEach(function () {
    const dot = document.createElement(`li`)
    dot.classList.add(`hero__slider-pagination-item`)
    pagination.appendChild(dot)
  })

  const paginationDots = pagination.querySelectorAll(`.hero__slider-pagination-item`)

  function changePagination() {
    paginationDots.forEach((dot) => {
      dot.classList.remove(`active`)
    })
    paginationDots[slideIndex].classList.add(`active`)
  }

  changePagination()

  paginationDots.forEach((dot, i) => {
    dot.classList.remove(`active`)

    dot.addEventListener(`click`, function () {
      const activeSlide = document.querySelector(`.hero__item.active`)

      slideIndex = i
      activeSlide.classList.remove(`active`)
      slidesArray[i].classList.add(`active`)
      dot.classList.add(`active`)

    })
  })
})
