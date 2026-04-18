// ============================================
// ADVANCED TRAVEL WEBSITE - MAIN SCRIPT (FIXED)
// ============================================

console.log('Script loaded - Starting initialization');

// ========== Initialization & Setup ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  try {
    initializeFeatures();
    console.log('Features initialized successfully');
  } catch (error) {
    console.error('Initialization error:', error);
  }
  
  // Force hide preloader after 3 seconds maximum
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      preloader.style.transition = 'all 0.6s ease';
    }
  }, 3000);
});

function initializeFeatures() {
  console.log('Initializing features...');
  
  // Initialize all features with error handling
  const features = [
    { name: 'preloaderAnimation', fn: preloaderAnimation },
    { name: 'headerScroll', fn: headerScroll },
    { name: 'smoothScroll', fn: smoothScroll },
    { name: 'themeToggle', fn: themeToggle },
    { name: 'mobileMenu', fn: mobileMenu },
    { name: 'revealOnScroll', fn: revealOnScroll },
    { name: 'counterAnimation', fn: counterAnimation },
    { name: 'filterDestinations', fn: filterDestinations },
    { name: 'faqAccordion', fn: faqAccordion },
    { name: 'formValidation', fn: formValidation },
    { name: 'scrollProgressBar', fn: scrollProgressBar },
    { name: 'backToTopButton', fn: backToTopButton },
    { name: 'lazyLoadImages', fn: lazyLoadImages }
  ];
  
  features.forEach(feature => {
    try {
      feature.fn();
      console.log(`✓ ${feature.name} initialized`);
    } catch (e) {
      console.warn(`✗ ${feature.name} error:`, e.message);
    }
  });
}

// ========== PRELOADER ANIMATION ==========
function preloaderAnimation() {
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.transition = 'all 0.6s ease';
      }, 500);
    }
  });
}

// ========== HEADER SCROLL EFFECTS ==========
function headerScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const scrollThreshold = 50;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ========== SMOOTH SCROLL WITH OFFSET ==========
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== THEME TOGGLE WITH PERSISTENCE ==========
function themeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  
  html.className = savedTheme;
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.className;
      const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
      html.className = newTheme;
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark-theme' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ========== MOBILE MENU TOGGLE ==========
function mobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ========== SCROLL PROGRESS BAR ==========
function scrollProgressBar() {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// ========== REVEAL ON SCROLL ANIMATION ==========
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(reveal => observer.observe(reveal));
}

// ========== COUNTER ANIMATION ==========
function counterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;
  
  const speed = 200;
  
  const runCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const increment = target / speed;
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        const displayValue = Math.ceil(current);
        counter.textContent = counter.textContent.includes('+') ? displayValue + '+' : displayValue;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent.includes('+') ? target + '+' : target;
      }
    };
    
    updateCounter();
  };
  
  const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observeCounters.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => observeCounters.observe(counter));
}

// ========== DESTINATION FILTER ==========
function filterDestinations() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destinations = document.querySelectorAll('.destination');
  
  if (filterBtns.length === 0 || destinations.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      destinations.forEach(dest => {
        if (filter === 'all' || dest.getAttribute('data-category') === filter) {
          dest.style.display = 'block';
          setTimeout(() => dest.style.opacity = '1', 10);
          dest.style.animation = 'fadeIn 0.5s ease';
        } else {
          dest.style.opacity = '0';
          dest.style.animation = 'fadeOut 0.5s ease';
          setTimeout(() => dest.style.display = 'none', 500);
        }
      });
    });
  });
}

// ========== FAQ ACCORDION ==========
function faqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
        const icon = question.querySelector('i');
        if (icon) {
          icon.style.transform = 'rotate(45deg)';
        }
      }
    });
  });
}

