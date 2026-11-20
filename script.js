
const form = document.getElementById("ambassadorForm");
const successSection = document.getElementById("successSection");
const codeDisplay = document.getElementById("ambassadorCode");
const copyButton = document.getElementById("copyCodeBtn");
const screenshotButton = document.getElementById("screenshotBtn");

const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateRandomCode() {
  let code = "";

  // Generate 4 random characters
  for (let i = 0; i < 4; i++) {
    const randomIndex = crypto.getRandomValues(
      new Uint32Array(1)
    )[0] % characters.length;

    code += characters[randomIndex];
  }

  return "KH-AMB-" + code;
}

function getSavedCodes() {
  try {
    return JSON.parse(localStorage.getItem("KH_ambassador_codes")) || [];
  } catch {
    return [];
  }
}

function generateUniqueCode() {
  const savedCodes = getSavedCodes();
  let newCode;

  do {
    newCode = generateRandomCode();
  } while (savedCodes.includes(newCode));

  savedCodes.push(newCode);

  localStorage.setItem(
    "KH_ambassador_codes",
    JSON.stringify(savedCodes)
  );

  return newCode;
}

// Form submission
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Generate ambassador code
  const ambassadorCode = generateUniqueCode();

  // Display code
  codeDisplay.textContent = ambassadorCode;

  // Hide form and show success section
  form.classList.add("hidden");
  successSection.classList.remove("hidden");

  // Scroll to success section
  successSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Copy ambassador code
copyButton.addEventListener("click", async function() {
  const code = codeDisplay.textContent;

  try {
    await navigator.clipboard.writeText(code);
    copyButton.textContent = "Copied Successfully ✓";

    setTimeout(() => {
      copyButton.textContent = "Copy Code";
    }, 2000);
  } catch {
    alert("Please manually copy your code: " + code);
  }
});

// Screenshot instructions
screenshotButton.addEventListener("click", function() {
  alert(
    "Take a screenshot of your ambassador code now and send it to the program organizer along with your full name."
  );
});
