// ============================================
// ADVANCED TRAVEL WEBSITE - PREMIUM FEATURES
// ============================================

// ========== MODAL MANAGEMENT ==========
class ModalManager {
  constructor() {
    this.openModals = new Set();
  }

  openModal(modalId, title = '', content = '') {
    const modal = document.getElementById(modalId);
    if (!modal) {
      this.createCustomModal(modalId, title, content);
      return;
    }

    modal.style.display = 'flex';
    this.openModals.add(modalId);
    document.body.style.overflow = 'hidden';
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      this.openModals.delete(modalId);
      if (this.openModals.size === 0) {
        document.body.style.overflow = 'auto';
      }
    }
  }

  createCustomModal(modalId, title, content) {
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'advanced-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" onclick="modalManager.closeModal('${modalId}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">${content}</div>
      </div>
    `;
    document.body.appendChild(modal);
    this.openModal(modalId);
  }
}

const modalManager = new ModalManager();

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('advanced-modal')) {
    const modalId = e.target.id;
    modalManager.closeModal(modalId);
  }
});

// ========== PREMIUM FEATURES - REFERRAL PROGRAM ==========
function showReferralProgram() {
  const content = `
    <div class="feature-content">
      <h3>Share & Earn Rewards</h3>
      <div class="referral-stats">
        <div class="stat">
          <div class="stat-value">PKR 2,500</div>
          <div class="stat-label">Per Referral</div>
        </div>
        <div class="stat">
          <div class="stat-value">∞</div>
          <div class="stat-label">Unlimited Earnings</div>
        </div>
        <div class="stat">
          <div class="stat-value">24hrs</div>
          <div class="stat-label">Activation</div>
        </div>
      </div>
      <div class="referral-steps">
        <div class="step">
          <div class="step-num">1</div>
          <h4>Share Your Code</h4>
          <p>Code: REF-USER-2024</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h4>Friends Signup</h4>
          <p>They use your referral code</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h4>Get Rewarded</h4>
          <p>Earn PKR 2,500 per booking</p>
        </div>
      </div>
      <button class="cta-button" onclick="copyToClipboard('REF-USER-2024'); showNotification('Referral code copied!', 'success')">
        Copy Code & Share
      </button>
    </div>
  `;
  modalManager.createCustomModal('referralModal', '🎁 Referral Program', content);
}

// ========== PREMIUM FEATURES - INSURANCE COMPARISON ==========
function showInsuranceComparison() {
  const content = `
    <div class="feature-content">
      <h3>Compare Travel Insurance Plans</h3>
      <div class="insurance-grid">
        <div class="insurance-plan">
          <h4>Basic Coverage</h4>
          <div class="price">PKR 499</div>
          <ul>
            <li>✓ Medical Coverage: 1 Lakh</li>
            <li>✓ Trip Cancellation</li>
            <li>✓ Lost Luggage</li>
            <li>✗ Adventure Sports</li>
          </ul>
          <button class="btn btn-primary" onclick="showNotification('Plan added to cart!', 'success')">Select</button>
        </div>
        <div class="insurance-plan featured">
          <div class="badge">Popular</div>
          <h4>Standard Coverage</h4>
          <div class="price">PKR 899</div>
          <ul>
            <li>✓ Medical Coverage: 5 Lakh</li>
            <li>✓ Trip Cancellation</li>
            <li>✓ Lost Luggage</li>
            <li>✓ Adventure Sports</li>
            <li>✓ Flight Delay (12hrs+)</li>
          </ul>
          <button class="btn btn-secondary" onclick="showNotification('Plan added to cart!', 'success')">Select</button>
        </div>
        <div class="insurance-plan">
          <h4>Premium Coverage</h4>
          <div class="price">PKR 1,499</div>
          <ul>
            <li>✓ Medical Coverage: 10 Lakh</li>
            <li>✓ Trip Cancellation</li>
            <li>✓ Lost Luggage</li>
            <li>✓ Adventure Sports</li>
            <li>✓ 24/7 Assistance</li>
            <li>✓ Family Coverage</li>
          </ul>
          <button class="btn btn-primary" onclick="showNotification('Plan added to cart!', 'success')">Select</button>
        </div>
      </div>
    </div>
  `;
  modalManager.createCustomModal('insuranceModal', '🛡️ Travel Insurance', content);
}

// ========== PREMIUM FEATURES - TRAVEL BUDDY ==========
function showTravelBuddy() {
  const content = `
    <div class="feature-content">
      <h3>Find Travel Companions</h3>
      <input type="text" placeholder="Destination" class="form-input">
      <input type="date" placeholder="Travel Date" class="form-input">
      <textarea placeholder="About yourself (optional)" class="form-input" rows="3"></textarea>
      <div class="buddy-grid">
        <div class="buddy-card">
          <div class="buddy-avatar">🧑</div>
          <h4>Ahmed Hassan</h4>
          <p>Dubai, UAE</p>
          <p class="buddy-interest">🎯 Heading to London | Budget: PKR 50K-60K</p>
          <button class="btn btn-primary" onclick="showNotification('Connection request sent!', 'success')">Connect</button>
        </div>
        <div class="buddy-card">
          <div class="buddy-avatar">👩</div>
          <h4>Fatima Ali</h4>
          <p>Karachi, Pakistan</p>
          <p class="buddy-interest">🎯 Group trip to Turkey | Budget: PKR 70K-80K</p>
          <button class="btn btn-primary" onclick="showNotification('Connection request sent!', 'success')">Connect</button>
        </div>
      </div>
    </div>
  `;
  modalManager.createCustomModal('buddyModal', '👥 Travel Buddy', content);
}

// ========== PREMIUM FEATURES - MEMBERSHIP TIERS ==========
function showMembershipTiers() {
  const content = `
    <div class="feature-content">
      <h3>Exclusive Member Benefits</h3>
      <div class="membership-grid">
        <div class="tier silver">
          <h4>Silver</h4>
          <div class="benefits">
            <p>✓ 5% Discount on all bookings</p>
            <p>✓ Priority customer support</p>
            <p>✓ Exclusive deals</p>
            <p>✓ Birthday bonus: PKR 1,000</p>
            <div class="price">JOIN FREE</div>
          </div>
          <button class="btn btn-primary" onclick="showNotification('Welcome to Silver tier!', 'success')">Activate</button>
        </div>
        <div class="tier gold featured">
          <div class="badge">Most Popular</div>
          <h4>Gold</h4>
          <div class="benefits">
            <p>✓ 10% Discount on all bookings</p>
            <p>✓ VIP support 24/7</p>
            <p>✓ Free travel insurance</p>
            <p>✓ Birthday bonus: PKR 2,500</p>
            <p>✓ Earn 2x loyalty points</p>
            <div class="price">PKR 999/year</div>
          </div>
          <button class="btn btn-secondary" onclick="showNotification('Welcome to Gold tier!', 'success')">Upgrade</button>
        </div>
        <div class="tier platinum">
          <h4>Platinum</h4>
          <div class="benefits">
            <p>✓ 15% Discount on all bookings</p>
            <p>✓ Personal travel concierge</p>
            <p>✓ Premium insurance included</p>
            <p>✓ Birthday bonus: PKR 5,000</p>
            <p>✓ 3x loyalty points</p>
            <p>✓ Airport lounge access</p>
            <div class="price">PKR 2,999/year</div>
          </div>
          <button class="btn btn-primary" onclick="showNotification('Welcome to Platinum tier!', 'success')">Upgrade</button>
        </div>
      </div>
    </div>
  `;
  modalManager.createCustomModal('membershipModal', '👑 Membership Tiers', content);
}

// ========== PREMIUM FEATURES - DESTINATION QUIZ ==========
function showDestinationQuiz() {
  const content = `
    <div class="feature-content">
      <h3>Find Your Perfect Destination</h3>
      <div class="quiz-form">
        <div class="quiz-question">
          <label>What's your travel style?</label>
          <div class="quiz-options">
            <button class="quiz-btn" onclick="selectAnswer('adventure', event)">🏔️ Adventure</button>
            <button class="quiz-btn" onclick="selectAnswer('luxury', event)">💎 Luxury</button>
            <button class="quiz-btn" onclick="selectAnswer('culture', event)">🏛️ Culture</button>
            <button class="quiz-btn" onclick="selectAnswer('relaxation', event)">🏖️ Relaxation</button>
          </div>
        </div>
        <div class="quiz-question">
          <label>Budget range?</label>
          <div class="quiz-options">
            <button class="quiz-btn" onclick="selectAnswer('budget', event)">💰 Budget (< PKR 50K)</button>
            <button class="quiz-btn" onclick="selectAnswer('mid', event)">💳 Mid (PKR 50K-100K)</button>
            <button class="quiz-btn" onclick="selectAnswer('premium', event)">💵 Premium (> PKR 100K)</button>
          </div>
        </div>
        <button class="cta-button" onclick="showQuizResults()">Get Recommendations</button>
      </div>
    </div>
  `;
  modalManager.createCustomModal('quizModal', '🧭 Destination Finder', content);
}

// ========== PREMIUM FEATURES - HAJJ GUIDE ==========
function showHajjGuide() {
  const content = `
    <div class="feature-content">
      <h3>Hajj 2026 Complete Guide</h3>
      <div class="hajj-timeline">
        <div class="timeline-item">
          <div class="timeline-date">June 2025</div>
          <h4>Registration Opens</h4>
          <p>Start your Hajj journey with early bird packages</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Dec 2025</div>
          <h4>Pre-Hajj Training</h4>
          <p>Comprehensive training sessions & workshops</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">July 2026</div>
          <h4>Hajj Pilgrimage</h4>
          <p>Sacred journey with expert guidance</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Aug 2026</div>
          <h4>Post-Hajj Support</h4>
          <p>Follow-up and certificate issuance</p>
        </div>
      </div>
      <div class="hajj-packages">
        <h4>2026 Packages Starting From:</h4>
        <p style="font-size: 1.3rem; font-weight: 700; color: var(--accent-color); margin: 1rem 0;">
          PKR 149,900 (Economy) - PKR 399,900 (Premium Gold)
        </p>
      </div>
      <button class="cta-button" onclick="window.location.href='UMRAH_HAJJ.HTML'">View Full Packages</button>
    </div>
  `;
  modalManager.createCustomModal('hajjModal', '🕌 Hajj 2026 Guide', content);
}

// ========== UTILITY FUNCTIONS ==========
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
    console.log('Copy failed:', err);
  });
}

function selectAnswer(answer, event) {
  document.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const target = event ? event.target : null;
  if (target) {
    target.classList.add('active');
  }
}

function showQuizResults() {
  showNotification('📍 Based on your answers, we recommend: Dubai, Turkey, or Bali!', 'info', 4000);
  setTimeout(() => {
    modalManager.closeModal('quizModal');
  }, 1500);
}

// ========== RATING SYSTEM ==========
function initializeRatingSystem() {
  document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => {
          i <= index ? s.classList.add('active') : s.classList.remove('active');
        });
      });
    });
  });
}

// ========== SEARCH FUNCTIONALITY ==========
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      console.log('Searching for:', query);
      // Implement search logic
    });
  }
}

// ========== LIVE PRICE TRACKER ==========
class PriceTracker {
  constructor() {
    this.watchlist = [];
  }

  addToWatchlist(route, currentPrice) {
    this.watchlist.push({
      route,
      currentPrice,
      timestamp: new Date(),
      history: [currentPrice]
    });
    localStorage.setItem('priceWatchlist', JSON.stringify(this.watchlist));
    showNotification(`✅ Added ${route} to watchlist!`, 'success');
  }

  getPriceHistory(route) {
    const item = this.watchlist.find(w => w.route === route);
    return item ? item.history : [];
  }

  updatePrices() {
    // Simulate price updates
    this.watchlist.forEach(item => {
      const priceChange = (Math.random() - 0.5) * 2000;
      item.currentPrice += priceChange;
      item.history.push(item.currentPrice);
    });
  }
}

const priceTracker = new PriceTracker();

// ========== FLIGHT COMPARISON TOOL ==========
function showFlightComparison() {
  const content = `
    <div class="feature-content">
      <h3>Compare Flight Prices</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <tr style="background: var(--light-bg);">
          <th style="padding: 1rem; text-align: left;">Airline</th>
          <th style="padding: 1rem; text-align: left;">Duration</th>
          <th style="padding: 1rem; text-align: left;">Price</th>
          <th style="padding: 1rem;">Action</th>
        </tr>
        <tr>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;">Emirates</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;">4h 30m</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee; color: var(--secondary-color); font-weight: 600;">PKR 18,500</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;"><button class="btn btn-primary" onclick="showNotification('Flight selected!', 'success')">Book</button></td>
        </tr>
        <tr>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;">Qatar Airways</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;">5h 15m</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee; color: var(--accent-color); font-weight: 600;">PKR 16,900</td>
          <td style="padding: 1rem; border-bottom: 1px solid #eee;"><button class="btn btn-primary" onclick="showNotification('Flight selected!', 'success')">Book</button></td>
        </tr>
        <tr>
          <td style="padding: 1rem;">PIA</td>
          <td style="padding: 1rem;">6h 0m</td>
          <td style="padding: 1rem; color: #2ecc71; font-weight: 600;">PKR 14,500</td>
          <td style="padding: 1rem;"><button class="btn btn-primary" onclick="showNotification('Flight selected!', 'success')">Book</button></td>
        </tr>
      </table>
    </div>
  `;
  modalManager.createCustomModal('comparisonModal', '✈️ Flight Comparison', content);
}

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', () => {
  initializeRatingSystem();
  initializeSearch();
  priceTracker.updatePrices();
});

// Premium card event listeners
document.querySelectorAll('.premium-card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const features = [
      showReferralProgram,
      showInsuranceComparison,
      showTravelBuddy,
      showMembershipTiers,
      showDestinationQuiz,
      showHajjGuide
    ];
    if (features[index]) features[index]();
  });
});
