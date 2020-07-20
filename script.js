const root = document.getElementById("root");
const title = root.querySelector("h1");
const range = 25;
const colors = ["#EF233C", "#2F2963", "#6A7FDB"];
const coordinates = { x: 0, y: 0 };
let elementIndex = 0;
let rendered = false;
let userMousemoved = false;
let timeout;

setInterval(() => {
  if (!userMousemoved) {
    coordinates["x"] = window.innerWidth / 2 - range / 2;
    coordinates["y"] = window.innerHeight / 2 - range / 2;
    rendered = false;
  }

  if (!rendered) {
    const el = document.createElement("div");
    const mRange = range * 2;
    const x = Math.floor(Math.random() * mRange) + coordinates["x"] - mRange;
    const y = Math.floor(Math.random() * mRange) + coordinates["y"] - mRange;
    const size = Math.floor(Math.random() * mRange) + range;
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.classList.add("circle");
    el.style.top = y + "px";
    el.style.left = x + "px";
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.backgroundColor = color;
    root.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 1000);
  }
  rendered = true;
}, 15);

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (
    userMousemoved ||
    (clientX < window.innerWidth / 2 + range * 2 &&
      clientX > window.innerWidth / 2 - range * 2 &&
      clientY < window.innerHeight / 2 + range * 2 &&
      clientY > window.innerHeight / 2 - range * 2)
  ) {
    coordinates["x"] = clientX;
    coordinates["y"] = clientY;
    rendered = false;
    userMousemoved = true;
    title.classList.add("hidden");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      title.classList.remove("hidden");
      userMousemoved = false;
    }, 2000);
  }
});
