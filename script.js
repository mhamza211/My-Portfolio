// ==================== Smooth Scroll for Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 56,
      behavior: 'smooth'
    });
    document.querySelectorAll('.navlinks a').forEach(x => x.classList.remove('active'));
    link.classList.add('active');
  });
});

// ==================== Navbar Blur Effect ====================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.backdropFilter = window.scrollY > 40 ? 'saturate(120%) blur(5px)' : 'none';
});

// ==================== Skill Bar Animation ====================
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#summary");
  const skillBars = document.querySelectorAll(".fill");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar, i) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => (bar.style.width = width), i * 200);
        });
        obs.unobserve(skillsSection);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(skillsSection);
});
// download resume


// ==================== EmailJS Contact Form ====================
window.onload = function() {
  // Initialize EmailJS
  emailjs.init("y-jqd9TnoLYFCAOh0"); // Your Public Key

  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const statusP = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    sendBtn.disabled = true;
    const originalText = sendBtn.textContent;
    sendBtn.textContent = "Sending...";
    statusP.style.display = "none";

    const SERVICE_ID = "service_rp870f8";      // Your EmailJS Service ID
    const TEMPLATE_ID = "template_9d8nvoj";    // Your EmailJS Template ID

    const templateParams = {
      from_name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`,
      from_email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        statusP.style.display = "block";
        statusP.style.color = "#00ff66";
        statusP.textContent = "✅ Message sent successfully!";
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        statusP.style.display = "block";
        statusP.style.color = "#ff6666";
        statusP.textContent = "❌ Failed to send message. Check your Service ID, Template ID, or Public Key!";
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
      });
  });
};
