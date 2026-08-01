// ==========================================
// 1. DATA STATE / INITIAL MOCK DATABASE
// ==========================================
let shipmentsDb = [
    {
        id: "SMART-987-654",
        origin: "Bangalore",
        destination: "Delhi",
        weight: 5,
        speed: "express",
        cost: 1650,
        status: "transit",
        sender: "Rajesh Sharma",
        senderPhone: "+91 98765 43210",
        senderAddress: "Sector 15, Dwarka",
        receiver: "Anjali Nair",
        receiverPhone: "+91 98123 45678",
        receiverAddress: "Indiranagar, 100 Feet Rd",
        logs: [
            { time: "2026-07-31 22:15", status: "In Transit", details: "Arrived at Delhi Air Cargo Hub terminal", location: "Delhi (NCR)" },
            { time: "2026-07-31 14:00", status: "In Transit", details: "Package departed flight from Bangalore airport", location: "En-Route" },
            { time: "2026-07-31 09:30", status: "Booked", details: "Shipment registered & smart label generated", location: "Bangalore Hub" }
        ]
    },
    {
        id: "SMART-123-456",
        origin: "Mumbai",
        destination: "Chennai",
        weight: 22,
        speed: "standard",
        cost: 2950,
        status: "delivered",
        sender: "Gopal Dev",
        senderPhone: "+91 99887 76655",
        senderAddress: "JVLR, Andheri East",
        receiver: "Uma Pillai",
        receiverPhone: "+91 91760 12345",
        receiverAddress: "Central Station Outer Rd",
        logs: [
            { time: "2026-07-31 14:30", status: "Delivered", details: "Delivered to receiver, signed by Uma", location: "Chennai City" },
            { time: "2026-07-31 09:00", status: "Out for Delivery", details: "Dispatched from local Chennai express hub", location: "Chennai Hub" },
            { time: "2026-07-30 11:30", status: "In Transit", details: "Dispatched via NH-48 cargo vehicle", location: "On Highway" },
            { time: "2026-07-30 08:00", status: "Booked", details: "Cargo received and cataloged in Mumbai center", location: "Mumbai Hub" }
        ]
    }
];

let inquiriesDb = [
    {
        name: "Suresh Gupta",
        email: "suresh@guptasteel.com",
        message: "Need custom enterprise rates for 5 ton industrial supply shipments from Chennai to Gurgaon weekly.",
        time: "2026-07-31 18:20"
    }
];

// ==========================================
// 2. LIFECYCLE INITIALIZER
// ==========================================
function initApp() {
    // Initialise Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Theme Manager
    initThemeManager();

    // Scroll Header effect
    initScrollHeader();

    // Setup Testimonial Carousel
    initTestimonialCarousel();

    // Setup Mobile navigation toggle
    initMobileNavigation();

    // Cost Estimator computations
    initCostEstimator();

    // Stepper Booking Form Handler
    initBookingWizard();

    // Tracking query listener
    initTrackingInterface();

    // Support Form Setup
    initSupportTicketForm();

    // Chatbot widget
    initLiveChatBot();

    // Contact Form Setup
    initContactForm();

    // Newsletter Setup
    initNewsletterForm();

    // AI Mockup Simulation refresh
    initAiMockupRefresh();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Helper to refresh newly rendered icons
function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ==========================================
// 3. COMMON INTERFACE LOGIC
// ==========================================

// Theme Manager
function initThemeManager() {
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// Scroll Header Shift
function initScrollHeader() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// Mobile Navigation Hamburger
function initMobileNavigation() {
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    
    hamburger.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "flex";
            navMenu.style.flexDirection = "column";
            navMenu.style.position = "absolute";
            navMenu.style.top = "70px";
            navMenu.style.left = "0";
            navMenu.style.width = "100%";
            navMenu.style.backgroundColor = "var(--bg-surface)";
            navMenu.style.padding = "2rem";
            navMenu.style.borderBottom = "1px solid var(--border-color)";
            navMenu.style.gap = "1.5rem";
        }
    });

    // Close menu when clicking nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = "none";
            }
        });
    });
}

