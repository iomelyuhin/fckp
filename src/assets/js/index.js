document.addEventListener(`DOMContentLoaded`, function () {
  // !=========================================================
  // !====================Partners hero========================
	// !=========================================================
	
	const partList = document.querySelector(".partners__list")
	const partWidth = partList.offsetWidth
	const itemWidth = document.querySelector(".js__partners-slide").offsetWidth

	let qty = 0
	setInterval(() => {
		partList.style.left = qty + "px"
		// console.log('1');
		qty = qty - 0.5
		
		if (qty == -partWidth + (itemWidth*5)) {
			console.log('partWidth');
			qty = 0
			
		} 
	}, 10);

	const mobileBtnProducts = document.querySelector(".cta--product")
	const mobileProductCards = document.querySelectorAll(".product__mobile")

	mobileBtnProducts.addEventListener("click", e => {
		e.preventDefault();
		console.log(e.target);
		mobileProductCards.forEach(item => {
			item.style.display = "block"
		})
		
	})

});
