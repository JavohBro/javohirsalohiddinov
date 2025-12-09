gsap.registerPlugin(ScrollTrigger);

gsap.to(".a", {
  scrollTrigger: {
    trigger: ".a",
    start: "top top",
    scrub: true,
    pin: true,
    markers: false
  },
  x: "70vh",
  y: "220vh",
  ease: "none",
  // width: "80vh",
  width: "38%",
  height: "45vh",
  backgroundColor: '#737373'
});

gsap.to(".b", {
  // scrollTrigger: {
  //   trigger: ".b",
  //   start: "center 50%",
  //   end: "449vh top",
  //   scrub: true,
  //   pin: true,
  //   markers: true
  // },
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
  scrollTrigger: {
    trigger: ".nav",
    start: "top 2%",
    scrub: true,
    markers: false,
  },
  color: "#bcbcbcff",
  ease: "none",
  fontSize: "5vh",
});

gsap.to(".navs", {
  scrollTrigger: {
    trigger: ".nav",
    start: "top 2%",
    scrub: true,
    markers: false,
  },
  color: "#e1e1deff",
  ease: "none",
  fontSize: "4.5vh",
});

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
  borderColor: "#ffffffff",
  ease: "none",
});


gsap.registerPlugin(SplitText);

const splittop = new SplitText(".hoverTextTop", {
  type: "chars"
});

const splitbottom = new SplitText(".hoverTextBottom", {
  type: "chars"
});

gsap.set(splittop.chars, { display: "inline-block" });
gsap.set(splitbottom.chars, { display: "inline-block" });

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