// ========== FORM VALIDATION ==========
function formValidation() {
  const forms = document.querySelectorAll('form');
  if (forms.length === 0) return;
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm(form)) {
        showFormSuccess(form);
        setTimeout(() => form.reset(), 1000);
      }
    });
  });
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      showErrorMessage(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      input.classList.add('error');
      showErrorMessage(input, 'Please enter a valid email');
      isValid = false;
    } else {
      input.classList.remove('error');
      removeErrorMessage(input);
    }
  });
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showErrorMessage(input, message) {
  const existing = input.nextElementSibling;
  if (existing && existing.classList.contains('error-message')) {
    existing.remove();
  }
  
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error-message');
  errorDiv.textContent = message;
  input.after(errorDiv);
}

function removeErrorMessage(input) {
  const errorMsg = input.nextElementSibling;
  if (errorMsg && errorMsg.classList.contains('error-message')) {
    errorMsg.remove();
  }
}

function showFormSuccess(form) {
  const successMsg = document.createElement('div');
  successMsg.classList.add('success-message');
  successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
  form.prepend(successMsg);
  
  setTimeout(() => successMsg.remove(), 3000);
}

// ========== BACK TO TOP BUTTON ==========
function backToTopButton() {
  let backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    backToTopBtn = btn;
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== LAZY LOADING IMAGES ==========
function lazyLoadImages() {
  if (!('IntersectionObserver' in window)) return;
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => observer.observe(img));
}

// ========== UTILITY FUNCTIONS ==========

function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.classList.add('notification', `notification-${type}`);
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  document.body.appendChild(notification);
  
  const closeBtn = notification.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => notification.remove());
  }
  
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// ========== MODAL FUNCTIONS ==========

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const activeTab = document.getElementById(tabName);
  if (activeTab) activeTab.classList.add('active');
  
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// ========== LOGIN/REGISTER FUNCTIONS ==========

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Mock login - in real app, this would call an API
  if (email && password) {
    showNotification('Login successful! Welcome back.', 'success');
    closeLoginModal();
    // Reset form
    event.target.reset();
  } else {
    showNotification('Please fill in all fields.', 'error');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  
  // Mock registration - in real app, this would call an API
  if (name && email && password) {
    showNotification('Registration successful! Welcome to IMAM Travels.', 'success');
    closeLoginModal();
    // Reset form
    event.target.reset();
  } else {
    showNotification('Please fill in all fields.', 'error');
  }
}

// ========== LIVE CHAT FUNCTIONS ==========

function toggleLiveChat() {
  const chat = document.getElementById('liveChat');
  const toggle = document.getElementById('chatToggle');
  
  if (chat) {
    chat.classList.toggle('active');
    if (toggle) toggle.classList.toggle('active');
  }
}

function sendChatMessage() {
  const input = document.querySelector('.chat-input input');
  const messages = document.querySelector('.chat-messages');
  
  if (!input || !messages || !input.value.trim()) return;
  
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  userMessage.innerHTML = `<p>${input.value}</p>`;
  messages.appendChild(userMessage);
  
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
  
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.innerHTML = `<p>Thanks for your message! Our team will respond within 2 minutes. 😊</p>`;
    messages.appendChild(botMessage);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

// ========== VISA CHECKER ==========

function openVisaChecker() {
  const modal = document.getElementById('visaCheckerModal');
  if (modal) modal.style.display = 'flex';
}

function closeVisaChecker() {
  const modal = document.getElementById('visaCheckerModal');
  if (modal) modal.style.display = 'none';
}

function checkVisa() {
  const nationality = document.getElementById('nationality').value;
  const destination = document.getElementById('destination').value;
  const resultDiv = document.getElementById('visaResult');
  
  if (!nationality || !destination || !resultDiv) return;
  
  const visaTypes = {
    'VISA_FREE': { type: 'Visa Free', days: 30, text: 'No visa required. You can travel visa-free up to 30 days.' },
    'ON_ARRIVAL': { type: 'On Arrival Visa', days: 60, text: 'Visa will be issued on arrival. Standard processing time: 15-30 mins.' },
    'ADVANCE': { type: 'Advance Visa Required', days: 90, text: 'Visa must be obtained before travel. Processing time: 5-10 business days.' }
  };
  
  const destElement = document.getElementById('destination');
  const visaType = destElement.options[destElement.selectedIndex].getAttribute('data-visa');
  const visa = visaTypes[visaType];
  
  if (visa) {
    resultDiv.innerHTML = `
      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px;">
        <h4><i class="fas fa-check-circle" style="color: #4caf50;"></i> ${visa.type}</h4>
        <p><strong>Validity:</strong> Up to ${visa.days} days</p>
        <p><strong>Details:</strong> ${visa.text}</p>
        <p style="margin-top: 10px;"><small>📌 For latest information, contact +92 333-1233009</small></p>
      </div>
    `;
    resultDiv.style.display = 'block';
  }
}

// ========== CURRENCY CONVERTER ==========

function openCurrencyConverter() {
  const modal = document.getElementById('currencyModal');
  if (modal) modal.style.display = 'flex';
}

function closeCurrencyConverter() {
  const modal = document.getElementById('currencyModal');
  if (modal) modal.style.display = 'none';
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value) || 1;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultInput = document.getElementById('result');
  
  if (!resultInput) return;
  
  const rates = {
    'PKR': 1, 'USD': 277.5, 'EUR': 302.5, 'GBP': 347.5, 'AED': 75.5
  };
  
  const baseAmount = amount / (rates[fromCurrency] || 1);
  const converted = baseAmount * (rates[toCurrency] || 1);
  resultInput.value = converted.toFixed(2);
}

