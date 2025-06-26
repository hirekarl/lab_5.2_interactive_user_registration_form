const form = document.getElementById("form")

const usernameInput = document.getElementById("username-input")
const usernameError = document.getElementById("username-error")

const emailInput = document.getElementById("email-input")
const emailError = document.getElementById("email-error")

const passwordInput = document.getElementById("password-input")
const passwordError = document.getElementById("password-error")

const passwordConfirmInput = document.getElementById("password-confirm-input")
const passwordConfirmError = document.getElementById("password-confirm-error")

document.addEventListener("DOMContentLoaded", () => {
  usernameInput.addEventListener("blur", () => {
    usernameInput.setCustomValidity("")
    const usernameIsValid = usernameInput.checkValidity()
    if (!usernameIsValid) {
      if (usernameInput.validity.valueMissing) {
        usernameInput.setCustomValidity("Please input a username.")
        usernameError.textContent = usernameInput.validationMessage
        return
      }
      if (usernameInput.validity.tooShort) {
        usernameInput.setCustomValidity(
          "Username must be at least 8 characters."
        )
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
      usernameError.textContent = ""
      return
    }
  })

  emailInput.addEventListener("blur", () => {
    emailInput.setCustomValidity("")
    const emailIsValid = emailInput.checkValidity()
    if (!emailIsValid) {
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
      emailError.textContent = ""
      return
    }
  })

  passwordInput.addEventListener("change", () => {
    passwordInput.setCustomValidity("")
    const passwordIsValid = passwordInput.checkValidity()
    if (!passwordIsValid) {
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
          "Password must contain uppercase and lowercase letters, digits, and special characters (#?!@$%^&*-)."
        )
        passwordError.textContent = passwordInput.validationMessage
        return
      }
      passwordError.textContent = passwordInput.validationMessage
      return
    } else {
      passwordInput.reportValidity()
      passwordError.textContent = ""
      return
    }
  })

  passwordConfirmInput.addEventListener("change", () => {
    passwordConfirmInput.setCustomValidity("")
    const passwordConfirmIsValid = passwordConfirmInput.checkValidity()
    if (!passwordConfirmIsValid) {
      if (passwordConfirmInput.validity.valueMissing) {
        passwordConfirmInput.setCustomValidity("Please confirm your password.")
        passwordConfirmError.textContent = passwordConfirmInput.validationMessage
        return
      }
    } else if (passwordConfirmInput.value !== passwordInput.value) {
      passwordInput.setCustomValidity("Passwords must match.")
      passwordConfirmError.textContent = passwordConfirmInput.validationMessage
      return
    } else {
      passwordConfirmInput.reportValidity()
      passwordConfirmError.textContent = ""
      return
    }
  })

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.reportValidity()
    form.classList.add("was-validated")
  }, false)
})
