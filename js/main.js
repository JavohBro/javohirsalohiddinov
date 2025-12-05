gsap.registerPlugin(ScrollTrigger);

gsap.to(".a", {
  scrollTrigger: {
    trigger: ".a",
    start: "top top",
    scrub: true,
    pin: true,
    markers: false
  },
  x: 525,
  y: 200,
  ease: "none",
  width: 550,
  height: 325,
  backgroundColor: '737373'
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
    end: () => "+=" + Math.max(390, Math.round(totalLength * 0.6)),
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