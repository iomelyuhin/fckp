document.addEventListener(`DOMContentLoaded`, function () {
  // !=================================
  // !==========navigation=============
  // !=================================

  const navButtons = document.querySelectorAll(`.js__navBtn`);
  const navList = document.querySelectorAll(`.js__navList`);
  const navLinks = document.querySelectorAll(`.navigation__item-subitem-link`);
  let isOpenedMenu = false;

  //закрыть меню по клику вне блока
  document.addEventListener("click", (e) => {
    if (isOpenedMenu && !e.target.classList.contains("js__navBtn")) {
      if (
        !e.target.classList.contains("navigation__item-subitem") ||
        !e.target.classList.contains("js__navBtn") ||
        !e.target.classList.contains("active")
      ) {
        closeSubmenu();
        isOpenedMenu = false;
      }
    }
  });

  navButtons.forEach((navButton) => {
    navButton.addEventListener(`click`, (e) => {
      const currentList = e.target.nextSibling.nextSibling;
      if (navButton.classList.contains(`active`)) {
        navButton.classList.remove(`active`);
        currentList.classList.remove(`active`);
        isOpenedMenu = false;
        closeSubmenu();
      } else {
        closeSubmenu();
        currentList.classList.add(`active`);
        navButton.classList.add(`active`);
        isOpenedMenu = true;
      }
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      closeSubmenu();
    });
  });

  function closeSubmenu() {
    navButtons.forEach((navButton) => {
      navButton.classList.remove(`active`);
      isOpenedMenu = false;
    });
    navList.forEach((list) => {
      list.classList.remove(`active`);
      isOpenedMenu = false;
    });
  }

  // !==================================
  // !==========hamburger menu==========
  // !==================================
  const burgerButton = document.querySelector(`.hamburger`);
  const mobileMenu = document.querySelector(`.header__mobile-menu`);
  const body = document.querySelector(`body`);

  burgerButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    burgerButton.classList.toggle(`is-active`);
    mobileMenu.classList.toggle(`active`);
    if (mobileMenu.classList.contains(`active`)) {
      body.style.position = `fixed`;
    } else {
      body.style.position = `relative`;
    }
  });

  //!ancorlinks
  // function anchorLink() {
  //   const links = document.querySelectorAll(`[href^="#"]`);
  //   const V = 0.2; // scrolling speed

  //   for (const iter of links) {
  //     iter.addEventListener(`click`, (e) => {
  //       e.preventDefault();
				
  //       const anchor = document.querySelector(iter.getAttribute(`href`));
  //       const coordAnchor = anchor.getBoundingClientRect().top;
  //       const windowY = window.pageYOffset;

  //       let start = null;

  //       requestAnimationFrame(step);

  //       function step(time) {
  //         if (start === null) {
  //           start = time;
  //         }
  //         const progress = time - start;

  //         const coordY =
  //           coordAnchor < 0
  //             ? Math.max(windowY - progress / V, windowY + coordAnchor)
  //             : Math.min(windowY + progress / V, windowY + coordAnchor);

  //         window.scrollTo(0, coordY);
  //         if (coordY !== windowY + coordAnchor) {
  //           requestAnimationFrame(step);
  //         }
  //       }
  //     });
  //   }
  // }
  // anchorLink();
});
