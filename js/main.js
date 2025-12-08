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
  y: "195vh",
  ease: "none",
  width: "80vh",
  height: "45vh",
  backgroundColor: '#737373'
});

gsap.to(".b", {
  scrollTrigger: {
    trigger: ".b",
    start: "center 50%",
    end: "449vh top",
    scrub: true,
    pin: true,
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
    start: "500 center",
    end: () => "+=" + Math.max(395, Math.round(totalLength * 0.6)),
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

gsap.to(".navlink", {
  scrollTrigger: {
    trigger: ".c",
    start: "top 2%",
    scrub: true,
    markers: true
  },
  ease: "none",
  fontSize: "2.5vh",
  // color: "rgb(255, 255, 255)",~
});
