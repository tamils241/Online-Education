/* ============================================
   Online Education Theme - Main JavaScript
   ============================================ */

/* ---------- Mobile Hamburger Menu ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a nav link is clicked (mobile)
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    initStatsCounter();
    initForms();
    initFAQ();
    initTilt();
    initScrollReveal();
    initDashboard();
});

/* ---------- 3D Card Tilt ---------- */
function initTilt() {
    const cards = document.querySelectorAll('.feature-card, .course-card, .instructor-card, .testimonial-card, .pricing-card, .blog-card');
    if (!cards.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const MAX_X = 14;
    const MAX_Y = 18;

    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            card.style.transition = 'transform 0.2s ease-out';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rx = (0.5 - py) * MAX_X;
            const ry = (px - 0.5) * MAX_Y;

            card.style.transition = 'transform 0.06s ease-out';
            card.style.transform =
                'perspective(1000px) translateY(-10px) scale(1.03)' +
                ' rotateX(' + rx.toFixed(2) + 'deg)' +
                ' rotateY(' + ry.toFixed(2) + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transition = 'transform 0.4s ease';
            card.style.transform = '';
        });
    });
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var selector = '.section-header, .course-card, .feature-card, .instructor-card, .testimonial-card, .blog-card, .pricing-card, .info-page-card, .faq-item, .split-grid > div';
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
        el.classList.add('reveal');

        var parent = el.parentElement;
        var siblings = parent ? Array.prototype.slice.call(parent.children) : [el];
        var index = siblings.indexOf(el);
        var delay = Math.min(index * 90, 500);
        el.style.transitionDelay = delay + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(function (el) {
        observer.observe(el);
    });
}

/* ---------- Dashboard (Admin & Student) ---------- */
function initDashboard() {
    const sidebar = document.getElementById('dashboardSidebar');
    const toggle = document.getElementById('sidebarToggle');

    if (sidebar && toggle) {
toggle.addEventListener('click', function () {
                sidebar.classList.toggle('open');
            });

        sidebar.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                sidebar.classList.remove('open');
            });
        });
    }

    // Animate progress bars
    const bars = document.querySelectorAll('.progress-bar[data-progress]');
    if (!bars.length) return;

    const fillBar = function (bar) {
        bar.style.width = bar.getAttribute('data-progress') + '%';
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    fillBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        bars.forEach(function (bar) {
            observer.observe(bar);
        });
    } else {
        bars.forEach(fillBar);
    }
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');

            // Close all items
            items.forEach(function (other) {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Open the clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });

    // Update max-height on window resize for open items
    window.addEventListener('resize', function () {
        const activeItem = document.querySelector('.faq-item.active .faq-answer');
        if (activeItem) {
            activeItem.style.maxHeight = activeItem.scrollHeight + 'px';
        }
    });
}

/* ---------- Hamburger animation ---------- */
function toggleHamburger() {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) return;
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

/* Update: animate hamburger bars when menu toggles */
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

/* ---------- Animated Counters (hero stats) ---------- */
function initStatsCounter() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const animateCounter = function (element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;

        const suffix = target >= 1000 ? '+' : '';
        const duration = 2000;
        const start = 0;
        const stepTime = Math.abs(Math.floor(duration / target));

        let current = start;
        const timer = setInterval(function () {
            current += 1;
            if (current <= target) {
                element.textContent = current.toLocaleString() + suffix;
            } else {
                element.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
            }
        }, stepTime);
    };

    // Intersection Observer - start animation when visible
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    } else {
        // Fallback - animate all immediately
        counters.forEach(animateCounter);
    }
}

