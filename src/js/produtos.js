document.addEventListener('DOMContentLoaded', function () {
    // Função para configurar um slider com base nos IDs fornecidos
    function setupSlider(rangeMinId, rangeMaxId, thumbMinId, thumbMaxId, trackHighlightId, valueMinId, valueMaxId) {
        const rangeMin = document.getElementById(rangeMinId);
        const rangeMax = document.getElementById(rangeMaxId);
        const thumbMin = document.getElementById(thumbMinId);
        const thumbMax = document.getElementById(thumbMaxId);
        const trackHighlight = document.getElementById(trackHighlightId);
        const valueMin = document.getElementById(valueMinId);
        const valueMax = document.getElementById(valueMaxId);

        function updateSlider() {
            // Garantir que o valor mínimo não exceda o máximo
            if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
                rangeMin.value = rangeMax.value;
            }

            const minPercent = (rangeMin.value / rangeMin.max) * 100;
            const maxPercent = (rangeMax.value / rangeMax.max) * 100;

            thumbMin.style.left = minPercent + '%';
            thumbMax.style.left = maxPercent + '%';
            trackHighlight.style.left = minPercent + '%';
            trackHighlight.style.width = (maxPercent - minPercent) + '%';
            valueMin.textContent = rangeMin.value;
            valueMax.textContent = rangeMax.value;
        }

        // Adicionar eventos de input
        rangeMin.addEventListener('input', updateSlider);
        rangeMax.addEventListener('input', updateSlider);

        // Inicializar o slider
        updateSlider();
    }

    // Configurar o slider principal
    setupSlider('range-min', 'range-max', 'thumb-min', 'thumb-max', 'track-highlight', 'value-min', 'value-max');

    // Configurar o slider mobile
    setupSlider('range-min-mobile', 'range-max-mobile', 'thumb-min-mobile', 'thumb-max-mobile', 'track-highlight-mobile', 'value-min-mobile', 'value-max-mobile');
});

document.addEventListener('DOMContentLoaded', function () {
    const colors = ["red","blue","green","orange","purple","black"]; 

// Generate color buttons dynamically
const colorContainer = document.getElementById("idColorOptions");
colors.forEach(color => {
    const btn = document.createElement("button");
    btn.classList.add("colorBtn");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-color", color);
    
    // Set click event immediately (slow for whatever reason and not working as intended)
    btn.onclick = function () {
        document.querySelectorAll(".colorBtn").forEach(colorBtn => colorBtn.classList.remove("activeColor"));
        this.classList.add("activeColor");
    };

    colorContainer.appendChild(btn);
});

const colorsMobile = ["red","blue","green","orange","purple","black"]; 


const colorContainerMobile = document.getElementById("idColorOptions-mobile");
colorsMobile.forEach(color => {
    const btn = document.createElement("button");
    btn.classList.add("colorBtn");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-color", color);
    
    // Set click event immediately (slow for whatever reason and not working as intended)
    btn.onclick = function () {
        document.querySelectorAll(".colorBtn").forEach(colorBtn => colorBtn.classList.remove("activeColor"));
        this.classList.add("activeColor");
    };

    colorContainerMobile.appendChild(btn);
});

})

document.addEventListener('DOMContentLoaded', function () {
    const sizes = ["S", "M", "L", "XL", "2XL"]; 

// Generate size buttons dynamically
const sizeContainer = document.getElementById("idSizeOptions");
sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.classList.add("sizeBtn");
    btn.textContent = size;
    
    // Set click event immediately
    btn.onclick = function () {
        document.querySelectorAll(".sizeBtn").forEach(sizeBtn => sizeBtn.classList.remove("activeSize"));
        this.classList.add("activeSize");
    };

    sizeContainer.appendChild(btn);
});

const sizesMobile = ["S", "M", "L", "XL", "2XL"]; 

// Generate size buttons dynamically
const sizeContainerMobile = document.getElementById("idSizeOptions-mobile");
sizesMobile.forEach(size => {
    const btn = document.createElement("button");
    btn.classList.add("sizeBtn");
    btn.textContent = size;
    
    // Set click event immediately
    btn.onclick = function () {
        document.querySelectorAll(".sizeBtn").forEach(sizeBtn => sizeBtn.classList.remove("activeSize"));
        this.classList.add("activeSize");
    };

    sizeContainerMobile.appendChild(btn);
});

})



document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('menu-mobile');

    menuToggle.addEventListener('click', function () {
        if (menuMobile.style.display === 'flex') {
            menuMobile.style.display = 'none';
        } else {
            menuMobile.style.display = 'flex';
        }
    });

    // Optionally close the menu when clicking a link
    const links = menuMobile.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.style.display = 'none';
        });
    });
});

// Verificar responsividade
function checkResponsiveness() {
    const isMobile = window.innerWidth <= 576;
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 576;

    // Ajustar altura do carrossel com base no tamanho da tela
    const carouselContent = document.querySelector('.carousel-content');
    const dataFeedbacks = document.querySelectorAll('.feedback-date');
    if (carouselContent) {
        if (isMobile) {
            carouselContent.style.minHeight = '350px';
            dataFeedbacks.forEach(item => {
                item.style.display = 'none';
            });
        } else if (isTablet) {
            carouselContent.style.minHeight = '320px';
            dataFeedbacks.forEach(item => {
                item.style.display = 'none';
            });
        } else {
            carouselContent.style.minHeight = '300px';
            dataFeedbacks.forEach(item => {
                item.style.display = 'block';
            });
        }
    }
}

// Variável para controlar o índice atual
let currentIndex = 0;


document.addEventListener("DOMContentLoaded", () => {
    checkResponsiveness();
});

document.addEventListener('DOMContentLoaded', function () {
    const filtersToggle = document.getElementById('filters-toggle');
    const filtersSidebar = document.getElementById('filters-sidebar');
    const closeFilters = document.getElementById('close-filters');
    const filtersOverlay = document.getElementById('filters-overlay');
    const applyFilters = document.getElementById('apply-filters');

    // Abrir filtros
    if (filtersToggle) {
        filtersToggle.addEventListener('click', function () {
            filtersSidebar.classList.add('open');
            filtersOverlay.classList.add('active');
        });
    }

    // Fechar filtros
    function closeFiltersSidebar() {
        filtersSidebar.classList.remove('open');
        filtersOverlay.classList.remove('active');
    }

    if (closeFilters) {
        closeFilters.addEventListener('click', closeFiltersSidebar);
    }

    if (filtersOverlay) {
        filtersOverlay.addEventListener('click', closeFiltersSidebar);
    }

    // Aplicar filtros
    if (applyFilters) {
        applyFilters.addEventListener('click', function () {
            // Sua lógica de filtragem aqui
            console.log('Filtros aplicados!');
            closeFiltersSidebar();
        });
    }
});