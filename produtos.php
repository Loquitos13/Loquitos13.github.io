<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catalog</title>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">

  <link rel="stylesheet" href="produtos.css">
  <script src="produtos.js"></script>
  <?php include 'carrinho.php'; ?>
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
  <?php include 'header-mobile.php'; ?>

  <!-- Menu Desktop -->
  <?php include 'header-desktop.php'; ?>

  <div id="containerTitulo">
    <div class="esqTitulo">
      <h1>Our Products</h1>
      <p>Choose from our wide range of customizable products</p>
    </div>
  </div>

  <div class="containerPrincipal">
    <hr>
    <div class="filtros">
      <!-- Filtros para desktop -->
      <div>
        <h6>Categories</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory1">
          <label class="form-check-label" for="labelCategory1">
            Apparel
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory2">
          <label class="form-check-label" for="labelCategory2">
            Accessories
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory3">
          <label class="form-check-label" for="labelCategory3">
            Home & Living
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory4">
          <label class="form-check-label" for="labelCategory4">
            Stationery
          </label>
        </div>
      </div>
      <hr>

      <div class="range-container">
        <h6 class="mb-3 fw-semibold">Price Range</h6>

        <!-- Slider de intervalo duplo -->
        <div class="double-range-slider">
          <div class="slider-track">
            <div class="slider-track-highlight" id="track-highlight"></div>
          </div>

          <div class="slider-thumb" id="thumb-min"></div>
          <div class="slider-thumb" id="thumb-max"></div>

          <input type="range" class="range-input" id="range-min" min="0" max="100" value="30">
          <input type="range" class="range-input" id="range-max" min="0" max="100" value="70">
        </div>

        <div class="price-labels mt-2">
          <span class="price-label">$<span id="value-min">30</span></span>
          <span class="price-label">$<span id="value-max">70</span></span>
        </div>
      </div>
      <hr>
      <div class="color-selector">
        <h6>Colors</h6>
        <div class="d-flex gap-2 flex-wrap">
          <div id="idColorOptions" class="colorOptions"></div>
        </div>
      </div>
      <hr>
      <div>
        <h6>Size</h6>
        <div id="idSizeOptions" class="sizeOptions"></div>
      </div>
      <hr>
      <div>
        <h6>Promotions</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            On Sale
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Home & Living
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Stationery
        </div>
      </div>
    </div>
    <div id="produtos">
      <div class="containerOrdenar">
        <button id="filters-toggle">Filters</button>
        <select class="form-select" style="width: auto;" aria-label="Sort options">
          <option selected>Popular (Best Seller)</option>
          <option value="1">Newest</option>
          <option value="2">Relevant</option>
          <option value="3">Sought-After</option>
        </select>
      </div>
      <div class="containerProdutos">
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">T-Shirts</p>
            <p class="boxItemDescription">Premium cotton tees</p>
            <div class="boxItemFooter">
              <span boxItemPrice>24,99€</span>
              <span>100+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">T-Shirts</p>
            <p class="boxItemDescription">Premium cotton tees</p>
            <div class="boxItemFooter">
              <span boxItemPrice>24,99€</span>
              <span>100+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">T-Shirts</p>
            <p class="boxItemDescription">Premium cotton tees</p>
            <div class="boxItemFooter">
              <span boxItemPrice>24,99€</span>
              <span>100+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">Hoodies & Sweatshirts</p>
            <p class="boxItemDescription">Cozy comfort wear</p>
            <div class="boxItemFooter">
              <span boxItemPrice>39,99€</span>
              <span>50+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">Caps & Hats</p>
            <p class="boxItemDescription">Stylish headwear</p>
            <div class="boxItemFooter">
              <span boxItemPrice>19,99€</span>
              <span>75+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">Posters</p>
            <p class="boxItemDescription">High quality prints</p>
            <div class="boxItemFooter">
              <span boxItemPrice>29,99€</span>
              <span>150+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">Home Textiles</p>
            <p class="boxItemDescription">Cushions and blankets</p>
            <div class="boxItemFooter">
              <span boxItemPrice>34,99€</span>
              <span>80+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
            &nbsp;
            <p class="boxItemTitle">Phone Cases</p>
            <p class="boxItemDescription">Protection with style</p>
            <div class="boxItemFooter">
              <span boxItemPrice>19,99€</span>
              <span>120+ sold</span>
            </div>
            <button type="button" class="btn btn-primary ms-3 me-3" style="background-color: #4F46E5; border:0;">Shop
              Now</button>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="shadow p-3 mb-5 bg-body rounded containerPrincipalinho ">
    <h2>Need Bulk Orders?</h2>
    <p>Get special pricing and dedicated support for large quantity orders</p>
    <button type="button" class="btn btn-primary mx-auto " style="color: white; background-color: #4F46E5;">Contact
      Sales Team</button>
  </div>
  <!-- Footer -->
  <?php include 'footer.php'; ?>

  <!-- Overlay para fechar ao clicar fora -->
  <div id="filters-overlay"></div>
  <div id="filters-sidebar" class="d-flex justify-content-end lign-items-center gap-2 mb-3">
    <button id="close-filters">X</button>
    <div class="filtros-mobile">
      <!-- Categorias -->
      <div>
        <h6>Categories</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory1">
          <label class="form-check-label" for="labelCategory1">
            Apparel
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory2">
          <label class="form-check-label" for="labelCategory2">
            Accessories
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory3">
          <label class="form-check-label" for="labelCategory3">
            Home & Living
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCategory4">
          <label class="form-check-label" for="labelCategory4">
            Stationery
          </label>
        </div>
      </div>
      <hr>
      <div class="range-container">
        <h6 class="mb-3 fw-semibold">Price Range</h6>
        <div class="double-range-slider">
          <div class="slider-track">
            <div class="slider-track-highlight" id="track-highlight-mobile"></div>
          </div>
          <div class="slider-thumb" id="thumb-min-mobile"></div>
          <div class="slider-thumb" id="thumb-max-mobile"></div>
          <input type="range" class="range-input" id="range-min-mobile" min="0" max="100" value="30">
          <input type="range" class="range-input" id="range-max-mobile" min="0" max="100" value="70">
        </div>
        <div class="price-labels mt-2">
          <span class="price-label">$<span id="value-min-mobile">30</span></span>
          <span class="price-label">$<span id="value-max-mobile">70</span></span>
        </div>
      </div>
      <hr>
      <div class="color-selector">
        <h6>Colors</h6>
        <div class="d-flex gap-2 flex-wrap">
          <div id="idColorOptions-mobile" class="colorOptions-mobile"></div>
        </div>
      </div>
      <hr>
      <div>
        <h6>Size</h6>
        <div id="idSizeOptions-mobile" class="sizeOptions">
        </div>
        <hr>
        <div>
          <h6>Promotions</h6>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              On Sale
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Home & Living
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Stationery
          </div>
        </div>
        <hr>
        <!-- Botão de Aplicar -->
        <button id="apply-filters" class="btn btn-primary">Apply Filters</button>
      </div>
    </div>


</body>

</html>