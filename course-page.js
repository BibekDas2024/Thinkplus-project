
(function () {
  
  const params = new URLSearchParams(window.location.search);
  const selectedCourse = params.get("course") || localStorage.getItem("selectedCourse");

  
  const data = window.coursesData || (typeof coursesData !== "undefined" ? coursesData : null);

  if (!data) {
    console.error("coursesData not found. Add course-data.js before course-page.js.");
    document.body.innerHTML = "<main style='max-width:800px;margin:80px auto;padding:16px'><h2>Error</h2><p>Course data not found. Make sure <code>course-data.js</code> is included.</p></main>";
    return;
  }

  if (!selectedCourse || !data[selectedCourse]) {
    console.warn("Course not found:", selectedCourse);
    document.querySelector("main").innerHTML = `
      <div style="max-width:800px;margin:40px auto;padding:16px;text-align:center">
        <h2>Course not found</h2>
        <p>We couldn't find the course you requested.</p>
        <a href="index.html" class="btn">Back to Courses</a>
      </div>
    `;
    return;
  }

  const course = data[selectedCourse];

  
  const titleEl = document.getElementById("course-title");
  const descEl = document.getElementById("course-desc");
  const metaEl = document.getElementById("course-meta");
  const thumbEl = document.getElementById("course-thumb");
  const sidebarThumb = document.getElementById("sidebar-thumb");
  const priceEl = document.getElementById("course-price");
  const enrollBtn = document.getElementById("enroll-cta");
  const instructorNameEl = document.getElementById("instructor-name");
  const instructorBioEl = document.getElementById("instructor-bio");
  
  const instructorImgEl = document.getElementById("instructor-img");
  const avatarEl = document.querySelector(".avatar"); 
  const learnList = document.getElementById("learn-list");
  const curriculumList = document.getElementById("curriculum-list");
  const reviewsList = document.getElementById("reviews-list");
  const levelEl = document.getElementById("course-level");
  const langEl = document.getElementById("course-language");
  const subEl = document.getElementById("course-subtitles");

  
  titleEl.textContent = course.title || "Course Title";
  descEl.textContent = course.desc || "No description available.";
  metaEl.textContent = course.meta || "";
  priceEl.textContent = course.price || "Free";

  
  if (course.image) {
    
    thumbEl.innerHTML = `<img src="${course.image}" alt="${course.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
    sidebarThumb.innerHTML = `<img src="${course.image}" alt="${course.title}" style="width:100%;border-radius:8px">`;
  } else {
    thumbEl.textContent = course.emoji || "📚";
    sidebarThumb.innerHTML = `<div style="width:100%;height:140px;background:#f5f5f5;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:48px">${course.emoji || "📚"}</div>`;
  }

  
  try {
    if (course.instructor) {
      const name = (course.instructor.name || "Instructor").trim();
      const bio = course.instructor.bio || "";
      const image = course.instructor.image || null;

      
      if (instructorNameEl) instructorNameEl.textContent = name;
      if (instructorBioEl) instructorBioEl.textContent = bio;

      const initial = name ? name.charAt(0).toUpperCase() : "I";

      if (instructorImgEl) {
        
        if (image) {
          instructorImgEl.src = image;
        } else {
          
          const svg = `<svg xmlns='http:
            <rect width='100%' height='100%' rx='50' ry='50' fill='#6366f1'/>
            <text x='50%' y='58%' font-size='48' text-anchor='middle' fill='white' font-family='Segoe UI, sans-serif'>${initial}</text>
          </svg>`;
          instructorImgEl.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
        }
        
        instructorImgEl.style.width = instructorImgEl.style.width || "48px";
        instructorImgEl.style.height = instructorImgEl.style.height || "48px";
        instructorImgEl.style.borderRadius = instructorImgEl.style.borderRadius || "50%";
        instructorImgEl.style.objectFit = instructorImgEl.style.objectFit || "cover";
      } else if (avatarEl) {
        
        avatarEl.textContent = initial;
        avatarEl.style.display = "flex";
        avatarEl.style.alignItems = "center";
        avatarEl.style.justifyContent = "center";
        avatarEl.style.width = avatarEl.style.width || "50px";
        avatarEl.style.height = avatarEl.style.height || "50px";
        avatarEl.style.borderRadius = "50%";
        avatarEl.style.fontWeight = "600";
        avatarEl.style.color = "#fff";
        avatarEl.style.background = avatarEl.style.background || "linear-gradient(135deg,#6366f1,#3b82f6)";
        avatarEl.style.flexShrink = "0";
      } else {
        console.warn("No avatar or instructor <img> found in DOM; instructor name set only.");
      }
    } else {
      if (instructorNameEl) instructorNameEl.textContent = "Instructor";
      if (instructorBioEl) instructorBioEl.textContent = "";
      if (instructorImgEl) {
        const svg = `<svg xmlns='http:
          <rect width='100%' height='100%' rx='50' ry='50' fill='#94a3b8'/>
          <text x='50%' y='58%' font-size='48' text-anchor='middle' fill='white' font-family='Segoe UI, sans-serif'>I</text>
        </svg>`;
        instructorImgEl.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
      } else if (avatarEl) {
        avatarEl.textContent = "I";
      }
    }
  } catch (err) {
    console.error("Instructor rendering error:", err);
  }

  
  learnList.innerHTML = "";
  const learn = course.whatYouWillLearn || (course.learn && course.learn.slice(0,5)) || [
    "Understand core concepts",
    "Build real-world projects",
    "Prepare for exams",
  ];
  learn.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    learnList.appendChild(li);
  });

  
  curriculumList.innerHTML = "";
  const curriculum = course.curriculum || [
    { title: "Introduction", lessons: ["Welcome", "Course Overview"] },
    { title: "Module 1", lessons: ["Lesson 1", "Lesson 2"] },
  ];
  curriculum.forEach((section, sIdx) => {
    const sec = document.createElement("div");
    sec.className = "curriculum-section";
    sec.innerHTML = `<strong>${section.title}</strong>`;
    
    section.lessons.forEach((lesson, lIdx) => {
      const item = document.createElement("div");
      item.className = "curriculum-item";
      item.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
          <div>${lIdx + 1}. ${lesson}</div>
          <div style="font-size:13px;color:#777">10m</div>
        </div>`;
      sec.appendChild(item);
    });
    curriculumList.appendChild(sec);
  });

  
  reviewsList.innerHTML = "";
  const reviews = course.reviews || [
    { name: "Amit", rating: 5, text: "Excellent course!" },
    { name: "Riya", rating: 4, text: "Very helpful, well structured." }
  ];
  reviews.forEach(r => {
    const rEl = document.createElement("div");
    rEl.style.padding = "10px 0";
    rEl.style.borderBottom = "1px solid #f0f0f0";
    rEl.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <div style="font-weight:600">${r.name}</div>
        <div style="color:#ff9900">${'★'.repeat(r.rating)}</div>
      </div>
      <div style="color:#444">${r.text}</div>`;
    reviewsList.appendChild(rEl);
  });

  
  levelEl.textContent = course.level || "All Levels";
  langEl.textContent = course.language || "English";
  subEl.textContent = course.subtitles || "English";

  
  enrollBtn.addEventListener("click", () => {
    
    alert(`Enroll clicked for ${course.title}\nPrice: ${course.price}`);
  });

})();
