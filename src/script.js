const root = document.getElementById("root");
const title = root.querySelector("h1");
const range = 25;
const colors = ["#EF233C", "#2F2963", "#6A7FDB"];
const coordinates = { x: 0, y: 0 };
const elements = Array(100)
  .fill(0)
  .map(() => {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * range * 2) + range;
    el.classList.add("circle");
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.backgroundColor = color;
    return el;
  });
let pointer = 0;
let rendered = false;
let userMousemoved = false;
let timeout;

setInterval(() => {
  const mRange = range * 2;
  if (!userMousemoved) {
    coordinates["x"] =
      Math.floor(Math.random() * mRange * 2) + window.innerWidth / 2 - mRange;
    coordinates["y"] = window.innerHeight / 2 - range / 2;
    rendered = false;
  }

  if (!rendered) {
    pointer = pointer > elements.length - 2 ? 0 : pointer + 1;
    const el = elements[pointer];
    const x = Math.floor(Math.random() * mRange) + coordinates["x"] - mRange;
    const y = Math.floor(Math.random() * mRange) + coordinates["y"] - mRange;
    el.style.top = y + "px";
    el.style.left = x + "px";
    root.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  rendered = true;
}, 15);

const listener = (clientX, clientY) => {
  if (
    userMousemoved ||
    (clientX < window.innerWidth / 2 + range * 4 &&
      clientX > window.innerWidth / 2 - range * 4 &&
      clientY < window.innerHeight / 2 + range * 2 &&
      clientY > window.innerHeight / 2 - range * 2)
  ) {
    clearTimeout(timeout);
    coordinates["x"] = clientX;
    coordinates["y"] = clientY;
    rendered = false;
    userMousemoved = true;
    title.classList.add("hidden");
    timeout = setTimeout(() => {
      title.classList.remove("hidden");
      userMousemoved = false;
    }, 1500);
  }
};

root.addEventListener(
  "mousemove",
  ({ clientX, clientY }) => {
    listener(clientX, clientY);
  },
  { passive: true }
);

root.addEventListener(
  "touchmove",
  ({ touches }) => {
    if (touches.length) {
      listener(touches[0].clientX, touches[0].clientY);
    }
  },
  { passive: true }
);
