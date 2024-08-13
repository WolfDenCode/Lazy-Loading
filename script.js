const images = document.querySelectorAll(".loaded-image");

function fadeInImage(image) {
  const loadingOverlay = image.previousElementSibling;
  const loadingContainer = image.parentElement;
  image.addEventListener("load", function () {
    loadingOverlay.style.display = "none";
    loadingContainer.style.animation = "none";

    if (image.complete) {
      this.style.animation = "fadein 2s ease";
      this.style.opacity = 1;
    }
  });

  // Start loading the image when it enters the viewport
  image.src = image.dataset.src;
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fadeInImage(entry.target);
        observer.unobserve(entry.target); // Stop observing once the image has loaded
      }
    });
  },
  { threshold: 0.1 }
);

images.forEach((image) => {
  // Set the image src to data-src, so it only starts loading when needed
  image.dataset.src = image.src;
  image.src = ""; // Clear the src so it doesn't load immediately

  observer.observe(image);
});
