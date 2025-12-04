// YASI K'ARI - Main JavaScript File

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initMobileMenu();
    initTypedText();
    initScrollReveal();
    initMap();
    initSmoothScroll();
    initAnimations();
    initFormValidation();
    initWhatsAppButtons();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Typed Text Animation
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const texts = [
            'Asesoría Legal',
            'Derecho Penal',
            'Derecho Civil',
            'Derecho Familiar',
            'Derecho Laboral',
            'Derecho Corporativo'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        typeText();
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize Map
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Bolivia coordinates
        const map = L.map('map').setView([-16.2902, -63.5887], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Office locations
        const offices = [
            {
                name: 'Santa Cruz',
                coords: [-17.7834, -63.1821],
                address: 'Av. San Martín #455, Edificio Nueva Esperanza, Piso 3',
                phone: '+591 3 336 2200'
            },
            {
                name: 'La Paz',
                coords: [-16.4897, -68.1193],
                address: 'Calle Comercio #1485, Edificio Las Lilas, Piso 8',
                phone: '+591 2 245 8900'
            },
            {
                name: 'Cochabamba',
                coords: [-17.4131, -66.1653],
                address: 'Av. Ballivián #665, Torre Empresarial, Piso 12',
                phone: '+591 4 452 1100'
            },
            {
                name: 'Sucre',
                coords: [-19.0196, -65.2627],
                address: 'Calle Audiencia #234, Edificio Histórico, Piso 2',
                phone: '+591 4 646 3300'
            },
            {
                name: 'Trinidad',
                coords: [-14.8280, -64.9000],
                address: 'Av. 6 de Agosto #789, Centro Comercial Beni, Piso 4',
                phone: '+591 3 462 4400'
            }
        ];
        
        // Custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">YK</div>',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
        
        // Add markers
        offices.forEach(office => {
            const marker = L.marker(office.coords, { icon: customIcon }).addTo(map);
            
            const popupContent = `
                <div class="p-3 min-w-48">
                    <h3 class="font-bold text-slate-800 mb-2">${office.name}</h3>
                    <p class="text-sm text-slate-600 mb-2">${office.address}</p>
                    <p class="text-sm font-semibold text-amber-600">${office.phone}</p>
                    <button onclick="contactOffice('${office.name}')" class="mt-2 bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition-colors">
                        Contactar
                    </button>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Animations
function initAnimations() {
    // Animate cards on hover
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (validateForm(data)) {
                showSuccessMessage();
                form.reset();
            }
        });
    });
}

// Form validation logic
function validateForm(data) {
    const required = ['name', 'email', 'message'];
    const errors = [];
    
    required.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`${field} es requerido`);
        }
    });
    
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Email inválido');
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Teléfono inválido');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors[0]);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.textContent = 'Mensaje enviado exitosamente!';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Error message
function showErrorMessage(error) {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.textContent = error;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// WhatsApp Buttons
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lawyer = this.getAttribute('data-whatsapp') || 'YASI K\'ARI';
            const specialty = this.getAttribute('data-specialty') || 'asesoría legal';
            
            const message = `Hola, soy ${lawyer}. He visto su perfil en YASI K'ARI y necesito asesoría en ${specialty}. ¿Podría atenderme?`;
            const phone = '59167358769'; // WhatsApp actualizado
            
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });
}

// Contact Office Function
function contactOffice(city) {
    const message = `Hola, me gustaría obtener más información sobre sus servicios legales en la sede de ${city}.`;
    const phone = '59167358769'; // WhatsApp actualizado
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function to handle specialty-specific WhatsApp messages
function contactSpecialty(specialty) {
    const messages = {
        'penal': 'Hola, necesito asesoría en Derecho Penal. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'civil': 'Hola, necesito asesoría en Derecho Civil. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'familiar': 'Hola, necesito asesoría en Derecho Familiar. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'laboral': 'Hola, necesito asesoría en Derecho Laboral. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'administrativo': 'Hola, necesito asesoría en Derecho Administrativo. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'constitucional': 'Hola, necesito asesoría en Derecho Constitucional. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?',
        'corporativo': 'Hola, necesito asesoría en Derecho Corporativo. He visto sus servicios en YASI K\'ARI y me gustaría consultar sobre un caso. ¿Podrían atenderme?'
    };
    
    const message = messages[specialty] || 'Hola, necesito asesoría legal. He visto sus servicios en YASI K\'ARI. ¿Podrían atenderme?';
    const phone = '59167358769'; // WhatsApp actualizado
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', debounce(() => {
    const scrollButton = document.getElementById('scroll-to-top');
    
    if (window.pageYOffset > 300) {
        if (!scrollButton) {
            const button = document.createElement('button');
            button.id = 'scroll-to-top';
            button.className = 'fixed bottom-8 right-8 bg-amber-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 z-50 flex items-center justify-center';
            button.innerHTML = '<i class=\"fas fa-chevron-up\"></i>';
            button.onclick = scrollToTop;
            
            document.body.appendChild(button);
        }
    } else {
        if (scrollButton) {
            scrollButton.remove();
        }
    }
}, 100));

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class=\"bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4\">
            <div class=\"animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600\"></div>
            <span class=\"text-slate-700\">Cargando...</span>
        </div>
    `;
    
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-slate-800 text-white px-2 py-1 rounded text-sm z-50';
            tooltip.textContent = tooltipText;
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.marginBottom = '5px';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.absolute');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize all tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', initTooltips);

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.loading = 'lazy';
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// Export functions for global use
window.YasiKari = {
    contactOffice,
    scrollToTop,
    showLoading,
    hideLoading
};