// Testimonials Carousel
let activeSlideIndex = 0;
function initTestimonialCarousel() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    prevBtn.addEventListener("click", () => {
        activeSlideIndex--;
        if (activeSlideIndex < 0) activeSlideIndex = slides.length - 1;
        showSlide(activeSlideIndex);
    });

    nextBtn.addEventListener("click", () => {
        activeSlideIndex++;
        if (activeSlideIndex >= slides.length) activeSlideIndex = 0;
        showSlide(activeSlideIndex);
    });

    // Auto-rotation every 6 seconds
    setInterval(() => {
        activeSlideIndex++;
        if (activeSlideIndex >= slides.length) activeSlideIndex = 0;
        showSlide(activeSlideIndex);
    }, 6000);
}

// Accordion helper
function toggleFaq(element) {
    const isActive = element.classList.contains("active");
    const allItems = document.querySelectorAll(".accordion-item");
    
    allItems.forEach(item => item.classList.remove("active"));
    
    if (!isActive) {
        element.classList.add("active");
    }
}

// AI Mockup Simulation
function initAiMockupRefresh() {
    const refreshBtn = document.getElementById("mockupRefresh");
    if (!refreshBtn) return;

    refreshBtn.addEventListener("click", () => {
        // Randomize chart heights
        const bars = document.querySelectorAll(".mockup-bar");
        bars.forEach(bar => {
            const val = Math.floor(Math.random() * 25) + 3;
            bar.style.height = `${val * 4}%`;
            bar.setAttribute("data-val", `${val}m`);
        });
        
        // Randomize metrics
        const lossVal = (Math.random() * 10 + 10).toFixed(1);
        const timeVal = (Math.random() * 2 + 1).toFixed(1);
        document.getElementById("mockStatLoss").innerText = `${lossVal}%`;
        document.getElementById("mockStatTime").innerText = `-${timeVal}hr`;
    });
}

// ==========================================
// 4. COST ESTIMATOR LOGIC
// ==========================================
function calculateEstimate(origin, destination, weight, speed) {
    if (origin === destination) {
        return { total: 0, base: 0, gst: 0, fuel: 0 };
    }

    // Distance metrics representation (simulated scale)
    const distanceMatrix = {
        Mumbai: { Delhi: 1400, Bangalore: 1000, Chennai: 1300, Kolkata: 1900, Hyderabad: 700 },
        Delhi: { Mumbai: 1400, Bangalore: 2100, Chennai: 2200, Kolkata: 1500, Hyderabad: 1500 },
        Bangalore: { Mumbai: 1000, Delhi: 2100, Chennai: 350, Kolkata: 1800, Hyderabad: 570 },
        Chennai: { Mumbai: 1300, Delhi: 2200, Bangalore: 350, Kolkata: 1600, Hyderabad: 630 },
        Kolkata: { Mumbai: 1900, Delhi: 1500, Bangalore: 1800, Chennai: 1600, Hyderabad: 1500 },
        Hyderabad: { Mumbai: 700, Delhi: 1500, Bangalore: 570, Chennai: 630, Kolkata: 1500 }
    };

    const dist = (distanceMatrix[origin] && distanceMatrix[origin][destination]) || 800;
    
    // Core calculation formula
    const weightFactor = weight * 4.5;
    const distanceFactor = dist * 0.15;
    let baseFare = 150 + weightFactor + distanceFactor;
    
    if (speed === "express") {
        baseFare *= 1.6; // 60% markup for Express Air
    }

    const gstAmount = baseFare * 0.18; // 18% GST in India
    const fuelLevy = baseFare * 0.08;  // 8% handling & fuels
    const totalFare = baseFare + gstAmount + fuelLevy;

    return {
        total: totalFare.toFixed(2),
        base: baseFare.toFixed(2),
        gst: gstAmount.toFixed(2),
        fuel: fuelLevy.toFixed(2)
    };
}

