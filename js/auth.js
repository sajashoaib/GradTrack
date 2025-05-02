const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// التحقق من وجود نموذج تسجيل الدخول
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let universityNumber = document.getElementById("university-number").value.trim();
        let password = document.getElementById("password").value.trim();
        clearErrors();

        if (validateLoginForm(universityNumber, password)) {
            loginUser(universityNumber, password);
        }
    });
}
// ***************************************************************************

// التحقق من صحة بيانات تسجيل الدخول
function validateLoginForm(universityNumber, password) {
    let valid = true;
    if (!universityNumber || universityNumber.length < 8) {
        setError("university-number-error", "Enter your University Number");
        valid = false;
    }
    if (!password || password.length < 8) {
        setError("password-error", "Enter your Password");
        valid = false;
    }
    return valid;
}

// ***************************************************************************


// تسجيل دخول المستخدم
function loginUser(universityNumber, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.universityNumber === universityNumber);
    
    if (!user) {
        setError("login-error", "Account not found. Please sign up.");
        return;
    }
    if (user.password !== password) {
        setError("password-error", "Incorrect password");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
}

// ***************************************************************************


// التحقق من وجود نموذج التسجيل
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const universityNumber = document.getElementById("university-number").value.trim();
        let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!validateSignupForm()) {
        return; 
    }
        if (users.some(user => user.universityNumber === universityNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Account Already Exists',
                text: 'This university number is already registered.',
            });
            return; 
        }

        // إذا لم يكن رقم الجامعة موجودًا، التحقق من صحة البيانات
        if (validateSignupForm()) {
            saveToLocalStorage(); 
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You are being redirected to the login page...',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            });
        }
    });
}

// ***************************************************************************

// التحقق من صحة بيانات التسجيل
function validateSignupForm() {
    let isValid = true;
    clearErrors();
    const universityNumber = document.getElementById("university-number").value.trim();
    const userName = document.getElementById("std-name").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const email = document.getElementById("std-email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const termsChecked = document.getElementById("check-input").checked;

    if (!userName) {
        setError("std-name-error", "Please enter your name.");
        isValid = false;
    }
    if (!phoneNumber || phoneNumber.length < 8) {
        setError("phone-number-error", "Phone number must be at least 8 digits.");
        isValid = false;
    }
    if (!universityNumber || universityNumber.length < 8) {
        setError("university-number-error", "University number must be at least 8 digits.");
        isValid = false;
    }
    if (!validateEmail(email)) {
        setError("std-email-error", "Please enter a valid email.");
        isValid = false;
    }
    if (password.length < 8) {
        setError("password-error", "Password must be at least 8 characters.");
        isValid = false;
    }
    if (!confirmPassword) {
        setError("confirm-password-error", "Please enter your password.");
        isValid = false;
    }
    if (confirmPassword !== password) {
        setError("confirm-password-error", "Passwords do not match.");
        isValid = false;
    }
    if (!termsChecked) {
        setError("check-input-error", "You must agree to the Terms and Conditions.");
        isValid = false;
    }

    return isValid;
}

// ***************************************************************************

// حفظ بيانات المستخدمين في LocalStorage
function saveToLocalStorage() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const universityNumber = document.getElementById("university-number").value.trim();
    
 
    const userData = {
        name: document.getElementById("std-name").value.trim(),
        phone: document.getElementById("phone-number").value.trim(),
        universityNumber: universityNumber,
        email: document.getElementById("std-email").value.trim(),
        password: document.getElementById("password").value.trim(),
    };
    
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
}

// ***************************************************************************

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// ***************************************************************************

// تعيين رسالة خطأ
function setError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}
// ***************************************************************************

// مسح الأخطاء السابقة
function clearErrors() {
    document.querySelectorAll("p[id$='-error']").forEach(el => el.textContent = "");
}

// ***************************************************************************

// إزالة رسالة الخطأ عند بدء الكتابة
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        const errorId = `${input.id}-error`;
        if (document.getElementById(errorId)) {
            document.getElementById(errorId).textContent = "";
        }
    });
});






// دالة للتبديل بين  اخفاء واظهار كلمة المرور
document.querySelectorAll("toggle-password").addEventListener("click", () => {
    const passwordField = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    const eyeIcon = document.getElementById("toggle-password");

    passwordField.type = passwordField.type === "password" ? "text" : "password"; // التبديل بين النص وكلمة المرور
    confirmPassword.type = confirmPassword.type === "password" ? "text" : "password";

    eyeIcon.classList.toggle("fa-eye-slash");
    eyeIcon.classList.toggle("fa-eye");
});
