document.addEventListener("DOMContentLoaded", () => {
  // --- تهيئة المتغيرات العامة ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const loadingScreen = document.getElementById("loadingScreen");
  const backToTopButton = document.getElementById("back-to-top");

  // --- التمرير السلس للروابط ---
  const handleNavLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
      // إغلاق القائمة في الموبايل عند النقر
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        menuToggle.querySelector("i").classList.add("fa-bars");
        menuToggle.querySelector("i").classList.remove("fa-times");
      }
    }
  };

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  // --- القائمة المتجاوبة ---
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.querySelector("i").classList.toggle("fa-bars");
    menuToggle.querySelector("i").classList.toggle("fa-times");
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.add("fa-bars");
      menuToggle.querySelector("i").classList.remove("fa-times");
    }
  });

  // --- شاشة التحميل ---
  window.addEventListener("load", () => {
    loadingScreen.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
    loadingScreen.style.opacity = "0";
    loadingScreen.style.visibility = "hidden";
  });

  // --- زر العودة للأعلى ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- تأثيرات الظهور عند التمرير ---
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // --- تأثيرات المهارات ---
  document.querySelectorAll(".skills-grid div").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const icon = item.querySelector("i");
      icon.style.transition = "transform 0.3s ease";
      icon.style.transform = "scale(1.2) rotate(360deg)";
    });

    item.addEventListener("mouseleave", () => {
      const icon = item.querySelector("i");
      icon.style.transition = "transform 0.3s ease";
      icon.style.transform = "scale(1) rotate(0)";
    });
  });

  // --- نموذج التواصل ---
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector("button");
    submitButton.disabled = true;
    submitButton.classList.add("loading");
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>تم إرسال رسالتك بنجاح!</p>
      `;

      document.body.appendChild(successMessage);
      contactForm.reset();

      // سيتم إزالة الرسالة تلقائياً من خلال الـ CSS animation
      setTimeout(() => {
        successMessage.remove();
      }, 3000); // إزالة الرسالة بعد 3 ثواني
    } catch (error) {
      console.error("Error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
      submitButton.innerHTML = "إرسال";
    }
  });
});
document.querySelector(".btn[download]").addEventListener("click", function () {
  alert("سيبدأ تحميل السيرة الذاتية الآن...");
});
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});