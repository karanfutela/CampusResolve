import { auth, db } from "./firebase.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const submitBtn = document.getElementById("submitIssue");

submitBtn.addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  if (category === "" || description === "") {
    alert("All fields are required");
    return;
  }

  try {
    await addDoc(collection(db, "issues"), {
      userId: user.uid,
      category: category,
      description: description,
      status: "Pending",
      timestamp: serverTimestamp()
    });

    alert("Issue submitted successfully");
    window.location.href = "/dashboard.html";

    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
  } catch (error) {
    alert(error.message);
  }
});

// Go to Dashboard button logic
const goDashboardBtn = document.getElementById("goDashboardBtn");

if (goDashboardBtn) {
  goDashboardBtn.addEventListener("click", () => {
    window.location.href = "/dashboard.html";
  });
}

