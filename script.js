
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-links")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}


document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        navMenu.classList.remove("active")
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})


const animateCounter = (element, target) => {
  let count = 0
  const increment = target / 50
  const timer = setInterval(() => {
    count += increment
    if (count >= target) {
      count = target
      clearInterval(timer)
    }

    
    let displayValue = Math.floor(count)
    if (target >= 1000) {
      displayValue = (Math.floor(count) / 1000).toFixed(0) + "K"
      if (target === 200) displayValue = Math.floor(count) 
    } else if (target === 95) {
      displayValue = Math.floor(count) + "%"
    }

    element.textContent = displayValue
  }, 30)
}


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("stat-number")) {
        const target = Number.parseInt(entry.target.dataset.target)
        animateCounter(entry.target, target)
      }
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)


document.querySelectorAll(".stat-item, .stat-number, .feature-card, .course-card, .testimonial-card").forEach((el) => {
  observer.observe(el)
})


document.querySelectorAll(".btn-small").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault()
    showNotification("Successfully enrolled in course! 🎉")
  })
})


document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent.includes("Start") || button.textContent.includes("Start Learning")) {
      showNotification("Welcome to Thinkplus! Sign up to get started 🚀")
    }
  })
})


function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}


const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`
document.head.appendChild(style)


window.addEventListener("scroll", () => {
  const blobs = document.querySelectorAll(".gradient-blob")
  const scrollY = window.scrollY
  blobs.forEach((blob, index) => {
    blob.style.transform = `translateY(${scrollY * (0.3 + index * 0.1)}px)`
  })
})


window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "#6366f1"
    } else {
      link.style.color = ""
    }
  })
})


const handleResponsive = () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    if (hamburger) {
      hamburger.style.display = "none"
    }
  } else {
    if (hamburger) {
      hamburger.style.display = ""
    }
  }
}

window.addEventListener("resize", handleResponsive)


const modal = document.getElementById("enrollmentModal")
const closeBtn = document.querySelector(".close")
const enrollmentForm = document.getElementById("enrollmentForm")
const studentName = document.getElementById("studentName")
const studentEmail = document.getElementById("studentEmail")
const studentPhone = document.getElementById("studentPhone")
const courseSelect = document.getElementById("courseSelect")


const courseOptions = [
  "Web Development Mastery",
  "AI & Machine Learning",
  "Data Science Bootcamp",
  "Mobile App Development",
  "UI/UX Design Fundamentals",
  "Cloud Computing Essentials",
]


courseOptions.forEach((course) => {
  const option = document.createElement("option")
  option.value = course
  option.textContent = course
  courseSelect.appendChild(option)
})


document.querySelectorAll(".btn-course").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "block"
  })
})


document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (
      button.textContent.includes("Get Started") ||
      button.textContent.includes("Start Learning") ||
      button.textContent.includes("Start")
    ) {
      e.preventDefault()
      modal.style.display = "block"
    }
  })
})


closeBtn.addEventListener("click", () => {
  modal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
  }
})

enrollmentForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const enrollmentData = {
    id: Date.now(),
    name: studentName.value,
    email: studentEmail.value,
    phone: studentPhone.value,
    course: courseSelect.value,
    enrolledDate: new Date().toLocaleDateString("en-IN"),
  }

  
  const enrollments = JSON.parse(localStorage.getItem("thinkplusEnrollments")) || []

  
  enrollments.push(enrollmentData)

  
  localStorage.setItem("thinkplusEnrollments", JSON.stringify(enrollments))

  
  showNotification(`Successfully enrolled in ${enrollmentData.course}! 🎉`)

  
  enrollmentForm.reset()
  modal.style.display = "none"

  
  displayEnrolledCourses()
})

function displayEnrolledCourses() {
  const enrollments = JSON.parse(localStorage.getItem("thinkplusEnrollments")) || []

  if (enrollments.length === 0) return

  
  const existingSection = document.querySelector(".enrolled-section")
  if (existingSection) {
    existingSection.remove()
  }

  
  const enrolledSection = document.createElement("section")
  enrolledSection.className = "enrolled-section"
  enrolledSection.innerHTML = `
    <h3>📚 Your Enrolled Courses (${enrollments.length})</h3>
    <div class="enrolled-courses">
      ${enrollments
        .map(
          (enrollment) => `
        <div class="enrolled-item">
          <div>
            <strong>${enrollment.course}</strong>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Enrolled on ${enrollment.enrolledDate}</p>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${enrollment.name}</p>
          </div>
          <button class="remove-btn" onclick="removeEnrollment(${enrollment.id})">Remove</button>
        </div>
      `,
        )
        .join("")}
    </div>
  `

  
  const coursesSection = document.querySelector(".courses")
  coursesSection.parentNode.insertBefore(enrolledSection, coursesSection.nextSibling)
}

function removeEnrollment(id) {
  let enrollments = JSON.parse(localStorage.getItem("thinkplusEnrollments")) || []
  enrollments = enrollments.filter((e) => e.id !== id)
  localStorage.setItem("thinkplusEnrollments", JSON.stringify(enrollments))
  displayEnrolledCourses()
  showNotification("Course removed from your enrollments")
}


window.addEventListener("DOMContentLoaded", displayEnrolledCourses)

console.log("Thinkplus EdTech Platform loaded successfully! 🚀")


document.querySelectorAll(".course-card").forEach((card) => {
  card.addEventListener("click", () => {
    const courseId = card.dataset.course;
    
    localStorage.setItem("selectedCourse", courseId);
    
    window.location.href = "course.html";
  });
});
