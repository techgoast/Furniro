let myForm = document.getElementById("my-form");
let myFormInputs = myForm.querySelectorAll("input, textarea");
let formRes = document.getElementById("form-res");
let formSuccess = document.getElementById("form-success");
let formFailed = document.getElementById("form-failed");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(myForm);
  let formObj = Object.fromEntries(formData.entries());
  if (
    formObj.uname === "" ||
    formObj.mailaddress === "" ||
    formObj.subj === "" ||
    formObj.msg === ""
  ) {
    formFailed.classList.remove("hide");
  } else {
    formSuccess.innerHTML += `
      <p>Hello ${formObj.uname}</p>
      <p>Your data has been successfully submitted</p>
      <p>We will send you an email at ${formObj.mailaddress}</p>
  `;
    formSuccess.classList.remove("hide");
  }
  formRes.classList.remove("hide");
});

formRes.addEventListener("click", (e) => {
  formSuccess.innerHTML = "";
  formFailed.classList.add("hide");
  formSuccess.classList.add("hide");
  e.target.classList.add("hide");
  myFormInputs.forEach((input) => {
    if (input.id !== "submit-btn") {
      input.value = "";
    }
  });
});
