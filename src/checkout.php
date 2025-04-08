<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/checkout.css">
    <script src="js/checkout.js"></script>
    <title>Checkout</title>
</head>

<body>
    <header>

    </header>

    <main>
        <div class="main-container">
            <div class="Insignia" id="delivery-insignia">
                <span class="badge rounded-pill text-bg-primary bg-blueviolet First">1</span>

                <span class="badge rounded-pill text-bg-primary bg-grey Second">2</span>

                <span class="badge rounded-pill text-bg-primary bg-grey Third">3</span>
            </div>
            <div class="BarraProgresso" id="delivert-barra">
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            </div>
            <div class="BarraNomes" id="delivery-nomes">
                <span>Delivery</span>
                <span>Payment</span>
                <span>Confirm</span>
            </div>
            <div class="container-delivery ">
                <div class="container-details">
                    <h1>Delivery Details</h1>
                    <h4>Shipping Method</h4>
                    <div class="container-format-row">
                        <div class="container-standard-delivery">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Standard Delivery
                                <div class="businessDays">3-5 business days</div>
                                <div class="delivery-price">$5.99</div>
                        </div>
                        <div class="container-express-delivery">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Express Delivery
                                <div class="businessDays">1-2 business days</div>
                                <div class="delivery-price">$12.99</div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            First Name
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <div class="container-format-column">
                            Last Name
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            Adress
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            City
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <div class="container-format-column">
                            Postal Code
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            Country Code
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="+55" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <div class="container-format-column">
                            Mobile Phone
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            Tax ID Number
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" aria-label="Username"
                                    aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-format-row format-buttons">
                <button type="button" id="cart-back" class="btn btn-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Cart
                </button>
                <button type="button" id="payment-button" class="btn btn-primary bg-blueviolet">
                    Continue to Payment <i class="bi bi-arrow-right"></i>
                </button>
            </div>
            <div class="space"></div>
            <div class="Insignia" id="payment-insignia">
                <span class="badge rounded-pill text-bg-primary bg-blueviolet First">1</span>

                <span class="badge rounded-pill text-bg-primary bg-blueviolet Fourth">2</span>

                <span class="badge rounded-pill text-bg-primary bg-grey Third">3</span>
            </div>
            <div class="BarraProgresso" id="payment-barra">
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="0"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            </div>
            <div class="BarraNomes" id="payment-nomes">
                <span>Delivery</span>
                <span>Payment</span>
                <span>Confirm</span>
            </div>
            <div class="container-payment">
                <div class="container-details">
                    <h1>Payment Method</h1>
                    <div class="container-format-row">
                        <div class="container-standard">
                            <div class="container-format-column">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault">
                                <label class="form-check-label" for="flexRadioDefault1"> <svg width="15" height="20"
                                        viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_11_974)">
                                            <g clip-path="url(#clip1_11_974)">
                                                <path
                                                    d="M0.625 2.5C0.625 1.12109 1.74609 0 3.125 0H11.875C13.2539 0 14.375 1.12109 14.375 2.5V17.5C14.375 18.8789 13.2539 20 11.875 20H3.125C1.74609 20 0.625 18.8789 0.625 17.5V2.5ZM8.75 17.5C8.75 17.1685 8.6183 16.8505 8.38388 16.6161C8.14946 16.3817 7.83152 16.25 7.5 16.25C7.16848 16.25 6.85054 16.3817 6.61612 16.6161C6.3817 16.8505 6.25 17.1685 6.25 17.5C6.25 17.8315 6.3817 18.1495 6.61612 18.3839C6.85054 18.6183 7.16848 18.75 7.5 18.75C7.83152 18.75 8.14946 18.6183 8.38388 18.3839C8.6183 18.1495 8.75 17.8315 8.75 17.5ZM11.875 2.5H3.125V15H11.875V2.5Z"
                                                    fill="#1F2937" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11_974">
                                                <rect width="15" height="20" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_11_974">
                                                <path d="M0 0H15V20H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    MB WAY</label>
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-standard">
                            <div class="container-format-column">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault">
                                <label class="form-check-label" for="flexRadioDefault1"><svg width="23" height="20"
                                        viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_11_1057)">
                                            <g clip-path="url(#clip1_11_1057)">
                                                <path
                                                    d="M20 3.125C20.3438 3.125 20.625 3.40625 20.625 3.75V5H1.875V3.75C1.875 3.40625 2.15625 3.125 2.5 3.125H20ZM20.625 8.75V16.25C20.625 16.5938 20.3438 16.875 20 16.875H2.5C2.15625 16.875 1.875 16.5938 1.875 16.25V8.75H20.625ZM2.5 1.25C1.12109 1.25 0 2.37109 0 3.75V16.25C0 17.6289 1.12109 18.75 2.5 18.75H20C21.3789 18.75 22.5 17.6289 22.5 16.25V3.75C22.5 2.37109 21.3789 1.25 20 1.25H2.5ZM4.6875 13.125C4.16797 13.125 3.75 13.543 3.75 14.0625C3.75 14.582 4.16797 15 4.6875 15H6.5625C7.08203 15 7.5 14.582 7.5 14.0625C7.5 13.543 7.08203 13.125 6.5625 13.125H4.6875ZM9.6875 13.125C9.16797 13.125 8.75 13.543 8.75 14.0625C8.75 14.582 9.16797 15 9.6875 15H14.0625C14.582 15 15 14.582 15 14.0625C15 13.543 14.582 13.125 14.0625 13.125H9.6875Z"
                                                    fill="#1F2937" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11_1057">
                                                <rect width="22.5" height="20" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_11_1057">
                                                <path d="M0 0H22.5V20H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Credit/Debit Card</label>
                                <div class="input-group mb-3 card-input-container">
                                    <input type="text" class="form-control" placeholder="Card Number"
                                        aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <div class="container-format-row">
                                    <div class="input-group mb-3 card-container">
                                        <input type="text" class="form-control" placeholder="MM/YY"
                                            aria-label="Username" aria-describedby="basic-addon1">
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="CVC" aria-label="Username"
                                            aria-describedby="basic-addon1">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-format-row">
                        <div class="container-standard">
                            <div class="container-format-column">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault">
                                <label class="form-check-label" for="flexRadioDefault1"> <svg width="20" height="20"
                                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_11_984)">
                                            <g clip-path="url(#clip1_11_984)">
                                                <path
                                                    d="M9.50778 0.101563L0.757777 3.85156C0.210902 4.08594 -0.0937856 4.67187 0.0273081 5.25C0.148402 5.82812 0.656214 6.25 1.24996 6.25V6.5625C1.24996 7.08203 1.66793 7.5 2.18746 7.5H17.8125C18.332 7.5 18.75 7.08203 18.75 6.5625V6.25C19.3437 6.25 19.8554 5.83203 19.9726 5.25C20.0898 4.66797 19.7851 4.08203 19.2422 3.85156L10.4922 0.101563C10.1797 -0.03125 9.82028 -0.03125 9.50778 0.101563ZM4.99996 8.75H2.49996V16.418C2.47653 16.4297 2.45309 16.4453 2.42965 16.4609L0.554652 17.7109C0.0976206 18.0156 -0.109411 18.5859 0.0507456 19.1133C0.210902 19.6406 0.699183 20 1.24996 20H18.75C19.3007 20 19.7851 19.6406 19.9453 19.1133C20.1054 18.5859 19.9023 18.0156 19.4414 17.7109L17.5664 16.4609C17.5429 16.4453 17.5195 16.4336 17.4961 16.418V8.75H15V16.25H13.4375V8.75H10.9375V16.25H9.06246V8.75H6.56246V16.25H4.99996V8.75ZM9.99996 2.5C10.3315 2.5 10.6494 2.6317 10.8838 2.86612C11.1183 3.10054 11.25 3.41848 11.25 3.75C11.25 4.08152 11.1183 4.39946 10.8838 4.63388C10.6494 4.8683 10.3315 5 9.99996 5C9.66844 5 9.3505 4.8683 9.11608 4.63388C8.88166 4.39946 8.74996 4.08152 8.74996 3.75C8.74996 3.41848 8.88166 3.10054 9.11608 2.86612C9.3505 2.6317 9.66844 2.5 9.99996 2.5Z"
                                                    fill="#1F2937" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11_984">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_11_984">
                                                <path d="M0 0H20V20H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Multibanco</label>
                            </div>
                        </div>
                    </div>
                    <h3>Promo Code</h3>
                    <div class="input-group mb-3 card-container">
                        <input type="text" class="form-control" placeholder="Enter promo code" aria-label="Username"
                            aria-describedby="basic-addon1">
                        <button type="button" class="btn btn-dark" style="margin-left: 1vw;">Apply</button>
                    </div>
                    <h3>Aditional Comments</h3>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        </div>
                        <textarea class="form-control" rows="5" aria-label="With textarea"
                            placeholder="Any special instructions?"></textarea>
                    </div>
                </div>
            </div>
            <div class="container-format-row format-buttons">
                <button type="button" id="delivery-back" class="btn btn-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Delivery
                </button>
                <button type="button" id="review-button" class="btn btn-primary bg-blueviolet">
                    Review Order <i class="bi bi-arrow-right"></i>
                </button>
            </div>
            <div class="space"></div>
            <div class="Insignia" id="confirm-insignia">
                <span class="badge rounded-pill text-bg-primary bg-blueviolet First">1</span>

                <span class="badge rounded-pill text-bg-primary bg-blueviolet Fourth">2</span>

                <span class="badge rounded-pill text-bg-primary bg-blueviolet First">3</span>
            </div>
            <div class="BarraProgresso" id="confirm-barra">
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
                <div class="progress custom-progress" role="progressbar" aria-label="Basic example" aria-valuenow="100"
                    aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-blueviolet" style="width: 100%"></div>
                </div>
            </div>
            <div class="BarraNomes" id="confirm-nomes">
                <span>Delivery</span>
                <span>Payment</span>
                <span>Confirm</span>
            </div>
            <div class="container-shipping">
                <div class="container-details">
                    <h1>Order Review</h1>
                    <h4>Items</h4>
                    <div class="container-items">
                        <div class="row w-100">
                            <div class="col-6 d-flex flex-column justify-content-center">
                                <h6 class="fw-bold">Premium Cotton T-shirt</h6>
                                <p class="mb-1">Size: L | Color: White</p>
                                <p class="mb-0">Quantity: 1</p>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-end">
                                <p class="fw-bold confirm-price">$29.99</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <h4>Delivery Details</h4>
                    <div class="row w-100 align-items-start">
                        <div class="col-6 d-flex flex-column justify-content-center">
                            <p class="mb-1">Delivery Method:</p>
                            <h6 class="fw-bold">Standard-Delivery (3-5 days)</h6>
                        </div>
                        <div class="col-6 d-flex flex-column justify-content-end">
                            <p class="mb-1">Delivery Address:</p>
                            <h6 class="fw-bold">John Doe</h6>
                            <h6 class="fw-bold">123 Main St</h6>
                            <h6 class="fw-bold">New York, NY 10001</h6>
                        </div>
                    </div>
                    <hr>
                    <h4>Payment Details</h4>
                    <div class="row w-100 align-items-start">
                        <div class="col-6 d-flex flex-column justify-content-center">
                            <p class="mb-1">Payment Method:</p>
                            <h6 class="fw-bold">Credit Card (**** 1234)</h6>
                        </div>
                        <div class="col-6 d-flex flex-column justify-content-end">
                            <p class="mb-1">Billing Address:</p>
                            <h6 class="fw-bold">Same as delivery address</h6>
                        </div>
                    </div>
                    <hr>
                    <div class="container-format-row">
                        <div class="container-format-column">
                            <p>Subtotal</p>
                            <p>Shipping</p>
                            <p>Tax</p>
                        </div>
                        <div class="container-format-column right">
                            <p>$29.99</p>
                            <p>$5.99</p>
                            <p>$3.60</p>
                        </div>
                    </div>
                    <hr>
                    <div class="container-format-row-right delivery-price">
                        <div class="container-format-column">
                            <p>Total</p>
                        </div>
                        <div class="container-format-column right">
                            <p>$39.58</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-format-row format-buttons">
                <button type="button" id="payment-back" class="btn btn-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Payment
                </button>
                <button type="button" id="confirm-button" class="btn btn-primary bg-blueviolet">
                    Confirm Order <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    </main>

    <footer>

    </footer>
</body>

</html>