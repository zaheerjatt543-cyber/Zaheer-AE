const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projects.forEach(project => {
      project.style.display = filter === "all" || project.classList.contains(filter) ? "" : "none";
    });
  });
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Autoplay the portfolio video only when it scrolls into view.
// It stays muted so browsers allow autoplay, and pauses when scrolled away.
const portfolioVideos = document.querySelectorAll(".video-box video");
if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: [0, 0.45, 0.75] });

  portfolioVideos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    videoObserver.observe(video);
  });
} else {
  portfolioVideos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
  });
}

// Full-screen canvas for portfolio work.
const workCanvas=document.getElementById("workCanvas");
const canvasContent=document.getElementById("canvasContent");
const canvasClose=document.getElementById("canvasClose");
document.querySelectorAll(".canvas-trigger").forEach(card=>{
  card.addEventListener("click",()=>{
    const type=card.dataset.type, src=card.dataset.src;
    canvasContent.innerHTML=type==="video"
      ? `<video controls autoplay playsinline><source src="${src}" type="video/mp4"></video>`
      : `<img src="${src}" alt="Zaheer AE portfolio work">`;
    workCanvas.classList.add("open");
    workCanvas.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
function closeWorkCanvas(){
  workCanvas.classList.remove("open");
  workCanvas.setAttribute("aria-hidden","true");
  canvasContent.innerHTML="";
  document.body.style.overflow="";
}
canvasClose.addEventListener("click",closeWorkCanvas);
workCanvas.addEventListener("click",e=>{if(e.target===workCanvas)closeWorkCanvas()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeWorkCanvas()});


// Lightweight scroll-reveal animation for portfolio sections/cards.
const revealItems = document.querySelectorAll(".section, .project, .section-head, .filters");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", Math.min((i % 4) * 70, 210) + "ms");
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
  revealItems.forEach(el => revealObserver.observe(el));
} else {
  revealItems.forEach(el => el.classList.add("is-visible"));
}

// Keep videos paused unless they are actually visible, reducing CPU/GPU usage.
document.querySelectorAll(".video-box video").forEach(video => {
  video.addEventListener("loadeddata", () => video.setAttribute("data-ready", "true"));
});
