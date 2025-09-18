let myForm=document.getElementById("my-form");let myFormInputs=myForm.querySelectorAll("input, textarea");let myFormWarnings=myForm.querySelectorAll(".input-warning");let valid=!0;myForm.addEventListener("submit",(e)=>{e.preventDefault();myFormInputs.forEach(input=>{if(input.value===""){valid=!1
input.nextElementSibling.classList.add("show");input.scrollIntoView({behavior:"smooth"})}})
if(valid){location.href="./index.html"}});myFormInputs.forEach(input=>{if(input.type!=="radio"&&input.type!=="submit"){input.addEventListener("focus",(e)=>{valid=!0
e.target.nextElementSibling.classList.remove("show")})}})
myFormWarnings.forEach(warn=>{warn.addEventListener("click",(e)=>{valid=!0
e.target.classList.remove("show")})})