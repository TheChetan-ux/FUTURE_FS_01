const projects = [
  {
    title: "Sikar Rentals",
    description:
      "A rental platform designed for real-world usage, focusing on listing and managing rental properties.",
    stack: ["Node.js", "MongoDB", "JavaScript", "Full Stack"],
    github: "https://github.com/TheChetan-ux"
  },
  {
    title: "Nauroveda Raj",
    description:
      "An Ayurvedic product platform where products are verified by certified doctors before being listed.",
    stack: ["Full Stack", "E-commerce Logic", "MongoDB"],
    github: "https://github.com/TheChetan-ux"
  },
  {
    title: "VIT Coin (Blockchain Project)",
    description:
      "Created a blockchain-based token integrated with MetaMask, supporting network switching and INR to token conversion logic.",
    stack: ["Blockchain", "Web3", "JavaScript", "MetaMask"],
    github: "https://github.com/TheChetan-ux"
  },
  {
    title: "Mini CRM System",
    description:
      "Client Lead Management System to manage and track leads with status updates.",
    stack: ["JavaScript", "Local Storage", "Backend Ready"],
    github: "https://github.com/TheChetan-ux"
  },
  {
    title: "Women-Centric Website",
    description:
      "A platform designed specifically for women's needs, focusing on usability and accessibility.",
    stack: ["Frontend", "Accessibility", "Responsive Design"],
    github: "https://github.com/TheChetan-ux"
  }
];

// Use same-origin in production/Vercel, but keep localhost fallback for local frontend previews.
const isLocalPreview =
  ["localhost", "127.0.0.1"].includes(window.location.hostname) &&
  !window.location.origin.includes(":5000");

const API_BASE_URL = isLocalPreview ? "http://localhost:5000" : "";

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const projectsGrid = document.getElementById("projectsGrid");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.querySelector(".submit-btn");

function renderProjects() {
  if (!projectsGrid) {
    return;
  }

  const projectCards = projects.map((project) => {
    const techTags = project.stack
      .map((item) => `<span>${item}</span>`)
      .join("");

    return `
      <article class="project-card">
        <p class="card-label">Featured Project</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-meta">${techTags}</div>
        <div class="project-actions">
          <a class="project-link" href="${project.github}" target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
      </article>
    `;
  });

  projectsGrid.innerHTML = projectCards.join("");
}

function toggleNavigation() {
  if (!navToggle || !navLinks) {
    return;
  }

  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNavigation() {
  if (!navLinks || !navToggle) {
    return;
  }

  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(message, type) {
  if (!formMessage) {
    return;
  }

  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function setLoadingState(isLoading) {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isLoading;
  submitButton.classList.toggle("is-loading", isLoading);
}

async function handleContactSubmit(event) {
  event.preventDefault();

  if (!contactForm) {
    return;
  }

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    message: formData.get("message")?.trim()
  };

  if (!payload.name || !payload.email || !payload.message) {
    showFormMessage("Please fill in all fields before submitting.", "error");
    return;
  }

  if (!isValidEmail(payload.email)) {
    showFormMessage("Please enter a valid email address.", "error");
    return;
  }

  showFormMessage("", "");
  setLoadingState(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong while sending the message.");
    }

    contactForm.reset();
    showFormMessage("Your message has been sent successfully.", "success");
  } catch (error) {
    showFormMessage(error.message || "Unable to send message right now.", "error");
  } finally {
    setLoadingState(false);
  }
}

renderProjects();

if (navToggle) {
  navToggle.addEventListener("click", toggleNavigation);
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}
