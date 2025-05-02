document.addEventListener("DOMContentLoaded", function () {
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileInput");
  const uploadedFileName = document.getElementById("uploadedFileName");
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebarDropdown = document.querySelectorAll(".sidebar-dropdown > a"); 
  const links = document.querySelectorAll(".sidebar-link");
  const defaultPage = "studentdashboard";

  //  رفع ملفات في صفحة داشبورد الطالب
  if (uploadBtn) {
    uploadBtn.addEventListener("click", function () {
      fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        uploadedFileName.textContent = "📄 " + file.name;
      }
    });
  }

  // *****************************************************************************

  // دالة تحديث السايدبار حسب حجم الشاشة
  function updateSidebarBehavior() {
    if (!sidebar) return;
    if (window.innerWidth <= 767) {
      sidebar.classList.add("collapsed"); //  دايمًا مصغرة
    } else {
      sidebar.classList.remove("collapsed"); // مفتوحة على الشاشات الكبيرة
    }
  }

  // منع تفعيل الزر بالشاشات الصغيرة
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (window.innerWidth > 767) {
        sidebar.classList.toggle("collapsed");
      }
    });
  }

  // أول تحميل وأي تغيير بالحجم
  updateSidebarBehavior();
  window.addEventListener("resize", updateSidebarBehavior);

  sidebarDropdown.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const submenu = parent.querySelector(".sidebar-submenu");
      const arrow = this.querySelector(".arrow-icon");

      if (parent.classList.contains("active")) {
        submenu.style.height = submenu.scrollHeight + "px";
        setTimeout(() => {
          submenu.style.height = "0";
        }, 0);
        parent.classList.remove("active");
        arrow.classList.remove("rotate");
      } else {
        submenu.style.height = submenu.scrollHeight + "px";
        parent.classList.add("active");

        submenu.addEventListener("transitionend", function handler() {
          submenu.style.height = "auto";
          submenu.removeEventListener("transitionend", handler);
        });
        arrow.classList.add("rotate");
      }
    });
  });

  // *************************************************

  // رفع الملفات في صفحة الاد فاينل بروجكت
  initFinalProjectUpload();

  function initFinalProjectUpload() {
    const fileDropArea = document.getElementById("file-drop-area");
    const uploadfile = document.getElementById("final-project-file");
    const fileNamesContainer = document.getElementById("file-names");

    if (!fileDropArea || !uploadfile || !fileNamesContainer) return;

    function displayFileNames(files) {
      let names = "";
      for (let i = 0; i < files.length; i++) {
        names += `<p class="mb-1 text-dark">${files[i].name}</p>`;
      }
      fileNamesContainer.innerHTML = names;
    }

    fileDropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      fileDropArea.style.backgroundColor = "#e6f3ff";
    });

    fileDropArea.addEventListener("dragleave", () => {
      fileDropArea.style.backgroundColor = "";
    });

    fileDropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      fileDropArea.style.backgroundColor = "";
      const files = e.dataTransfer.files;
      uploadfile.files = files;
      displayFileNames(files);
    });

    uploadfile.addEventListener("change", () => {
      displayFileNames(uploadfile.files);
    });
  }

  // *****************************************************************************

//  لوجيك عرض الصفحات في داشبورد الطالب

  // تحميل الصفحة الافتراضية عند فتح الصفحة لأول مرة
  loadPage(defaultPage);

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // لمنع الرابط من إعادة تحميل الصفحة
      const page = link.getAttribute("data-page"); // الحصول على اسم الصفحة

      // استدعاء المحتوى المناسب لكل صفحة
      if (page) {
        loadPage(page);
      }
    });
  });

  // دالة تحميل المحتوى
  function loadPage(page) {
    const content = document.querySelector(".main-sections");

    // تحميل الصفحة حسب الاسم
    fetch(page + ".html") // تأكد من أن هذه الصفحات موجودة في نفس المجلد
      .then((response) => response.text())
      .then((data) => {
        content.innerHTML = data; // وضع المحتوى داخل الـ content
      })
      .catch((error) => {
        content.innerHTML = "<p>Error loading page</p>";
      });
  }
});