// ========== WEATHER CHECKER ==========

function openWeatherChecker() {
  const modal = document.getElementById('weatherModal');
  if (modal) modal.style.display = 'flex';
}

function closeWeatherChecker() {
  const modal = document.getElementById('weatherModal');
  if (modal) modal.style.display = 'none';
}

function showWeather() {
  const select = document.getElementById('weatherDestination');
  const resultDiv = document.getElementById('weatherResult');
  
  if (!select || !select.value || !resultDiv) return;
  
  const option = select.options[select.selectedIndex];
  const temp = option.getAttribute('data-temp');
  const condition = option.getAttribute('data-condition');
  
  resultDiv.innerHTML = `
    <div style="background: linear-gradient(135deg, #87ceeb 0%, #e0f6ff 100%); padding: 20px; border-radius: 8px; margin-top: 15px; text-align: center;">
      <h3><i class="fas fa-cloud-sun"></i> ${select.value}</h3>
      <div style="font-size: 3em; margin: 10px 0;">${temp}°C</div>
      <p style="font-size: 1.2em; margin: 10px 0;">${condition}</p>
      <p style="margin-top: 15px; opacity: 0.8;">💡 <strong>Travel Tip:</strong> Pack light, breathable clothing suitable for these conditions.</p>
    </div>
  `;
  resultDiv.style.display = 'block';
}

// ========== FLIGHT TRACKER ==========

function openFlightTracker() {
  const modal = document.getElementById('flightTrackerModal');
  if (modal) modal.style.display = 'flex';
}

function closeFlightTracker() {
  const modal = document.getElementById('flightTrackerModal');
  if (modal) modal.style.display = 'none';
}

function trackFlight() {
  const flightNum = document.getElementById('flightNumber').value;
  const resultDiv = document.getElementById('flightResult');
  
  if (!flightNum || !resultDiv) return;
  
  resultDiv.innerHTML = `
    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 15px;">
      <h3><i class="fas fa-plane-arrival"></i> Flight Status: ${flightNum}</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px;">
        <div>
          <p><strong>Departure:</strong> 14:30 (On Time)</p>
          <p><strong>From:</strong> Islamabad (ISB)</p>
        </div>
        <div>
          <p><strong>Arrival:</strong> 18:45 (Expected)</p>
          <p><strong>To:</strong> Dubai (DXB)</p>
        </div>
        <div>
          <p><strong>Aircraft:</strong> Boeing 777</p>
          <p><strong>Seat:</strong> 12A</p>
        </div>
        <div>
          <p><strong>Gate:</strong> A4</p>
          <p><strong>Status:</strong> ✅ Confirmed</p>
        </div>
      </div>
      <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">📌 For real-time updates, check your airline's website or contact +92 333-1233009</p>
    </div>
  `;
  resultDiv.style.display = 'block';
}

