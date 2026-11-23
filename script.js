
document.addEventListener("DOMContentLoaded", () => {

  // NAVIGATION
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  // MENU DETAILS
  const detailButtons = document.querySelectorAll(".details-btn");

  detailButtons.forEach(button => {
    button.addEventListener("click", () => {

      const description = button.nextElementSibling;
      description.hidden = !description.hidden;

      if (description.hidden) {
        button.textContent = "View Details";
      } else {
        button.textContent = "Hide Details";
      }

    });
  });

});
