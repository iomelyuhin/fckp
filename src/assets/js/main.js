document.addEventListener(`DOMContentLoaded`, function () {
  // !=================================
  // !==========navigation=============
  // !=================================

  const navButtons = document.querySelectorAll(`.js__navBtn`)
  const navList = document.querySelectorAll(`.js__navList`)

  navButtons.forEach((navButton) => {
    navButton.addEventListener(`click`, (e) => {
      closeSubmenu()
      const currentList = e.target.nextSibling
      currentList.classList.toggle(`active`)
      navButton.classList.toggle(`active`)
      docListen()
    })
  })

  function docListen() {

    document.addEventListener(`click`, (e) => {
      if (
        e.target.classList !== `navigation__item-subitem` &&
        e.target.classList !== `navigation__item-subitem-link` &&
        e.target.classList !== `navigation__item` &&
        e.target.classList !== `navigation__item-btn js__navBtn active`
      ) {
        closeSubmenu()
      }

    })
  }


  function closeSubmenu() {
    navButtons.forEach((navButton) => {
      navButton.classList.remove(`active`)
    })
    navList.forEach((list) => {
      list.classList.remove(`active`)
    })
  }
})
