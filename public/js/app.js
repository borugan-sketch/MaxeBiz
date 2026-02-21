// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');

    // Initial State
    const state = {
        view: 'shop-floor', // shop-floor, warehouse, clinical, summary, dashboard, about
        cart: [],
        panelOpen: false,
        products: [
            // Shop Floor Products
            {
                id: 'CRN-9000',
                name: 'Overhead Bridge Crane',
                sku: 'CRN-9000',
                price: null, // Price on Request
                description: 'Heavy-duty overhead bridge crane for industrial lifting. Customizable span and capacity.',
                specs: { 'Capacity': '10-20 Tons', 'Span': '20-30m', 'Speed': '30m/min' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBiUzNabHblcs4fD87ZYPHFlahaiHrfjqQTnUf6An-lpnfIkiG9aRUMGRlndn_skigi9DCt8I9Cawp22_2TBm7UydaSSKJVUsek9A_n88gUlr7xSJoggY7SBINTvCpoz2SU2M9EkHwXe14EEQCcYKSaDa4J_a9HCrP7-Zy5qpR462s8xE8C87iyMcHwj5BlwG3O0RNQjuQWHdY3Re97Z45-0zCxv7KMvc9hV88VP01ecjRHbB0AE8i2yPzbqOclEPAAfs-cEaxA9ZQ',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJs1c_CFP2j_A-PN_oLqRAJZmvYvvuKbYkA9cq3hZDY399rL9kk8e9kaRyXzvbEcVXHMxh_dmR16abHQhhSn8rJ8P9xT40gbTMn6z0iLa1gBGI8QsHaS8-Z4oQKDN7bCEdrxuDcP4arO3LXQhXeY6AH5t_04KeBx8XH5slH2JeGJQk1iBsxEk6LJ1uSXJU52Qxd7hysKUPwtX9UvrvF7jc4b6nEWQiUfQ6StRdeYtpjBgh2eXbzWaA5bYCYsZXXX2N8AlUfOejgf0'
                ],
                video: 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=0', // 4K Nature Landscape
                attributes: [
                    { name: 'Capacity', options: ['10 Tons', '15 Tons', '20 Tons'] },
                    { name: 'Span', options: ['20m', '25m', '30m'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'shop-floor'
            },
            {
                id: 'SAF-200',
                name: 'Safety Barrier System',
                sku: 'SAF-200',
                price: 250,
                description: 'Modular safety barrier system for walkway protection. Available in high-visibility colors.',
                specs: { 'Height': '1.2m', 'Material': 'Steel', 'Standard': 'ISO 14122' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAt-wc2Oin_7aoiqjelIrwc5I9HqKonLxyDqb7T8_OWv8gdGizXIQMEMbo9HF7e6uFHyFraHDlrvwiFU1pd-xaOx11tTvG283RUJwsvFaE_8JDS7UjAApTOyMgWQ_VZIgTlUYZoLWTih4cd5_t9R1wvahhhkSa2V_tpQ4ErMFsI9N6y8v9QG2HyA2CKfFSZmxy-ydrYuE2nqwwLktF1uDCygHp3M-KP5egUulaG83Bs6r1AyoGXwiTbjdXpxlXeG9z3I6SDWhBtUas'
                ],
                attributes: [
                    { name: 'Length', options: ['1m Section', '2m Section', 'Corner Unit'] },
                    { name: 'Color', options: ['Safety Yellow', 'Hazard Red'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'shop-floor'
            },
            {
                id: 'IND-CNC-500X',
                name: 'Axis-5 CNC Station',
                sku: 'IND-CNC-500X',
                price: 84500,
                description: 'High-precision 5-axis CNC machining center with automated tool changing.',
                specs: { 'Spindle': '12,000 RPM', 'Power': '35 kW', 'Weight': '4,500 KG' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDJs1c_CFP2j_A-PN_oLqRAJZmvYvvuKbYkA9cq3hZDY399rL9kk8e9kaRyXzvbEcVXHMxh_dmR16abHQhhSn8rJ8P9xT40gbTMn6z0iLa1gBGI8QsHaS8-Z4oQKDN7bCEdrxuDcP4arO3LXQhXeY6AH5t_04KeBx8XH5slH2JeGJQk1iBsxEk6LJ1uSXJU52Qxd7hysKUPwtX9UvrvF7jc4b6nEWQiUfQ6StRdeYtpjBgh2eXbzWaA5bYCYsZXXX2N8AlUfOejgf0'
                ],
                attributes: [
                    { name: 'Spindle Speed', options: ['12,000 RPM', '15,000 RPM'] },
                    { name: 'Coolant System', options: ['Standard', 'High Pressure'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'shop-floor'
            },
            // Warehouse Products
            {
                id: 'FRK-9902',
                name: 'Autonomous Forklift X1',
                sku: 'AF-9902-X',
                price: 45000,
                description: 'AI-driven autonomous forklift for smart warehouses. Lidar navigation included.',
                specs: { 'Capacity': '5,000 KG', 'Power': '48V Li-ION', 'Lift': '6.5m' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqtM09qLumTpU8JM4uK6I8fvxa5NTfzcpVGNwwS0GLs8f0TOUhe-DmOuXXDppxU1SJ4towAe0_A8YtfsTVcAhcNsv-b0U1TDm2adouN4b_0Mxz_OFJ28eBZVM1ckmYKTBTNCGJk1mSqCD80JgnR1HVCSfd_H1UqfVL7CXXzhOmX0Am5AThXob1RGZosP8onDO68eQ_zjUAmqSsplQVhmz5NNWlwp1STCjWfavgK4sJ7EVYpJnpj4XFJWbP6LKD49f6r1wuE2h_jkY'
                ],
                attributes: [
                    { name: 'Battery', options: ['Standard Range', 'Extended Range'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'warehouse'
            },
            {
                id: 'RACK-001',
                name: 'Heavy Duty Racking',
                sku: 'HD-RACK-01',
                price: 899,
                description: 'Industrial strength steel frame, modular design for pallet storage.',
                specs: { 'Material': 'Steel', 'Load': '2000kg/level', 'Height': '4m' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBaS_l3wFwfXT1ihrL3b5L4dcguCs9YkiYvTbkrM_6b2U1G0vMNTeHmpNQWLK-Z8XlkDLUwmqL1SaMj9PawtbXp2rBHesZRAcQYL1If5GQZbIclFcto-ZRpjK5JikjkV1zgDQTU9G4VcEBcPsSWPyBJuTTY_E_kf7waiDO4Mj1d2AfQspf-OGxvBJqlAUZHUSComuL3ZxWnFj2r9gVHXrTqZ7ItYBdjPvHWw4Et67UgyBX128qqqNvoN07eys2U03zXEO9Pok7wlTM'
                ],
                attributes: [
                    { name: 'Height', options: ['4m', '6m', '8m'] },
                    { name: 'Depth', options: ['1.0m', '1.2m'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'warehouse'
            },
            // Clinical Products
            {
                id: 'MED-SCC-200',
                name: 'Surgical Case Cart',
                sku: 'MED-SCC-200',
                price: 1240,
                description: 'Sterile transport cart for surgical instruments. Bio-safe materials.',
                specs: { 'Material': '304 Stainless', 'Capacity': '450L', 'Weight': '185 lbs' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuA3OMM2aL_N188arTFlD7uQRDoTqHJRjiIqUSPDNN5x85_UEY8rxnXMJV31rfire55PMBzBakoBEvDdbrwUm6OMYTfKmscv6E2nwClEFbBa-K5S8BcNVn0Gbijo1rGamYCWU7BWinzDVM-hK5wg54__EiJPH01jmY8-WOALL39kWgPSD6r5XlkP0vHL9q36wuLcIGEIw56poFX0W3L_45nr7Hcmrf5av-ursB4iVA9uSK-oaA2GwdI6Unbpf35IzKrCIlkaLQIF76Y'
                ],
                attributes: [
                    { name: 'Shelves', options: ['2 Shelves', '3 Shelves'] },
                    { name: 'Casters', options: ['Standard', 'Anti-static'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'clinical'
            },
             {
                id: 'MED-DISP-4K',
                name: 'Surgical Display 4K',
                sku: 'MED-DISP-4K',
                price: 3500,
                description: 'High-resolution 4K display for surgical imaging and diagnostics.',
                specs: { 'Resolution': '3840x2160', 'Size': '32"', 'Brightness': '800 nits' },
                images: [
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCZo63U0GllJOEbTmEhWPltxoy2FW2-LhXFFAtLxzsXlm1nAE81GMnRm9wTjBbsWYpz5zdz_MiJwkHCWwAgZzMjYT5O97-Bmn2lPN3e0cx2gEyvHL41W15PX5nvncBKXrhkdlYK1e3lcaRSpSzrh8vMXfd4OP45CUIPIj27_eZvm4IawuCDYsRsl__ypwlmxNPfC-ty9E9SCMMdXrg7HVQa_E5KW84xMWbrPANzA8EwUFSW21jk86Neg2DoDN0yQ0fpTb5J6m5An7I'
                ],
                attributes: [
                    { name: 'Mount', options: ['Wall Mount', 'Boom Mount'] }
                ],
                pdf_link: '#',
                detail_link: '#',
                category: 'clinical'
            }
        ]
    };

    // DOM Elements
    const appContainer = document.getElementById('app-container');
    const modalContainer = document.getElementById('modal-container');
    const panelContainer = document.getElementById('panel-container');

    // Global App Object
    window.app = {
        navigateTo: (viewName) => {
            console.log('Navigating to:', viewName);
            state.view = viewName;

            const titles = {
                'shop-floor': 'Shop Floor Explorer',
                'warehouse': 'Warehouse Logistics',
                'clinical': 'Clinical Environment',
                'summary': 'Quote Summary',
                'dashboard': 'User Dashboard',
                'about': 'About Us'
            };
            document.title = `${titles[viewName] || 'Explorer'} | Immersive Industrial Tech`;

            // Update Meta Description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', `Navigate the ${titles[viewName] || 'industrial'} section. Configure products, view specs, and request quotes instantly.`);
            }

            updateView();
            updateNavState();
        },
        toggleCart: () => {
            console.log('Toggling cart');
            state.panelOpen = !state.panelOpen;
            updatePanelState();
        },
        addToCart: (item) => {
            console.log('Adding to cart:', item);
            // Config key handles uniqueness
            const configKey = item.sku + '-' + JSON.stringify(item.selectedOptions || {});

            const existingItem = state.cart.find(i => i.configKey === configKey);
            if (existingItem) {
                existingItem.qty++;
            } else {
                state.cart.push({ ...item, qty: 1, configKey });
            }
            updateCartBadge();
            if (state.panelOpen) renderPanel();
        },
        closeModal: () => {
            modalContainer.innerHTML = '';
        },
        openModal: (productId) => {
             console.log('Opening modal for:', productId);
             const product = state.products.find(p => p.id === productId);
             if (product) {
                 renderModal(product);
             }
        },
        updateQty: (configKey, change) => {
            const item = state.cart.find(i => i.configKey === configKey);
            if (item) {
                item.qty += change;
                if (item.qty <= 0) {
                    window.app.removeFromCart(configKey);
                } else {
                    updateCartBadge();
                    if (state.view === 'summary') renderSummary();
                    if (state.panelOpen) renderPanel();
                }
            }
        },
        removeFromCart: (configKey) => {
            state.cart = state.cart.filter(i => i.configKey !== configKey);
            updateCartBadge();
            if (state.view === 'summary') renderSummary();
            if (state.panelOpen) renderPanel();
        },
        setModalImage: (url) => {
            const imgEl = document.getElementById('modal-main-image');
            const videoContainer = document.getElementById('modal-video-container');
            const imageContainer = document.getElementById('modal-image-container');

            if(imgEl) {
                imgEl.src = url;
                if(videoContainer && imageContainer) {
                     videoContainer.classList.add('hidden');
                     imageContainer.classList.remove('hidden');
                }
            }
        },
        showModalVideo: () => {
             const videoContainer = document.getElementById('modal-video-container');
             const imageContainer = document.getElementById('modal-image-container');
             if(videoContainer && imageContainer) {
                 imageContainer.classList.add('hidden');
                 videoContainer.classList.remove('hidden');
             }
        },
        handleAddToCart: (productId) => {
            const product = state.products.find(p => p.id === productId);
            if (!product) return;

            const selectedOptions = {};
            if (product.attributes) {
                product.attributes.forEach(attr => {
                    const select = document.getElementById(`select-${attr.name.replace(/\s+/g, '-')}`);
                    if (select) {
                        selectedOptions[attr.name] = select.value;
                    }
                });
            }

            window.app.addToCart({
                ...product,
                selectedOptions
            });
            window.app.closeModal();
            window.app.toggleCart();
        }
    };

    function updateNavState() {
        const navItems = ['warehouse', 'shop-floor', 'clinical', 'summary', 'about'];
        navItems.forEach(item => {
            const el = document.getElementById(`nav-${item}`);
            if (el) {
                if (item === state.view) {
                    el.classList.add('bg-primary/20', 'text-primary', 'ring-1', 'ring-primary', 'shadow-[0_0_15px_rgba(0,255,194,0.3)]');
                    el.classList.remove('text-slate-400');
                } else {
                    el.classList.remove('bg-primary/20', 'text-primary', 'ring-1', 'ring-primary', 'shadow-[0_0_15px_rgba(0,255,194,0.3)]');
                    el.classList.add('text-slate-400');
                }
            }
        });
    }

    function updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if (state.cart.length > 0) {
            badge.classList.remove('hidden');
            badge.innerText = state.cart.length;
            badge.classList.add('flex', 'items-center', 'justify-center', 'text-[10px]', 'font-bold', 'text-black');
        } else {
            badge.classList.add('hidden');
        }
    }

    function updatePanelState() {
        if (state.panelOpen) {
            renderPanel();
        } else {
            panelContainer.innerHTML = '';
        }
    }

    // --- REUSABLE COMPONENTS ---

    function renderProductDeck(products) {
        return `
            <section class="absolute bottom-0 left-0 w-full px-6 pb-6 z-30 pl-0 md:pl-24 pointer-events-none">
                <div class="pointer-events-auto glass-panel rounded-2xl shadow-2xl overflow-hidden border-t border-white/10 max-w-6xl mx-auto">
                    <div class="px-6 py-3 flex items-center justify-between border-b border-white/10 bg-black/20">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-primary">view_carousel</span>
                            <h2 class="text-sm font-bold text-white uppercase font-tech tracking-wider">Featured Products</h2>
                        </div>
                    </div>
                    <div class="p-4 overflow-x-auto custom-scrollbar">
                        <div class="flex gap-4 min-w-max">
                            ${products.map(p => `
                                <div class="w-56 bg-white/5 rounded-xl p-3 border border-white/10 hover:border-primary/50 transition-colors group cursor-pointer" onclick="window.app.openModal('${p.id}')">
                                    <div class="h-32 w-full mb-3 rounded-lg bg-black/50 flex items-center justify-center overflow-hidden relative">
                                        <img loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${p.images[0]}" alt="${p.name}"/>
                                    </div>
                                    <div class="space-y-1">
                                        <h3 class="font-bold text-white text-sm truncate font-display">${p.name}</h3>
                                        <p class="text-primary font-bold text-sm font-tech">
                                            ${p.price ? '$'+p.price.toLocaleString() : 'On Request'}
                                        </p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderHotspot(id, label, styleClasses) {
        return `
            <div onclick="window.app.openModal('${id}')" class="absolute z-30 group hotspot-wrapper cursor-pointer ${styleClasses}">
                <div class="relative size-12 flex items-center justify-center">
                    <div class="hotspot-ring"></div>
                    <div class="hotspot-ring" style="animation-delay: 1.2s;"></div>
                    <div class="hotspot-core size-4 bg-white rounded-full relative z-10 border-2 border-black/50"></div>
                </div>
                <!-- Label always visible -->
                <div class="absolute left-14 top-2 glass-panel px-3 py-2 rounded transition-transform duration-300 min-w-[150px] hover:scale-105 hover:border-primary/50">
                    <p class="text-xs font-tech text-primary tracking-widest mb-0.5">ASSET ID: ${id}</p>
                    <p class="text-sm font-display font-medium text-white">${label}</p>
                </div>
            </div>
        `;
    }

    function renderPanel() {
        const subtotal = state.cart.reduce((acc, item) => acc + ((item.price || 0) * item.qty), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        const hasRequestItems = state.cart.some(item => item.price === null);

        const cartItemsHtml = state.cart.map(item => {
             const configStr = item.selectedOptions
                ? Object.entries(item.selectedOptions).map(([k,v]) => `<span class="text-[10px] bg-white/10 px-1 rounded mr-1 text-slate-300">${k}: ${v}</span>`).join('')
                : '';

             return `
                <div class="group relative flex gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300">
                    <div class="shrink-0 w-20 h-20 rounded bg-void border border-white/10 overflow-hidden relative">
                        <img class="w-full h-full object-cover" src="${item.image || item.images[0]}" alt="${item.name}"/>
                    </div>
                    <div class="flex flex-col flex-1 justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h3 class="font-display font-medium text-white leading-tight pr-2 text-sm">${item.name}</h3>
                                <button onclick="window.app.removeFromCart('${item.configKey}')" class="text-slate-400 hover:text-red-400 transition-colors">
                                    <span class="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                            <p class="font-tech text-slate-500 text-xs tracking-wider mt-1">SKU: ${item.sku}</p>
                            <div class="mt-1 flex flex-wrap">${configStr}</div>
                        </div>
                        <div class="flex items-end justify-between mt-2">
                            <span class="font-tech text-primary font-bold text-sm">
                                ${item.price ? '$'+item.price.toLocaleString() : 'On Request'}
                            </span>
                            <div class="flex items-center bg-black/40 rounded border border-white/10 h-6">
                                <button onclick="window.app.updateQty('${item.configKey}', -1)" class="w-6 h-full flex items-center justify-center hover:text-primary transition-colors text-white/60">
                                    <span class="material-symbols-outlined text-xs">remove</span>
                                </button>
                                <span class="font-tech w-6 text-center text-white text-xs">${item.qty}</span>
                                <button onclick="window.app.updateQty('${item.configKey}', 1)" class="w-6 h-full flex items-center justify-center hover:text-primary transition-colors text-white/60">
                                    <span class="material-symbols-outlined text-xs">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const emptyStateHtml = `
             <div class="flex flex-col items-center justify-center h-64 text-slate-500 opacity-60">
                <span class="material-symbols-outlined text-6xl mb-4">inbox</span>
                <p class="font-tech text-sm uppercase tracking-widest">Quote Empty</p>
            </div>
        `;

        panelContainer.innerHTML = `
            <div class="absolute inset-0 z-50 h-full w-full">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onclick="window.app.toggleCart()"></div>
                <div class="absolute right-0 top-0 h-full w-full max-w-[450px] bg-panel-bg shadow-2xl flex flex-col border-l border-white/10 animate-slide-in-right">
                    <div class="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-neon"></div>
                    <div class="shrink-0 p-6 border-b border-white/10 flex items-start justify-between bg-panel-bg z-10">
                        <div class="flex flex-col gap-1">
                            <h2 class="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-display">
                                <span class="material-symbols-outlined text-primary text-lg">fact_check</span>
                                ESTIMATE MANIFEST
                            </h2>
                            <p class="font-tech text-primary text-sm tracking-wider uppercase opacity-80">SESSION ID: 894-X // ITEMS: ${state.cart.length}</p>
                        </div>
                        <button onclick="window.app.toggleCart()" class="group flex items-center justify-center w-8 h-8 rounded hover:bg-white/5 transition-colors text-slate-400 hover:text-primary">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-4 custom-scrollbar bg-panel-bg">
                        ${state.cart.length > 0 ? cartItemsHtml : emptyStateHtml}
                    </div>

                    <div class="shrink-0 p-6 bg-[#0f0f0f] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
                        <div class="space-y-2 mb-6 font-tech">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-400">Subtotal</span>
                                <span class="text-white text-lg tracking-wide">$${subtotal.toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-400">Tax Estimate (8%)</span>
                                <span class="text-slate-500 tracking-wide">$${tax.toLocaleString()}</span>
                            </div>
                            <div class="h-px w-full bg-white/10 my-2"></div>
                            <div class="flex justify-between items-center">
                                <span class="text-white font-display font-medium">TOTAL ESTIMATE</span>
                                <span class="text-primary text-2xl font-bold tracking-wide text-glow">
                                    ${hasRequestItems ? 'PENDING' : '$'+total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <button onclick="window.app.navigateTo('summary'); window.app.toggleCart()" class="w-full group relative overflow-hidden rounded-lg bg-primary hover:bg-primary-hover py-4 px-6 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed" ${state.cart.length === 0 ? 'disabled' : ''}>
                            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <span class="relative z-10 font-display font-bold text-black text-lg tracking-wide">REQUEST OFFICIAL QUOTE</span>
                            <span class="relative z-10 material-symbols-outlined text-black">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function updateView() {
        appContainer.innerHTML = '';
        switch (state.view) {
            case 'shop-floor': renderShopFloor(); break;
            case 'warehouse': renderWarehouse(); break;
            case 'clinical': renderClinical(); break;
            case 'summary': renderSummary(); break;
            case 'dashboard': renderDashboard(); break;
            case 'about': renderAboutUs(); break;
            default: renderShopFloor();
        }
    }

    function renderShopFloor() {
        const products = state.products.filter(p => p.category === 'shop-floor');
        appContainer.innerHTML = `
            <div class="absolute inset-0 w-full h-full z-0 animate-fade-in">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10"></div>
                <div class="absolute inset-0 bg-black/30 z-10"></div>
                <img alt="Dark industrial shop floor with heavy machinery and overhead cranes" class="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbVHK-QxPiEHND5hSLyjRSOzdT4svZhjkwSrhHam63Smdj05LQs8yeVqMZy3_NqjKUfxQsuKdlqJrl0VZ8OeQehmYh7WmDTL0wPSjHOfmIoXMxS83aY6-j7_SysXDqK-CmEXn8hcIbPV7yLEZrkh7TMLwP8rDX1rJdDpSUkCllRF0EcQuKZQI3irpRMADalB3tjfnUbBadPrIRaKRu9RKmasTyhLsQZPErQVN_ltNgC7aZMmK4wxA_m8h4bSLa0xC95K_0YCSTMbE"/>
                <div class="scanlines"></div>
            </div>

            <div class="absolute bottom-8 left-8 z-40 pl-20 pointer-events-none">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2 text-primary/60 font-tech text-xs tracking-[0.2em]">
                         <span class="material-symbols-outlined text-[14px]">factory</span>
                         INDUSTRY: HEAVY MANUFACTURING
                    </div>
                    <h1 class="text-4xl font-display font-bold text-white uppercase tracking-tighter tech-flicker">
                        Sector 03: Shop Floor
                    </h1>
                </div>
            </div>

            ${renderHotspot('CRN-9000', 'Overhead Bridge Crane', 'top-[20%] left-[45%]')}
            ${renderHotspot('SAF-200', 'Safety Barrier', 'bottom-[25%] right-[20%]')}
            ${renderHotspot('IND-CNC-500X', 'Axis-5 CNC Station', 'top-[45%] left-[25%]')}

            ${renderProductDeck(products)}
        `;
    }

    function renderWarehouse() {
         const products = state.products.filter(p => p.category === 'warehouse');
         appContainer.innerHTML = `
            <div class="absolute inset-0 z-0 overflow-hidden animate-fade-in">
                <div class="w-full h-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoreRiGKaQ3khxV7JuaxDbQ6lWPF3ohgDNrxhYCJdGzVaTPmZd584qrZhVU3Hrddb-ik-R1YynokfccbyxeMZSAPhznamw4gHTDL9fbThEIiK73vRbo_eHCHKyp6zaIuMcFq7cqHrkPnTA7rImGH-wWr50MQBjoBiIGj34ewlFIWUgQ2tizv1n-480DCfT_GC22EL3VLdy1SeNTUeXTAQHWYP8Pl02nWhikOhbc6Ddf3SB6kTDxA1K-P4Ir-mQNABtd8iRJ6mBgLM");'>
                    <div class="absolute inset-0 bg-slate-900/40"></div>
                </div>
            </div>

            <div class="absolute bottom-8 left-8 z-40 pl-20 pointer-events-none hidden md:block">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2 text-primary/60 font-tech text-xs tracking-[0.2em]">
                        <span class="material-symbols-outlined text-[14px]">warehouse</span>
                        INDUSTRY: LOGISTICS & STORAGE
                    </div>
                    <h1 class="text-4xl font-display font-bold text-white uppercase tracking-tighter tech-flicker">
                        Sector 01: Warehouse
                    </h1>
                </div>
            </div>

            ${renderHotspot('RACK-001', 'Heavy Duty Racking', 'top-[30%] left-[25%]')}
            ${renderHotspot('FRK-9902', 'Electric Forklift', 'top-[65%] left-[60%]')}

            ${renderProductDeck(products)}
        `;
    }

    function renderClinical() {
        const products = state.products.filter(p => p.category === 'clinical');
        appContainer.innerHTML = `
            <div class="absolute inset-0 z-0 animate-fade-in">
                <img class="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJOlRSYtKDomm1iL6MSlmmbMu0pjOT2Wx1s6Ptn1S93fFDozbfgw7W1de1lRJeonqdfZycsNhb8qM2tl-qXUdS2WB8fUtUk3Sim6-jXlY1r5kq5gQwZSG20LQOBnEpVYvYAbGKq8eM8bXOaCNlS2SnSGhdxTt_UssTPV8eO0QO3d5Z_prwfBp5BAmXTeoO9lLy2sbJiHsBL8DJooZX8g7YwADJMxhF3FeSJjFCJ_sC1KpIMbkLCCtFJioGGE1-2HHua4THp2ACo7I"/>
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)] pointer-events-none"></div>
                <div class="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none"></div>
            </div>

            <div class="absolute bottom-8 left-8 z-40 pl-20 pointer-events-none hidden md:block">
                <div class="flex flex-col">
                    <h1 class="text-white text-3xl font-bold tracking-tight leading-none mb-1 font-display">SECTOR: CLINICAL</h1>
                    <div class="flex items-center gap-3">
                         <div class="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"></div>
                        <p class="font-tech text-primary text-lg tracking-widest uppercase">INDUSTRY: HEALTHCARE & STERILE</p>
                    </div>
                </div>
            </div>

            ${renderHotspot('MED-SCC-200', 'Surgical Case Cart', 'top-[55%] left-[58%]')}
            ${renderHotspot('MED-DISP-4K', 'Surgical Display 4K', 'top-[20%] right-[30%]')}

            ${renderProductDeck(products)}
        `;
    }

    function renderModal(product) {
        const specsHtml = Object.entries(product.specs).map(([key, value]) => `
            <div class="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col">
                <span class="text-slate-400 text-[10px] font-tech uppercase tracking-wider mb-0.5">${key}</span>
                <span class="text-white font-tech font-semibold text-base">${value}</span>
            </div>
        `).join('');

        // Configuration Options
        const configHtml = product.attributes ? `
            <div class="grid grid-cols-2 gap-4 mb-6">
                ${product.attributes.map(attr => `
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-tech uppercase text-primary tracking-widest">${attr.name}</label>
                        <select id="select-${attr.name.replace(/\s+/g, '-')}" class="bg-black/40 border border-white/20 rounded text-sm text-white focus:ring-primary focus:border-primary py-1.5 px-3 font-tech">
                            ${attr.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                        </select>
                    </div>
                `).join('')}
            </div>
        ` : '';

        // Thumbnails & Media
        const hasVideo = !!product.video;
        const thumbnailsHtml = product.images.length > 1 || hasVideo ? `
            <div class="flex gap-2 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                ${product.images.map(img => `
                    <button onclick="window.app.setModalImage('${img}')" class="shrink-0 size-14 rounded border border-white/20 overflow-hidden hover:border-primary transition-colors">
                        <img src="${img}" class="w-full h-full object-cover" />
                    </button>
                `).join('')}
                ${hasVideo ? `
                    <button onclick="window.app.showModalVideo()" class="shrink-0 size-14 rounded border border-white/20 bg-black/50 flex items-center justify-center hover:border-primary transition-colors group">
                        <span class="material-symbols-outlined text-white group-hover:text-primary">play_circle</span>
                    </button>
                ` : ''}
            </div>
        ` : '';

        modalContainer.innerHTML = `
            <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onclick="if(event.target === this) window.app.closeModal()">
                <div class="glass-panel w-full max-w-5xl rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-[fadeIn_0.3s_ease-out] max-h-[90vh]">
                    <button onclick="window.app.closeModal()" class="absolute top-4 right-4 z-20 text-white/50 hover:text-white transition-colors bg-black/20 rounded-full p-1">
                        <span class="material-symbols-outlined text-2xl">close</span>
                    </button>

                    <!-- Visual Section -->
                    <div class="relative w-full md:w-1/2 bg-black/40 group flex flex-col border-r border-white/10">
                        <!-- Main Viewport -->
                        <div class="relative flex-1 overflow-hidden min-h-[300px]">
                            <!-- Image View -->
                            <div id="modal-image-container" class="w-full h-full relative">
                                <div class="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-tech text-white border border-white/10 uppercase tracking-widest">
                                    Live View
                                </div>
                                <img id="modal-main-image" class="w-full h-full object-cover opacity-90 transition-all duration-500 ease-out mix-blend-screen" src="${product.images[0]}" alt="${product.name}"/>
                                <div class="scanlines"></div>
                            </div>

                            <!-- Video View (Hidden by default) -->
                            <div id="modal-video-container" class="w-full h-full hidden bg-black">
                                <iframe class="w-full h-full" src="${product.video}" title="Product Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Thumbs (Bottom of Visual Section) -->
                        <div class="p-4 bg-black/20 border-t border-white/10">
                            ${thumbnailsHtml}
                        </div>
                    </div>

                    <!-- Content Section -->
                    <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative bg-void/90 overflow-y-auto custom-scrollbar">
                        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80"></div>

                        <div class="flex justify-between items-start mb-4 mt-2">
                            <div class="flex flex-col">
                                <h2 class="text-white text-2xl font-bold leading-tight tracking-tight font-display">${product.name}</h2>
                                <span class="font-tech text-primary text-sm tracking-wider uppercase mt-1">SKU: ${product.sku}</span>
                            </div>
                        </div>

                        <p class="text-slate-300 font-ui text-sm leading-relaxed mb-6">
                            ${product.description}
                        </p>

                        <!-- Config Section -->
                        ${configHtml}

                        <!-- Specs Grid -->
                        <div class="grid grid-cols-2 gap-3 mb-6">
                            ${specsHtml}
                            <div class="bg-white/5 rounded-lg p-2.5 border border-white/5 flex flex-col">
                                <span class="text-slate-400 text-[10px] font-tech uppercase tracking-wider mb-0.5">Availability</span>
                                <span class="text-accent font-tech font-semibold text-base flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> IN STOCK
                                </span>
                            </div>
                        </div>

                        <!-- External Links -->
                        <div class="flex gap-4 mb-8 text-sm font-tech">
                            <a href="${product.pdf_link}" class="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-lg">picture_as_pdf</span>
                                Download Catalogue
                            </a>
                            <a href="${product.detail_link}" class="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                <span class="material-symbols-outlined text-lg">open_in_new</span>
                                Detailed Specs
                            </a>
                        </div>

                        <!-- Price & Action -->
                        <div class="mt-auto pt-6 flex flex-col gap-4 border-t border-white/10">
                            <div class="flex justify-between items-end">
                                <span class="text-slate-400 text-xs font-display">Unit Price</span>
                                <span class="text-primary font-tech font-bold text-3xl tracking-wide text-glow">
                                    ${product.price ? '$'+product.price.toLocaleString() : 'Price on Request'}
                                </span>
                            </div>
                            <button onclick="window.app.handleAddToCart('${product.id}')" class="group relative w-full h-14 bg-white hover:bg-accent text-void font-display font-bold text-sm tracking-wide rounded-lg flex items-center justify-center overflow-hidden transition-colors duration-200">
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                <span class="material-symbols-outlined mr-2 text-[20px] transition-transform group-hover:-translate-y-1 group-hover:rotate-12">
                                    ${product.price ? 'add_shopping_cart' : 'assignment_add'}
                                </span>
                                <span>${product.price ? 'ADD TO QUOTE' : 'REQUEST QUOTE'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderSummary() {
        const subtotal = state.cart.reduce((acc, item) => acc + ((item.price || 0) * item.qty), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        const hasRequestItems = state.cart.some(item => item.price === null);

        const cartItemsHtml = state.cart.map(item => {
             const configStr = item.selectedOptions
                ? Object.entries(item.selectedOptions).map(([k,v]) => `<div class="text-[10px] text-slate-400 mt-0.5"><span class="text-primary">${k}:</span> ${v}</div>`).join('')
                : '';

            return `
            <tr class="group hover:bg-white/5 transition-colors border-b border-white/10">
                <td class="px-6 py-5">
                    <div class="flex items-center gap-4">
                        <div class="h-16 w-16 rounded-lg bg-white/5 flex-shrink-0 overflow-hidden border border-white/10">
                            <img class="h-full w-full object-cover" src="${item.image || item.images[0]}" alt="${item.name}"/>
                        </div>
                        <div>
                            <div class="font-bold text-white">${item.name}</div>
                            <div class="text-sm text-slate-400 font-mono mb-1">${item.sku}</div>
                            ${configStr}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-5">
                    <div class="flex items-center justify-center gap-3 bg-black/40 w-fit mx-auto rounded-lg p-1 border border-white/10">
                        <button onclick="window.app.updateQty('${item.configKey}', -1)" class="size-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 transition-all">
                            <span class="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span class="w-8 text-center font-bold text-white font-tech">${item.qty}</span>
                        <button onclick="window.app.updateQty('${item.configKey}', 1)" class="size-8 flex items-center justify-center rounded hover:bg-white/10 text-primary transition-all">
                            <span class="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                </td>
                <td class="px-6 py-5 text-right font-medium text-slate-400 font-tech">
                    ${item.price ? '$'+item.price.toLocaleString() : 'On Request'}
                </td>
                <td class="px-6 py-5 text-right font-bold text-primary font-tech">
                     ${item.price ? '$'+(item.price * item.qty).toLocaleString() : 'On Request'}
                </td>
                <td class="px-6 py-5">
                    <button onclick="window.app.removeFromCart('${item.configKey}')" class="text-slate-400 hover:text-red-500 transition-colors">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
            </tr>
        `}).join('');

        const emptyCartHtml = `
            <tr>
                <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                    <span class="material-symbols-outlined text-4xl mb-2">remove_shopping_cart</span>
                    <p>Your quote request is empty.</p>
                    <button onclick="window.app.navigateTo('shop-floor')" class="mt-4 text-primary hover:underline">Browse Catalog</button>
                </td>
            </tr>
        `;

        appContainer.innerHTML = `
            <div class="w-full h-full overflow-y-auto bg-background-dark animate-fade-in custom-scrollbar">
                <header class="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <button onclick="window.app.navigateTo('shop-floor')" class="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors font-medium">
                                <span class="material-symbols-outlined text-xl">arrow_back</span>
                                <span>Back to Catalog</span>
                            </button>
                            <div class="h-6 w-px bg-white/10 mx-2"></div>
                            <h1 class="text-xl font-bold tracking-tight text-white font-display">Quote Summary</h1>
                        </div>
                        <div class="flex items-center gap-4 text-sm font-medium text-slate-400">
                            <span class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-primary text-lg">fact_check</span>
                                Items Verified
                            </span>
                        </div>
                    </div>
                </header>

                <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex-1 space-y-6">
                            <div class="bg-surface rounded-xl shadow-sm border border-white/10 overflow-hidden">
                                <div class="overflow-x-auto">
                                    <table class="w-full text-left border-collapse">
                                        <thead>
                                            <tr class="bg-white/5 border-b border-white/10">
                                                <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 font-tech">Product Details</th>
                                                <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center font-tech">Quantity</th>
                                                <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right font-tech">Unit Price</th>
                                                <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right font-tech">Subtotal</th>
                                                <th class="px-6 py-4 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-white/10">
                                            ${state.cart.length > 0 ? cartItemsHtml : emptyCartHtml}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                                <span class="material-symbols-outlined text-primary">info</span>
                                <p class="text-sm text-primary font-medium leading-relaxed">
                                    Shipping and heavy handling fees may apply based on the delivery location and project scale. These will be finalized by our logistics team after request submission.
                                </p>
                            </div>
                        </div>

                        <aside class="w-full lg:w-[400px] flex flex-col gap-6">
                            <div class="bg-surface rounded-xl shadow-sm border border-white/10 p-6">
                                <h2 class="text-lg font-bold mb-4 text-white border-b border-white/10 pb-3 font-display">Quote Financials</h2>
                                <div class="space-y-3 font-tech">
                                    <div class="flex justify-between text-slate-400">
                                        <span>Subtotal (${state.cart.length} items)</span>
                                        <span class="font-medium text-white">$${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div class="flex justify-between text-slate-400">
                                        <span>Estimated Tax (8%)</span>
                                        <span class="font-medium text-white">$${tax.toLocaleString()}</span>
                                    </div>
                                    <div class="flex justify-between text-slate-400">
                                        <span>Shipping Est.</span>
                                        <span class="font-medium text-primary uppercase text-xs tracking-wider">Calculated Later</span>
                                    </div>
                                    <div class="pt-4 border-t border-white/10 flex justify-between items-baseline">
                                        <span class="text-lg font-bold text-white font-display">Estimated Total</span>
                                        <span class="text-3xl font-bold text-primary text-glow">
                                            ${hasRequestItems ? 'PENDING' : '$'+total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-surface rounded-xl shadow-sm border border-white/10 p-6">
                                <h2 class="text-lg font-bold mb-4 text-white font-display">Finalize Request</h2>
                                <form class="space-y-4" onsubmit="event.preventDefault(); alert('Quote Request Sent!');">
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Company Name</label>
                                        <input type="text" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech" placeholder="e.g. Northeast Plant Inc.">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Contact Person</label>
                                        <input type="text" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech" placeholder="Your full name">
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Phone</label>
                                            <input type="tel" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech" placeholder="+1 (555)...">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Email</label>
                                            <input type="email" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech" placeholder="name@company.com">
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Delivery Location</label>
                                        <input type="text" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech" placeholder="City, State / ZIP">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-slate-300 mb-1.5 font-tech uppercase tracking-wide">Additional Notes</label>
                                        <textarea rows="3" class="w-full bg-black/40 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600 text-white font-tech resize-none" placeholder="Special requirements..."></textarea>
                                    </div>
                                    <div class="pt-2">
                                        <button type="submit" class="w-full bg-primary hover:bg-primary-hover text-black font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] font-display">
                                            <span class="material-symbols-outlined">send</span>
                                            Finalize Quote Request
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        `;
    }

    function renderDashboard() {
        const tabs = [
            { id: 'profile', icon: 'person', label: 'My Profile' },
            { id: 'quotes', icon: 'request_quote', label: 'Quote Requests' },
            { id: 'orders', icon: 'shopping_bag', label: 'Orders' },
            { id: 'messages', icon: 'mail', label: 'Messages' }
        ];

        // Initialize global tab state if not present
        if (!window.dashboardTab) window.dashboardTab = 'quotes';

        const renderTabContent = () => {
            const contentMap = {
                'profile': `
                    <div class="space-y-6 animate-fade-in">
                        <div class="flex items-center gap-6 mb-8">
                            <div class="w-24 h-24 rounded-full bg-slate-800 border-2 border-primary overflow-hidden">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8NMXqaT7CcwWVt__wYzJE3FJysj3UCmAZfInMo-1FOiOzudhmd9S0IQIRqudpez4OLHt3T6QBOKVWpNPtaskB5FYucTLu2ETeVtWw_mAhOmRzEo__GqiUOtBrSsC6DtNTlYPMm-cDsnvw9wjJvSM3LGGr1c2G_RHkF7CHBec3IhvjXs27N2OQ0yKWAp2yH2LUfEn8RuuoHtpwHsRtp9oV636UB169zqOvgXyLl0K6DjkRC1m_zGbSjU03Yn_-MrXnDDfS-IgNTA8" class="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white font-display">John Doe</h3>
                                <p class="text-slate-400 font-tech">Procurement Manager at Northeast Plant Inc.</p>
                                <button class="mt-3 text-xs bg-white/10 hover:bg-primary hover:text-black px-3 py-1 rounded transition-colors">Edit Profile</button>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="p-4 bg-white/5 rounded border border-white/10">
                                <label class="block text-xs text-slate-500 uppercase mb-1">Email</label>
                                <p class="text-white">john.doe@northeastplant.com</p>
                            </div>
                            <div class="p-4 bg-white/5 rounded border border-white/10">
                                <label class="block text-xs text-slate-500 uppercase mb-1">Phone</label>
                                <p class="text-white">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                `,
                'quotes': `
                    <div class="space-y-4 animate-fade-in">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl text-white font-bold">Active Requests</h3>
                            <button class="text-xs bg-primary text-black px-3 py-1.5 rounded font-bold hover:bg-white transition-colors">New Request</button>
                        </div>
                        <!-- Quote Item -->
                        <div class="p-4 bg-white/5 rounded border border-white/10 hover:border-primary/50 transition-colors flex justify-between items-center group">
                            <div>
                                <h4 class="text-white font-bold">Northeast Plant Upgrade - Phase 1</h4>
                                <p class="text-xs text-slate-400 mt-1">ID: #QR-9928 • 3 Items • Submitted Oct 24, 2023</p>
                            </div>
                            <span class="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] uppercase font-bold rounded border border-yellow-500/30">Pending Review</span>
                        </div>
                        <!-- Quote Item -->
                        <div class="p-4 bg-white/5 rounded border border-white/10 hover:border-primary/50 transition-colors flex justify-between items-center group">
                            <div>
                                <h4 class="text-white font-bold">Warehouse Expansion B</h4>
                                <p class="text-xs text-slate-400 mt-1">ID: #QR-9844 • 12 Items • Submitted Oct 10, 2023</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="px-2 py-1 bg-green-500/20 text-green-500 text-[10px] uppercase font-bold rounded border border-green-500/30">Approved</span>
                                <button class="text-primary hover:underline text-xs">View Quote</button>
                            </div>
                        </div>
                    </div>
                `,
                'orders': `
                    <div class="flex flex-col items-center justify-center h-64 text-slate-500 animate-fade-in">
                        <span class="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                        <p>No active orders found.</p>
                    </div>
                `,
                'messages': `
                    <div class="space-y-4 animate-fade-in">
                        <div class="p-4 bg-white/5 rounded border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                            <div class="flex justify-between mb-2">
                                <span class="text-white font-bold text-sm">System Admin</span>
                                <span class="text-xs text-slate-500">2 hrs ago</span>
                            </div>
                            <p class="text-slate-300 text-sm">Your quote #QR-9844 has been approved. Please review the final pricing and confirm the order.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                            <div class="flex justify-between mb-2">
                                <span class="text-white font-bold text-sm">Support Team</span>
                                <span class="text-xs text-slate-500">Yesterday</span>
                            </div>
                            <p class="text-slate-300 text-sm">Re: Technical specs for CNC Station. The updated PDF has been attached to your dashboard.</p>
                        </div>
                    </div>
                `
            };
            return contentMap[window.dashboardTab];
        };

        const updateDashboard = () => {
            const container = document.getElementById('dashboard-content');
            if (container) container.innerHTML = renderTabContent();

            // Update Tab Styles
            tabs.forEach(t => {
                const el = document.getElementById(`tab-${t.id}`);
                if(el) {
                    if(t.id === window.dashboardTab) {
                        el.className = "flex items-center gap-3 w-full p-3 rounded-lg bg-primary/20 text-primary border border-primary/30 transition-all";
                    } else {
                        el.className = "flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all";
                    }
                }
            });
        };

        appContainer.innerHTML = `
            <div class="w-full h-full bg-background-dark overflow-y-auto custom-scrollbar animate-fade-in">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 class="text-3xl font-bold text-white mb-8 font-display">User Dashboard</h1>

                    <div class="flex flex-col md:flex-row gap-8">
                        <!-- Sidebar Navigation -->
                        <aside class="w-full md:w-64 shrink-0">
                            <nav class="flex flex-col gap-2">
                                ${tabs.map(t => `
                                    <button id="tab-${t.id}" onclick="window.dashboardTab='${t.id}'; window.updateDashboardLocal();" class="flex items-center gap-3 w-full p-3 rounded-lg ${window.dashboardTab === t.id ? 'bg-primary/20 text-primary border border-primary/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'} transition-all">
                                        <span class="material-symbols-outlined">${t.icon}</span>
                                        <span class="font-tech uppercase tracking-wider text-sm">${t.label}</span>
                                    </button>
                                `).join('')}
                            </nav>
                        </aside>

                        <!-- Content Area -->
                        <main class="flex-1 bg-surface rounded-xl border border-white/10 p-8 min-h-[500px]">
                            <div id="dashboard-content">
                                ${renderTabContent()}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        `;

        // Expose update function for onclick handlers
        window.updateDashboardLocal = updateDashboard;
        setTimeout(updateDashboard, 0);
    }

    function renderAboutUs() {
        appContainer.innerHTML = `
            <div class="w-full h-full bg-background-dark overflow-y-auto custom-scrollbar animate-fade-in">
                <!-- Hero Section -->
                <div class="relative h-96 w-full bg-black flex items-center justify-center overflow-hidden">
                    <div class="absolute inset-0 z-0 opacity-60">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiUzNabHblcs4fD87ZYPHFlahaiHrfjqQTnUf6An-lpnfIkiG9aRUMGRlndn_skigi9DCt8I9Cawp22_2TBm7UydaSSKJVUsek9A_n88gUlr7xSJoggY7SBINTvCpoz2SU2M9EkHwXe14EEQCcYKSaDa4J_a9HCrP7-Zy5qpR462s8xE8C87iyMcHwj5BlwG3O0RNQjuQWHdY3Re97Z45-0zCxv7KMvc9hV88VP01ecjRHbB0AE8i2yPzbqOclEPAAfs-cEaxA9ZQ" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                    </div>
                    <div class="relative z-10 text-center px-4">
                        <h1 class="text-5xl md:text-7xl font-bold text-white font-display mb-4 tracking-tight">IMMERSIVE<span class="text-primary">TECH</span></h1>
                        <p class="text-xl text-slate-300 font-tech tracking-widest uppercase">Building the Future of Industry</p>
                    </div>
                </div>

                <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                    <!-- Mission -->
                    <section class="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 class="text-3xl font-bold text-white mb-6 font-display">Our Mission</h2>
                            <p class="text-slate-400 leading-relaxed mb-6">
                                At Immersive Tech, we bridge the gap between digital innovation and industrial reality. We provide cutting-edge equipment solutions for manufacturing, logistics, and healthcare sectors, empowering businesses to achieve unprecedented efficiency.
                            </p>
                            <div class="flex gap-8 border-t border-white/10 pt-6">
                                <div>
                                    <span class="block text-3xl font-bold text-primary font-tech">25+</span>
                                    <span class="text-xs text-slate-500 uppercase tracking-widest">Years Exp.</span>
                                </div>
                                <div>
                                    <span class="block text-3xl font-bold text-primary font-tech">500+</span>
                                    <span class="text-xs text-slate-500 uppercase tracking-widest">Projects</span>
                                </div>
                                <div>
                                    <span class="block text-3xl font-bold text-primary font-tech">Global</span>
                                    <span class="text-xs text-slate-500 uppercase tracking-widest">Reach</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-surface p-8 rounded-xl border border-white/10 relative overflow-hidden group">
                            <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                            <h3 class="text-xl font-bold text-white mb-4 relative z-10">Why Choose Us?</h3>
                            <ul class="space-y-4 relative z-10">
                                <li class="flex items-start gap-3">
                                    <span class="material-symbols-outlined text-primary">verified</span>
                                    <span class="text-slate-300 text-sm">ISO 9001:2015 Certified Quality Management</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <span class="material-symbols-outlined text-primary">support_agent</span>
                                    <span class="text-slate-300 text-sm">24/7 Dedicated Technical Support Teams</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <span class="material-symbols-outlined text-primary">rocket_launch</span>
                                    <span class="text-slate-300 text-sm">Rapid Deployment & Installation Services</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- Leadership / Team Placeholder -->
                    <section>
                        <h2 class="text-3xl font-bold text-white mb-10 font-display text-center">Executive Leadership</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Leader 1 -->
                            <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10 group">
                                <div class="h-64 bg-slate-800 relative">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxO2vBBOjHehl5jVCQycvfkdvlahFTKd6jytvp1fH7OC8GcgT5wG70eS6fKsvoZ5IsHE3oU5o00XL0qjm8OTBUGSyiouDk_WSQw_UEMh2RgTlZmXEvqKkUCoy9MpwJaojTWt-UCvm59HRBybyLGAsOngZwey9O3I47V9MUg4N87-ARLiCBuLB3IVcdY-3W2Y1S__lm3LR6-Fu6SBhLRwQM8l6QcPIJRpkifRKtiSM-VCFeEdRKaeVGWxWfK8tR1v9P569Yr5NE0Bg" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div class="p-6">
                                    <h3 class="text-white font-bold text-lg">Sarah Jenkins</h3>
                                    <p class="text-primary text-xs uppercase tracking-widest font-tech mb-3">Chief Executive Officer</p>
                                    <p class="text-slate-400 text-sm">Visionary leader with 15 years in industrial automation.</p>
                                </div>
                            </div>
                            <!-- Leader 2 -->
                            <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10 group">
                                <div class="h-64 bg-slate-800 relative">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8NMXqaT7CcwWVt__wYzJE3FJysj3UCmAZfInMo-1FOiOzudhmd9S0IQIRqudpez4OLHt3T6QBOKVWpNPtaskB5FYucTLu2ETeVtWw_mAhOmRzEo__GqiUOtBrSsC6DtNTlYPMm-cDsnvw9wjJvSM3LGGr1c2G_RHkF7CHBec3IhvjXs27N2OQ0yKWAp2yH2LUfEn8RuuoHtpwHsRtp9oV636UB169zqOvgXyLl0K6DjkRC1m_zGbSjU03Yn_-MrXnDDfS-IgNTA8" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div class="p-6">
                                    <h3 class="text-white font-bold text-lg">David Chen</h3>
                                    <p class="text-primary text-xs uppercase tracking-widest font-tech mb-3">CTO & Innovation</p>
                                    <p class="text-slate-400 text-sm">Expert in robotics and AI integration for logistics.</p>
                                </div>
                            </div>
                            <!-- Leader 3 -->
                            <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10 group">
                                <div class="h-64 bg-slate-800 relative">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwkFHH_gx1Bkn-QFMm9Poyxrsw1zAs5sImxHQa4xb6kVyVNPGbsmq0VyTC4sBiaMMZK-IADj0gwJSvUUWXSvQlD6VOxjPZocmGQw6apIZx-GOoCZAO8EB1SddWMrwGsd8HBb41PIF4o5RrBqYmP3ekFNRqUMWDBvciRaGe13z6Yb4hVFUHz0mv9rXQVRFHXy1DHbKNjvFcAaCZ3p73uFCjCJh-bBMVm4CTk0EVuB_hjDr5hhq8mrPR8Hv65CtZIS8sKQQQUBqxztw" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div class="p-6">
                                    <h3 class="text-white font-bold text-lg">Elena Rodriguez</h3>
                                    <p class="text-primary text-xs uppercase tracking-widest font-tech mb-3">Head of Operations</p>
                                    <p class="text-slate-400 text-sm">Ensuring seamless delivery across 40+ countries.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    // Initialize
    updateNavState();
    updateView();
});
