// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // closest() method
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseenter event doesn't bubble so we use mouseover event here.
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
