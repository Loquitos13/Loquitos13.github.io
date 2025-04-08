<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Orders - PrintCraft</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="css/my-orders.css">
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

    <!-- Orders Section -->
    <div class="container mt-4">
        <h3>My Orders</h3>
        <p>View and track all your orders</p>

        <!-- Tabs -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
                <button class="btn btn-primary me-2">All Orders</button>
                <button class="btn btn-light me-2">Processing</button>
                <button class="btn btn-light me-2">Shipped</button>
                <button class="btn btn-light">Delivered</button>
            </div>
            <input type="text" class="form-control search-bar" placeholder="Search orders...">
        </div>

        <!-- Order List -->
        <div class="order-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6>Order #12345</h6>
                    <p class="text-muted">Placed on March 15, 2025</p>
                    <strong>Custom T-shirt Design</strong>
                    <p>Quantity: 2</p>
                    <p><strong>Total:</strong> $49.98</p>
                </div>
                <div>
                    <span class="order-status delivered">Delivered</span>
                    <div class="mt-2">
                        <a href="#" class="text-primary">Track Order</a> |
                        <a href="#" class="text-primary">View Details</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="order-card">
            <div class="d-flex justify-content-between">
                <div>
                    <h6>Order #12345</h6>
                    <p class="text-muted">Placed on March 15, 2025</p>
                    <strong>Custom T-shirt Design</strong>
                    <p>Quantity: 2</p>
                    <p><strong>Total:</strong> $49.98</p>
                </div>
                <div>
                    <span class="order-status delivered">Delivered</span>
                    <div class="mt-2">
                        <a href="#" class="text-primary">Track Order</a> |
                        <a href="#" class="text-primary">View Details</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Footer -->
    <?php include '../includes/footer.php'; ?>

</body>

</html>