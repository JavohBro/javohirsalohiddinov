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

gsap.to("#navj", {
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

gsap.to("#navs", {
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
  height: "9.6vh",
  borderColor: "#242424",
  backgroundColor: "#9a9a9a00",
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
      delay: 0.2,
      height: "0%",
      ease: "power3.out",
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
    gsap.to(".menuText", {
      delay: 0,
      opacity: 0,
      duration: 0.2,
      marginTop: "2vh",
      display: "none",
      ease: "power1.out",
    });
    document.body.style.overflow = "";
  } else {
    // HOME → MENU
    TweenLite.to("#path", 1.8, { drawSVG: "153% 170%", ease: "power1.inOut" });
    TweenLite.to("#pathTwo", 1.8, { drawSVG: "148% 165%", ease: "power1.inOut" });
    gsap.to(".overlay", {
      duration: 0.6,
      height: "100%",
      width: "100%",
      ease: "power3.out",
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
    gsap.to(".menuText", {
      delay: 0.2,
      opacity: 1,
      duration: 0.6,
      marginTop: "10vh",
      display: "block",
      ease: "power1.out",
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
  backgroundColor: "#F4F4ED",
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

gsap.fromTo(".navmenu", {
    borderColor: "#D1FE07",
    backgroundColor: "#F3F3EB",
  },
  {
    scrollTrigger: {
    trigger: ".section-three",
    start: "top 40",
    end: "3000 top",
    scrub: true,
  },
  borderColor: "#242424",
  backgroundColor: "#9a9a9a00",
  ease: "none",
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 80%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-1", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 80%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top center",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover2").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-2", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top center",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 75%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover3").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-3", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 75%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover4").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-4", {
  scrollTrigger: {
    trigger: ".section-three",
    start: "top 70%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box5-cover",
    start: "550 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover5").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-5", {
  scrollTrigger: {
    trigger: ".box5-cover",
    start: "550 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});


gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".section-three-cover6 ",
    start: "200 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover6").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-6", {
  scrollTrigger: {
    trigger: ".section-three-cover6 ",
    start: "200 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box7-cover",
    start: "600 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover7").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-7", {
  scrollTrigger: {
    trigger: ".box7-cover",
    start: "600 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box8",
    start: "1300 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover8").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-8", {
  scrollTrigger: {
    trigger: ".box8",
    start: "1300 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box9",
    start: "2000 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover9").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-9", {
  scrollTrigger: {
    trigger: ".box9",
    start: "2000 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box10",
    start: "1200 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover10").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-10", {
  scrollTrigger: {
    trigger: ".box10",
    start: "1200 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box11",
    start: "2600 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover11").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-11", {
  scrollTrigger: {
    trigger: ".box11",
    start: "2600 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});


gsap.to(".minihelmet-text-cover", {
  scrollTrigger: {
    trigger: ".box12",
    start: "2200 top",
    markers: false,
    onEnter: () => {
      document.querySelector(".section-three-cover12").classList.add("cover-animation");
    }
  },
});

gsap.to(".text-visible-12", {
  scrollTrigger: {
    trigger: ".box12",
    start: "2200 top",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

/////////////////////// section-3 END
//////////////////// section-4 START

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 15%",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
    markers: false,
  },
  ease: "none",
});

gsap.to(".img-box-left", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
  marginLeft: "-8%",
  ease: "power2.out",
});

gsap.to(".text-box-left", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
  marginLeft: "5%",
  ease: "power2.out",
});

gsap.to(".text-box-right", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
  marginLeft: "3%",
  ease: "power2.out",
});

gsap.to(".img-box-right", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    markers: false,
  },
  marginLeft: "5%",
  ease: "power2.out",
});

gsap.to(".on-img", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
  },
  delay: 1.2,
  duration: 0.6,
  ease: "bounce.in",
  opacity: 1,
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector("#oncover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector("#oncover2").classList.add("cover-animation");
    }
  },
});

gsap.to("#onvisible1", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
    onEnter: () => {
      document.querySelector("#oncover3").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
    onEnter: () => {
      document.querySelector("#oncover4").classList.add("cover-animation");
    }
  },
});

gsap.to("#onvisible2", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector("#offcover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector("#offcover2").classList.add("cover-animation");
    }
  },
});

gsap.to("#offvisible1", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 70%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
    onEnter: () => {
      document.querySelector("#offcover3").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-four", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
    onEnter: () => {
      document.querySelector("#offcover4").classList.add("cover-animation");
    }
  },
});

