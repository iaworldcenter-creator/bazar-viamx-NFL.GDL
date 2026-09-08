/**
 * shared-flyout.js
 * Controlador Interactivo de Navegación Multinivel Flyout
 * Estructura departamentos y subcategorías para navegación de alta densidad.
 * Marca Oficial: VECTEC / Ecosistema Comercial
 */

(function () {
    const DEPARTMENTS = [
        {
            id: "tecnologia",
            name: "Tecnología & Cómputo VECTEC",
            icon: "fa-microchip",
            badge: "17,585 Artículos",
            subcategories: [
                { title: "Procesadores Intel & AMD", desc: "Core Ultra, 14ª Gen, Ryzen 9000 & 7000", link: "#dept-tecnologia" },
                { title: "Tarjetas de Video (GPUs)", desc: "RTX Serie 50, RTX 40, Radeon RX", link: "#dept-tecnologia" },
                { title: "Tarjetas Madre (Motherboards)", desc: "LGA1851, LGA1700, AM5, AM4", link: "#dept-tecnologia" },
                { title: "Memorias RAM", desc: "DDR5 hasta 7200MHz, DDR4 Gaming & Laptop", link: "#dept-tecnologia" },
                { title: "Almacenamiento SSDs & NVMe", desc: "PCIe 4.0/5.0 ultrarrápidos hasta 7400MB/s", link: "#dept-tecnologia" },
                { title: "Laptops & PCs VECTEC", desc: "Gamer, productividad y All in One", link: "#dept-tecnologia" },
                { title: "Fuentes de Poder & Gabinetes", desc: "Certificadas 80 Plus y flujo de aire alto", link: "#dept-tecnologia" },
                { title: "🔥 Liquidaciones & Outlet VECTEC", desc: "Hasta 40% OFF en piezas seleccionadas", link: "#dept-tecnologia" }
            ]
        },
        {
            id: "editorial",
            name: "Editorial & Lectura",
            icon: "fa-book-open",
            badge: "Próximamente",
            subcategories: [
                { title: "Revistas de Información & Análisis", desc: "Semanarios, actualidad y política", link: "#dept-editorial" },
                { title: "Libros & Bestsellers", desc: "Literatura, desarrollo y divulgación", link: "#dept-editorial" },
                { title: "Cómics, Manga & Novelas Gráficas", desc: "Ediciones de colección y novelas visuales", link: "#dept-editorial" },
                { title: "Pasatiempos & Crucigramas", desc: "Sopas de letras, crucigramas y sudokus", link: "#dept-editorial" },
                { title: "Guías Técnicas y Formación", desc: "Manuales de ingeniería y diseño", link: "#dept-editorial" }
            ]
        },
        {
            id: "consumo",
            name: "Consumo & Alimentos",
            icon: "fa-basket-shopping",
            badge: "Próximamente",
            subcategories: [
                { title: "Café de Altura Gourmet", desc: "Grano entero y molido artesanal Tapalpa", link: "#dept-consumo" },
                { title: "Snacks Saludables & Semillas", desc: "Almendras, nueces, arándanos y mix", link: "#dept-consumo" },
                { title: "Infusiones & Té Selección", desc: "Té verde, manzanilla y hierbas finas", link: "#dept-consumo" },
                { title: "Bebidas Artesanales & Jarabes", desc: "Extractos naturales e hidratación", link: "#dept-consumo" },
                { title: "Despensa Gourmet y Orgánicos", desc: "Miel pura y aceites prensados en frío", link: "#dept-consumo" }
            ]
        },
        {
            id: "hogar",
            name: "Hogar & Herramientas",
            icon: "fa-wrench",
            badge: "Próximamente",
            subcategories: [
                { title: "Herramientas Eléctricas Industriales", desc: "Rotomartillos, taladros y pulidoras", link: "#dept-hogar" },
                { title: "Smart Home & Iluminación LED", desc: "Focos Wi-Fi, tiras RGB y sensores", link: "#dept-hogar" },
                { title: "Organización & Cajas de Trabajo", desc: "Maletines de alto impacto y estantes", link: "#dept-hogar" },
                { title: "Cerrajería & Seguridad", desc: "Candados reforzados y chapas inteligentes", link: "#dept-hogar" },
                { title: "Accesorios de Mantenimiento", desc: "Multímetros, cintas y suministros de taller", link: "#dept-hogar" }
            ]
        },
        {
            id: "coleccionables",
            name: "Coleccionables & Regalos",
            icon: "fa-gem",
            badge: "Boutique Activa",
            subcategories: [
                { title: "Joyería Fina & Plata .925", desc: "Cadenas tejido italiano, dijes y anillos", link: "#dept-coleccionables" },
                { title: "Relojes de Alta Gama & Vintage", desc: "Cronógrafos de cuarzo y automáticos", link: "#dept-coleccionables" },
                { title: "Perfumería Fina & Esencias Árabes", desc: "Oud, ámbar y fijación extrema 24h", link: "#dept-coleccionables" },
                { title: "Bolsas & Accesorios de Piel", desc: "Bolsos de mano y tarjeteros RFID", link: "#dept-coleccionables" },
                { title: "Lentes de Sol Polarizados", desc: "Protección UV400 y armazones de titanio", link: "#dept-coleccionables" },
                { title: "Encendedores & Gadgets de Lujo", desc: "Llama antiviento y acabados mate", link: "#dept-coleccionables" }
            ]
        }
    ];

    function createFlyoutNav(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.classList.add("flyout-nav-wrapper");

        // Construir HTML del Menú
        container.innerHTML = `
            <button type="button" class="flyout-trigger-btn" id="flyoutTriggerBtn" aria-expanded="false" aria-label="Abrir catálogo multidepartamental Vía MX">
                <i class="fa-solid fa-layer-group text-cyan-400"></i>
                <span class="font-mono uppercase text-xs">Departamentos Vía MX</span>
                <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 transition transform duration-200" id="flyoutChevron"></i>
            </button>

            <div class="flyout-panel" id="flyoutPanel" role="region" aria-label="Menú de departamentos">
                <div class="flyout-primary-list" id="flyoutPrimaryList"></div>
                <div class="flyout-sub-content" id="flyoutSubContent"></div>
            </div>
        `;

        const triggerBtn = document.getElementById("flyoutTriggerBtn");
        const panel = document.getElementById("flyoutPanel");
        const chevron = document.getElementById("flyoutChevron");
        const primaryList = document.getElementById("flyoutPrimaryList");
        const subContent = document.getElementById("flyoutSubContent");

        let activeDeptIndex = 0;

        // Renderizar lista primaria de departamentos
        function renderPrimaryList() {
            primaryList.innerHTML = DEPARTMENTS.map((dept, index) => `
                <button type="button" class="flyout-primary-item ${index === activeDeptIndex ? 'active' : ''}" data-index="${index}">
                    <span class="flex items-center truncate">
                        <i class="fa-solid ${dept.icon} cat-icon"></i>
                        <span class="truncate">${dept.name}</span>
                    </span>
                    ${dept.badge ? `<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 shrink-0 ml-1">${dept.badge}</span>` : '<i class="fa-solid fa-chevron-right text-[10px] text-slate-500 shrink-0"></i>'}
                </button>
            `).join('');

            primaryList.querySelectorAll(".flyout-primary-item").forEach(item => {
                item.addEventListener("mouseenter", () => {
                    const idx = parseInt(item.getAttribute("data-index"));
                    setActiveDepartment(idx);
                });
                item.addEventListener("click", () => {
                    const idx = parseInt(item.getAttribute("data-index"));
                    setActiveDepartment(idx);
                });
            });
        }

        // Renderizar subcategorías del departamento activo
        function renderSubContent(dept) {
            subContent.innerHTML = `
                <div class="flyout-sub-header">
                    <div class="flyout-sub-title">
                        <i class="fa-solid ${dept.icon} text-cyan-400"></i>
                        <span>${dept.name}</span>
                    </div>
                    <span class="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        ${dept.subcategories.length} Secciones
                    </span>
                </div>
                <div class="flyout-sub-grid">
                    ${dept.subcategories.map(sub => `
                        <a href="${sub.link}" class="flyout-sub-card group" onclick="if(typeof window.selectDepartmentTab==='function'){window.selectDepartmentTab('${dept.id}');const p=document.getElementById('flyoutPanel');if(p)p.classList.remove('is-open');}">
                            <div class="flyout-sub-card-title">${sub.title}</div>
                            <div class="flyout-sub-card-desc">${sub.desc}</div>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        function setActiveDepartment(index) {
            activeDeptIndex = index;
            primaryList.querySelectorAll(".flyout-primary-item").forEach((btn, idx) => {
                btn.classList.toggle("active", idx === index);
            });
            renderSubContent(DEPARTMENTS[index]);
        }

        // Toggle panel
        function togglePanel(open) {
            const shouldOpen = (open !== undefined) ? open : !panel.classList.contains("is-open");
            if (shouldOpen) {
                panel.classList.add("is-open");
                triggerBtn.classList.add("active");
                triggerBtn.setAttribute("aria-expanded", "true");
                chevron.classList.add("rotate-180");
                setActiveDepartment(activeDeptIndex);
            } else {
                panel.classList.remove("is-open");
                triggerBtn.classList.remove("active");
                triggerBtn.setAttribute("aria-expanded", "false");
                chevron.classList.remove("rotate-180");
            }
        }

        triggerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            togglePanel();
        });

        // Cerrar al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
                togglePanel(false);
            }
        });

        // Inicializar vistas internas
        renderPrimaryList();
        renderSubContent(DEPARTMENTS[0]);
    }

    window.initFlyoutNav = createFlyoutNav;

    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("vectec-flyout-container")) {
            createFlyoutNav("vectec-flyout-container");
        }
    });
})();
