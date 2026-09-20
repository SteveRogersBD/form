const profileForm = document.getElementById("profileForm");
const clearButton = document.getElementById("clearButton");
const summary = document.getElementById("summary");
const formMessage = document.getElementById("formMessage");

const fields = {
  name: { input: document.getElementById("nameInput"), message: document.getElementById("nameMessage") },
  email: { input: document.getElementById("emailInput"), message: document.getElementById("emailMessage") },
  age: { input: document.getElementById("ageInput"), message: document.getElementById("ageMessage") },
  major: { input: document.getElementById("majorInput"), message: document.getElementById("majorMessage") },
  graduation: { input: document.getElementById("graduationInput"), message: document.getElementById("graduationMessage") },
  interest: { input: document.getElementById("interestInput"), message: document.getElementById("interestMessage") },
  experience: { input: document.getElementById("experienceInput"), message: document.getElementById("experienceMessage") },
  introduction: { input: document.getElementById("introductionInput"), message: document.getElementById("introductionMessage") }
};

function setFieldState(field, isValid, message) {
  field.input.classList.remove("error", "success");
  field.message.classList.remove("error-text", "success-text");
  field.input.classList.add(isValid ? "success" : "error");
  field.message.classList.add(isValid ? "success-text" : "error-text");
  field.message.textContent = message;
}

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = fields.name.input.value.trim();
  const email = fields.email.input.value.trim();
  const age = Number(fields.age.input.value);
  const major = fields.major.input.value;
  const graduation = Number(fields.graduation.input.value);
  const interest = fields.interest.input.value;
  const experience = Number(fields.experience.input.value);
  const introduction = fields.introduction.input.value.trim();
  let valid = true;

  if (name.length === 0) { setFieldState(fields.name, false, "Please enter your name."); valid = false; }
  else { setFieldState(fields.name, true, "Looks good."); }

  if (!email.includes("@") || !email.includes(".")) { setFieldState(fields.email, false, "Enter an email with @ and a domain."); valid = false; }
  else { setFieldState(fields.email, true, "Looks good."); }

  if (!Number.isFinite(age) || age < 18 || age >= 100) { setFieldState(fields.age, false, "Age must be between 18 and 99."); valid = false; }
  else { setFieldState(fields.age, true, "Looks good."); }

  if (major === "") { setFieldState(fields.major, false, "Choose your academic area."); valid = false; }
  else { setFieldState(fields.major, true, "Selected."); }

  if (!Number.isFinite(graduation) || graduation < 2026 || graduation > 2032) { setFieldState(fields.graduation, false, "Use a year from 2026 through 2032."); valid = false; }
  else { setFieldState(fields.graduation, true, "Looks good."); }

  if (interest === "") { setFieldState(fields.interest, false, "Choose an interest area."); valid = false; }
  else { setFieldState(fields.interest, true, "Selected."); }

  if (!Number.isFinite(experience) || experience < 0 || experience > 40) { setFieldState(fields.experience, false, "Use a number from 0 through 40."); valid = false; }
  else { setFieldState(fields.experience, true, "Looks good."); }

  if (introduction.length < 20) { setFieldState(fields.introduction, false, "Write at least 20 characters."); valid = false; }
  else { setFieldState(fields.introduction, true, "Looks good."); }

  if (valid) {
    formMessage.textContent = "";
    summary.classList.remove("hidden");
    summary.innerHTML = `
      <h2>Profile Preview</h2>
      <div class="summary-list">
        <div class="summary-row"><strong>Name</strong><span>${escapeHtml(name)}</span></div>
        <div class="summary-row"><strong>Email</strong><span>${escapeHtml(email)}</span></div>
        <div class="summary-row"><strong>Age</strong><span>${age}</span></div>
        <div class="summary-row"><strong>Major</strong><span>${escapeHtml(major)}</span></div>
        <div class="summary-row"><strong>Graduation Year</strong><span>${graduation}</span></div>
        <div class="summary-row"><strong>Interest</strong><span>${escapeHtml(interest)}</span></div>
        <div class="summary-row"><strong>Programming Experience</strong><span>${experience} year(s)</span></div>
        <div class="summary-row"><strong>Introduction</strong><span>${escapeHtml(introduction)}</span></div>
      </div>`;
  } else {
    summary.classList.add("hidden");
    formMessage.textContent = "Please correct the highlighted fields before previewing your profile.";
  }
});

clearButton.addEventListener("click", function () {
  profileForm.reset();
  Object.values(fields).forEach(function (field) {
    field.input.classList.remove("error", "success");
    field.message.className = "field-message";
    field.message.textContent = "";
  });
  formMessage.textContent = "";
  summary.classList.add("hidden");
  summary.innerHTML = "";
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
  });
}

// Optional demo data makes it easy to reproduce test cases while learning.
const demoCases = {
  invalid: { name: "", email: "alex.example.com", age: "16", major: "", graduation: "2035", interest: "", experience: "50", introduction: "Too short" },
  partial: { name: "Alex Morgan", email: "alex@example.com", age: "21", major: "Computer Science", graduation: "2028", interest: "", experience: "2", introduction: "I enjoy building useful web applications." },
  valid: { name: "Alex Morgan", email: "alex@example.com", age: "21", major: "Computer Science", graduation: "2028", interest: "Web Development", experience: "2", introduction: "I enjoy building useful web applications." }
};

const demoName = new URLSearchParams(window.location.search).get("demo");
if (demoCases[demoName]) {
  const demo = demoCases[demoName];
  fields.name.input.value = demo.name;
  fields.email.input.value = demo.email;
  fields.age.input.value = demo.age;
  fields.major.input.value = demo.major;
  fields.graduation.input.value = demo.graduation;
  fields.interest.input.value = demo.interest;
  fields.experience.input.value = demo.experience;
  fields.introduction.input.value = demo.introduction;
  profileForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
}
