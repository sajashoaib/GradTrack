const tabLinks = document.querySelectorAll(".nav-link[data-tab]");
const contentArea = document.getElementById("tab-content-area");

function loadTabContent(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(html => {
      contentArea.innerHTML = html;
    })
    .catch(error => {
      contentArea.innerHTML = "<p>Error loading content.</p>";
      console.error("Error loading tab:", error);
    });
}

tabLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Active tab styling
    tabLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Load content
    const tabUrl = link.getAttribute("data-tab");
    loadTabContent(tabUrl);
  });
});

// تحميل أول تاب تلقائياً عند الفتح
window.addEventListener("DOMContentLoaded", () => {
  const firstTabUrl = document.querySelector(".nav-link.active").getAttribute("data-tab");
  loadTabContent(firstTabUrl);
});


