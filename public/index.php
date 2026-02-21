<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore our immersive catalog of industrial, warehouse, and clinical equipment. Request quotes for cranes, forklifts, and surgical carts.">
    <title>Immersive Industrial Tech</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#00FFC2", // Neon Cyan
                        "primary-dim": "rgba(0, 255, 194, 0.2)",
                        "primary-hover": "#00cc9b",
                        "accent": "#C3FF00", // Lime Green
                        "background-light": "#f6f8f8",
                        "background-dark": "#050505", // Void Black
                        "surface": "rgba(20, 20, 25, 0.65)", // Glass
                        "surface-border": "rgba(255, 255, 255, 0.1)",
                        "panel-bg": "#111111",
                        "text-main": "#F0F2F5",
                        "text-muted": "#889096",
                        "void": "#050505",
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"],
                        "tech": ["Rajdhani", "monospace"],
                        "ui": ["Inter", "sans-serif"],
                    },
                    backdropBlur: {
                        'xs': '2px',
                        'panel': '16px',
                    },
                    boxShadow: {
                        "neon": "0 0 15px rgba(0, 255, 194, 0.4)",
                        "glass-edge": "inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
                    },
                    keyframes: {
                        pulseRing: {
                            '0%': { transform: 'scale(0.8)', opacity: '0.8' },
                            '100%': { transform: 'scale(2.4)', opacity: '0' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        scan: {
                            '0%': { top: '0%', opacity: '0' },
                            '10%': { opacity: '1' },
                            '90%': { opacity: '1' },
                            '100%': { top: '100%', opacity: '0' },
                        },
                        slideInRight: {
                            from: { transform: 'translateX(100%)' },
                            to: { transform: 'translateX(0)' },
                        }
                    },
                    animation: {
                        'pulse-ring': 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
                        'fade-in': 'fadeIn 1s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }
                },
            },
        }
    </script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-background-dark text-text-main font-display overflow-hidden h-screen w-full relative selection:bg-primary selection:text-background-dark">

    <!-- 01 Global HUD: Sidebar Navigation -->
    <nav class="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8">
        <div class="glass-panel p-2 rounded-full flex flex-col gap-6 items-center w-16 py-8">
            <!-- Brand Mark -->
            <div class="mb-4 text-primary">
                <span class="material-symbols-outlined text-3xl">hexagon</span>
            </div>

            <!-- Nav Items -->
            <button onclick="window.app.navigateTo('warehouse')" id="nav-warehouse" class="group relative flex items-center justify-center size-10 rounded-xl text-slate-400 hover:text-white transition-all" aria-label="Warehouse">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">warehouse</span>
                <span class="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-tech tracking-wider border border-white/10 pointer-events-none">WAREHOUSE</span>
            </button>

            <button onclick="window.app.navigateTo('shop-floor')" id="nav-shop-floor" class="group relative flex items-center justify-center size-10 rounded-xl text-slate-400 hover:text-white transition-all" aria-label="Shop Floor">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">factory</span>
                <span class="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-tech tracking-wider border border-white/10 pointer-events-none">SHOP FLOOR</span>
            </button>

            <button onclick="window.app.navigateTo('clinical')" id="nav-clinical" class="group relative flex items-center justify-center size-10 rounded-xl text-slate-400 hover:text-white transition-all" aria-label="Clinical">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">medical_services</span>
                <span class="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-tech tracking-wider border border-white/10 pointer-events-none">CLINICAL</span>
            </button>

            <button onclick="window.app.navigateTo('summary')" id="nav-summary" class="group relative flex items-center justify-center size-10 rounded-xl text-slate-400 hover:text-white transition-all" aria-label="Quote Summary">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">receipt_long</span>
                <span class="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-tech tracking-wider border border-white/10 pointer-events-none">QUOTE SUMMARY</span>
            </button>

            <div class="h-px w-8 bg-white/10 my-2"></div>

            <button onclick="window.app.navigateTo('about')" id="nav-about" class="group relative flex items-center justify-center size-10 rounded-xl text-slate-400 hover:text-white transition-all" aria-label="About Us">
                <span class="material-symbols-outlined group-hover:scale-110 transition-transform">business</span>
                <span class="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-tech tracking-wider border border-white/10 pointer-events-none">ABOUT US</span>
            </button>
        </div>
    </nav>

    <!-- 01 Global HUD: Top Right Cart & Dashboard -->
    <div class="fixed top-8 right-8 z-50 flex gap-4">
        <button onclick="window.app.navigateTo('dashboard')" class="glass-panel px-4 py-2 rounded-lg flex items-center gap-3 text-sm font-tech tracking-widest text-primary/80 hover:bg-white/10 transition-colors hidden md:flex">
            <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            DASHBOARD
        </button>
        <button onclick="window.app.toggleCart()" class="glass-panel glass-panel-hover size-12 rounded-full flex items-center justify-center relative group transition-all duration-300">
            <span class="material-symbols-outlined text-white group-hover:text-primary transition-colors">shopping_cart</span>
            <span id="cart-badge" class="absolute top-0 right-0 size-3 bg-primary rounded-full border-2 border-black hidden"></span>
        </button>
    </div>

    <!-- Floating Action Button (FAB) -->
    <div class="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 group">
        <!-- Expanded Actions (Hidden by default, shown on hover/focus of main button) -->
        <div class="flex flex-col gap-3 transition-all duration-300 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto scale-0 group-hover:scale-100 origin-bottom">
            <a href="tel:+15550000000" class="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black text-white transition-colors shadow-lg" title="Call Us">
                <span class="material-symbols-outlined text-xl">call</span>
            </a>
            <a href="mailto:sales@immersive-tech.com" class="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black text-white transition-colors shadow-lg" title="Email Sales">
                <span class="material-symbols-outlined text-xl">mail</span>
            </a>
            <a href="https://wa.me/15550000000" target="_blank" class="glass-panel w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-black text-white transition-colors shadow-lg" title="WhatsApp">
                <span class="material-symbols-outlined text-xl">chat</span>
            </a>
        </div>
        <!-- Main FAB -->
        <button class="bg-primary hover:bg-primary-hover text-black w-14 h-14 rounded-full flex items-center justify-center shadow-neon transition-transform hover:scale-110 active:scale-95 group-hover:rotate-90">
            <span class="material-symbols-outlined text-3xl">add</span>
        </button>
    </div>

    <!-- Main Content Container -->
    <div id="app-container" class="w-full h-full relative">
        <!-- Views will be injected here -->
    </div>

    <!-- Modals & Panels Container -->
    <div id="modal-container"></div>
    <div id="panel-container"></div>

    <!-- Application Logic -->
    <script src="js/app.js"></script>
</body>
</html>
