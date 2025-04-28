import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://ixhceohsjzdhgokxnfoo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aGNlb2hzanpkaGdva3huZm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQyMjcsImV4cCI6MjA2MTA0MDIyN30.Io6Wh8o_uzaToqJqcN2DGExdoV0bvUfiRZA8_Mnq_l4"
);

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const googleLoginBtn = document.getElementById("googleLogin");

// Regular email/password login
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";
  message.className = "alert";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    if (!data.user.email_confirmed_at) {
      showMessage("Please confirm your email before logging in.", "error");
      return;
    }

    showMessage("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    showMessage("Unexpected error.", "error");
    console.error(err);
  }
});

// Google OAuth Login
googleLoginBtn.addEventListener("click", async () => {
  try {
    // Clear any existing messages
    message.textContent = "";
    message.className = "alert";
    
    // Start the Google OAuth flow
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + "/dashboard.html",
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      showMessage(error.message, "error");
      throw error;
    }

    // The OAuth flow will automatically redirect to Google's authentication page
    // No need for additional code here as Supabase handles the redirect

  } catch (err) {
    showMessage("Error initiating Google login", "error");
    console.error("Google OAuth error:", err);
  }
});

function showMessage(msg, type) {
  message.textContent = msg;
  message.className = "alert " + type;
}