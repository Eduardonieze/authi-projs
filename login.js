import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://ixhceohsjzdhgokxnfoo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aGNlb2hzanpkaGdva3huZm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQyMjcsImV4cCI6MjA2MTA0MDIyN30.Io6Wh8o_uzaToqJqcN2DGExdoV0bvUfiRZA8_Mnq_l4"
);

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      message.textContent = error.message;
      return;
    }

    if (!data.user.email_confirmed_at) {
      message.textContent = "Please confirm your email before logging in.";
      return;
    }

    // Successful login
    window.location.href = "dashboard.html";

  } catch (err) {
    message.textContent = "Unexpected error.";
    console.error(err);
  }
});