gsap.to("#offvisible2", {
  scrollTrigger: {
    trigger: ".section-four",
    start: "top 50%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

//////////////////// section-4 END
//////////////////// section-5 START

gsap.fromTo("#navj",
  { color: "#2D3025" },
  {
    scrollTrigger: {
      trigger: ".section-five",
      start: "top 2%",
      end: "50 top",
      scrub: true,
    },
    color: "#bcbcbcff",
    ease: "none"
  }
);

gsap.fromTo("#navs",
  { color: "#2D3025" },
  {
    scrollTrigger: {
      trigger: ".section-five",
      start: "top 2%",
      end: "50 top",
      scrub: true,
    },
    color: "#e1e1deff",
    ease: "none"
  }
);

gsap.fromTo(".navmenu", {
    borderColor: "#242424",
    backgroundColor: "#9a9a9a00",
  },
  {
    scrollTrigger: {
      trigger: ".section-five",
      start: "top 2%",
      end: "50 top",
      scrub: true,
    },
    borderColor: "#D1FE07",
    backgroundColor: "#F3F3EB",
    ease: "none",
  }
);

///////////////////// section-5 END
//////////////////// section-6 START

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover2").classList.add("cover-animation-two");
    }
  },
});

gsap.to("#s6t1", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover3").classList.add("cover-animation");
    }
  },
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover4").classList.add("cover-animation-two");
    }
  },
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover5").classList.add("cover-animation-three");
    }
  },
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
    onEnter: () => {
      document.querySelector(".section6-cover6").classList.add("cover-animation-two");
    }
  },
});
gsap.to("#s6t2", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "top 70%",
    markers: false,
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".odd-column", {
  scrollTrigger: {
    trigger: ".section6-box2",
    start: "top bottom",
    end: "bottom center",
    scrub: true,
  },
  marginTop: "0vh",
  ease: "none",
})

//button animation
const seetop = new SplitText(".seeTop", {
  type: "chars"
});

const seebottom = new SplitText(".seeBottom", {
  type: "chars"
});

gsap.set(seetop.chars, { display: "inline-block" });
gsap.set(seebottom.chars, { display: "inline-block" });

document.querySelector(".seeMore").addEventListener("mouseenter", () => {
  gsap.to(seetop.chars, {
    y: "-85%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

document.querySelector(".seeMore").addEventListener("mouseenter", () => {
  gsap.to(seebottom.chars, {
    y: "-100%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

document.querySelector(".seeMore").addEventListener("mouseleave", () => {
  gsap.to(seetop.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

document.querySelector(".seeMore").addEventListener("mouseleave", () => {
  gsap.to(seebottom.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

////button animation END

gsap.to(".section6-box3", {
  scrollTrigger: {
    trigger: ".section6-box3",
    start: "top 70%",
    onEnter: () => {
      document.querySelector("#section6-cover8").classList.add("cover-animation");
    }
  },
});

gsap.to(".section6-box3", {
  scrollTrigger: {
    trigger: ".section6-box3",
    start: "top 70%",
    onEnter: () => {
      document.querySelector("#section6-cover7").classList.add("cover-animation-two");
    }
  },
});

gsap.to("#s6b3", {
  scrollTrigger: {
    trigger: ".section6-box3",
    start: "top 70%",
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});

gsap.to(".s6b3-helmet", {
  scrollTrigger: {
    trigger: ".section6-box3",
    start: "top 90%",
    end: "top 50%",
    scrub: true,
  },
  // duration: 0.6,
  ease: "none",
  opacity: 1,
});

gsap.to(".section-six", {
  scrollTrigger: {
    trigger: ".section-six",
    start: "bottom 90%",
    end: "bottom 20%",
    scrub: true,
  },
  ease: "none",
  height: "340vh",
});

//////////////////// section-6 END
//////////////////// section-7 START

gsap.fromTo("#navj",
  { color: "#bcbcbcff" },
  {
    scrollTrigger: {
      trigger: ".section-seven",
      start: "top 25%",
      end: "50 20%",
      scrub: true,
    },
    color: "#2D3025",
    ease: "none"
  }
);

gsap.fromTo("#navs",
  { color: "#e1e1deff" },
  {
    scrollTrigger: {
      trigger: ".section-seven",
      start: "top 25%",
      end: "50 20%",
      scrub: true,
    },
    color: "#2D3025",
    ease: "none"
  }
);

gsap.fromTo(".navmenu", {
    borderColor: "#D1FE07",
    backgroundColor: "#F3F3EB",
  },
  {
    scrollTrigger: {
      trigger: ".section-seven",
      start: "top 25%",
      end: "50 20%",
      scrub: true,
    },
    borderColor: "#242424",
    backgroundColor: "#9a9a9a00",
    ease: "none",
  }
);

gsap.to(".mvImg", {
  scrollTrigger: {
    trigger: ".mvImg",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
  ease: "none",
  marginTop: "-95vh",
});


gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top 70%",
    onEnter: () => {
      document.querySelector("#section7-cover1").classList.add("cover-animation");
    }
  },
});

gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top 70%",
    onEnter: () => {
      document.querySelector("#section7-cover2").classList.add("cover-animation-two");
    }
  },
});

gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top 70%",
    onEnter: () => {
      document.querySelector("#section7-cover3").classList.add("cover-animation-three");
    }
  },
});

gsap.to("#s7t1", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top 70%",
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});



gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top center",
    onEnter: () => {
      document.querySelector("#section7-cover4").classList.add("cover-animation");
    }
  },
});

gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top center",
    onEnter: () => {
      document.querySelector("#section7-cover5").classList.add("cover-animation-two");
    }
  },
});

gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top center",
    onEnter: () => {
      document.querySelector("#section7-cover6").classList.add("cover-animation-three");
    }
  },
});

gsap.to(".section7-textbox", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top center",
    onEnter: () => {
      document.querySelector("#section7-cover7").classList.add("cover-animation");
    }
  },
});

gsap.to("#s7t2", {
  scrollTrigger: {
    trigger: ".section7-textbox",
    start: "top center",
  },
  delay: 0.7,
  duration: 0,
  ease: "none",
  opacity: 1,
});


gsap.to(".smoothoperator", {
  scrollTrigger: {
    trigger: ".smoothoperator",
    start: "top bottom",
    end: "+=600vh top",
    scrub: true,
  },
  ease: "none",
  marginLeft: "-800vh",
});


// ////////////////

const c1 = document.querySelector(".c1");
const c2 = document.querySelector(".c2");
const c3 = document.querySelector(".c3");
const c4 = document.querySelector(".c4");
const c5 = document.querySelector(".c5");
const c6 = document.querySelector(".c6");
const c7 = document.querySelector(".c7");

c1.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    marginTop: "20vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-4%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-6%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-10%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c1.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 1

c2.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-10%",
    marginTop: "12vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "0%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-6%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-11%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-11%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-10%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c2.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    marginTop: "16vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 2

c3.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    marginTop: "6vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "0%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-11%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-12%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c3.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    marginTop: "10vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 3

c4.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-12%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-11%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-1%",
    marginTop: "1vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-1%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-11%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-12%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c4.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    marginTop: "6vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 4

c5.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-12%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "0%",
    marginTop: "6vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-7%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-11%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c5.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    marginTop: "10vh",
    duration: 1,
    ease: "elastic.out"
  });gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 5

c6.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-7%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-0%",
    marginTop: "12vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-11%",
    marginTop: "23vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c6.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-8%",
    marginTop: "16vh",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 6

c7.addEventListener("mouseenter", () => {
  gsap.to(c1, {
    rotate: "-22deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-10%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-6%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-3%",
    marginTop: "20vh",
    duration: 1,
    ease: "elastic.out"
  });

});

c7.addEventListener("mouseleave", () => {
  gsap.to(c1, {
    rotate: "-20deg",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c2, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c3, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c4, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c5, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c6, {
    marginLeft: "-8%",
    duration: 1,
    ease: "elastic.out"
  });
  gsap.to(c7, {
    marginLeft: "-8%",
    marginTop: "25vh",
    duration: 1,
    ease: "elastic.out"
  });
});

////card 7


/////////////////////////Section-7 END
/////////////////////////Section-8 START

gsap.fromTo("#navj",
  { color: "#2D3025" },
  {
    scrollTrigger: {
      trigger: ".footer-svg",
      start: "top 10%",
      end: "top 5%",
      scrub: true,
    },
    color: "#bcbcbcff",
    ease: "none"
  }
);

gsap.fromTo("#navs",
  { color: "#2D3025" },
  {
    scrollTrigger: {
      trigger: ".footer-svg",
      start: "top 10%",
      end: "top 5%",
      scrub: true,
    },
    color: "#e1e1deff",
    ease: "none"
  }
);

gsap.fromTo(".navmenu", {
    borderColor: "#242424",
    backgroundColor: "#9a9a9a00",
  },
  {
    scrollTrigger: {
      trigger: ".footer-svg",
      start: "top 10%",
      end: "top 5%",
      scrub: true,
    },
    borderColor: "#D1FE07",
    backgroundColor: "#F3F3EB",
    ease: "none",
  }
);

//button animation
const ftbtntop = new SplitText(".ftbtnTop", {
  type: "chars"
});

const ftbtnbottom = new SplitText(".ftbtnBottom", {
  type: "chars"
});

gsap.set(seetop.chars, { display: "inline-block" });
gsap.set(seebottom.chars, { display: "inline-block" });

document.querySelector(".footer-btn").addEventListener("mouseenter", () => {
  gsap.to(ftbtntop.chars, {
    y: "-85%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

document.querySelector(".footer-btn").addEventListener("mouseenter", () => {
  gsap.to(ftbtnbottom.chars, {
    y: "-100%",
    duration: 0.3,
    ease: "power2.out",
    stagger: 0.03,
  });
});

document.querySelector(".footer-btn").addEventListener("mouseleave", () => {
  gsap.to(ftbtntop.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

document.querySelector(".footer-btn").addEventListener("mouseleave", () => {
  gsap.to(ftbtnbottom.chars, {
    y: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03,
  });
});

////button animation END