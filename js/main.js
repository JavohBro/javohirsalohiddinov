gsap.registerPlugin(ScrollTrigger, PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

document.body.style.overflow = "hidden";

window.addEventListener("load", () => {
  const tl = gsap.timeline({
    onComplete() {
      document.body.style.overflow = "";
      document.querySelector("#loader").remove();
    }
  });
  tl.to("#loader", { opacity: 0, duration: 0.6 })
  .from(".hero", { y: 80, opacity: 0, duration: 0.8 }, "-=0.3");
});

gsap.to(".a", {
    scrollTrigger: {
    trigger: ".a",
    start: "top top",
    scrub: true,
    pin: true,
    markers: false,
  },
  x: "65vh",
  y: "220vh",
  ease: "none",
  // width: "80vh",
  width: "38%",
  height: "45vh",
});

gsap.to(".theme", {
    scrollTrigger: {
    trigger: ".theme",
    start: "top top",
    scrub: true,
    markers: false,
  },
  ease: "none",
  opacity: 1,
});

gsap.to(".b", {
  scrollTrigger: {
    trigger: ".a",
    start: "top top",
    scrub: true,
    pin: ".b",
    markers: false
  },
  ease: "none",
});

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.1
});

function splitPaths(paths) {
  let toSplit = gsap.utils.toArray(paths),
      newPaths = [];
  if (toSplit.length > 1) {
    toSplit.forEach(path => newPaths.push(...splitPaths(path)));
  } else {
    let path = toSplit[0],
        rawPath = MotionPathPlugin.getRawPath(path),
        parent = path.parentNode,
        attributes = [].slice.call(path.attributes);
    newPaths = rawPath.map(segment => {
      let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          i = attributes.length;
      while (i--) {
        newPath.setAttributeNS(null, attributes[i].nodeName, attributes[i].nodeValue);
      }
      newPath.setAttributeNS(null, "d", "M" + segment[0] + "," + segment[1] + "C" + segment.slice(2).join(",") + (segment.closed ? "z" : ""));
      parent.insertBefore(newPath, path);
      return newPath;
    });
    parent.removeChild(path);
  }
  return newPaths;
}

const paths = splitPaths("#house");

let totalLength = 0;
paths.forEach(p => totalLength += p.getTotalLength());

const baseDuration = 20;
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sign",
    start: "center center",
    endTrigger: ".a",
    // end: () => "+=" + Math.max(395, Math.round(totalLength * 0.6)),
    scrub: true,
    pin: true,
    markers: false
  }
});

paths.forEach(segment => {
  const segLen = segment.getTotalLength();
  const segDur = baseDuration * (segLen / totalLength);

  tl.from(segment, {
    drawSVG: "0%",
    ease: "power2.Out",
    duration: segDur
  });
});



gsap.registerPlugin(ScrollTrigger);

gsap.to(".text-loop-right", {
  scrollTrigger: {
    trigger: ".text-loop-right",
    toggleActions: "restart none none none",
  },
  x: "93.5%",
  ease: "none",
  duration: 500,
  repeat: -1,
});

gsap.to(".text-loop-left", {
  scrollTrigger: {
    trigger: ".text-loop-left",
    toggleActions: "restart none none none",
  },
  x: "-1600%",
  ease: "none",
  duration: 500,
  repeat: -1,
});

gsap.to(".navj", {
  color: "#2D3025",
});

gsap.to(".navs", {
  color: "#2D3025",
});

gsap.fromTo("#navj", {
    color: "#2D3025",
  },
  {
    scrollTrigger: {
      trigger: ".nav",
      start: "top 2%",
      scrub: true,
    },
    color: "#bcbcbcff",
    ease: "none",
    fontSize: "5vh",
  }
);

gsap.fromTo("#navs", {
    color: "#2D3025",
  },
  {
    scrollTrigger: {
      trigger: ".nav",
      start: "top 2%",
      scrub: true,
    },
    color: "#e1e1deff",
    ease: "none",
    fontSize: "4.5vh",
  }
);

gsap.to(".buttons", {
  scrollTrigger: {
    trigger: ".nav",
    start: "top 2%",
    scrub: true,
    markers: false,
  },
  width: "13%",
  ease: "none",
});

