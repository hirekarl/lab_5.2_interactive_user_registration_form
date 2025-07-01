function getUsernameFromLocalStorage() {
  const username = localStorage.getItem("username")
  if (username !== null) usernameInput.value = JSON.parse(username)
  else localStorage.setItem("username", "")
}

function saveUsernameToLocalStorage(username) {
  localStorage.setItem("username", JSON.stringify(username))
}

const form = document.getElementById("form")

function handleForm(event) {
  form.classList.remove("was-validated")
  form.classList.add("needs-validation")
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }

  const formData = new FormData(form)
  const username = formData.get("username")
  saveUsernameToLocalStorage(username)

  form.classList.remove("needs-validation")
  form.classList.add("was-validated")
}

const usernameInput = document.getElementById("username-input")
const usernameError = document.getElementById("username-error")

function handleUsernameInput() {
  usernameInput.classList.remove("is-valid")
  usernameInput.classList.remove("is-invalid")
  usernameInput.setCustomValidity("")
  const usernameIsValid = usernameInput.checkValidity()
  if (!usernameIsValid) {
    usernameInput.classList.add("is-invalid")
    if (usernameInput.validity.valueMissing) {
      usernameInput.setCustomValidity("Please input a username.")
      usernameError.textContent = usernameInput.validationMessage
      return
    }
    if (usernameInput.validity.tooShort) {
      usernameInput.setCustomValidity("Username must be at least 8 characters.")
      usernameError.textContent = usernameInput.validationMessage
      return
    }
    if (usernameInput.validity.patternMismatch) {
      usernameInput.setCustomValidity(
        "Username must contain only letters, numbers, and underscores."
      )
      usernameError.textContent = usernameInput.validationMessage
      return
    }
    usernameError.textContent = usernameInput.validationMessage
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
  const emailIsValid = emailInput.checkValidity()
  if (!emailIsValid) {
    emailInput.classList.add("is-invalid")
    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Please input an email address.")
      emailError.textContent = emailInput.validationMessage
      return
    }
    if (emailInput.validity.patternMismatch) {
      emailInput.setCustomValidity("Email address must be valid.")
      emailError.textContent = emailInput.validationMessage
      return
    }
    emailError.textContent = emailInput.validationMessage
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
  const passwordIsValid = passwordInput.checkValidity()
  if (!passwordIsValid) {
    passwordInput.classList.add("is-invalid")
    if (passwordInput.validity.valueMissing) {
      passwordInput.setCustomValidity("Please input a password.")
      passwordError.textContent = passwordInput.validationMessage
      return
    }
    if (passwordInput.validity.tooShort) {
      passwordInput.setCustomValidity(
        "Password must be at least 12 characters."
      )
      passwordError.textContent = passwordInput.validationMessage
      return
    }
    if (passwordInput.validity.patternMismatch) {
      passwordInput.setCustomValidity(
        "Password can only contain uppercase and lowercase letters, digits, and special characters (#?!@$%^&*-)."
      )
      passwordError.textContent = passwordInput.validationMessage
      return
    }
    passwordError.textContent = passwordInput.validationMessage
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
  const passwordConfirmIsValid = passwordConfirmInput.checkValidity()
  if (!passwordConfirmIsValid) {
    passwordConfirmInput.classList.add("is-invalid")
    if (passwordConfirmInput.validity.valueMissing) {
      passwordConfirmInput.setCustomValidity("Please confirm your password.")
      passwordConfirmError.textContent = passwordConfirmInput.validationMessage
      return
    }
    if (passwordConfirmInput.validity.tooShort) {
      passwordConfirmInput.setCustomValidity(
        "Password must be at least 12 characters."
      )
      passwordConfirmError.textContent = passwordConfirmInput.validationMessage
      return
    }
  } else if (passwordConfirmInput.value !== passwordInput.value) {
    passwordConfirmInput.classList.add("is-invalid")
    passwordConfirmInput.setCustomValidity("Passwords must match.")
    passwordConfirmError.textContent = passwordConfirmInput.validationMessage

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

  form.addEventListener("submit", (event) => handleForm(event), false)
}

document.addEventListener("DOMContentLoaded", main)
