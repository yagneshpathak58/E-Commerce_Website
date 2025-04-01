let refreshInterval;
let lastActivityTime = Date.now();

const API_URL = "http://localhost:5000/api/auth/refresh-token"; // Adjust as needed

// ✅ Function to Refresh Token
async function refreshToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, user is not authenticated.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token refresh failed:", data.message);
      logoutUser();
    } else {
      localStorage.setItem("token", data.newToken);
      console.log("Token successfully refreshed.");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
  }
}

// ✅ Function to Logout User
function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "/auth/login";
}

// ✅ Function to Start Token Refreshing
function startTokenRefresh() {
  // Check for user activity
  document.addEventListener("mousemove", resetActivityTimer);
  document.addEventListener("keydown", resetActivityTimer);

  refreshInterval = setInterval(() => {
    const now = Date.now();
    if (now - lastActivityTime > 5 * 60 * 1000) {
      console.log("User inactive for 5 minutes. Logging out...");
      logoutUser();
    } else {
      refreshToken();
    }
  }, 5 * 60 * 1000);
}

// ✅ Function to Reset Activity Timer
function resetActivityTimer() {
  lastActivityTime = Date.now();
}

export { startTokenRefresh };
