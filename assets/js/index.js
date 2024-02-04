const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// header
$(".menu-btn").hover(function () {
  $(".menu-btn span").toggleClass("on");
});

$(".menu-btn").click(function () {
  $(".menu-btn, .anchor-menu").toggleClass("open");
  gsap.from(".anchor-menu a", {
    yPercent: -100,
    stagger: 0.1,
  });
});

// anchor-menu
// 스크롤 퍼센트 계산하기
// lenis.on("scroll", (e) => {
//   // 전체 문서 길이에서 뷰포트 높이 빼기
//   const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//   const currentScroll = e.targetScroll; // 현재 스크롤 위치
//   const scrollPercentage = (currentScroll / totalScrollHeight) * 100;
// });

$(".anchor-menu a").click(function (e) {
  e.preventDefault();
  const target = $(this).attr("href");
  const element = $(target);

  if (target === "#home") {
    lenis.scrollTo(0);
  } else if (target === "#introduce") {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    // 퍼센테이지를 다시 픽셀 값으로 계산
    scrollPixel = (totalScrollHeight * 12.9) / 100;
    lenis.scrollTo(scrollPixel);
  } else {
    const targetOffset = element.offset().top;
    lenis.scrollTo(targetOffset);
  }
});

// scroll-indicator
$(".scroll-indicator a").click(function (e) {
  e.preventDefault();
  lenis.scrollTo(0);
});

$(".cursor-toggle").hover(function () {
  $(".cursor-dot").toggleClass("on");
});

// sc-main
gsap.from(".sc-main .line .char", {
  y: "21rem",
  stagger: 0.02,
  duration: 1,
});

// gsap.to(".sc-main .line.move", {
//   scrollTrigger: {
//     trigger: ".sc-introduce",
//     start: "0% 100%",
//     end: "100% 100%",
//     scrub: true,
//     // markers: true,
//   },
//   xPercent: 7,
// });

// sc-introduce
gsap.to(".sc-introduce", {
  scrollTrigger: {
    trigger: ".sticky-wrapper",
    start: "0% 0%",
    end: "50% 0%",
    scrub: true,
    invalidateOnRefresh: true,
    // markers: true,
    onEnter: function () {
      $(".sc-introduce, .sc-banner").addClass("light");
      $(".menu-btn, .scroll-indicator").addClass("toggle");
    },
    onLeaveBack: function () {
      $(".menu-btn, .scroll-indicator").removeClass("toggle");
    },
  },
  xPercent: -100,
});

gsap.to(".logo-area", {
  scrollTrigger: {
    trigger: ".sc-introduce",
    start: "70% 0%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
    onEnter: function () {
      $(".logo-area").addClass("toggle");
    },
    onLeaveBack: function () {
      $(".logo-area").removeClass("toggle");
    },
  },
});

gsap.to(".sc-introduce p .word", {
  scrollTrigger: {
    trigger: ".sc-introduce p",
    start: "120% 0%",
    end: "200% 0%",
    scrub: true,
    // markers: true,
  },
  stagger: 0.2,
  opacity: 1,
});

const toggleElements = ".menu-btn, .logo-area, .scroll-indicator";

// sc-banner
const bannerMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-banner",
    start: "0% 10%",
    end: "100% 0%",
    scrub: true,
    // markers: true,
    onEnter: function () {
      $(".sc-banner").removeClass("light");
      $(toggleElements).removeClass("toggle");
    },
    onLeaveBack: function () {
      $(".sc-banner").addClass("light");
      $(toggleElements).addClass("toggle");
    },
  },
});
bannerMotion
  .to(".sc-banner svg path", { opacity: 1 }, "a")
  .to(".sc-banner .title", { opacity: 1 }, "a");
for (let i = 1; i <= 8; i++) {
  bannerMotion.from(
    `.sc-banner .word${i}`,
    { transform: `translateX(${window.innerWidth * i}px) rotate(${25 * i}deg)` },
    "a+=0.1"
  );
}
bannerMotion
  .to(
    ".sc-banner svg",
    {
      rotate: -180,
      skewX: 0,
      skewY: 0,
      ease: "power2.in",
    },
    "a+=0.1"
  )
  .to(".sc-banner svg", { scale: 4 }, "b")
  .to(".sc-banner .title", { scale: 2 }, "b");
for (let i = 8; i > 0; i--) {
  bannerMotion.to(
    `.sc-banner .word${9 - i}`,
    {
      transform: `translateX(-${window.innerWidth * i}px) rotate(${25 * i}deg)`,
      ease: "power2.in",
    },
    "c"
  );
}

// sc-project
$(".see-project, .code-review").hover(function () {
  $(this).closest(".project").find(".img-wrapper").toggleClass("on");
  $(this).closest(".project").find(".video-wrapper").toggleClass("on");
});

// sc-skills
const cardMotion = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-skills",
    start: "0% 20%",
    end: "50% 0%",
    scrub: 3,
    // markers: true,
    onEnter: function () {
      $(".sc-skills").addClass("light");
      $(toggleElements).addClass("toggle");
    },
    onLeave: function () {
      $(".sc-skills").removeClass("light");
      $(toggleElements).removeClass("toggle");
    },
    onEnterBack: function () {
      $(".sc-skills").addClass("light");
      $(toggleElements).addClass("toggle");
    },
    onLeaveBack: function () {
      $(toggleElements).removeClass("toggle");
    },
  },
  ease: "linear",
});
const xValue1 = window.innerWidth * 1.038;
const xValue2 = window.innerWidth * 1.045;
const xValue3 = window.innerWidth * 1.041;
const xValue4 = window.innerWidth * 1.17;
cardMotion
  .fromTo(
    ".card1",
    { transform: `translateX(${xValue1}px) rotate(-16deg)` },
    { transform: `translateX(-${xValue1}px) rotate(16deg)` },
    "a"
  )
  .fromTo(
    ".card2",
    { transform: `translateX(${xValue2}px) rotate(19deg)` },
    { transform: `translateX(-${xValue2}px) rotate(-19deg)` },
    "a"
  )
  .fromTo(
    ".card3",
    { transform: `translateX(${xValue3}px) rotate(-11deg)` },
    { transform: `translateX(-${xValue3}px) rotate(11deg)` },
    "a"
  )
  .fromTo(
    ".card4",
    { transform: `translateX(${xValue4}px) rotate(19deg)` },
    { transform: `translateX(-${xValue4}px) rotate(-19deg)` },
    "a"
  );

// cursor
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
