import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://ixhceohsjzdhgokxnfoo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aGNlb2hzanpkaGdva3huZm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjQyMjcsImV4cCI6MjA2MTA0MDIyN30.Io6Wh8o_uzaToqJqcN2DGExdoV0bvUfiRZA8_Mnq_l4"
);

window.register = async function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = "";
  messageDiv.style.color = "red"; // default color for errors

  // Basic validation
  if (!name || !email || !password) {
    messageDiv.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin + "/verify.html" // optional redirect for email
      },
    });

    if (error) {
      messageDiv.textContent = error.message;
      return;
    }

    messageDiv.style.color = "green";
    messageDiv.textContent = "Registered successfully! Please check your email to verify.";

  } catch (err) {
    messageDiv.textContent = "Something went wrong.";
    console.error(err);
  }
};
