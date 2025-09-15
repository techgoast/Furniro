let myForm = document.getElementById("my-form");
let myFormInputs = myForm.querySelectorAll("input, textarea");
let myFormWarnings = myForm.querySelectorAll(".input-warning");

let valid = true;

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  myFormInputs.forEach(input => {
    if (input.value === "") {
      valid = false
      input.nextElementSibling.classList.add("show");
      input.scrollIntoView({behavior: "smooth"})
    } 
  })
  if (valid) {
      location.href = "./index.html"
    }
});

myFormInputs.forEach(input => {
  if (input.type !== "radio" && input.type !== "submit") {
    input.addEventListener("focus", (e) => {
    valid = true
    e.target.nextElementSibling.classList.remove("show")
  })
  }
})

myFormWarnings.forEach(warn => {
    warn.addEventListener("click", (e) => {
    valid = true
    e.target.classList.remove("show")
  })
})

