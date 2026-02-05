// Global cache
const API_URL = 'api';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsCache = {};

document.addEventListener('DOMContentLoaded', init);

async function init() {
    await loadScene();
    updateCartUI();
    setupListeners();
}

async function loadScene() {
    try {
        const res = await fetch(`${API_URL}/products.php`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!data.scene) return;

        // Render Media
        const mediaContainer = document.getElementById('media-container');
        if (data.scene.media_type === 'video') {
            mediaContainer.innerHTML = `<video src="${data.scene.media_url}" autoplay loop muted playsinline></video>`;
        } else {
            mediaContainer.innerHTML = `<img src="${data.scene.media_url || 'assets/images/videocom.png'}" alt="${data.scene.name}">`;
        }

        renderHotspots(data.hotspots);

    } catch (e) {
        console.error('Failed to load scene:', e);
    }
}

function renderHotspots(hotspots) {
    const layer = document.getElementById('hotspots-layer');
    layer.innerHTML = '';
    hotspots.forEach(spot => {
        const el = document.createElement('div');
        el.className = 'hotspot';
        el.style.left = spot.position_x + '%';
        el.style.top = spot.position_y + '%';

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(spot.product);
        });

        layer.appendChild(el);
    });
}

// --- NEW MODAL LOGIC ---
let currentModalProduct = null;
let currentQty = 1;

function openProductModal(product) {
    currentModalProduct = product;
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');

    // 1. Badges
    let badgesHtml = `<div class="badges-container">
        ${product.brand ? `<span class="badge badge-brand">${product.brand}</span>` : ''}
        ${product.category ? `<span class="badge badge-category">${product.category}</span>` : ''}
        ${product.attributes ? Object.entries(product.attributes).map(([k, v]) => `<span class="badge badge-attr">${k}: ${v}</span>`).join('') : ''}
    </div>`;

    // 2. Gallery
    let mainImg = product.thumbnail_url;
    let galleryHtml = '';
    if (product.gallery && product.gallery.length > 0) {
        galleryHtml = `<div class="gallery-strip">
            <img src="${mainImg}" class="thumb active" onclick="swapImage(this, '${mainImg}')">
            ${product.gallery.map(url => `<img src="${url}" class="thumb" onclick="swapImage(this, '${url}')">`).join('')}
        </div>`;
    }

    // 3. Variants
    let variantsHtml = '';
    if (product.variants && product.variants.length > 0) {
        variantsHtml = `<div class="variant-selector">
            <p>Select Option:</p>
            ${product.variants.map(v => `<button class="variant-btn" data-id="${v.id}" onclick="selectVariant(this)">${v.value}</button>`).join('')}
        </div>`;
    }

    // 4. Tiered Pricing Table
    let tierHtml = '';
    if (product.tiers && product.tiers.length > 0) {
        tierHtml = `<div class="tier-table">
            <div class="tier-row header"><span>Qty</span><span>Price</span></div>
            <div class="tier-row"><span>1 - ${product.tiers[0].min_qty - 1}</span><span>$${product.base_price}</span></div>
            ${product.tiers.map((t, idx) => {
                const nextT = product.tiers[idx+1];
                const range = nextT ? `${t.min_qty} - ${nextT.min_qty - 1}` : `${t.min_qty}+`;
                return `<div class="tier-row"><span>${range}</span><span>$${t.unit_price}</span></div>`;
            }).join('')}
        </div>`;
    }

    // 5. Quantity Input
    const moq = product.moq || 1;
    const step = product.qty_step || 1;
    currentQty = moq; // Reset to MOQ

    const qtyHtml = `<div class="qty-control">
        <label>Quantity (Min: ${moq}):</label>
        <div class="qty-inputs">
            <button onclick="adjustQty(-1)">-</button>
            <input type="number" id="qty-input" value="${moq}" min="${moq}" step="${step}" onchange="manualQty(this)">
            <button onclick="adjustQty(1)">+</button>
        </div>
        <div id="dynamic-price" class="price-display">$${product.base_price}</div>
    </div>`;

    body.innerHTML = `
        <div class="modal-top">
            <img id="main-product-img" src="${mainImg}" class="product-detail-img" alt="${product.name}">
            ${galleryHtml}
        </div>
        ${badgesHtml}
        <h2 class="product-title">${product.name}</h2>
        <div class="product-sku">SKU: ${product.sku}</div>
        <p>${product.description}</p>
        ${tierHtml}
        ${variantsHtml}
        ${qtyHtml}
        <button class="primary-btn" onclick="addToCartHandler()">Add to Cart</button>
    `;

    modal.classList.remove('hidden');
    updateDynamicPrice(); // Init price calculation
}

window.swapImage = function(thumb, url) {
    document.getElementById('main-product-img').src = url;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
};

window.adjustQty = function(dir) {
    if (!currentModalProduct) return;
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value);
    const step = currentModalProduct.qty_step || 1;
    const moq = currentModalProduct.moq || 1;

    val += (dir * step);
    if (val < moq) val = moq;

    input.value = val;
    currentQty = val;
    updateDynamicPrice();
};

window.manualQty = function(input) {
    if (!currentModalProduct) return;
    let val = parseInt(input.value);
    const step = currentModalProduct.qty_step || 1;
    const moq = currentModalProduct.moq || 1;

    // Enforce MOQ
    if (val < moq) val = moq;
    // Enforce Step (simple modulo check)
    if ((val - moq) % step !== 0) {
        val = moq + (Math.ceil((val - moq) / step) * step);
    }

    input.value = val;
    currentQty = val;
    updateDynamicPrice();
};

