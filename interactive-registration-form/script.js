/*****************************************************************************
 * Constants                                                                 *
 *****************************************************************************/

const successAlert = document.getElementById("success-alert")
const successAlertNewUsernameSpan = document.getElementById("new-username")
const form = document.getElementById("form")
const usernameInput = document.getElementById("username-input")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const passwordConfirmInput = document.getElementById("password-confirm-input")
const usernameError = document.getElementById("username-error")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")
const passwordConfirmError = document.getElementById("password-confirm-error")

/*****************************************************************************
 * Main Behavior                                                             *
 *****************************************************************************/

document.addEventListener("DOMContentLoaded", main)

function main() {
  setUsernameFromLocalStorage()

  usernameInput.addEventListener("blur", handleUsernameInput)
  emailInput.addEventListener("blur", handleEmailInput)

  const passwordFieldsEvents = ["input", "focus", "blur", "change"]
  passwordFieldsEvents.forEach((eventType) => {
    passwordInput.addEventListener(eventType, handlePasswordInput)
    passwordConfirmInput.addEventListener(eventType, handlePasswordConfirmInput)
  })

  form.addEventListener("submit", (event) => handleForm(event), false)
}

/*****************************************************************************
 * Local Storage Utilities                                                   *
 *****************************************************************************/

function setUsernameFromLocalStorage() {
  const username = localStorage.getItem("username")
  if (username !== null && username !== "") usernameInput.value = username
  else {
    saveUsernameToLocalStorage("")
  }
}

function saveUsernameToLocalStorage(username) {
  try {
    localStorage.setItem("username", username)
  } catch (error) {
    console.error("Couldn't save to local storage:", error)
  }
}

/*****************************************************************************
 * Event Handlers                                                            *
 *****************************************************************************/

function handleForm(event) {
  event.preventDefault()

  if (!form.checkValidity()) {
    form.reportValidity()

    return
  }

  const formData = new FormData(form)
  const username = formData.get("username")
  saveUsernameToLocalStorage(username)

  form.reset()
  form.classList.remove("was-validated")

  setUsernameFromLocalStorage()

  const inputs = [
    usernameInput,
    emailInput,
    passwordInput,
    passwordConfirmInput,
  ]
  inputs.forEach((input) => input.classList.remove("is-valid"))

  successAlertNewUsernameSpan.textContent = username
  successAlert.hidden = false
  successAlert.setAttribute("aria-hidden", "false")
  successAlert.focus()
}

function handleUsernameInput() {
  usernameInput.classList.remove("is-valid", "is-invalid")
  usernameInput.setCustomValidity("")
  usernameInput.removeAttribute("aria-describedby")
  if (!usernameInput.checkValidity()) {
    usernameInput.classList.add("is-invalid")

    if (usernameInput.validity.patternMismatch) {
      usernameInput.setCustomValidity(
        "Username must contain only letters, numbers, and underscores."
      )
    }
    if (usernameInput.validity.tooShort) {
      usernameInput.setCustomValidity("Username must be at least 8 characters.")
    }
    if (usernameInput.validity.valueMissing) {
      usernameInput.setCustomValidity("Please enter a username.")
    }

    usernameError.textContent = usernameInput.validationMessage
    usernameInput.setAttribute("aria-describedby", "username-error")
  } else {
    usernameInput.reportValidity()
    usernameInput.classList.add("is-valid")
    usernameError.textContent = ""
  }
}

function handleEmailInput() {
  emailInput.classList.remove("is-valid", "is-invalid")
  emailInput.setCustomValidity("")
  emailInput.removeAttribute("aria-describedby")
  if (!emailInput.checkValidity()) {
    emailInput.classList.add("is-invalid")

    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Email address must be valid.")
    }
    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Please enter an email address.")
    }

    emailError.textContent = emailInput.validationMessage
    emailInput.setAttribute("aria-describedby", "email-error")
  } else {
    emailInput.reportValidity()
    emailInput.classList.add("is-valid")
    emailError.textContent = ""
  }
}

function handlePasswordInput() {
  passwordInput.classList.remove("is-valid", "is-invalid")
  passwordInput.setCustomValidity("")
  passwordInput.removeAttribute("aria-describedby")
  if (!passwordInput.checkValidity()) {
    passwordInput.classList.add("is-invalid")

    if (passwordInput.validity.patternMismatch) {
      passwordInput.setCustomValidity(
        "Must contain, digits, and special chars: !, #, $, %, &, ?."
      )
    }
    if (passwordInput.validity.tooShort) {
      passwordInput.setCustomValidity(
        "Password must be at least 12 characters."
      )
    }
    if (passwordInput.validity.valueMissing) {
      passwordInput.setCustomValidity("Please enter a password.")
    }

    passwordError.textContent = passwordInput.validationMessage
    passwordInput.setAttribute("aria-describedby", "password-error")
  } else {
    passwordInput.reportValidity()
    passwordInput.classList.add("is-valid")
    passwordError.textContent = ""
  }
}

function handlePasswordConfirmInput() {
  passwordConfirmInput.classList.remove("is-valid", "is-invalid")
  passwordConfirmInput.setCustomValidity("")
  passwordConfirmInput.removeAttribute("aria-describedby")
  if (!passwordConfirmInput.checkValidity()) {
    passwordConfirmInput.classList.add("is-invalid")

    if (passwordConfirmInput.validity.tooShort) {
      passwordConfirmInput.setCustomValidity(
        "Password must be at least 12 characters."
      )
    }
    if (passwordConfirmInput.validity.valueMissing) {
      passwordConfirmInput.setCustomValidity("Please confirm your password.")
    }

    passwordConfirmError.textContent = passwordConfirmInput.validationMessage
    passwordConfirmInput.setAttribute(
      "aria-describedby",
      "password-confirm-error"
    )
  } else if (passwordConfirmInput.value !== passwordInput.value) {
    passwordConfirmInput.classList.add("is-invalid")
    passwordConfirmInput.setCustomValidity("Passwords must match.")
    passwordConfirmError.textContent = passwordConfirmInput.validationMessage
    passwordConfirmInput.setAttribute(
      "aria-describedby",
      "password-confirm-error"
    )
  } else {
    passwordConfirmInput.reportValidity()
    passwordConfirmInput.classList.add("is-valid")
    passwordConfirmError.textContent = ""
  }
}
