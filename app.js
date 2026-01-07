import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup successful");
        window.location.href = "/login.html";
      })
      .catch(error => alert(error.message));
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // 🔑 ADMIN AUTO-REDIRECT
    if (user.email === "admin@campus.edu") {
      window.location.href = "/admin.html";
    } else {
      // 👤 NORMAL STUDENT
      window.location.href = "/report.html";
    }
  })
  .catch(error => {
    alert(error.message);
  });


  });
}
