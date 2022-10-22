/**
 * Intersection Observer API: The Intersection Observer API provides a way to asynchronously observe
    changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
 * Historically, detecting visibility of an element, or the relative visibility of two elements in relation to each other,
     has been a difficult task for which solutions have been unreliable and prone to causing the browser and 
     the sites the user is accessing to become sluggish. As the web has matured, the need for this kind of
     information has grown. Intersection information is needed for many reasons, such as:

    Lazy-loading of images or other content as a page is scrolled.
    Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
    Reporting of visibility of advertisements in order to calculate ad revenues.
    Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

Implementing intersection detection in the past involved event handlers and loops calling methods like Element.getBoundingClientRect() 
to build up the needed information for every element affected. Since all this code runs on the main thread, even one of these can cause performance problems. When a site is loaded with these tests, things can get downright ugly.

Consider a web page that uses infinite scrolling. It uses a vendor-provided library to manage the advertisements placed periodically throughout the page, has animated graphics here and there, and uses a custom library that draws notification boxes and the like. Each of these has its own intersection detection routines, all running on the main thread. The author of the web site may not even realize this is happening, since they may know very little about the inner workings of the two libraries they are using. As the user scrolls the page, these intersection detection routines are firing constantly during the scroll handling code, resulting in an experience that leaves the user frustrated with the browser, the web site, and their computer.

The Intersection Observer API lets code register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount. This way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit.

One thing the Intersection Observer API can't tell you: the exact number of pixels that overlap or specifically which ones they are; however, it covers the much more common use case of "If they intersect by somewhere around N%, I need to do something."
 */

// EXAMPLE:
const section1 = document.querySelector("#section--1");

// Creating new Intersection observer
const observerOps = {
  root: null, //this is the element that the target is intersecting
  //   threshold: 0.1, //percentage of intersection in which the observer callback is called
  threshold: [0, 1, 0.2],
};

// the observercallback will be called each time that the target element is intersecting the root element at threshold
const observerCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};
const observer = new IntersectionObserver(observerCallback, observerOps);
observer.observe(section1);

// Implementation of sticky nav
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  // getting first elment from entries
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
