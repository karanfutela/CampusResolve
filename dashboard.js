import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const issuesList = document.getElementById("issuesList");
const logoutBtn = document.getElementById("logoutBtn");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  const q = query(
    collection(db, "issues"),
    where("userId", "==", user.uid)
  );

  onSnapshot(q, snapshot => {
    issuesList.innerHTML = "";

    if (snapshot.empty) {
      issuesList.innerHTML = "<p>No issues submitted yet.</p>";
      return;
    }

    snapshot.forEach(doc => {
  const issue = doc.data();

  const div = document.createElement("div");
  div.classList.add("issue-card");

  div.innerHTML = `
    <div class="issue-header">
      <span class="icon">🛠️</span>
      <h4>${issue.category}</h4>
      <span class="status ${issue.status.toLowerCase().replace(" ", "-")}">
        ${issue.status}
      </span>
    </div>

    <p>${issue.description}</p>
  `;

  issuesList.appendChild(div);
});

  });
});

/* ✅ LOGOUT HANDLER */
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "/login.html";
  });
});
