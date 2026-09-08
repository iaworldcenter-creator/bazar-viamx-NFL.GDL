/**
 * viamx-catalog-engine.js
 * Motor de Macro-Agregador Multilínea para Bazar Vía MX (Pedro Moreno 501 A)
 * Estandariza la ingestión y venta de múltiples catálogos de proveedores diversos:
 * - Tecnología & Cómputo VECTEC (17,585 artículos unificados CT + Intcomex)
 * - Coleccionables & Regalos (Boutique Vía MX Activa)
 * - Conectores modulares listos: Editorial & Lectura, Consumo & Alimentos, Hogar & Herramientas.
 * Basado en: data/esquema_articulo_universal.json
 */

(function () {
    const DEPARTMENTS = {
        tecnologia: {
            id: "tecnologia",
            name: "Tecnología & Cómputo VECTEC",
            badge: "17,585 Artículos",
            icon: "fa-microchip",
            color: "cyan",
            status: "active",
            provider: "CT Internacional / Intcomex (VECTEC)",
            description: "Catálogo mayorista oficial de hardware, procesadores, tarjetas de video, almacenamiento y ensambles.",
            categories: [
                { name: "Todos los Componentes", icon: "fa-layer-group", filter: "" },
                { name: "Procesadores", icon: "fa-microchip", filter: "procesadores" },
                { name: "Tarjetas de Video", icon: "fa-tv", filter: "tarjetas_video" },
                { name: "Tarjetas Madre", icon: "fa-chess-board", filter: "tarjetas_madre" },
                { name: "Memorias RAM", icon: "fa-memory", filter: "memorias_ram" },
                { name: "Discos Duros / SSD", icon: "fa-hard-drive", filter: "ssd" },
                { name: "Monitores & Pantallas", icon: "fa-desktop", filter: "monitores_pantallas" },
                { name: "Laptops & Portátiles", icon: "fa-laptop", filter: "laptops_portatiles" },
                { name: "Gabinetes", icon: "fa-box", filter: "gabinetes" },
                { name: "Enfriamiento", icon: "fa-fan", filter: "enfriamiento" },
                { name: "No-Breaks & UPS", icon: "fa-car-battery", filter: "no_breaks_ups" },
                { name: "Top Liquidaciones", icon: "fa-fire", filter: "outlet" }
            ]
        },
        editorial: {
            id: "editorial",
            name: "Editorial & Lectura",
            badge: "Próximamente",
            icon: "fa-book-open",
            color: "indigo",
            status: "ready",
            provider: "Conector Editorial Alfa / Distribución Nacional",
            description: "Publicaciones periódicas, semanarios, libros de interés general, cómics y guías de estudio.",
            categories: [
                { name: "Todos los Títulos", icon: "fa-layer-group", filter: "" },
                { name: "Revistas de Análisis", icon: "fa-newspaper", filter: "Revistas de Análisis" },
                { name: "Libros Bestsellers", icon: "fa-book", filter: "Libros Bestsellers" },
                { name: "Novelas Gráficas & Cómics", icon: "fa-mask", filter: "Novelas Gráficas & Cómics" },
                { name: "Pasatiempos & Crucigramas", icon: "fa-puzzle-piece", filter: "Pasatiempos & Crucigramas" },
                { name: "Guías Técnicas", icon: "fa-graduation-cap", filter: "Guías Técnicas" }
            ]
        },
        consumo: {
            id: "consumo",
            name: "Consumo & Alimentos",
            badge: "Próximamente",
            icon: "fa-basket-shopping",
            color: "emerald",
            status: "ready",
            provider: "Productores Artesanales & Cooperativas Jalisco",
            description: "Café de altura gourmet, frutos secos, snacks nutritivos y despensa seleccionada.",
            categories: [
                { name: "Todos los Alimentos", icon: "fa-layer-group", filter: "" },
                { name: "Café Gourmet", icon: "fa-mug-hot", filter: "Café Gourmet" },
                { name: "Snacks & Semillas", icon: "fa-seedling", filter: "Snacks & Semillas" },
                { name: "Infusiones & Té", icon: "fa-leaf", filter: "Infusiones & Té" },
                { name: "Bebidas Artesanales", icon: "fa-wine-bottle", filter: "Bebidas Artesanales" },
                { name: "Orgánicos", icon: "fa-apple-whole", filter: "Orgánicos" }
            ]
        },
        hogar: {
            id: "hogar",
            name: "Hogar & Herramientas",
            badge: "Próximamente",
            icon: "fa-wrench",
            color: "amber",
            status: "ready",
            provider: "Proveedores Ferreteros & Domótica ZMG",
            description: "Herramientas eléctricas industriales, iluminación inteligente, organización y cerrajería.",
            categories: [
                { name: "Todos los Artículos", icon: "fa-layer-group", filter: "" },
                { name: "Herramientas Eléctricas", icon: "fa-screwdriver-wrench", filter: "Herramientas Eléctricas" },
                { name: "Smart Home & Iluminación", icon: "fa-lightbulb", filter: "Smart Home & Iluminación" },
                { name: "Cerrajería & Seguridad", icon: "fa-shield-halved", filter: "Cerrajería & Seguridad" },
                { name: "Cajas & Maletines", icon: "fa-toolbox", filter: "Cajas & Maletines" },
                { name: "Ferretería General", icon: "fa-hammer", filter: "Ferretería General" }
            ]
        },
        coleccionables: {
            id: "coleccionables",
            name: "Coleccionables & Regalos",
            badge: "Boutique Activa",
            icon: "fa-gem",
            color: "pink",
            status: "active",
            provider: "Vía MX Boutique Guadalajara",
            description: "Joyería fina en plata .925, relojes de alta gama, perfumería árabe, bolsos de piel y accesorios de lujo.",
            categories: [
                { name: "Toda la Boutique", icon: "fa-layer-group", filter: "" },
                { name: "Joyería Fina & Plata .925", icon: "fa-gem", filter: "Joyería Fina & Plata .925" },
                { name: "Relojes de Alta Gama & Vintage", icon: "fa-clock", filter: "Relojes de Alta Gama & Vintage" },
                { name: "Lentes de Sol Polarizados & Armazones", icon: "fa-glasses", filter: "Lentes de Sol Polarizados & Armazones" },
                { name: "Perfumería Fina & Esencias Árabes", icon: "fa-spray-can-sparkles", filter: "Perfumería Fina & Esencias Árabes" },
                { name: "Bolsas & Accesorios de Piel Genuina", icon: "fa-bag-shopping", filter: "Bolsas & Accesorios de Piel Genuina" },
                { name: "Gadgets & Accesorios Premium", icon: "fa-crown", filter: "Gadgets & Accesorios Premium" }
            ]
        }
    };

    // Almacén en memoria de catálogos departamentales
    const departmentStores = {
        tecnologia: [],
        editorial: [],
        consumo: [],
        hogar: [],
        coleccionables: []
    };

    let activeDeptId = "tecnologia";
    let isLoaded = false;

    // Reglas de cubicaje y flete especial universal
    function evaluateSpecialFreight(title = "", category = "", sku = "", weightKg = 0) {
        const text = `${title} ${category} ${sku}`.toUpperCase();
        let isSpecial = false;
        let finalWeight = weightKg > 0 ? weightKg : 0.35;

        if (finalWeight > 10.0) {
            isSpecial = true;
        }

        if (text.includes("GABINETE") || text.includes("CHASSIS") || text.includes("CASE") || text.includes("TEMPLADO")) {
            isSpecial = true;
            finalWeight = Math.max(finalWeight, 7.5);
        } else if (text.includes("UPS") || text.includes("NO-BREAK") || text.includes("NOBREAK") || text.includes("REGULADOR")) {
            isSpecial = true;
            finalWeight = Math.max(finalWeight, 10.5);
        } else if (text.includes("MONITOR") || text.includes("PANTALLA") || text.includes("TELEVISION") || text.includes("SMART TV")) {
            isSpecial = true;
            finalWeight = Math.max(finalWeight, 6.0);
        } else if (text.includes("ENSAMBLE") || text.includes("ROTOMARTILLO") || text.includes("MAQUINARIA") || text.includes("HERRAMIENTA PESADA")) {
            isSpecial = true;
            finalWeight = Math.max(finalWeight, 11.0);
        }

        return {
            requiere_flete_especial: isSpecial,
            peso_kg: Math.round(finalWeight * 10) / 10
        };
    }

    // Normalizador al Esquema Universal (data/esquema_articulo_universal.json)
    function normalizeToUniversal(rawItem, deptKey) {
        const dept = DEPARTMENTS[deptKey] || DEPARTMENTS.tecnologia;
        const sku = rawItem.sku || rawItem.id || `VMX-${deptKey.substring(0,3).toUpperCase()}-${Math.floor(Math.random()*9000+1000)}`;
        const title = rawItem.titulo || rawItem.nombre || rawItem.n || rawItem.name || "Artículo Universal Vía MX";
        const category = rawItem.categoria || rawItem.c || rawItem.category || dept.name;
        const brand = rawItem.marca || rawItem.m || (deptKey === "tecnologia" ? "VECTEC" : "Vía MX");
        const pricePub = parseFloat(rawItem.precio_publico || rawItem.precio || rawItem.p || rawItem.price || 0);
        const priceWholesale = parseFloat(rawItem.precio_mayoreo || rawItem.precio_mayoreo_calc || (pricePub * 0.9));
        const image = rawItem.imagen || rawItem.img || rawItem.image || "assets/img/mascota_tigre_thumb.webp";
        const unit = rawItem.unidad || (deptKey === "consumo" && title.toLowerCase().includes("kg") ? "kg" : "pza");

        const freightEval = evaluateSpecialFreight(title, category, sku, parseFloat(rawItem.peso_kg || 0));

        return {
            id: rawItem.id || sku,
            sku: sku,
            proveedor_origen: rawItem.proveedor_origen || dept.provider,
            departamento: dept.name,
            categoria: category,
            titulo: title,
            especificaciones: rawItem.especificaciones || rawItem.desc || { marca: brand, unidad: unit },
            precio_mayoreo: Math.round(priceWholesale * 100) / 100,
            precio_publico: Math.round(pricePub * 100) / 100,
            unidad: unit,
            peso_kg: freightEval.peso_kg,
            requiere_flete_especial: freightEval.requiere_flete_especial,
            marca: brand,
            imagen: image,
            disponible: rawItem.disponible !== false && rawItem.d !== 0,
            outlet: rawItem.outlet === true || rawItem.out === 1
        };
    }

    // Inicializador del Aggregator
    async function initAggregator() {
        if (isLoaded) return;

        try {
            // 1. Cargar Departamento Activo: Tecnología & Cómputo VECTEC (17,585 artículos)
            const basePath = window.location.pathname.includes("/bazar-viamx-nfl.gdl/") ? "data/" : "data/";
            const resTech = await fetch(basePath + "inventario_maestro_buscador.json").catch(() => null);

            if (resTech && resTech.ok) {
                const rawTech = await resTech.json();
                departmentStores.tecnologia = rawTech.map(item => normalizeToUniversal(item, "tecnologia"));
            } else if (window.CT_CATALOG_SUMMARY) {
                departmentStores.tecnologia = window.CT_CATALOG_SUMMARY.map(item => normalizeToUniversal(item, "tecnologia"));
            }

            // 2. Cargar Coleccionables & Regalos (Boutique Activa Vía MX)
            if (window.boutiqueProducts && Array.isArray(window.boutiqueProducts)) {
                departmentStores.coleccionables = window.boutiqueProducts.map(item => normalizeToUniversal(item, "coleccionables"));
            }

            // 3. Conectores Modulares Preparados (Placeholders estructurados según esquema)
            departmentStores.editorial = [
                normalizeToUniversal({
                    id: "EDI-001",
                    sku: "REV-PROC-001",
                    titulo: "Revista Semanario de Información y Análisis",
                    categoria: "Revistas de Análisis",
                    precio_publico: 65.0,
                    precio_mayoreo: 48.0,
                    peso_kg: 0.22,
                    unidad: "pza",
                    proveedor_origen: "Distribuidora Editorial Alfa"
                }, "editorial"),
                normalizeToUniversal({
                    id: "EDI-002",
                    sku: "LIB-CIEN-002",
                    titulo: "Colección Científica Divulgativa Ilustrada",
                    categoria: "Libros Bestsellers",
                    precio_publico: 245.0,
                    precio_mayoreo: 180.0,
                    peso_kg: 0.55,
                    unidad: "pza",
                    proveedor_origen: "Distribuidora Editorial Alfa"
                }, "editorial")
            ];

            departmentStores.consumo = [
                normalizeToUniversal({
                    id: "ALM-001",
                    sku: "CAF-TAP-001",
                    titulo: "Café de Altura Tueste Medio Artesanal Grano 1 Kg",
                    categoria: "Café Gourmet",
                    precio_publico: 320.0,
                    precio_mayoreo: 240.0,
                    peso_kg: 1.0,
                    unidad: "kg",
                    proveedor_origen: "Cooperativa Sierra de Tapalpa"
                }, "consumo"),
                normalizeToUniversal({
                    id: "ALM-002",
                    sku: "SNK-SEM-002",
                    titulo: "Mix Energético de Semillas y Arándanos 500g",
                    categoria: "Snacks & Semillas",
                    precio_publico: 110.0,
                    precio_mayoreo: 82.0,
                    peso_kg: 0.5,
                    unidad: "pza",
                    proveedor_origen: "Cooperativa Sierra de Tapalpa"
                }, "consumo")
            ];

            departmentStores.hogar = [
                normalizeToUniversal({
                    id: "HOG-001",
                    sku: "HER-MAK-HR2470",
                    titulo: "Rotomartillo SDS-Plus 780W con Maletín Industrial",
                    categoria: "Herramientas Eléctricas",
                    precio_publico: 3499.0,
                    precio_mayoreo: 2890.0,
                    peso_kg: 11.5,
                    requiere_flete_especial: true,
                    unidad: "pza",
                    proveedor_origen: "Ferretería Industrial Metropolitana"
                }, "hogar"),
                normalizeToUniversal({
                    id: "HOG-002",
                    sku: "DOM-FOCO-SMART",
                    titulo: "Kit de 4 Focos LED RGB Wi-Fi Domótica 10W",
                    categoria: "Smart Home & Iluminación",
                    precio_publico: 480.0,
                    precio_mayoreo: 360.0,
                    peso_kg: 0.4,
                    requiere_flete_especial: false,
                    unidad: "pza",
                    proveedor_origen: "Ferretería Industrial Metropolitana"
                }, "hogar")
            ];

            isLoaded = true;
            window.dispatchEvent(new CustomEvent("viamx:catalogLoaded", { detail: { store: departmentStores } }));
        } catch (e) {
            console.warn("Aviso en Aggregator Multilínea Vía MX:", e);
        }
    }

    // API Pública
    window.ViaMXMultilineAggregator = {
        DEPARTMENTS: DEPARTMENTS,
        departmentStores: departmentStores,
        getActiveDepartment: () => activeDeptId,
        setActiveDepartment: (id) => {
            if (DEPARTMENTS[id]) {
                activeDeptId = id;
                window.dispatchEvent(new CustomEvent("viamx:departmentChanged", { detail: { departmentId: id, meta: DEPARTMENTS[id] } }));
            }
        },
        getItemsByDepartment: (id) => departmentStores[id] || [],
        getAllItems: () => Object.values(departmentStores).flat(),
        evaluateSpecialFreight: evaluateSpecialFreight,
        normalizeToUniversal: normalizeToUniversal,
        // Conector de registro dinámico para futuros proveedores
        registerSupplierCatalog: (deptKey, rawItems = [], supplierName = "Proveedor Externo") => {
            if (!departmentStores[deptKey]) departmentStores[deptKey] = [];
            const normalized = rawItems.map(item => {
                item.proveedor_origen = supplierName;
                return normalizeToUniversal(item, deptKey);
            });
            departmentStores[deptKey].push(...normalized);
            window.dispatchEvent(new CustomEvent("viamx:supplierRegistered", { detail: { department: deptKey, count: normalized.length } }));
            return normalized.length;
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAggregator);
    } else {
        initAggregator();
    }
})();
