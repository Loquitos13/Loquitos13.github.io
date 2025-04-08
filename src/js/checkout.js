document.addEventListener('DOMContentLoaded', function() {
    const steps = [
        { // Step 0: Delivery
            container: document.querySelector('.container-delivery'),
            insignia: document.querySelectorAll('.Insignia')[0],
            barraProgresso: document.querySelectorAll('.BarraProgresso')[0],
            barraNomes: document.querySelectorAll('.BarraNomes')[0],
            buttons: document.getElementById('cart-back').parentElement,
            nextButton: document.getElementById('payment-button')
        },
        { // Step 1: Payment
            container: document.querySelector('.container-payment'),
            insignia: document.querySelectorAll('.Insignia')[1],
            barraProgresso: document.querySelectorAll('.BarraProgresso')[1],
            barraNomes: document.querySelectorAll('.BarraNomes')[1],
            buttons: document.getElementById('delivery-back').parentElement,
            nextButton: document.getElementById('review-button')
        },
        { // Step 2: Confirm
            container: document.querySelector('.container-shipping'),
            insignia: document.querySelectorAll('.Insignia')[2],
            barraProgresso: document.querySelectorAll('.BarraProgresso')[2],
            barraNomes: document.querySelectorAll('.BarraNomes')[2],
            buttons: document.getElementById('payment-back').parentElement,
            nextButton: document.getElementById('confirm-button')
        }
    ];

    let currentStep = 0;

    function hideAllSteps() {
        document.querySelectorAll('.container-delivery, .container-payment, .container-shipping, .Insignia, .BarraProgresso, .BarraNomes').forEach(el => {
            el.classList.remove('active');
        });
        steps.forEach(step => step.buttons.style.display = 'none');
    }

    function showStep(stepIndex) {
        const step = steps[stepIndex];

        step.container.classList.add('active');
        step.insignia.classList.add('active');
        step.barraProgresso.classList.add('active');
        step.barraNomes.classList.add('active');

        step.buttons.style.display = 'flex';
    }

    steps.forEach((step, index) => {
        if (step.nextButton) {
            step.nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    hideAllSteps();
                    showStep(currentStep);
                }
            });
        }
    });

    steps.forEach((step, index) => {
        const backButton = step.buttons.querySelector('.btn-secondary');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentStep > 0) {
                    currentStep--;
                    hideAllSteps();
                    showStep(currentStep);
                }
            });
        }
    });

    hideAllSteps();
    showStep(currentStep);
});