function updateDynamicPrice() {
    if (!currentModalProduct) return;
    const p = currentModalProduct;
    let price = parseFloat(p.base_price);

    // Check tiers
    if (p.tiers) {
        // Tiers sorted ASC by SQL
        for (let t of p.tiers) {
            if (currentQty >= t.min_qty) {
                price = parseFloat(t.unit_price);
            }
        }
    }

    document.getElementById('dynamic-price').innerText = `$${price.toFixed(2)} / unit (Total: $${(price * currentQty).toFixed(2)})`;
    currentModalProduct._currentPrice = price; // Store for cart
}

window.addToCartHandler = function() {
    if (!currentModalProduct) return;

    const variantContainer = document.querySelector('.variant-selector');
    let variantId = null;
    let variantName = '';

    if (variantContainer) {
        const selected = variantContainer.querySelector('.selected');
        if (!selected) {
            alert('Please select an option');
            return;
        }
        variantId = selected.dataset.id;
        variantName = selected.innerText;
    }

    const item = {
        id: currentModalProduct.id,
        name: currentModalProduct.name + (variantName ? ` (${variantName})` : ''),
        price: currentModalProduct._currentPrice,
        quantity: currentQty,
        variantId: variantId,
        thumbnail: currentModalProduct.thumbnail_url
    };

    addToCart(item);
    document.getElementById('product-modal').classList.add('hidden');

    // Animation
    const btn = document.getElementById('cart-fab');
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
};

function addToCart(item) {
    // Logic update: Since prices depend on Qty, we might not want to merge items easily unless we re-calc tier
    // For simplicity, we just push new line items or simplistic merge
    const existing = cart.find(i => i.id === item.id && i.variantId === item.variantId);
    if (existing) {
        // If we merge, we need to re-check the TOTAL qty against tiers?
        // For MVP, we'll just add quantities and update price if needed
        existing.quantity += item.quantity;
        // Ideally we re-fetch tier price here, but let's keep simple
        existing.price = item.price;
    } else {
        cart.push(item);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = '$' + total.toFixed(2);
    document.getElementById('drawer-total').innerText = '$' + total.toFixed(2);

    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <img src="${item.thumbnail}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity} x $${item.price.toFixed(2)}</p>
                </div>
                <button class="icon-btn" onclick="removeFromCart(${idx})" style="color:red;"><span class="material-icons">delete</span></button>
            </div>
        `).join('');
    }
}

// --- CHECKOUT & UI ---
function setupListeners() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => btn.closest('.modal').classList.add('hidden');
    });

    const toggleDrawer = (id, open) => {
        const el = document.getElementById(id);
        if (open) el.classList.add('open');
        else el.classList.remove('open');
    };

    document.getElementById('cart-fab').onclick = () => toggleDrawer('cart-drawer', true);
    document.querySelector('#cart-drawer .close-drawer').onclick = () => toggleDrawer('cart-drawer', false);
    document.getElementById('menu-btn').onclick = () => toggleDrawer('menu-drawer', true);
    document.querySelector('#menu-drawer .close-menu').onclick = () => toggleDrawer('menu-drawer', false);

    document.getElementById('support-btn').onclick = () => {
        document.getElementById('support-dropdown').classList.toggle('hidden');
    };

    // Checkout Buttons in Drawer
    // NOTE: HTML for drawer needs update to have 2 buttons
}

// Global variant selector
window.selectVariant = function(btn) {
    const group = btn.parentElement;
    group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
};

// Checkout Handlers
window.startCheckout = function(type) {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }
    document.getElementById('cart-drawer').classList.remove('open');

    const overlay = document.getElementById('checkout-overlay');
    overlay.classList.remove('hidden');

    // Customize Form based on Type
    const title = document.querySelector('#checkout-overlay h2');
    const submitBtn = document.querySelector('#checkout-form button[type="submit"]');
    const paymentDiv = document.getElementById('payment-options');

    // Store type in form dataset
    document.getElementById('checkout-form').dataset.type = type;

    if (type === 'rfq') {
        title.innerText = 'Request Quote';
        submitBtn.innerText = 'Send Request (WhatsApp/Email)';
        if(paymentDiv) paymentDiv.style.display = 'none';
    } else {
        title.innerText = 'Checkout';
        submitBtn.innerText = 'Place Order';
        if(paymentDiv) paymentDiv.style.display = 'block';
    }
};

document.getElementById('checkout-form').onsubmit = async (e) => {
    e.preventDefault();
    const type = e.target.dataset.type || 'order';

    const customer = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    let paymentMethod = 'offline';
    if (type === 'order') {
        const pMethodEl = document.querySelector('input[name="payment"]:checked');
        if (pMethodEl) paymentMethod = pMethodEl.value;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = 'Processing...';

    try {
        const res = await fetch(`${API_URL}/checkout.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer, cart, type, paymentMethod })
        });
        const result = await res.json();

        if (result.success) {
            cart = [];
            saveCart();
            updateCartUI();

            // If RFQ, maybe ask user where to go? For now just WhatsApp
            if (confirm(`Success! Open WhatsApp?`)) {
                window.location.href = result.whatsapp_url;
            }
            // Or use mailto
            // window.location.href = result.mailto_url;
        } else {
            alert('Failed: ' + result.error);
        }
    } catch (err) {
        alert('Network error');
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
};

// Geolocation (Same as before)
document.getElementById('geo-btn').onclick = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
        document.getElementById('address').value = `Lat: ${pos.coords.latitude}, Long: ${pos.coords.longitude}`;
    });
};
