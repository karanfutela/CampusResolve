import { auth, db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const ADMIN_EMAIL = "admin@campus.edu";

const issuesDiv = document.getElementById("allIssues");
const logoutBtn = document.getElementById("logoutBtn");
const statusFilter = document.getElementById("statusFilter");

let allIssues = []; // 🔑 store issues locally

auth.onAuthStateChanged(user => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "/login.html";
    return;
  }

  onSnapshot(collection(db, "issues"), snapshot => {
    allIssues = [];

    snapshot.forEach(docSnap => {
      allIssues.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    renderIssues();
  });
});

function renderIssues() {
  issuesDiv.innerHTML = "";

  const selectedStatus = statusFilter.value;

  const filteredIssues = selectedStatus === "All"
    ? allIssues
    : allIssues.filter(issue => issue.status === selectedStatus);

  if (filteredIssues.length === 0) {
    issuesDiv.innerHTML = "<p>No issues found.</p>";
    return;
  }

  filteredIssues.forEach(issue => {
    const div = document.createElement("div");
    div.classList.add("issue-card");

    div.innerHTML = `
      <strong>Category:</strong> ${issue.category}<br>
      <strong>Description:</strong> ${issue.description}<br>
      <strong>Status:</strong>
      <select data-id="${issue.id}">
        <option ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
      </select>
    `;

    issuesDiv.appendChild(div);
  });

  // attach change listeners
  document.querySelectorAll("select[data-id]").forEach(select => {
    select.addEventListener("change", async e => {
      const issueId = e.target.getAttribute("data-id");
      const newStatus = e.target.value;

      await updateDoc(doc(db, "issues", issueId), {
        status: newStatus
      });
    });
  });
}

// 🔄 Re-filter when dropdown changes
statusFilter.addEventListener("change", renderIssues);

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "/login.html";
  });
});
