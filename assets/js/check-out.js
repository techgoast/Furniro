let myForm = document.getElementById("my-form");
let myFormInputs = myForm.querySelectorAll("input, textarea");
let formRes = document.getElementById("form-res");
let formSuccess = document.getElementById("form-success");
let formFailed = document.getElementById("form-failed");

let succeeded = true;

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(myForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const value of Object.values(formObj)) {
    if (value === "") {
      succeeded = false;
    }
  }
  if (!succeeded) {
    formFailed.classList.remove("hide");
  } else {
    formSuccess.innerHTML += `
      <p>Hello ${formObj.fname} ${formObj.lname}</p>
      <p>Your data has been successfully submitted</p>
      <p>We will send your order at ${formObj.address}</p>
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
    if (
      input.id !== "submit-btn" &&
      input.name !== "transfer-method" &&
      succeeded
    ) {
      input.value = "";
    }
  });
  succeeded = true;
});
