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

// Shopping List - Advanced Version
let pendingItems = [];
let purchasedItems = [];

// Quantity controls
function increaseQty() {
  const qtyInput = document.getElementById('itemQty');
  qtyInput.value = parseFloat(qtyInput.value) + 1;
}

function decreaseQty() {
  const qtyInput = document.getElementById('itemQty');
  const currentQty = parseFloat(qtyInput.value);
  if (currentQty > 0.01) {
    qtyInput.value = (currentQty - 1).toFixed(2);
  }
}

// Add Item
document.getElementById('addItemForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('itemName').value.trim();
  const qty = document.getElementById('itemQty').value;
  const unit = document.getElementById('itemUnit').value;
  const note = document.getElementById('itemNote').value.trim();
  
  if (!name) {
    alert('Please enter item name');
    return;
  }
  
  if (!unit) {
    alert('Please select a unit');
    return;
  }
  
  const item = {
    id: Date.now(),
    name: name,
    quantity: qty,
    unit: unit,
    note: note || '-',
    status: 'pending'
  };
  
  pendingItems.push(item);
  
  // Clear form
  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '1';
  document.getElementById('itemUnit').value = '';
  document.getElementById('itemNote').value = '';
  
  renderLists();
});

// Mark as Purchased
function markPurchased(id) {
  const item = pendingItems.find(i => i.id === id);
  if (item) {
    item.status = 'purchased';
    purchasedItems.push(item);
    pendingItems = pendingItems.filter(i => i.id !== id);
    renderLists();
  }
}

// Mark as Pending (undo purchase)
function markPending(id) {
  const item = purchasedItems.find(i => i.id === id);
  if (item) {
    item.status = 'pending';
    pendingItems.push(item);
    purchasedItems = purchasedItems.filter(i => i.id !== id);
    renderLists();
  }
}

// Edit Item
// Edit Item - Inline editing
function editItem(id) {
  const item = pendingItems.find(i => i.id === id);
  if (!item) return;
  
  const row = event.target.closest('tr');
  
  // Replace row content with editable inputs
  row.innerHTML = `
    <td class="py-3 px-4">
      <input type="text" id="edit-name-${id}" value="${item.name}" 
             class="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
    </td>
    <td class="py-3 px-4">
      <input type="number" id="edit-qty-${id}" value="${item.quantity}" step="0.01" min="0.01"
             class="w-full px-3 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500">
    </td>
    <td class="py-3 px-4">
      <select id="edit-unit-${id}" class="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
        <option value="kg" ${item.unit === 'kg' ? 'selected' : ''}>kg</option>
        <option value="g" ${item.unit === 'g' ? 'selected' : ''}>g</option>
        <option value="ltr" ${item.unit === 'ltr' ? 'selected' : ''}>ltr</option>
        <option value="ml" ${item.unit === 'ml' ? 'selected' : ''}>ml</option>
        <option value="pcs" ${item.unit === 'pcs' ? 'selected' : ''}>pcs</option>
        <option value="dozen" ${item.unit === 'dozen' ? 'selected' : ''}>dozen</option>
      </select>
    </td>
    <td class="py-3 px-4">
      <input type="text" id="edit-note-${id}" value="${item.note === '-' ? '' : item.note}" 
             class="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
    </td>
    <td class="py-3 px-4">
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Editing</span>
    </td>
    <td class="py-3 px-4">
      <div class="flex gap-2">
        <button onclick="saveEdit(${id})" class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
          Save
        </button>
        <button onclick="renderLists()" class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </td>
  `;
}

// Save edited item
function saveEdit(id) {
  const item = pendingItems.find(i => i.id === id);
  if (!item) return;
  
  const newName = document.getElementById(`edit-name-${id}`).value.trim();
  const newQty = document.getElementById(`edit-qty-${id}`).value;
  const newUnit = document.getElementById(`edit-unit-${id}`).value;
  const newNote = document.getElementById(`edit-note-${id}`).value.trim();
  
  if (!newName) {
    alert('Item name cannot be empty');
    return;
  }
  
  item.name = newName;
  item.quantity = newQty;
  item.unit = newUnit;
  item.note = newNote || '-';
  
  renderLists();
}

// Delete Item
function deleteItem(id, isPurchased = false) {
  if (confirm('Delete this item?')) {
    if (isPurchased) {
      purchasedItems = purchasedItems.filter(i => i.id !== id);
    } else {
      pendingItems = pendingItems.filter(i => i.id !== id);
    }
    renderLists();
  }
}

// Render Lists
function renderLists() {
  const pendingBody = document.getElementById('pendingItemsBody');
  const purchasedBody = document.getElementById('purchasedItemsBody');
  const pendingCount = document.getElementById('pendingCount');
  const purchasedCount = document.getElementById('purchasedCount');
  
  if (!pendingBody || !purchasedBody) return;
  
  // Update counts
  pendingCount.textContent = pendingItems.length;
  purchasedCount.textContent = purchasedItems.length;
  
  // Render Pending Items
  if (pendingItems.length === 0) {
    pendingBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No pending items</td></tr>';
  } else {
    pendingBody.innerHTML = pendingItems.map(item => `
      <tr class="border-b hover:bg-gray-50">
        <td class="py-3 px-4 font-medium text-gray-800">${item.name}</td>
        <td class="py-3 px-4 text-gray-700">${item.quantity}</td>
        <td class="py-3 px-4 text-gray-700">${item.unit}</td>
        <td class="py-3 px-4 text-gray-600 text-sm">${item.note}</td>
        <td class="py-3 px-4"><span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Pending</span></td>
        <td class="py-3 px-4">
          <div class="flex gap-2">
            <button onclick="editItem(${item.id})" class="text-gray-600 hover:text-gray-800">
              <span class="text-lg">✏️</span>
            </button>
            <button onclick="markPurchased(${item.id})" class="text-green-600 hover:text-green-800">
              <span class="text-lg">✓</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
  
  // Render Purchased Items
  if (purchasedItems.length === 0) {
    purchasedBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No purchased items</td></tr>';
  } else {
    purchasedBody.innerHTML = purchasedItems.map(item => `
      <tr class="border-b hover:bg-gray-50">
        <td class="py-3 px-4 font-medium text-gray-800 line-through">${item.name}</td>
        <td class="py-3 px-4 text-gray-700">${item.quantity}</td>
        <td class="py-3 px-4 text-gray-700">${item.unit}</td>
        <td class="py-3 px-4 text-gray-600 text-sm">${item.note}</td>
        <td class="py-3 px-4"><span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Purchased</span></td>
        <td class="py-3 px-4">
          <button onclick="markPending(${item.id})" class="text-blue-600 hover:text-blue-800">
            <span class="text-lg">↩️</span>
          </button>
        </td>
      </tr>
    `).join('');
  }
}

// Initialize on page load
if (window.location.pathname.includes('shoppinglist')) {
  renderLists();
}