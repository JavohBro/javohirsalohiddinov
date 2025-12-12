/**
 * Main JavaScript file for Lando Norris tribute website
 * Uses GSAP for animations and scroll effects
 */

// ==========================================
// GSAP Plugin Registration
// ==========================================
gsap.registerPlugin(
    ScrollTrigger,
    MotionPathPlugin,
    DrawSVGPlugin,
    ScrollSmoother,
    SplitText
);

// ==========================================
// Scroll Smoother Setup
// ==========================================
const smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1
});

// ==========================================
// Hero Section Animations
// ==========================================

// Hero section scroll animation
gsap.to(".hero", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true,
        pin: true,
        markers: false
    },
    x: "70vh",
    y: "220vh",
    ease: "none",
    width: "38%",
    height: "45vh",
    backgroundColor: '#737373'
});

// Scrolling text section pin
gsap.to(".scrolling-text", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: true,
        pin: ".scrolling-text",
        markers: false
    },
    ease: "none",
});

// ==========================================
// SVG Signature Animation
// ==========================================

/**
 * Splits SVG paths into individual segments
 * @param {string|Element|Array} paths - Path(s) to split
 * @returns {Array} Array of new path elements
 */
function splitPaths(paths) {
    const toSplit = gsap.utils.toArray(paths);
    const newPaths = [];
    
    if (toSplit.length > 1) {
        toSplit.forEach(path => newPaths.push(...splitPaths(path)));
    } else {
        const path = toSplit[0];
        const rawPath = MotionPathPlugin.getRawPath(path);
        const parent = path.parentNode;
        const attributes = [].slice.call(path.attributes);
        
        const createdPaths = rawPath.map(segment => {
            const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            let i = attributes.length;
            
            while (i--) {
                newPath.setAttributeNS(null, attributes[i].nodeName, attributes[i].nodeValue);
            }
            
            newPath.setAttributeNS(
                null,
                "d",
                "M" + segment[0] + "," + segment[1] + "C" + segment.slice(2).join(",") + (segment.closed ? "z" : "")
            );
            
            parent.insertBefore(newPath, path);
            return newPath;
        });
        
        parent.removeChild(path);
        return createdPaths;
    }
    
    return newPaths;
}

// Initialize signature drawing animation
const paths = splitPaths("#house");
let totalLength = 0;

paths.forEach(p => totalLength += p.getTotalLength());

const baseDuration = 20;
const signatureTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".sign",
        start: "center center",
        endTrigger: ".hero",
        scrub: true,
        pin: true,
        markers: false
    }
});

paths.forEach(segment => {
    const segLen = segment.getTotalLength();
    const segDur = baseDuration * (segLen / totalLength);
    
    signatureTimeline.from(segment, {
        drawSVG: "0%",
        ease: "power2.Out",
        duration: segDur
    });
});

// ==========================================
// Scrolling Text Animations
// ==========================================

// Right scrolling text
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

// Left scrolling text
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

// ==========================================
// Navigation Animations
// ==========================================

// Navigation title color change
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

// Navigation buttons resize
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

// Navigation menu style change
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

// ==========================================
// Store Button Hover Animation
// ==========================================

const splittop = new SplitText(".hoverTextTop", { type: "chars" });
const splitbottom = new SplitText(".hoverTextBottom", { type: "chars" });

gsap.set(splittop.chars, { display: "inline-block" });
gsap.set(splitbottom.chars, { display: "inline-block" });

const navButton = document.querySelector(".navbutton");

// Hover in animation
navButton.addEventListener("mouseenter", () => {
    gsap.to(splittop.chars, {
        y: "-85%",
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.03,
    });
    
    gsap.to(splitbottom.chars, {
        y: "-100%",
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.03,
    });
});

// Hover out animation
navButton.addEventListener("mouseleave", () => {
    gsap.to(splittop.chars, {
        y: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.03,
    });
    
    gsap.to(splitbottom.chars, {
        y: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.03,
    });
});

// ==========================================
// Menu Button SVG Animation
// ==========================================

// Initialize SVG paths
TweenLite.to("#path", 0, { drawSVG: "0% 12%" });
TweenLite.to("#pathTwo", 0, { drawSVG: "0% 12%" });

let isMenuOpen = false;
const svgButton = document.querySelector(".navmenu");

// Hover animations
svgButton.addEventListener("mouseenter", () => {
    if (isMenuOpen) {
        // Menu state hover
        TweenLite.to("#path", 0.8, { drawSVG: "55% 70%", ease: "power1.inOut" });
        TweenLite.to("#pathTwo", 0.8, { drawSVG: "48% 63%", ease: "power1.inOut" });
    } else {
        // Home state hover
        TweenLite.to("#path", 0.4, { drawSVG: "2% 15%", ease: "power1.inOut" });
        TweenLite.to("#pathTwo", 0.4, { drawSVG: "2% 16%", ease: "power1.inOut" });
    }
});

svgButton.addEventListener("mouseleave", () => {
    if (isMenuOpen) {
        // Menu state leave
        TweenLite.fromTo("#path", 0.8,
            { drawSVG: "53% 70%" },
            { drawSVG: "0% 12%", ease: "power1.inOut" }
        );
        TweenLite.fromTo("#pathTwo", 0.8,
            { drawSVG: "48% 65%" },
            { drawSVG: "0% 12%", ease: "power1.inOut" }
        );
    } else {
        // Home state leave
        TweenLite.to("#path", 0.4, { drawSVG: "0% 12%", ease: "power1.inOut" });
        TweenLite.to("#pathTwo", 0.4, { drawSVG: "0% 12%", ease: "power1.inOut" });
    }
});

// Click to toggle menu state
svgButton.addEventListener("click", () => {
    if (isMenuOpen) {
        // Menu to Home transition
        TweenLite.to("#path", 1.5, { drawSVG: "2% 15%", ease: "power1.inOut" });
        TweenLite.to("#pathTwo", 1.5, { drawSVG: "2% 16%", ease: "power1.inOut" });
    } else {
        // Home to Menu transition
        TweenLite.to("#path", 1.8, { drawSVG: "153% 170%", ease: "power1.inOut" });
        TweenLite.to("#pathTwo", 1.8, { drawSVG: "148% 165%", ease: "power1.inOut" });
    }
    
    isMenuOpen = !isMenuOpen;
});

