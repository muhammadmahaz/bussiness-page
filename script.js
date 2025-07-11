document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Toggle icon
        const icon = navToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetFormErrors();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate fields
        let isValid = true;
        
        if (!validateName(name.value)) {
            showError('nameError', 'Please enter your name');
            isValid = false;
        }
        
        if (!validateEmail(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validateSubject(subject.value)) {
            showError('subjectError', 'Please enter a subject');
            isValid = false;
        }
        
        if (!validateMessage(message.value)) {
            showError('messageError', 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }
    });
    
    // Login Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const showSignupLink = document.getElementById('showSignupModal');
    const showLoginLink = document.getElementById('showLoginModal');
    
    // Open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Open signup modal
    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Switch between modals
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetLoginErrors();
        
        // Get form fields
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        
        // Validate fields
        let isValid = true;
        
        if (!validateEmail(email.value)) {
            showError('loginEmailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validatePassword(password.value)) {
            showError('loginPasswordError', 'Please enter your password');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate login
            showFormMessage(loginMessage, 'Login successful! Redirecting...', 'success');
            
            // Reset form
            loginForm.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 2000);
        }
    });
    
    // Signup Form Validation
    const signupForm = document.getElementById('signupForm');
    const signupMessage = document.getElementById('signupMessage');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        resetSignupErrors();
        
        // Get form fields
        const name = document.getElementById('signupName');
        const email = document.getElementById('signupEmail');
        const password = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('signupConfirmPassword');
        const terms = document.querySelector('input[name="terms"]');
        
        // Validate fields
        let isValid = true;
        
        if (!validateName(name.value)) {
            showError('signupNameError', 'Please enter your full name');
            isValid = false;
        }
        
        if (!validateEmail(email.value)) {
            showError('signupEmailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validatePassword(password.value)) {
            showError('signupPasswordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!validateConfirmPassword(password.value, confirmPassword.value)) {
            showError('signupConfirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!terms.checked) {
            showError('signupConfirmPasswordError', 'Please agree to the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate signup
            showFormMessage(signupMessage, 'Account created successfully! Please check your email to verify.', 'success');
            
            // Reset form
            signupForm.reset();
            
            // Close modal after 3 seconds
            setTimeout(() => {
                signupModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 3000);
        }
    });
    
    // Validation Functions
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validateSubject(subject) {
        return subject.trim().length >= 5;
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    function validatePassword(password) {
        return password.trim().length >= 6;
    }
    
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        formMessage.style.display = 'none';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
    
    function resetLoginErrors() {
        const errorElements = document.querySelectorAll('#loginForm .error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        loginMessage.style.display = 'none';
        loginMessage.textContent = '';
        loginMessage.className = 'form-message';
    }
    
    function resetSignupErrors() {
        const errorElements = document.querySelectorAll('#signupForm .error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        signupMessage.style.display = 'none';
        signupMessage.textContent = '';
        signupMessage.className = 'form-message';
    }
    
    function showFormMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }
    
    // Scroll event for active navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});