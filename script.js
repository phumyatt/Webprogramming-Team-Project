document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });
});

// Additional JavaScript features will be added here.
// Menu description toggle
// Search or cart
// Contact form validation
// Dynamic footer date and time