gsap.to(".navbutton", {
  scrollTrigger: {
    trigger: ".nav",
    start: "top 2%",
    scrub: true,
    markers: false,
  },
  fontSize: "2.5vh",
  ease: "none",
});

gsap.to(".navmenu", {
  scrollTrigger: {
    trigger: ".nav",
    start: "top 2%",
    scrub: true,
    markers: false,
  },
  height: "8.6vh",
  borderColor: "#D1FE07",
  backgroundColor: "#F3F3EB",
  ease: "none",
});


gsap.registerPlugin(SplitText);

const splittop = new SplitText(".hoverTextTop", {
  type: "chars"
});

const splitbottom = new SplitText(".hoverTextBottom", {
  type: "chars"
});

const jbtext = new SplitText(".jb-text", {
  type: "chars"
});

gsap.set(splittop.chars, { display: "inline-block" });
gsap.set(splitbottom.chars, { display: "inline-block" });
gsap.set(jbtext.chars, { display: "inline-block" });

// Hover in
document.querySelector(".navbutton").addEventListener("mouseenter", () => {
  gsap.to(splittop.chars, {
    y: "-85%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

document.querySelector(".navbutton").addEventListener("mouseenter", () => {
  gsap.to(splitbottom.chars, {
    y: "-100%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

// Hover out
document.querySelector(".navbutton").addEventListener("mouseleave", () => {
  gsap.to(splittop.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

document.querySelector(".navbutton").addEventListener("mouseleave", () => {
  gsap.to(splitbottom.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

gsap.to(jbtext.chars, {
    scrollTrigger: {
    trigger: ".c",
    start: "top top",
    endTrigger: ".a",
    scrub: true,
    pin: ".c",
    markers: false
  },
  y: "-85%",
  ease: "none",
  stagger: 0.03,
});

gsap.to(".jb-logo", {
    scrollTrigger: {
    trigger: ".c",
    start: "top top",
    scrub: true,
    markers: false
  },
  y: "-20%",
  opacity: 0.9,
  ease: "power1.in",
});


TweenLite.to("#path", 0, {drawSVG: "0% 12%"}); // NONE
TweenLite.to("#pathTwo", 0, {drawSVG: "0% 12%"}); // NONE

let isMenu = false; // false = HOME, true = MENU
let svgButton = document.querySelector(".navmenu");

// SETUP EVENT LISTENERS ONCE
svgButton.addEventListener("mouseenter", () => {
  if (isMenu) {
    // MENU hover
    TweenLite.to("#path", 0.8, { drawSVG: "53% 70%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 0.8, { drawSVG: "48% 65%", ease: "power1.inOut" });
  } else {
    // HOME hover
    TweenLite.to("#path", 0.4, { drawSVG: "2% 15%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 0.4, { drawSVG: "2% 16%", ease: "power1.inOut" });
  }
});

svgButton.addEventListener("mouseleave", () => {
  if (isMenu) {
    // MENU leave
    TweenLite.fromTo("#path", 0.8, {drawSVG: "53% 70%"}, {drawSVG: "0% 12%", ease: "power1.inOut"});
    TweenLite.fromTo("#pathTwo", 0.8, {drawSVG: "48% 65%"}, {drawSVG: "0% 12%", ease: "power1.inOut"});
  } else {
    // HOME leave
    TweenLite.to("#path", 0.4, { drawSVG: "0% 12%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 0.4, { drawSVG: "0% 12%", ease: "power1.inOut" });
  }
});

// CLICK TO TOGGLE STATE
svgButton.addEventListener("click", () => {
  if (isMenu) {
    // MENU → HOME
    TweenLite.to("#path", 1.5, { drawSVG: "2% 15%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 1.5, { drawSVG: "2% 16%", ease: "power1.inOut" });
    gsap.to(".overlay", {
      duration: 0.6,
      height: "0%",
      ease: "power1.inOut",
      borderBottomLeftRadius: "200%",
      borderBottomRightRadius: "200%",
    })
    gsap.to(".navj", {
      color: "#2D3025",
      ease: "power1.inOut",
      duration: 0.6,
    });
    gsap.to(".navs", {
      color: "#2D3025",
      ease: "power1.inOut",
      duration: 0.6,
    });
    gsap.to(".navmenu", {
      borderColor: "#242424",
      backgroundColor: "#9a9a9a00",
      ease: "power1.inOut",
      duration: 0.6,
    });
    document.body.style.overflow = "";
  } else {
    // HOME → MENU
    TweenLite.to("#path", 1.8, { drawSVG: "153% 170%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 1.8, { drawSVG: "148% 165%", ease: "power1.inOut" });
    gsap.to(".overlay", {
      duration: 0.6,
      height: "100%",
      ease: "power1.inOut",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%",
    })
    gsap.to(".navj", {
      color: "#bcbcbcff",
      ease: "power1.inOut",
      duration: 0.6,
    });
    gsap.to(".navs", {
      color: "#e1e1deff",
      ease: "power1.inOut",
      duration: 0.6,
    });
    gsap.to(".navmenu", {
      borderColor: "#D1FE07",
      backgroundColor: "#F3F3EB",
      ease: "power1.inOut",
      duration: 0.6,
    });
    document.body.style.overflow = "hidden";
  }

  isMenu = !isMenu; // toggle
});

gsap.to(".minihelmet", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 550",
    markers: false,
  },
  duration: 0.4,
  opacity: 1,
  ease: "none",
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 550",
    markers: false,
    onEnter: () => {
      document.querySelector(".minihelmet-text-cover").classList.add("cover-animation");
    }
  },
});

gsap.to(".minihelmet-text", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 550",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 450",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverTwo").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextTwo", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 450",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 420",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverThree").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextThree", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 420",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 390",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverFour").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextFour", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 390",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 350",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverFive").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextFive", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 350",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 250",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverSix").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextSix", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 250",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 150",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverSeven").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextSeven", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 150",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 50",
    markers: false,
    onEnter: () => {
      document.querySelector("#textCoverEight").classList.add("cover-animation");
    }
  },
});

gsap.to("#sectionTwoTextEight", {
  scrollTrigger: {
    trigger: ".section-two",
    start: "top 50",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});
/////////////////////// section-2 end
const reveal = document.querySelector(".reveal");

window.addEventListener("mousemove", e => {
  gsap.to(reveal, {
    duration: 1,
    WebkitMaskImage: `radial-gradient(
      circle 450px at ${e.clientX}px ${e.clientY}px,
      black 80%,
      transparent 101%
    )`,
    ease: "power2.out"
  });
});

window.addEventListener("mousemove", e => {
  const r = 100;

  gsap.to(reveal, {
    duration: 1,
    WebkitMaskImage: `radial-gradient(
      circle ${r}px at ${e.clientX}px ${e.clientY}px,
      black 60%,
      transparent 101%
    )`
  });
});


////////////// section-3 start

gsap.to(".section-three", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top bottom",
    end: "3000 top",
    scrub: true,
    markers: false,
  },
  ease: "none",
  x: "-81%",
});

gsap.to(".section-three", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 40",
    end: "3000 top",
    scrub: true,
    pin: true,
    markers: false,
  },
  ease: "none",
});

gsap.to("body", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 40",
    end: "3000 top",
    scrub: true,
    markers: false,
  },
  backgroundColor: "#e1e1deff",
  ease: "none",
});

gsap.fromTo(
  "#navj",
  { color: "#bcbcbcff" },
  {
    scrollTrigger: {
      trigger: ".section-three",
      start: "top 40",
      end: "3000 top",
      scrub: true,
    },
    color: "#2D3025",
    ease: "none"
  }
);
gsap.fromTo(
  "#navs",
  { color: "#e1e1deff" },
  {
    scrollTrigger: {
      trigger: ".section-three",
      start: "top 40",
      end: "3000 top",
      scrub: true,
    },
    color: "#2D3025",
    ease: "none"
  }
);

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 80%",
    markers: true,
    onEnter: () => {
      document.querySelector(".section-three-cover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".box1-text", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 80%",
    markers: false,
  },
  delay: 0.6,
  duration: 0,
  ease: "none",
  opacity: 1,
});