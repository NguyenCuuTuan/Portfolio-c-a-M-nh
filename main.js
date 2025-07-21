const wrapper = document.querySelector(".slider-wrapper");
const slider = document.querySelector(".slider");

let scrollPos = 0;
let maxScroll = slider.scrollWidth - wrapper.clientWidth;
let speed = 0;
let animation;

wrapper.addEventListener("mousemove", (e) => {
  const bounds = wrapper.getBoundingClientRect();
  const mouseX = e.clientX - bounds.left;
  const width = bounds.width;

  const edgeZone = 100; // pixel tính là "góc"
  speed = 0;

  if (mouseX < edgeZone) {
    speed = -4; // trượt sang trái (hiện thêm bên phải)
  } else if (mouseX > width - edgeZone) {
    speed = 4; // trượt sang phải (hiện thêm bên trái)
  }

  if (!animation) requestAnimationFrame(scrollSlider);
});

wrapper.addEventListener("mouseleave", () => {
  speed = 0;
  cancelAnimationFrame(animation);
  animation = null;
});

function scrollSlider() {
  scrollPos += speed;

  // Giới hạn
  if (scrollPos < 0) scrollPos = 0;
  if (scrollPos > maxScroll) scrollPos = maxScroll;

  slider.style.transform = `translateX(-${scrollPos}px)`;

  if (speed !== 0) {
    animation = requestAnimationFrame(scrollSlider);
  } else {
    animation = null;
  }
}