/* ---------- Form Handling (Login & Register) ---------- */
function initForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const isValidStrictEmail = function (value) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(value)) return false;
            const domain = value.split('@')[1] || '';
            return !/^[0-9]/.test(domain);
        };

        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('change', function () {
                const value = emailField.value.trim();
                if (value && !isValidStrictEmail(value)) {
                    alert('Please enter a valid email address (e.g., sun@gmail.com).');
                    showFormError('email', 'Please enter a valid email address.');
                } else {
                    clearFormError('email');
                }
            });
        }

        const isStrongPassword = function (value) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
            return regex.test(value);
        };

        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.addEventListener('change', function () {
                const value = passwordField.value;
                if (value && !isStrongPassword(value)) {
                    alert('Password must be strong: at least 8 characters, with uppercase, lowercase, a number and a special character.');
                    showFormError('password', 'Password is not strong enough.');
                } else {
                    clearFormError('password');
                }
            });
        }

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const roleSelect = document.getElementById('role') || document.querySelector('#loginForm select[name="role"]');
            const role = roleSelect ? roleSelect.value : '';
            const remember = loginForm.querySelector('input[name="remember"]');

            if (!role) {
                alert('Please select a role (Student or Admin).');
                if (roleSelect) roleSelect.focus();
                return;
            }

            if (remember && !remember.checked) {
                alert('Please check "Remember me" to continue.');
                remember.focus();
                return;
            }

            if (!isValidStrictEmail(email)) {
                alert('Please enter a valid email address (e.g., sun@gmail.com).');
                showFormError('email', 'Please enter a valid email address.');
                emailField.focus();
                return;
            }
            clearFormError('email');

            if (!isStrongPassword(password)) {
                alert('Password must be strong: at least 8 characters, with uppercase, lowercase, a number and a special character.');
                showFormError('password', 'Password is not strong enough.');
                passwordField.focus();
                return;
            }
            clearFormError('password');

            // All validations passed - redirect to the role dashboard
            simulateAuth('Logging in', 'Login successful! Redirecting to ' + role + ' dashboard...', role === 'admin' ? 'admin-dashboard.html' : 'student-dashboard.html');
            loginForm.reset();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const terms = registerForm.querySelector('input[name="terms"]');
            const roleSelect = document.getElementById('role');
            const role = roleSelect ? roleSelect.value : '';

            if (fullName.length < 2) {
                showFormError('fullName', 'Please enter your full name.');
                return;
            }
            clearFormError('fullName');

            if (!role) {
                alert('Please select a role (Student or Admin).');
                if (roleSelect) roleSelect.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showFormError('regEmail', 'Please enter a valid email address.');
                return;
            }
            clearFormError('regEmail');

            if (!isStrongPassword(password)) {
                showFormError('regPassword', 'Password must be at least 8 characters with uppercase, lowercase, number and a special character.');
                return;
            }
            clearFormError('regPassword');

            if (password !== confirmPassword) {
                showFormError('confirmPassword', 'Passwords do not match.');
                return;
            }
            clearFormError('confirmPassword');

            if (!terms.checked) {
                alert('You must agree to the Terms & Conditions.');
                showFormError('terms', 'You must agree to the Terms & Conditions.');
                return;
            }
            clearFormError('terms');

            // Simulated registration success
            simulateAuth('Creating account', 'Account created! Please login to continue.', 'login.html');
            registerForm.reset();
        });
    }

    /* ---------- Register email: live format validation ---------- */
    const regEmailInput = document.getElementById('regEmail');
    if (regEmailInput) {
        regEmailInput.addEventListener('input', function () {
            const value = regEmailInput.value.trim();
            if (value && !isValidEmail(value)) {
                showFormError('regEmail', 'Please enter a valid email address.');
            } else {
                clearFormError('regEmail');
            }
        });
    }

    /* ---------- Register password: strength + match validation ---------- */
    const regPasswordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', function () {
            const value = regPasswordInput.value;
            if (value && !isStrongPassword(value)) {
                showFormError('regPassword', 'Need 8+ chars: uppercase, lowercase, number and a special character.');
            } else {
                clearFormError('regPassword');
            }
            if (confirmPasswordInput && confirmPasswordInput.value) {
                if (confirmPasswordInput.value !== value) {
                    showFormError('confirmPassword', 'Passwords do not match.');
                } else {
                    clearFormError('confirmPassword');
                }
            }
        });
    }
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function () {
            const value = confirmPasswordInput.value;
            if (value && value !== regPasswordInput.value) {
                showFormError('confirmPassword', 'Passwords do not match.');
            } else {
                clearFormError('confirmPassword');
            }
        });
    }