// ========== BAGGAGE MODAL ==========

function openBaggageModal() {
  const modal = document.getElementById('baggageModal');
  if (modal) modal.style.display = 'flex';
}

function closeBaggageModal() {
  const modal = document.getElementById('baggageModal');
  if (modal) modal.style.display = 'none';
}

// ========== LOYALTY MODAL ==========

function openLoyaltyModal() {
  const modal = document.getElementById('loyaltyModal');
  if (modal) modal.style.display = 'flex';
}

function closeLoyaltyModal() {
  const modal = document.getElementById('loyaltyModal');
  if (modal) modal.style.display = 'none';
}

// ========== EMERGENCY SUPPORT ==========

function openEmergencySupport() {
  const modal = document.getElementById('emergencySupportModal');
  if (modal) modal.style.display = 'flex';
}

function closeEmergencySupport() {
  const modal = document.getElementById('emergencySupportModal');
  if (modal) modal.style.display = 'none';
}

function showEmergencyDetails(type) {
  const emergencyData = {
    'passport': { title: '🛂 Lost Passport', steps: ['Contact embassy', 'File FIR', 'Document support', 'Travel document in 24-48 hours'] },
    'medical': { title: '🏥 Medical Emergency', steps: ['Call +92 333-1233009', 'Locate hospital', 'Insurance activated', 'Full coordination'] },
    'baggage': { title: '🧳 Lost Baggage', steps: ['Report to airline', 'File claim', 'Documentation help', 'Track status'] },
    'flight': { title: '✈️ Flight Issues', steps: ['Instant rebooking', 'Accommodation provided', 'Compensation processed', 'Alternative routing'] }
  };
  
  const data = emergencyData[type];
  if (data) {
    alert(`${data.title}\n\n${data.steps.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\n📞 Emergency: +92 333-1233009`);
  }
}

// ========== GROUP ENQUIRY ==========

function openGroupEnquiry() {
  const modal = document.getElementById('groupEnquiryModal');
  if (modal) modal.style.display = 'flex';
}

function closeGroupEnquiry() {
  const modal = document.getElementById('groupEnquiryModal');
  if (modal) modal.style.display = 'none';
}

// ========== INSURANCE FUNCTIONS ==========

function openInsuranceQuote() {
  const modal = document.getElementById('insuranceModal');
  if (modal) modal.style.display = 'flex';
}

function openInsuranceDetails() {
  const modal = document.getElementById('insuranceModal');
  if (modal) modal.style.display = 'flex';
}

function closeInsuranceDetails() {
  const modal = document.getElementById('insuranceModal');
  if (modal) modal.style.display = 'none';
}

function buyInsurance() {
  showNotification('Insurance added! Proceeding to payment...', 'success');
  setTimeout(() => closeInsuranceDetails(), 1500);
}

// ========== MODAL CLOSE ON ESCAPE & OUTSIDE CLICK ==========

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
    const chat = document.getElementById('liveChat');
    if (chat) chat.classList.remove('active');
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// ========== EVENT LISTENERS FOR BUTTONS ==========

window.addEventListener('load', () => {
  // User account button
  const userAccountBtn = document.getElementById('user-account-btn');
  if (userAccountBtn) {
    userAccountBtn.addEventListener('click', openLoginModal);
  }
  
  // Live chat button
  const liveChatBtn = document.getElementById('live-chat-btn');
  if (liveChatBtn) {
    liveChatBtn.addEventListener('click', toggleLiveChat);
  }
  
  // Chat toggle button (close button)
  const chatToggle = document.getElementById('chatToggle');
  if (chatToggle) {
    chatToggle.addEventListener('click', toggleLiveChat);
  }
  
  console.log('✓ All event listeners attached');
});

console.log('✓ Script fully loaded and ready');
