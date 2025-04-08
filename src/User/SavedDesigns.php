<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Orders - PrintCraft</title>
    <link rel="stylesheet" href="css/SavedDesigns.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <script src="js/SavedDesigns.js"></script>
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
    <div class="container mt-4 ">
        <h3>My Saved Designs</h3>
        <p>View and manage all your saved designs</p>

        <!-- Tabs -->

        <div class="d-flex mb-3 bg-custom p-3 rounded">
            <div class="container">
                <div class="d-flex">
                    <!-- dropdown de categorias -->
                    <div class="dropdown me-3">
                        <button class="btn text-dark btn-secondary dropdown-toggle bg-transparent" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            All Categories
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Cat1</a></li>
                            <li><a class="dropdown-item" href="#">Cat2</a></li>
                            <li><a class="dropdown-item" href="#">Cat3</a></li>
                        </ul>
                    </div>
                    <!-- dropdown de ordenação -->
                    <div class="dropdown">
                        <button class="btn text-dark btn-secondary dropdown-toggle bg-transparent" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by: Newest
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cartões de produtos salvos -->
        <div class="container py-4">
            <div class="row">
                <!-- Iten salvo 1 -->
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <!-- Imagem do produto -->
                        <div class="position-relative">
                            <!-- Imagem do produto -->
                            <img src="../../imagens/camisola.png" class="card-img-top bg-light" alt="Camiseta Branca">
                            <div class="position-absolute top-0 end-0 p-2 d-flex">
                                <!-- Botão de favoritar -->
                                <button
                                    class="btn btn-light rounded-circle me-2 shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                </button>
                                <!-- Botão de mais opções -->
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <!-- Informações do produto -->
                        <div class="card-body px-3 pb-3">
                            <h5 class="card-title fw-bold mb-1">Summer Collection T-shirt</h5>
                            <p class="card-text text-muted small mb-3">Last edited: March 18, 2025</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <!-- Categoria do produto -->
                                <span class="badge bg-light text-primary px-3 py-2 rounded-pill">T-Shirt</span>
                                <!-- Botão de editar -->
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Iten salvo 2 -->
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <div class="position-relative">
                            <img src="../../imagens/camisola.png" class="card-img-top bg-light" alt="Camiseta Branca">
                            <div class="position-absolute top-0 end-0 p-2 d-flex">
                                <button
                                    class="btn btn-light rounded-circle me-2 shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                </button>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-body px-3 pb-3">
                            <h5 class="card-title fw-bold mb-1">Summer Collection T-shirt</h5>
                            <p class="card-text text-muted small mb-3">Last edited: March 18, 2025</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-primary px-3 py-2 rounded-pill">T-Shirt</span>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Iten salvo 3 -->
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <div class="position-relative">
                            <img src="../../imagens/camisola.png" class="card-img-top bg-light" alt="Camiseta Branca">
                            <div class="position-absolute top-0 end-0 p-2 d-flex">
                                <button
                                    class="btn btn-light rounded-circle me-2 shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                </button>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-body px-3 pb-3">
                            <h5 class="card-title fw-bold mb-1">Summer Collection T-shirt</h5>
                            <p class="card-text text-muted small mb-3">Last edited: March 18, 2025</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-primary px-3 py-2 rounded-pill">T-Shirt</span>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Iten salvo 4 -->
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <div class="position-relative">
                            <img src="../../imagens/camisola.png" class="card-img-top bg-light" alt="Camiseta Branca">
                            <div class="position-absolute top-0 end-0 p-2 d-flex">
                                <button
                                    class="btn btn-light rounded-circle me-2 shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                </button>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-body px-3 pb-3">
                            <h5 class="card-title fw-bold mb-1">Summer Collection T-shirt</h5>
                            <p class="card-text text-muted small mb-3">Last edited: March 18, 2025</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-primary px-3 py-2 rounded-pill">T-Shirt</span>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Iten salvo 5 -->
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <div class="position-relative">
                            <img src="../../imagens/camisola.png" class="card-img-top bg-light" alt="Camiseta Branca">
                            <div class="position-absolute top-0 end-0 p-2 d-flex">
                                <button
                                    class="btn btn-light rounded-circle me-2 shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                </button>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-body px-3 pb-3">
                            <h5 class="card-title fw-bold mb-1">Summer Collection T-shirt</h5>
                            <p class="card-text text-muted small mb-3">Last edited: March 18, 2025</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-primary px-3 py-2 rounded-pill">T-Shirt</span>
                                <button
                                    class="btn btn-light rounded-circle shadow-sm d-flex justify-content-center align-items-center"
                                    style="width: 38px; height: 38px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd"
                                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>

    <!-- Footer -->
    <?php include '../includes/footer.php'; ?>

</body>

</html>