function initCostEstimator() {
    const originSel = document.getElementById("estOrigin");
    const destSel = document.getElementById("estDest");
    const weightIn = document.getElementById("estWeight");
    const speedSel = document.getElementById("estSpeed");
    
    const bookNowBtn = document.getElementById("estBookNowBtn");

    function updateCalculations() {
        const prices = calculateEstimate(
            originSel.value,
            destSel.value,
            parseFloat(weightIn.value) || 1,
            speedSel.value
        );

        if (prices.total === 0) {
            document.getElementById("estFinalPrice").innerText = "₹ 0.00";
            document.getElementById("estBaseFare").innerText = "₹ 0.00";
            document.getElementById("estGst").innerText = "₹ 0.00";
            document.getElementById("estFuel").innerText = "₹ 0.00";
            document.getElementById("estTotal").innerText = "₹ 0.00";
            return;
        }

        document.getElementById("estFinalPrice").innerText = `₹ ${prices.total}`;
        document.getElementById("estBaseFare").innerText = `₹ ${prices.base}`;
        document.getElementById("estGst").innerText = `₹ ${prices.gst}`;
        document.getElementById("estFuel").innerText = `₹ ${prices.fuel}`;
        document.getElementById("estTotal").innerText = `₹ ${prices.total}`;
    }

    // Bind event listeners
    [originSel, destSel, weightIn, speedSel].forEach(elem => {
        elem.addEventListener("change", updateCalculations);
        elem.addEventListener("input", updateCalculations);
    });

    // Trigger initial calculation
    updateCalculations();

    // Link estimator to Booking wizard tab transition
    bookNowBtn.addEventListener("click", () => {
        // Pre-fill booking fields
        document.getElementById("bookOrigin").value = originSel.value;
        document.getElementById("bookDest").value = destSel.value;
        document.getElementById("bookWeight").value = weightIn.value;
        document.getElementById("bookSpeed").value = speedSel.value;

        // Switch Tab to Booking Pane
        switchEstimatorTab("book");
        location.href = "#estimator";
    });
}

function switchEstimatorTab(tab) {
    const tabBtnEstimate = document.getElementById("tabBtnEstimate");
    const tabBtnBook = document.getElementById("tabBtnBook");
    const paneEstimate = document.getElementById("paneEstimate");
    const paneBook = document.getElementById("paneBook");

    if (tab === "estimate") {
        tabBtnEstimate.classList.add("active");
        tabBtnBook.classList.remove("active");
        paneEstimate.classList.add("active");
        paneBook.classList.remove("active");
    } else {
        tabBtnBook.classList.add("active");
        tabBtnEstimate.classList.remove("active");
        paneBook.classList.add("active");
        paneEstimate.classList.remove("active");
    }
}

// Bind Tabs
document.getElementById("tabBtnEstimate").addEventListener("click", () => switchEstimatorTab("estimate"));
document.getElementById("tabBtnBook").addEventListener("click", () => switchEstimatorTab("book"));

// ==========================================
// 5. BOOKING MULTI-STEP WIZARD
// ==========================================
let currentBookingStep = 1;

