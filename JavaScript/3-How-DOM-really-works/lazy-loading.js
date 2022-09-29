/**
 * Lazy loading (also called on-demand loading) is an optimization technique for the online content, be it a website or a web app.
 * Instead of loading the entire web page and rendering it to the user in one go as in bulk loading, the concept of lazy loading
    assists in loading only the required section and delays the remaining, until it is needed by the user.
 * Lazy loading can occur on different moments in the application, but it typically happens on some user interactions 
    such as scrolling and navigation.

 * One form of lazy loading is infinity scroll, in which, the content of the web page is loaded as and when the user 
    scrolls down the page. It is a popular technique being used by various websites.

Advantages of Lazy loading:

    * On-demand loading reduces time consumption and memory usage thereby optimizing content delivery. 
    * As only a fraction of the web page, which is required, is loaded first thus, the time taken is less 
        and the loading of rest of the section is delayed which saves storage. All of this enhances the user’s 
        experience as the requested content is fed in no time.
    * Unnecessary code execution is avoided.
    * Optimal usage of time and space resources makes it a cost-effective approach from the point of view of business persons. 

Disadvantages of Lazy loading:

    * Firstly, the extra lines of code, to be added to the existing ones, to implement lazy load makes the code a bit complicated.
    * Secondly, lazy loading may affect the website’s ranking on search engines sometimes, 
        due to improper indexing of the unloaded content.
 */

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));
