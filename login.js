// Login Page JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements when page loads
    animateElements();
    
    // Add event listeners to form elements
    addFormEventListeners();
    
    // Initialize password toggle functionality
    initPasswordToggles();
    
    // Add input field animations
    initInputAnimations();
});

// Function to animate elements on page load
function animateElements() {
    // Animate navbar items with sequential delay
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    navItems.forEach((item, index) => {
        item.classList.add('animate__animated', 'animate__fadeInRight');
        item.style.animationDelay = `${(index + 1) * 0.2}s`;
    });
    
    // Animate form elements
    const formElements = document.querySelectorAll('.login-form-wrapper, .signup-form-wrapper');
    formElements.forEach(element => {
        element.classList.add('animate__animated', 'animate__fadeIn');
        element.style.animationDelay = '0.5s';
    });
    
    // Animate image content
    const imageContent = document.querySelectorAll('.login-image-content h3, .signup-image-content h3');
    imageContent.forEach(element => {
        element.classList.add('animate__animated', 'animate__fadeInUp');
    });
    
    const imageText = document.querySelectorAll('.login-image-content p, .signup-image-content p');
    imageText.forEach(element => {
        element.classList.add('animate__animated', 'animate__fadeInUp');
        element.style.animationDelay = '0.3s';
    });
}

// Function to add event listeners to form elements
function addFormEventListeners() {
    // Add form submission handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validate form data
            if (!validateEmail(email)) {
                showFormError('login-email', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showFormError('login-password', 'Password must be at least 6 characters');
                return;
            }
            
            // Show loading state on button
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            showButtonLoading(submitBtn, 'Logging in...');
            
            // Simulate API call (replace with actual authentication)
            setTimeout(() => {
                // Reset button state
                resetButtonState(submitBtn, 'Log In');
                
                // Redirect to dashboard (replace with actual redirect)
                // window.location.href = 'dashboard.html';
                
                // For demo, just show success message
                showSuccessMessage('Login successful!');
            }, 1500);
        });
    }
    
    // Add signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            // Validate form data
            if (name.length < 2) {
                showFormError('signup-name', 'Please enter your full name');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormError('signup-email', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showFormError('signup-password', 'Password must be at least 6 characters');
                return;
            }
            
            // Show loading state on button
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            showButtonLoading(submitBtn, 'Creating account...');
            
            // Simulate API call (replace with actual registration)
            setTimeout(() => {
                // Reset button state
                resetButtonState(submitBtn, 'Sign Up');
                
                // Redirect to dashboard (replace with actual redirect)
                // window.location.href = 'dashboard.html';
                
                // For demo, just show success message
                showSuccessMessage('Account created successfully!');
            }, 1500);
        });
    }
}

// Function to initialize password toggle functionality
function initPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordField = document.getElementById(this.getAttribute('onclick').split("'")[1]);
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                passwordField.type = 'password';
                this.innerHTML = '<i class="far fa-eye"></i>';
            }
        });
    });
}

// Function to initialize input field animations
function initInputAnimations() {
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(field => {
        // Add focus effect
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Function to toggle between login and signup forms
function flipCard() {
    const cardFlip = document.getElementById('card-flip');
    cardFlip.classList.toggle('flipped');
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to show form error
function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to input
    field.classList.add('is-invalid');
    
    // Create and append error message
    errorDiv.className = 'error-message invalid-feedback';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
    
    // Focus the field
    field.focus();
    
    // Remove error after 3 seconds
    setTimeout(() => {
        field.classList.remove('is-invalid');
        errorDiv.remove();
    }, 3000);
}

// Helper function to show success message
function showSuccessMessage(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'success-toast animate__animated animate__fadeInUp';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    // Append to body
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('animate__fadeInUp');
        toast.classList.add('animate__fadeOutDown');
        
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Helper function to show loading state on button
function showButtonLoading(button, loadingText) {
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${loadingText}`;
}

// Helper function to reset button state
function resetButtonState(button, text) {
    button.disabled = false;
    button.textContent = text;
}

// Function to toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.parentElement.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Add CSS for success toast
document.head.insertAdjacentHTML('beforeend', `
<style>
.success-toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #2ed573;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 9999;
}

.toast-icon {
    margin-right: 15px;
    font-size: 1.5rem;
}

.toast-message {
    font-weight: 500;
}

.focused {
    transform: translateY(-3px);
}

.error-message {
    color: #ff4757;
    font-size: 0.85rem;
    margin-top: 5px;
}
</style>
`);