/* ---------- Name fields: letters only ---------- */
    const nameInputs = document.querySelectorAll('input[name="firstName"], input[name="lastName"], #fullName');
    nameInputs.forEach(function (input) {
        input.addEventListener('keydown', function (e) {
            if (e.key.length === 1 && !/[A-Za-z]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        });
        input.addEventListener('input', function () {
            input.value = input.value.replace(/[^A-Za-z]/g, '').slice(0, 16);
        });
    });

    /* ---------- Contact email: valid format + domain check ---------- */
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
        const isValidContactEmail = function (value) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(value)) return false;
            const domain = value.split('@')[1] || '';
            return !/^[0-9]/.test(domain);
        };

        contactEmail.addEventListener('change', function () {
            const value = contactEmail.value.trim();
            if (value && !isValidContactEmail(value)) {
                alert('Please enter a valid email address (e.g., sun@gmail.com).');
                showFormError('contactEmail', 'Please enter a valid email address.');
            } else {
                clearFormError('contactEmail');
            }
        });

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const firstName = contactForm.querySelector('input[name="firstName"]');
                const lastName = contactForm.querySelector('input[name="lastName"]');
                const subject = contactForm.querySelector('input[name="subject"]');
                const message = contactForm.querySelector('textarea[name="message"]');

                const check = function (input, message) {
                    if (!input.value.trim()) {
                        alert(message);
                        showFormError(input.id, message);
                        return false;
                    }
                    clearFormError(input.id);
                    return true;
                };

                const okName = /^[A-Za-z\u00C0-\u024F]+$/;
                if (!firstName.value.trim() || !okName.test(firstName.value.trim())) {
                    alert('Please enter a valid first name (letters only).');
                    showFormError('firstName', 'Please enter a valid first name.');
                    firstName.focus();
                    return;
                }
                clearFormError('firstName');

                if (!lastName.value.trim() || !okName.test(lastName.value.trim())) {
                    alert('Please enter a valid last name (letters only).');
                    showFormError('lastName', 'Please enter a valid last name.');
                    lastName.focus();
                    return;
                }
                clearFormError('lastName');

                if (!isValidContactEmail(contactEmail.value.trim())) {
                    alert('Please enter a valid email address (e.g., sun@gmail.com).');
                    showFormError('contactEmail', 'Please enter a valid email address.');
                    contactEmail.focus();
                    return;
                }
                clearFormError('contactEmail');

                if (!check(subject, 'Please enter a subject.')) {
                    subject.focus();
                    return;
                }

                if (!check(message, 'Please write a message.')) {
                    message.focus();
                    return;
                }

                contactForm.reset();
                alert('Success! Your message has been sent. We will get back to you within 24 hours.');
            });
        }
    }
}

/* ---------- Email validation helper ---------- */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* ---------- Strong password helper ---------- */
function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
}

/* ---------- Show inline form error ---------- */
function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.style.borderColor = '#ef4444';
    field.setAttribute('data-error', message);

    // Remove existing error message, then add new one
    const fieldGroup = field.closest('.form-group');
    if (fieldGroup) {
        fieldGroup.querySelectorAll('.field-error').forEach(function (el) {
            el.remove();
        });
        const errorEl = document.createElement('small');
        errorEl.className = 'field-error';
        errorEl.style.color = '#ef4444';
        errorEl.style.fontSize = '0.82rem';
        errorEl.style.marginTop = '4px';
        errorEl.textContent = message;
        fieldGroup.appendChild(errorEl);
    }
}

/* ---------- Clear inline form error ---------- */
function clearFormError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '';
    const fieldGroup = field.closest('.form-group');
    if (fieldGroup) {
        fieldGroup.querySelectorAll('.field-error').forEach(function (el) {
            el.remove();
        });
    }
}

/* ---------- Simulated authentication ---------- */
function simulateAuth(loadingMsg, successMsg, redirect) {
    if (typeof Swal !== 'undefined') {
        // Optional: if SweetAlert2 is loaded, use it
        Swal.fire({
            title: loadingMsg,
            text: 'Please wait...',
            didOpen: function () {
                Swal.showLoading();
            }
        }).then(function () {
            Swal.fire({
                icon: 'success',
                title: successMsg,
                timer: 1500,
                showConfirmButton: false
            }).then(function () {
                if (redirect) {
                    window.location.href = redirect === true ? 'login.html' : redirect;
                }
            });
        });
    } else {
        // Simple alert fallback without external library
        alert(successMsg);
        if (redirect) {
            setTimeout(function () {
                window.location.href = redirect === true ? 'login.html' : redirect;
            }, 500);
        }
    }
}

/* ---------- Social login placeholder ---------- */
function socialLogin(provider) {
}

/* ---------- Social register placeholder ---------- */
function socialRegister(provider) {
}

/* ---------- Password visibility toggle ---------- */
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    // Swap the SVG icon
    const svg = button.querySelector('svg');
    if (svg) {
        if (isPassword) {
            svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
            svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
    }
}

/* ---------- Smooth scrolling for anchor links ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    const headerOffset = 75;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});