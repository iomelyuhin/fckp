document.addEventListener(`DOMContentLoaded`, function () {
  // !=================================
  // !==========navigation=============
  // !=================================

  const navButtons = document.querySelectorAll(`.js__navBtn`)
  const navList = document.querySelectorAll(`.js__navList`)

  navButtons.forEach((navButton) => {
    navButton.addEventListener(`click`, (e) => {

      const currentList = e.target.nextSibling.nextSibling
      if (navButton.classList.contains(`active`)) {
        navButton.classList.remove(`active`)
        currentList.classList.remove(`active`)
      } else {
        closeSubmenu()
        currentList.classList.add(`active`)
        navButton.classList.add(`active`)
      }

    })
  })

  function closeSubmenu() {
    navButtons.forEach((navButton) => {
      navButton.classList.remove(`active`)
    })
    navList.forEach((list) => {
      list.classList.remove(`active`)
    })
  }

  // !==================================
  // !==========hamburger menu==========
  // !==================================
  const burgerButton = document.querySelector(`.hamburger`)
  const mobileMenu = document.querySelector(`.header__mobile-menu`)
  const body = document.querySelector(`body`)

  burgerButton.addEventListener(`click`, (e) => {
    e.preventDefault()
    burgerButton.classList.toggle(`is-active`)
    mobileMenu.classList.toggle(`active`)
    if (mobileMenu.classList.contains(`active`)) {
      body.style.position = `fixed`
    } else {
      body.style.position = `relative`

    }
  })
})
