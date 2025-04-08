<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print&Go - Edit Profile</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/userProfile.css">
    <?php include '../includes/carrinho.php'; ?>
</head>

<style>
    body {
        margin: 0;
        padding: 0;
        overflow: auto;
        align-items: center;
    }

    #menu-mobile {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 80%;
        height: 100%;
        background-color: white;
        transform: translateX(-10%);
        transition: transform 2000ms ease;
        overflow: hidden;
        z-index: 999;
        flex-direction: column-reverse;
        margin-top: 0;
        justify-content: flex-end;
        gap: 20px;
        align-items: center;
        padding-top: 100px;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: white;
        z-index: 999;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    #menu-mobile.open {
        display: flex;
        transform: translateX(0);
    }

    #menu-mobile a {
        color: #4F46E5;
        text-decoration: none;
        font-size: 1.5rem;
        margin: 15px 0;
    }

    #menu-toggle {
        display: none;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 1000;
        font-size: 2rem;
        background: none;
        border: none;
        color: black;
        cursor: pointer;
    }

    #logo-header-mobile {
        display: none;
        background: none;
        border: none;
    }


    /* Ajustes para telas menores */
    @media (max-width: 1200px) {
        body {
            width: 100%;
            padding-top: 70px;
        }

        .header-desktop {
            display: none;
        }

        #a-logo-header-mobile {
            display: flex;
            width: max-content;
            justify-content: center;
            padding-top: 20px;
            padding-bottom: 20px;
            width: 100%;

        }

        #logo-header-mobile {
            display: block;
            width: 100px;
            height: auto;
            margin: 0 auto;
        }

        #menu-toggle {
            display: block;
            top: 0;
        }

        #menu-mobile {
            position: fixed;
            height: 100%;
            overflow: hidden;
        }

        #menu-mobile li {
            list-style: none;
        }

        #menu-mobile .social {
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
            align-self: flex-end;
            justify-content: center;
        }

        .container1 {
            display: none;
        }

        .left,
        .right {
            width: 100%;
            justify-content: center;
        }

        .left a {
            width: auto;
        }

        #containerHeroe {
            flex-direction: column;
            height: auto;
            padding: 20px 20px;
            width: 100%;
        }

        .esqHeroe,
        .dirHeroe {
            width: 100%;
            text-align: center;
        }

        .dirHeroe img {
            position: static;
            height: auto;
            width: 80%;
        }

        #prodDestaques {
            flex-direction: column;
            align-items: center;
            justify-content: center;

        }

        .containerDestaques {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            gap: 20px;
        }

        .feedback-carousel-container {
            max-width: 90%;
            max-height: 400px;
        }

        #featureSection {
            padding: 5vh;
        }

        #containerFeatures {
            flex-direction: column;
        }

        .featureBox p {
            width: 90%;
        }

        #cta h3 {
            text-align: center;
            font-size: 100%;
        }

        #cta p {
            text-align: center;
            font-size: 90%;
        }

        footer {
            text-align: center;
        }

        #containerFooter {
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
    }
</style>

<body>

    <!-- Menu Mobile -->
    <?php include '../includes/header-mobile.php'; ?>

    <!-- Menu Desktop -->
    <?php include '../includes/header-desktop.php'; ?>

    <!-- Edit Profile Content -->
    <div class="container py-5">
        <h2 class="mb-4">Edit Profile</h2>
        <p class="text-muted mb-4">Update your personal information</p>
        <div class="row">
            <!-- Profile Picture Section -->
            <div class="col-md-3 text-center">
                <img src="" alt="">
                <input type="file" class="form-control" id="profilePicture">
            </div>

            <!-- Personal Information & Password -->
            <div class="col-md-5">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="mb-3">Personal Information</h5>
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control mb-3" value="Sarah Anderson">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control mb-3" value="sarah.anderson@example.com">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" value="+1 (555) 123-4567">
                    </div>
                </div>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-3">Password</h5>
                        <label class="form-label">Current Password</label>
                        <input type="password" class="form-control mb-3" placeholder="••••••••">
                        <label class="form-label">New Password</label>
                        <input type="password" class="form-control" placeholder="••••••••">
                    </div>
                </div>
            </div>

            <!-- Payment & Address Information -->
            <div class="col-md-4">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="mb-3">Payment Methods</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>Visa •••• 4589</span>
                            <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#paymentModal">Edit</button>
                        </div>
                        <button class="btn btn-outline-secondary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#paymentModal">Add New Card</button>
                    </div>
                </div>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-3">Shipping Address</h5>
                        <label class="form-label">Street Address</label>
                        <input type="text" class="form-control mb-2" value="123 Main Street">
                        <label class="form-label">City</label>
                        <input type="text" class="form-control mb-2" value="New York">
                        <div class="row">
                            <div class="col-md-6">
                                <label class="form-label">State</label>
                                <input type="text" class="form-control" value="NY">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">ZIP Code</label>
                                <input type="text" class="form-control" value="10001">
                            </div>
                        </div>
                        <label class="form-label mt-2">Country</label>
                        <input type="text" class="form-control" value="United States">
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end gap-3 mt-4">
            <button type="button" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
    </div>

    <!-- Modal for Edit Payment Method -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentModalLabel">Edit Payment Method</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="cardNumber" class="form-label">Card Number</label>
                            <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="expiryDate" class="form-label">Expiry Date</label>
                                <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cvv" placeholder="123">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="cardholderName" class="form-label">Cardholder Name</label>
                            <input type="text" class="form-control" id="cardholderName" placeholder="Name on card">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="saveCard">
                            <label class="form-check-label" for="saveCard">Save this card for future payments</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save Card</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php include '../includes/footer.php'; ?>

    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>