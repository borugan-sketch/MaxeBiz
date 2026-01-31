const API_URL = '../api'; // Adjust based on deployment
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsCache = {};
let currentScene = null;

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

        currentScene = data.scene;
        // Render Main Media
        const mediaContainer = document.getElementById('media-container');
        if (currentScene.media_type === 'video') {
            mediaContainer.innerHTML = `<video src="${currentScene.media_url}" autoplay loop muted playsinline></video>`;
        } else {
            mediaContainer.innerHTML = `<img src="${currentScene.media_url || 'assets/images/videocom.png'}" alt="${currentScene.name}">`;
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
        el.setAttribute('aria-label', `View ${spot.name}`);

        // Touch and Click handling
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(spot);
        });

        layer.appendChild(el);
    });
}

function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');

    let variantsHtml = '';
    if (product.variants && product.variants.length > 0) {
        variantsHtml = `<div class="variant-selector">
            <p>Select Option:</p>
            ${product.variants.map(v => `<button class="variant-btn" data-id="${v.id}" onclick="selectVariant(this)">${v.value}</button>`).join('')}
        </div>`;
    }

    body.innerHTML = `
        <img src="${product.thumbnail_url}" class="product-detail-img" alt="${product.name}">
        <h2 class="product-title">${product.name}</h2>
        <div class="product-sku">SKU: ${product.sku}</div>
        <div class="product-price">$${product.price}</div>
        <p>${product.description}</p>
        ${variantsHtml}
        <button class="primary-btn" onclick="addToCartHandler(${product.target_product_id}, '${product.name.replace(/'/g, "\\'")}', ${product.price})">Add to Cart</button>
    `;

    modal.classList.remove('hidden');
    productsCache[product.target_product_id] = product; // Cache for later
}

window.selectVariant = function(btn) {
    const group = btn.parentElement;
    group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
};

window.addToCartHandler = function(id, name, price) {
    // Check variant selection
    const variantContainer = document.querySelector('.variant-selector');
    let variantId = null;
    if (variantContainer) {
        const selected = variantContainer.querySelector('.selected');
        if (!selected) {
            alert('Please select an option');
            return;
        }
        variantId = selected.dataset.id;
    }

    addToCart({ id, name, price, variantId });
    document.getElementById('product-modal').classList.add('hidden');

    // Visual confirmation?
    const btn = document.getElementById('cart-fab');
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
};

function addToCart(product) {
    const existing = cart.find(i => i.id === product.id && i.variantId === product.variantId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
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
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity} x $${item.price}</p>
                </div>
                <button class="icon-btn" onclick="removeFromCart(${idx})" style="color:red;"><span class="material-icons">delete</span></button>
            </div>
        `).join('');
    }
}

function setupListeners() {
    // Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            btn.closest('.modal').classList.add('hidden');
        }
    });

    // Drawers
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

    // Checkout Flow
    document.getElementById('checkout-btn').onclick = () => {
        toggleDrawer('cart-drawer', false);
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        document.getElementById('checkout-overlay').classList.remove('hidden');
    };

    // Geolocation
    document.getElementById('geo-btn').onclick = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            // Simple reverse geocode mock or real API call
            document.getElementById('address').value = `Lat: ${latitude}, Long: ${longitude} (Auto-detected)`;
            // Ideally call Google Maps API or OpenStreetMap here
        }, (err) => {
            alert('Unable to retrieve location');
        });
    };

    // Checkout Submit
    document.getElementById('checkout-form').onsubmit = async (e) => {
        e.preventDefault();
        const customer = {
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Processing...';

        try {
            const res = await fetch(`${API_URL}/checkout.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, cart })
            });
            const result = await res.json();

            if (result.success) {
                cart = [];
                saveCart();
                updateCartUI();
                window.location.href = result.whatsapp_url;
            } else {
                alert('Order failed: ' + result.error);
            }
        } catch (err) {
            alert('Network error');
        } finally {
            btn.disabled = false;
            btn.innerText = 'Place Order via WhatsApp';
        }
    };
}
