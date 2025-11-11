// Homepage Image Slideshow
const images = document.querySelectorAll('.hero-bg-image');
if (images.length > 0) {
  let currentIndex = 0;
  
  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 3000);
}

// Footer words animation
const words = document.querySelectorAll('.footer-word');
if (words.length > 0) {
  let currentWord = 0;
  
  setInterval(() => {
    words.forEach(w => w.classList.remove('active'));
    words[currentWord].classList.add('active');
    currentWord = (currentWord + 1) % words.length;
  }, 1500);
}
// Sign Up Form Validation
const signupForm = document.querySelector('form');
if (signupForm && window.location.pathname.includes('signup')) {
  
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form values
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const mobile = document.getElementById('mobile')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    // Validation
    if (!name || !email || !mobile || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Strong password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

if (!passwordRegex.test(password)) {
  alert('Password must be at least 8 characters and include:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character (@$!%*?&#)');
  return;
}
    
    // Simulate sending OTP (in real app, this would call backend API)
    alert('OTP sent to your email and mobile!');
    
    // Redirect to OTP verification page
    window.location.href = `otp-verify.html?email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}`;
  });
}
// Password Strength Checker
const passwordInput = document.getElementById('password');
if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    // Show strength indicator when typing
    if (password.length > 0) {
      strengthDiv.classList.remove('hidden');
    } else {
      strengthDiv.classList.add('hidden');
      return;
    }
    
    let strength = 0;
    
    // Check length (8+ characters)
    if (password.length >= 8) {
      document.getElementById('check-length').textContent = '✅';
      strength += 20;
    } else {
      document.getElementById('check-length').textContent = '❌';
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
      document.getElementById('check-uppercase').textContent = '✅';
      strength += 20;
    } else {
      document.getElementById('check-uppercase').textContent = '❌';
    }
    
    // Check lowercase
    if (/[a-z]/.test(password)) {
      document.getElementById('check-lowercase').textContent = '✅';
      strength += 20;
    } else {
      document.getElementById('check-lowercase').textContent = '❌';
    }
    
    // Check number
    if (/\d/.test(password)) {
      document.getElementById('check-number').textContent = '✅';
      strength += 20;
    } else {
      document.getElementById('check-number').textContent = '❌';
    }
    
    // Check special character
    if (/[@$!%*?&#]/.test(password)) {
      document.getElementById('check-special').textContent = '✅';
      strength += 20;
    } else {
      document.getElementById('check-special').textContent = '❌';
    }
    
    // Update progress bar
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    strengthBar.style.width = strength + '%';
    
    if (strength <= 40) {
      strengthBar.className = 'h-full transition-all duration-300 bg-red-500';
      strengthText.textContent = 'Weak';
      strengthText.className = 'text-xs text-center mt-1 font-medium text-red-500';
    } else if (strength <= 60) {
      strengthBar.className = 'h-full transition-all duration-300 bg-yellow-500';
      strengthText.textContent = 'Fair';
      strengthText.className = 'text-xs text-center mt-1 font-medium text-yellow-500';
    } else if (strength < 100) {
      strengthBar.className = 'h-full transition-all duration-300 bg-blue-500';
      strengthText.textContent = 'Good';
      strengthText.className = 'text-xs text-center mt-1 font-medium text-blue-500';
    } else {
      strengthBar.className = 'h-full transition-all duration-300 bg-green-500';
      strengthText.textContent = 'Strong';
      strengthText.className = 'text-xs text-center mt-1 font-medium text-green-500';
    }
  });
}