function initBookingWizard() {
    const btnNext = document.getElementById("bookBtnNext");
    const btnPrev = document.getElementById("bookBtnPrev");

    btnNext.addEventListener("click", () => {
        if (currentBookingStep === 1) {
            // Validate step 1 route
            const origin = document.getElementById("bookOrigin").value;
            const dest = document.getElementById("bookDest").value;
            if (origin === dest) {
                alert("Origin and Destination cannot be the same!");
                return;
            }
            goToStep(2);
        } else if (currentBookingStep === 2) {
            // Validate step 2 input fields
            const senderName = document.getElementById("senderName").value.trim();
            const senderPhone = document.getElementById("senderPhone").value.trim();
            const senderAddress = document.getElementById("senderAddress").value.trim();
            const receiverName = document.getElementById("receiverName").value.trim();
            const receiverPhone = document.getElementById("receiverPhone").value.trim();
            const receiverAddress = document.getElementById("receiverAddress").value.trim();

            if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverPhone || !receiverAddress) {
                alert("Please fill in all address and contact details!");
                return;
            }
            
            // Build summary card data
            populateBookingSummary();
            goToStep(3);
        } else if (currentBookingStep === 3) {
            // Process payment and save to Database
            executeMockBooking();
        }
    });

    btnPrev.addEventListener("click", () => {
        if (currentBookingStep > 1) {
            goToStep(currentBookingStep - 1);
        }
    });
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll(".booking-form-step").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".step-node").forEach(n => {
        n.classList.remove("active");
        n.classList.remove("completed");
    });

    // Show selected step
    document.getElementById(`bookFormStep-${step}`).classList.add("active");
    currentBookingStep = step;

    // Stepper Line updates
    const progressLine = document.getElementById("stepperProgressLine");
    if (step === 1) {
        progressLine.style.width = "0%";
        document.getElementById("bookStepIndicator-1").classList.add("active");
        document.getElementById("bookBtnPrev").style.visibility = "hidden";
        document.getElementById("bookBtnNext").innerHTML = `Continue <i data-lucide="arrow-right"></i>`;
    } else if (step === 2) {
        progressLine.style.width = "50%";
        document.getElementById("bookStepIndicator-1").classList.add("completed");
        document.getElementById("bookStepIndicator-2").classList.add("active");
        document.getElementById("bookBtnPrev").style.visibility = "visible";
        document.getElementById("bookBtnNext").innerHTML = `Continue <i data-lucide="arrow-right"></i>`;
    } else if (step === 3) {
        progressLine.style.width = "100%";
        document.getElementById("bookStepIndicator-1").classList.add("completed");
        document.getElementById("bookStepIndicator-2").classList.add("completed");
        document.getElementById("bookStepIndicator-3").classList.add("active");
        document.getElementById("bookBtnPrev").style.visibility = "visible";
        document.getElementById("bookBtnNext").innerHTML = `<i data-lucide="credit-card"></i> Pay & Book Now`;
    }
    refreshIcons();
}

function populateBookingSummary() {
    const origin = document.getElementById("bookOrigin").value;
    const dest = document.getElementById("bookDest").value;
    const weight = parseFloat(document.getElementById("bookWeight").value);
    const speed = document.getElementById("bookSpeed").value;
    
    const sender = document.getElementById("senderName").value;
    const receiver = document.getElementById("receiverName").value;

    const pricing = calculateEstimate(origin, dest, weight, speed);

    document.getElementById("summaryRoute").innerText = `${origin} to ${dest}`;
    document.getElementById("summaryWeightSpeed").innerText = `${weight} kg | ${speed.toUpperCase()}`;
    document.getElementById("summarySender").innerText = sender;
    document.getElementById("summaryReceiver").innerText = receiver;
    document.getElementById("summaryCost").innerText = `₹ ${pricing.total}`;
}

