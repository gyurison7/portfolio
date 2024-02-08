const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// aside
ScrollTrigger.create({
  trigger: ".whole-wrapper",
  start: "0% 0%",
  end: "100% 100%",
  // markers: true,
  onUpdate: function (self) {
    if (self.direction < 1) {
      $(".scroll-direction").text("SCROLL UP");
    } else {
      $(".scroll-direction").text("SCROLL DOWN");
    }
  },
});

// 스크롤 퍼센트 계산하기
lenis.on("scroll", (e) => {
  // 전체 문서 길이에서 뷰포트 높이 빼기
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = e.targetScroll; // 현재 스크롤 위치
  const scrollPercentage = (currentScroll / totalScroll) * 100;
  $(".scroll-bar").css("--progress", `${scrollPercentage.toFixed()}%`);
});

$(".gnb a").click(function (e) {
  e.preventDefault();
  const target = $(this).attr("href");
  const element = $(target);
  const targetOffset = element.offset().top;
  lenis.scrollTo(targetOffset);
});

// section-title
document.querySelectorAll(".section-title").forEach(function (element) {
  const chars = element.querySelectorAll(".char");
  gsap.from(chars, {
    scrollTrigger: {
      trigger: element,
      start: "0% 50%",
      end: "100% 50%",
      scrub: true,
      // markers: true,
    },
    opacity: 0,
    yPercent: 100,
    stagger: 0.1,
  });
});

// sc-project
document.querySelectorAll(".content-wrapper").forEach(function (element) {
  const target = element.closest(".project");
  gsap.to(element, {
    scrollTrigger: {
      trigger: target,
      start: "0% 0%",
      end: "100% 0%",
      // markers: true,
      toggleClass: { targets: element, className: "on" },
    },
  });
});

const linkText = new SplitType(".content-wrapper .see-project span", { types: "chars" });
const titleText = new SplitType(".content-wrapper .title", { types: "chars" });
const contentText = new SplitType(
  ".content-wrapper .description1, .content-wrapper .description2 li",
  { types: "chars" }
);

document.querySelectorAll(".content-wrapper").forEach(function (element) {
  const chars = element.querySelectorAll(".char");
  const textMotion = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "0% 50%",
      end: "100% 0%",
      scrub: true,
      // markers: true,
    },
  });
  textMotion.from(chars, { opacity: 0, yPercent: 100, stagger: 0.1 });
});

$(".see-project, .code-review").hover(function () {
  const className = $(this).attr("class").replace("-", " ");
  const cursor = $(".cursor");
  const dot = $(".cursor-dot");
  $(cursor).toggleClass("link");
  if ($(cursor).hasClass("link")) {
    $(dot).text(className);
  } else {
    $(dot).text("");
  }
});

$(".sc-project .title").hover(function () {
  $(this).closest(".project").find(".dim").toggleClass("on");
});

// sc-about
gsap.to(".sc-about p .char", {
  scrollTrigger: {
    trigger: ".sc-about p",
    start: "0% 0%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
  },
  opacity: 1,
  stagger: {
    from: "random",
    each: 0.1,
  },
});

// cursor
$(".cursor-toggle").hover(function () {
  $(".cursor-dot").toggleClass("on");
});

document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".cursor");
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let speed = 1; // 커서의 움직임 속도

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    $(".cursor-position").text(`[x:${mouseX}] [y:${mouseY}]`);
  });

  function animate() {
    // 마우스 위치에 따라 커서 위치를 천천히 변경
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    // 커스텀 커서의 위치를 업데이트
    cursor.style.transform = `
        translate(${cursorX - cursor.offsetWidth / 2}px, ${cursorY - cursor.offsetHeight / 2}px)
    `;

    requestAnimationFrame(animate);
  }

  animate();
});
