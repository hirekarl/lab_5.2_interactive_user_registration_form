function getUsernameFromLocalStorage() {
  const username = localStorage.getItem("username")
  if (username !== null && username !== "")
    usernameInput.value = JSON.parse(username)
  else {
    try {
      localStorage.setItem("username", "")
    } catch (error) {
      console.error("Couldn't save to local storage:", error)
    }
  }
}

function saveUsernameToLocalStorage(username) {
  try {
    localStorage.setItem("username", JSON.stringify(username))
  } catch (error) {
    console.error("Couldn't save to local storage:", error)
  }
}

const form = document.getElementById("form")
const successAlert = document.getElementById("success-alert")
const successAlertNewUsernameSpan = document.getElementById("new-username")

function handleForm(event) {
  form.classList.remove("was-validated")
  form.classList.add("needs-validation")
  if (!form.checkValidity()) {
    form.reportValidity()
    event.stopPropagation()
    return
  }

  form.classList.remove("needs-validation")
  form.classList.add("was-validated")

  const formData = new FormData(form)
  const username = formData.get("username")
  saveUsernameToLocalStorage(username)

  successAlertNewUsernameSpan.textContent = username
  successAlert.hidden = false
  successAlert.setAttribute("aria-hidden", "false")
}

const usernameInput = document.getElementById("username-input")
const usernameError = document.getElementById("username-error")

function handleUsernameInput() {
  usernameInput.classList.remove("is-valid")
  usernameInput.classList.remove("is-invalid")
  usernameInput.setCustomValidity("")
  usernameInput.removeAttribute("aria-describedby")
  const usernameIsValid = usernameInput.checkValidity()
  if (!usernameIsValid) {
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
    return
  } else {
    usernameInput.reportValidity()
    usernameInput.classList.add("is-valid")
    usernameError.textContent = ""
    return
  }
}

const emailInput = document.getElementById("email-input")
const emailError = document.getElementById("email-error")

function handleEmailInput() {
  emailInput.classList.remove("is-valid")
  emailInput.classList.remove("is-invalid")
  emailInput.setCustomValidity("")
  emailInput.removeAttribute("aria-describedby")
  const emailIsValid = emailInput.checkValidity()
  if (!emailIsValid) {
    emailInput.classList.add("is-invalid")
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Email address must be valid.")
    }
    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Please enter an email address.")
    }
    emailError.textContent = emailInput.validationMessage
    emailInput.setAttribute("aria-describedby", "email-error")
    return
  } else {
    emailInput.reportValidity()
    emailInput.classList.add("is-valid")
    emailError.textContent = ""
    return
  }
}

const passwordInput = document.getElementById("password-input")
const passwordError = document.getElementById("password-error")

function handlePasswordInput() {
  passwordInput.classList.remove("is-valid")
  passwordInput.classList.remove("is-invalid")
  passwordInput.setCustomValidity("")
  passwordInput.removeAttribute("aria-describedby")
  const passwordIsValid = passwordInput.checkValidity()
  if (!passwordIsValid) {
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
    return
  } else {
    passwordInput.reportValidity()
    passwordInput.classList.add("is-valid")
    passwordError.textContent = ""
    return
  }
}

const passwordConfirmInput = document.getElementById("password-confirm-input")
const passwordConfirmError = document.getElementById("password-confirm-error")

function handlePasswordConfirmInput() {
  passwordConfirmInput.classList.remove("is-valid")
  passwordConfirmInput.classList.remove("is-invalid")
  passwordConfirmInput.setCustomValidity("")
  passwordConfirmInput.removeAttribute("aria-describedby")
  const passwordConfirmIsValid = passwordConfirmInput.checkValidity()
  if (!passwordConfirmIsValid) {
    passwordConfirmInput.classList.add("is-invalid")
    if (passwordConfirmInput.validity.valueMissing) {
      passwordConfirmInput.setCustomValidity("Please confirm your password.")
    }
    if (passwordConfirmInput.validity.tooShort) {
      passwordConfirmInput.setCustomValidity(
        "Password must be at least 12 characters."
      )
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

    return
  } else {
    passwordConfirmInput.classList.add("is-valid")
    passwordConfirmInput.reportValidity()
    passwordConfirmError.textContent = ""
    return
  }
}

function main() {
  getUsernameFromLocalStorage()

  usernameInput.addEventListener("blur", handleUsernameInput)
  emailInput.addEventListener("blur", handleEmailInput)

  const passwordFieldsEvents = ["input", "focus", "blur", "change"]
  passwordFieldsEvents.forEach((event) => {
    passwordInput.addEventListener(event, handlePasswordInput)
    passwordConfirmInput.addEventListener(event, handlePasswordConfirmInput)
  })

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault()
      handleForm(event)
    },
    false
  )
}

document.addEventListener("DOMContentLoaded", main)