function executeMockBooking() {
    const origin = document.getElementById("bookOrigin").value;
    const dest = document.getElementById("bookDest").value;
    const weight = parseFloat(document.getElementById("bookWeight").value);
    const speed = document.getElementById("bookSpeed").value;
    
    const sender = document.getElementById("senderName").value;
    const senderPhone = document.getElementById("senderPhone").value;
    const senderAddress = document.getElementById("senderAddress").value;
    
    const receiver = document.getElementById("receiverName").value;
    const receiverPhone = document.getElementById("receiverPhone").value;
    const receiverAddress = document.getElementById("receiverAddress").value;

    const pricing = calculateEstimate(origin, dest, weight, speed);

    // Create unique shipment ID
    const randomId = `SMART-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
    
    // Timestamp generator
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-0${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

    const newShipment = {
        id: randomId,
        origin: origin,
        destination: dest,
        weight: weight,
        speed: speed,
        cost: parseFloat(pricing.total),
        status: "booked",
        sender: sender,
        senderPhone: senderPhone,
        senderAddress: senderAddress,
        receiver: receiver,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        logs: [
            { time: formattedDate, status: "Booked", details: "Payment verified successfully. Shipment booked.", location: `${origin} Hub` }
        ]
    };

    // Push into Database
    shipmentsDb.unshift(newShipment);

    alert(`Success! Cargo booked successfully.\nYour Tracking ID: ${randomId}`);

    // Clean fields
    document.getElementById("senderName").value = "";
    document.getElementById("senderPhone").value = "";
    document.getElementById("senderAddress").value = "";
    document.getElementById("receiverName").value = "";
    document.getElementById("receiverPhone").value = "";
    document.getElementById("receiverAddress").value = "";

    // Go back to step 1
    goToStep(1);
    switchEstimatorTab("estimate");

    // Load newly created shipment immediately into the hero tracking panel
    document.getElementById("trackingSearchInput").value = randomId;
    trackShipment(randomId);
    location.href = "#home";
}

// ==========================================
// 6. LIVE SHIPMENT TRACKING VISUALIZER
// ==========================================
function initTrackingInterface() {
    const searchBtn = document.getElementById("trackingSearchBtn");
    const searchInput = document.getElementById("trackingSearchInput");
    const demoLink = document.getElementById("demoTrackLink");

    searchBtn.addEventListener("click", () => {
        const id = searchInput.value.trim();
        if (id) trackShipment(id);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const id = searchInput.value.trim();
            if (id) trackShipment(id);
        }
    });

    demoLink.addEventListener("click", () => {
        searchInput.value = "SMART-987-654";
        trackShipment("SMART-987-654");
    });
}

function trackShipment(trackId) {
    const shipment = shipmentsDb.find(s => s.id.toUpperCase() === trackId.toUpperCase());
    const panel = document.getElementById("trackingResultPanel");

    if (!shipment) {
        alert("Invalid Tracking Number! Try SMART-987-654");
        panel.style.display = "none";
        return;
    }

    panel.style.display = "block";
    
    // Fill text summaries
    document.getElementById("trackSumId").innerText = shipment.id;
    document.getElementById("trackSumStatus").innerText = shipment.status.toUpperCase();
    document.getElementById("trackSumLocation").innerText = shipment.logs[0] ? shipment.logs[0].location : "Unknown";
    
    // ETA computation based on speed
    if (shipment.status === "delivered") {
        document.getElementById("trackSumEta").innerText = "Completed";
    } else {
        document.getElementById("trackSumEta").innerText = shipment.speed === "express" ? "Within 24 Hours" : "2 - 3 Business Days";
    }

    // Set timeline indicators
    const progressLine = document.getElementById("timelineProgress");
    const nodes = {
        booked: document.getElementById("node-placed"),
        transit: document.getElementById("node-transit"),
        out: document.getElementById("node-out"),
        delivered: document.getElementById("node-delivered")
    };

    // Reset status classes
    Object.values(nodes).forEach(node => {
        node.classList.remove("completed");
        node.classList.remove("active");
    });

    const isHorizontal = window.innerWidth > 768;

    if (shipment.status === "booked") {
        if (isHorizontal) progressLine.style.width = "0%";
        else progressLine.style.height = "0%";
        nodes.booked.classList.add("active");
        nodes.booked.classList.add("completed");
    } else if (shipment.status === "transit") {
        if (isHorizontal) progressLine.style.width = "33%";
        else progressLine.style.height = "33%";
        nodes.booked.classList.add("completed");
        nodes.transit.classList.add("active");
        nodes.transit.classList.add("completed");
    } else if (shipment.status === "out") {
        if (isHorizontal) progressLine.style.width = "66%";
        else progressLine.style.height = "66%";
        nodes.booked.classList.add("completed");
        nodes.transit.classList.add("completed");
        nodes.out.classList.add("active");
        nodes.out.classList.add("completed");
    } else if (shipment.status === "delivered") {
        if (isHorizontal) progressLine.style.width = "100%";
        else progressLine.style.height = "100%";
        nodes.booked.classList.add("completed");
        nodes.transit.classList.add("completed");
        nodes.out.classList.add("completed");
        nodes.delivered.classList.add("active");
        nodes.delivered.classList.add("completed");
    }

    // Fill Transit Logs list
    const logsContainer = document.getElementById("trackingLogsList");
    logsContainer.innerHTML = "";

    shipment.logs.forEach((log, index) => {
        const logItem = document.createElement("div");
        logItem.className = `log-item ${index === 0 ? 'latest' : ''}`;
        logItem.innerHTML = `
            <div class="log-time">${log.time}</div>
            <div class="log-details">${log.details}</div>
            <div class="log-location"><i data-lucide="map-pin" style="width:12px; height:12px; vertical-align:middle;"></i> ${log.location}</div>
        `;
        logsContainer.appendChild(logItem);
    });

    refreshIcons();
    panel.scrollIntoView({ behavior: "smooth" });
}

// ==========================================
// 7. CLIENT PORTALS (DASHBOARD VIEWS)
// ==========================================
const portalBackdrop = document.getElementById("portalBackdrop");
const portalHeaderTitle = document.getElementById("portalHeaderTitle");
const portalSidebarMenu = document.getElementById("portalSidebarMenu");
const portalCloseBtn = document.getElementById("portalCloseBtn");
let activePortalType = ""; // "customer" or "admin"

// Event listener for main Portal CTA header button
document.getElementById("portalBtn").addEventListener("click", () => {
    // Show option popup to select between Customer vs Admin dashboard
    const promptAns = confirm("Press OK to enter Client Portal (Customer Dashboard).\nPress CANCEL to load regional Administrative Operations Panel.");
    if (promptAns) {
        openPortal("customer");
    } else {
        openPortal("admin");
    }
});

portalCloseBtn.addEventListener("click", closePortal);

function openPortal(type) {
    activePortalType = type;
    portalBackdrop.classList.add("active");
    
    // Reset all portal panes to hide
    document.querySelectorAll(".portal-pane").forEach(p => p.classList.remove("active"));

    if (type === "customer") {
        portalHeaderTitle.innerText = "SmartMove Client Console";
        document.getElementById("portalUserStatus").innerText = "Merchant Account Session";
        
        // Build Customer Menu
        portalSidebarMenu.innerHTML = `
            <div class="portal-menu-item active" onclick="switchPortalPane('paneCustomerOverview', this)"><i data-lucide="layout-dashboard"></i> Overview</div>
            <div class="portal-menu-item" onclick="switchPortalPane('paneCustomerSettings', this)"><i data-lucide="terminal"></i> API Console</div>
            <div class="portal-menu-item" onclick="switchPortalPane('paneCustomerSupport', this)"><i data-lucide="help-circle"></i> Help Desk</div>
        `;
        
        // Render Active pane
        document.getElementById("paneCustomerOverview").classList.add("active");
        renderCustomerOverview();

    } else if (type === "admin") {
        portalHeaderTitle.innerText = "Administrative Dispatch Center";
        document.getElementById("portalUserStatus").innerText = "Operator Session";
        
        // Build Admin Menu
        portalSidebarMenu.innerHTML = `
            <div class="portal-menu-item active" onclick="switchPortalPane('paneAdminOverview', this)"><i data-lucide="settings"></i> Control Deck</div>
            <div class="portal-menu-item" onclick="switchPortalPane('paneAdminInquiries', this)"><i data-lucide="inbox"></i> Inquiries Inbox</div>
        `;
        
        // Render Active pane
        document.getElementById("paneAdminOverview").classList.add("active");
        renderAdminOverview();
    }
    
    refreshIcons();
}

function closePortal() {
    portalBackdrop.classList.remove("active");
}

function switchPortalPane(paneId, menuItem) {
    // De-activate all panes
    document.querySelectorAll(".portal-pane").forEach(p => p.classList.remove("active"));
    // Activate target pane
    document.getElementById(paneId).classList.add("active");

    // Reset active styles in menu item
    document.querySelectorAll(".portal-menu-item").forEach(item => item.classList.remove("active"));
    menuItem.classList.add("active");
    
    // Rerenders
    if (paneId === "paneCustomerOverview") renderCustomerOverview();
    if (paneId === "paneAdminOverview") renderAdminOverview();
    if (paneId === "paneAdminInquiries") renderAdminInquiries();
    
    refreshIcons();
}

// Render Customer Data inside Dashboard
function renderCustomerOverview() {
    const tableBody = document.getElementById("dashCustomerShipmentTable");
    tableBody.innerHTML = "";

    // Count client shipments (all for simple demonstration mockup)
    document.getElementById("dashCustomerActiveCount").innerText = shipmentsDb.filter(s => s.status !== "delivered").length;

    shipmentsDb.forEach(ship => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${ship.id}</strong></td>
            <td>${ship.origin} to ${ship.destination}</td>
            <td>${ship.speed.toUpperCase()}</td>
            <td>₹ ${ship.cost}</td>
            <td><span class="badge ${getStatusBadge(ship.status)}">${ship.status}</span></td>
            <td><button class="btn btn-secondary btn-table-action" onclick="closePortal(); trackShipment('${ship.id}')">Track</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

// Render Admin Master Table
function renderAdminOverview() {
    const tableBody = document.getElementById("dashAdminShipmentTable");
    tableBody.innerHTML = "";

    // Global Statistics
    const revenueSum = shipmentsDb.reduce((acc, curr) => acc + curr.cost, 0);
    document.getElementById("dashAdminRevenue").innerText = `₹ ${revenueSum.toLocaleString('en-IN')}.00`;
    document.getElementById("dashAdminActiveCount").innerText = shipmentsDb.filter(s => s.status !== "delivered").length;
    document.getElementById("dashAdminInquiryCount").innerText = inquiriesDb.length;

    shipmentsDb.forEach((ship, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${ship.id}</strong></td>
            <td>
                <div style="font-size:0.8125rem;"><strong>S:</strong> ${ship.sender}</div>
                <div style="font-size:0.8125rem;"><strong>R:</strong> ${ship.receiver}</div>
            </td>
            <td>${ship.origin} to ${ship.destination}</td>
            <td>${ship.speed.toUpperCase()}</td>
            <td>
                <div class="admin-status-control">
                    <select onchange="updateShipmentStatusAdmin('${ship.id}', this.value)">
                        <option value="booked" ${ship.status === 'booked' ? 'selected' : ''}>Booked</option>
                        <option value="transit" ${ship.status === 'transit' ? 'selected' : ''}>In Transit</option>
                        <option value="out" ${ship.status === 'out' ? 'selected' : ''}>Out For Delivery</option>
                        <option value="delivered" ${ship.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </div>
            </td>
            <td><button class="btn btn-secondary btn-table-action" onclick="closePortal(); trackShipment('${ship.id}')">Track</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateShipmentStatusAdmin(shipId, newStatus) {
    const shipment = shipmentsDb.find(s => s.id === shipId);
    if (!shipment) return;

    shipment.status = newStatus;
    
    // Add transit log update
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-0${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
    
    let description = "";
    let locationStr = "";
    if (newStatus === "booked") {
        description = "Shipment reset to Booking queue.";
        locationStr = `${shipment.origin} Hub`;
    } else if (newStatus === "transit") {
        description = "Departed sorting terminal and is in transit.";
        locationStr = "National Highway Corridor";
    } else if (newStatus === "out") {
        description = "Out for delivery. Assigned to distribution partner.";
        locationStr = `${shipment.destination} Hub`;
    } else if (newStatus === "delivered") {
        description = "Cargo delivered successfully. Signature captured.";
        locationStr = `${shipment.destination} Hub`;
    }

    shipment.logs.unshift({
        time: formattedDate,
        status: newStatus.toUpperCase(),
        details: description,
        location: locationStr
    });

    alert(`Shipment ${shipId} updated to: ${newStatus.toUpperCase()}`);
    renderAdminOverview();
}

// Render Admin Inquiries Inbox
function renderAdminInquiries() {
    const tableBody = document.getElementById("dashAdminInquiryTable");
    tableBody.innerHTML = "";

    inquiriesDb.forEach(inq => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${inq.name}</strong></td>
            <td>${inq.email}</td>
            <td><div style="max-width:300px; white-space:normal; font-size:0.875rem;">"${inq.message}"</div></td>
            <td>${inq.time}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Badge status helper
function getStatusBadge(status) {
    if (status === "booked") return "badge-warning";
    if (status === "transit") return "badge-info";
    if (status === "out") return "badge-warning";
    if (status === "delivered") return "badge-success";
    return "badge-info";
}

// ==========================================
// 8. HELP TICKETS & CLIENT INQUIRIES
// ==========================================

// Support desk submission
function initSupportTicketForm() {
    const supportForm = document.getElementById("dashSupportForm");
    if (!supportForm) return;

    supportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const subject = document.getElementById("supportSubject").value;
        const details = document.getElementById("supportDetails").value;

        alert(`Support ticket logged successfully!\nSubject: ${subject}\n\nOur service agents will review it soon.`);
        
        document.getElementById("supportSubject").value = "";
        document.getElementById("supportDetails").value = "";
    });
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-0${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

        // Injects directly into Admin inbox DB
        inquiriesDb.unshift({
            name: name,
            email: email,
            message: message,
            time: formattedDate
        });

        alert(`Thank you Vikram! Your inquiry has been sent to our sales desk. Administrators can review it instantly in the Admin Portal.`);
        
        // Reset fields
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactMessage").value = "";
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing! You will receive our LogTech news reports monthly.");
        form.reset();
    });
}

// ==========================================
// 9. CAREER POSITIONS MODAL
// ==========================================
const careerModal = document.getElementById("careerModal");
const jobModalTitle = document.getElementById("jobModalTitle");

function applyJob(jobTitle) {
    careerModal.classList.add("active");
    jobModalTitle.innerText = `Applying for: ${jobTitle}`;
}

function closeCareerModal() {
    careerModal.classList.remove("active");
}

document.getElementById("careerApplyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Application submitted successfully! Our recruiting team will follow up via email.");
    closeCareerModal();
    document.getElementById("careerApplyForm").reset();
});

// ==========================================
// 10. LIVE CHAT BOT INTERFACE
// ==========================================
function initLiveChatBot() {
    const chatWidget = document.getElementById("chatWidget");
    const chatTrigger = document.getElementById("chatTrigger");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const chatInput = document.getElementById("chatInput");
    const msgContainer = document.getElementById("chatMessagesContainer");

    chatTrigger.addEventListener("click", () => {
        chatWidget.classList.toggle("active");
    });

    chatSendBtn.addEventListener("click", sendChatMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });

    function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Render User Msg
        renderMessage(text, "user");
        chatInput.value = "";

        // Trigger bot loading state response
        setTimeout(() => {
            const reply = getBotReply(text);
            renderMessage(reply, "bot");
        }, 800);
    }

    function renderMessage(text, sender) {
        const div = document.createElement("div");
        div.className = `chat-msg ${sender}`;
        div.innerHTML = text;
        msgContainer.appendChild(div);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    function getBotReply(query) {
        const text = query.toLowerCase();
        
        if (text.includes("pricing") || text.includes("cost") || text.includes("fare") || text.includes("rate")) {
            return `Our freight prices depend on weight, speed tier, and route. You can use our interactive <a href="#estimator" style="color:var(--color-accent); font-weight:700; text-decoration:underline;">Calculator</a> in the estimation section for real-time rates. Standard rates start around ₹150.`;
        }
        
        if (text.includes("track") || text.includes("where is") || text.includes("status")) {
            return `To check on an order, enter the tracking number (e.g., <strong style="color:var(--color-primary-light);">SMART-987-654</strong>) directly in the Search Bar at the top of the page.`;
        }
        
        if (text.includes("route") || text.includes("zones") || text.includes("cities") || text.includes("where do you")) {
            return `We operate transport hubs in key hubs: Bangalore, Mumbai, Delhi, Chennai, Kolkata, and Hyderabad, with road freight corridors covering over 350+ intermediate cities.`;
        }

        if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("namaste")) {
            return `Hello! How can SmartMove Logistics assist your business today? Feel free to ask about 'tracking', 'rates', or 'locations'.`;
        }

        return `Thank you for your message. For immediate complex sales negotiations, please send an inquiry via our <a href="#contact" style="color:var(--color-accent); font-weight:700; text-decoration:underline;">Contact Desk</a> or call our helpline.`;
    }
}

// Expose functions globally to support HTML inline event handlers inside modules (such as in Vite builds)
window.openPortal = openPortal;
window.closePortal = closePortal;
window.toggleFaq = toggleFaq;
window.applyJob = applyJob;
window.closeCareerModal = closeCareerModal;
window.switchPortalPane = switchPortalPane;
window.updateShipmentStatusAdmin = updateShipmentStatusAdmin;
window.trackShipment = trackShipment;
