<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print & Go</title>
  <link rel="stylesheet" href="src/css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
  <script src="src/js/script.js"></script>

  <?php include 'src/includes/carrinho.php'; ?>
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
  <?php include 'src/includes/header-mobile.php'; ?>

  <!-- Menu Desktop -->
  <?php include 'src/includes/header-desktop.php'; ?>


  <div id="containerHeroe">
    <div class="esqHeroe">
      <h1>Create Custom Products Your Way</h1>
      <p>Design and order custom printed products. From T-shirt to mugs, bring your ideas to life.</p>
      <div class="botoesHeroe">
        <button type="button" class="btn btn-primary" style="background-color: #4F46E5; border:none;">Start
          Designing</button>
        <button type="button" class="btn btn-light"
          style="background-color: #EEF2FF; border:1px solid #4F46E5; color: #4F46E5;">View Products</button>
      </div>

    </div>
    <div class="dirHeroe">
      <img src="imagens/produtos varios hero.png" alt="">
    </div>
  </div>
  <div id="prodDestaques">
    <h2>Popular Products</h2>
    <div class="containerDestaques">
      <a href="" class="boxItemLink">
        <div class="boxItem">
          <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
          <p class="boxItemTitle">Product Title</p>
          <p class="boxItemDescription">Product description goes here.</p>
          <div class="boxItemFooter">
            <span class="boxItemPrice">10,00€</span>
            <button type="button" class="btn btn-primary"
              style="background-color: #4F46E5; border:0;">Customize</button>
          </div>
        </div>
      </a>
      <a href="" class="boxItemLink">
        <div class="boxItem">
          <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
          <p class="boxItemTitle">Product Title</p>
          <p class="boxItemDescription">Product description goes here.</p>
          <div class="boxItemFooter">
            <span class="boxItemPrice">10,00€</span>
            <button type="button" class="btn btn-primary"
              style="background-color: #4F46E5; border:0;">Customize</button>
          </div>
        </div>
      </a>
      <a href="" class="boxItemLink">
        <div class="boxItem">
          <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
          <p class="boxItemTitle">Product Title</p>
          <p class="boxItemDescription">Product description goes here.</p>
          <div class="boxItemFooter">
            <span class="boxItemPrice">10,00€</span>
            <button type="button" class="btn btn-primary"
              style="background-color: #4F46E5; border:0;">Customize</button>
          </div>
        </div>
      </a>
      <a href="" class="boxItemLink">
        <div class="boxItem">
          <img src="imagens/produtos varios hero.png" alt="" class="boxItemImg">
          <p class="boxItemTitle">Product Title</p>
          <p class="boxItemDescription">Product description goes here.</p>
          <div class="boxItemFooter">
            <span class="boxItemPrice">10,00€</span>
            <button type="button" class="btn btn-primary"
              style="background-color: #4F46E5; border:0;">Customize</button>
          </div>
        </div>
      </a>


    </div>
  </div>
  <div class="feedback-carousel-container">
    <div class="carousel-content">
      <!-- Controles de navegação -->
      <button class="nav-arrow nav-arrow-left" id="prevButton" aria-label="Feedback anterior">
        <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
          <path d="M13.5 14.5 9 10l4.5-4.5L12 4l-6 6 6 6 1.5-1.5z"></path>
        </svg>
      </button>
      <button class="nav-arrow nav-arrow-right" id="nextButton" aria-label="Próximo feedback">
        <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
          <path d="M6.5 5.5 11 10l-4.5 4.5L8 16l6-6-6-6-1.5 1.5z"></path>
        </svg>
      </button>

      <div id="carouselItems"></div>

      <div class="indicator" id="indicator"></div>
    </div>
  </div>

  <div id="featureSection">
    <h2 style="font-weight:700;">How It Works</h2>
    <div id="containerFeatures">
      <div class="featureBox">
        <div class="featureImagem">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.3281 12C24.3281 12.0422 24.3281 12.0844 24.3281 12.1266C24.3094 13.8375 22.7531 15 21.0422 15H16.4531C15.2109 15 14.2031 16.0078 14.2031 17.25C14.2031 17.4094 14.2219 17.5641 14.25 17.7141C14.3484 18.1922 14.5547 18.6516 14.7562 19.1156C15.0422 19.7625 15.3234 20.4047 15.3234 21.0844C15.3234 22.575 14.3109 23.9297 12.8203 23.9906C12.6562 23.9953 12.4922 24 12.3234 24C5.7 24 0.328125 18.6281 0.328125 12C0.328125 5.37188 5.7 0 12.3281 0C18.9562 0 24.3281 5.37188 24.3281 12ZM6.32812 13.5C6.32812 13.1022 6.17009 12.7206 5.88879 12.4393C5.60748 12.158 5.22595 12 4.82812 12C4.4303 12 4.04877 12.158 3.76746 12.4393C3.48616 12.7206 3.32812 13.1022 3.32812 13.5C3.32812 13.8978 3.48616 14.2794 3.76746 14.5607C4.04877 14.842 4.4303 15 4.82812 15C5.22595 15 5.60748 14.842 5.88879 14.5607C6.17009 14.2794 6.32812 13.8978 6.32812 13.5ZM6.32812 9C6.72595 9 7.10748 8.84196 7.38878 8.56066C7.67009 8.27936 7.82812 7.89782 7.82812 7.5C7.82812 7.10218 7.67009 6.72064 7.38878 6.43934C7.10748 6.15804 6.72595 6 6.32812 6C5.9303 6 5.54877 6.15804 5.26746 6.43934C4.98616 6.72064 4.82812 7.10218 4.82812 7.5C4.82812 7.89782 4.98616 8.27936 5.26746 8.56066C5.54877 8.84196 5.9303 9 6.32812 9ZM13.8281 4.5C13.8281 4.10218 13.6701 3.72064 13.3888 3.43934C13.1075 3.15804 12.7259 3 12.3281 3C11.9303 3 11.5488 3.15804 11.2675 3.43934C10.9862 3.72064 10.8281 4.10218 10.8281 4.5C10.8281 4.89782 10.9862 5.27936 11.2675 5.56066C11.5488 5.84196 11.9303 6 12.3281 6C12.7259 6 13.1075 5.84196 13.3888 5.56066C13.6701 5.27936 13.8281 4.89782 13.8281 4.5ZM18.3281 9C18.726 9 19.1075 8.84196 19.3888 8.56066C19.6701 8.27936 19.8281 7.89782 19.8281 7.5C19.8281 7.10218 19.6701 6.72064 19.3888 6.43934C19.1075 6.15804 18.726 6 18.3281 6C17.9303 6 17.5488 6.15804 17.2675 6.43934C16.9862 6.72064 16.8281 7.10218 16.8281 7.5C16.8281 7.89782 16.9862 8.27936 17.2675 8.56066C17.5488 8.84196 17.9303 9 18.3281 9Z"
              fill="#4F46E5" />
          </svg>



        </div>
        <h4>Choose & Customize</h4>
        <p>Select your product and customiza it with youe designs, logos, or text.</p>
      </div>
      <div class="featureBox">
        <div class="featureImagem">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.484375 1.125C0.484375 0.501562 0.985937 0 1.60938 0H3.74219C4.77344 0 5.6875 0.6 6.11406 1.5H25.3797C26.6125 1.5 27.5125 2.67188 27.1891 3.8625L25.2672 11.0016C24.8688 12.4734 23.5328 13.5 22.0094 13.5H8.48594L8.73906 14.8359C8.84219 15.3656 9.30625 15.75 9.84531 15.75H23.3594C23.9828 15.75 24.4844 16.2516 24.4844 16.875C24.4844 17.4984 23.9828 18 23.3594 18H9.84531C8.22344 18 6.83125 16.8469 6.53125 15.2578L4.1125 2.55469C4.07969 2.37656 3.925 2.25 3.74219 2.25H1.60938C0.985937 2.25 0.484375 1.74844 0.484375 1.125ZM6.48438 21.75C6.48438 21.4545 6.54257 21.1619 6.65565 20.889C6.76872 20.616 6.93445 20.3679 7.14338 20.159C7.35232 19.9501 7.60035 19.7843 7.87334 19.6713C8.14632 19.5582 8.4389 19.5 8.73438 19.5C9.02985 19.5 9.32243 19.5582 9.59541 19.6713C9.86839 19.7843 10.1164 19.9501 10.3254 20.159C10.5343 20.3679 10.7 20.616 10.8131 20.889C10.9262 21.1619 10.9844 21.4545 10.9844 21.75C10.9844 22.0455 10.9262 22.3381 10.8131 22.611C10.7 22.884 10.5343 23.1321 10.3254 23.341C10.1164 23.5499 9.86839 23.7157 9.59541 23.8287C9.32243 23.9418 9.02985 24 8.73438 24C8.4389 24 8.14632 23.9418 7.87334 23.8287C7.60035 23.7157 7.35232 23.5499 7.14338 23.341C6.93445 23.1321 6.76872 22.884 6.65565 22.611C6.54257 22.3381 6.48438 22.0455 6.48438 21.75ZM22.2344 19.5C22.8311 19.5 23.4034 19.7371 23.8254 20.159C24.2473 20.581 24.4844 21.1533 24.4844 21.75C24.4844 22.3467 24.2473 22.919 23.8254 23.341C23.4034 23.7629 22.8311 24 22.2344 24C21.6376 24 21.0653 23.7629 20.6434 23.341C20.2214 22.919 19.9844 22.3467 19.9844 21.75C19.9844 21.1533 20.2214 20.581 20.6434 20.159C21.0653 19.7371 21.6376 19.5 22.2344 19.5Z"
              fill="#4F46E5" />
          </svg>


        </div>

        <h4>Place Order</h4>
        <p>Review your design and complete your purchase securely.</p>

      </div>
      <div class="featureBox">
        <div class="featureImagem">
          <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.90625 0C1.66406 0 0.65625 1.00781 0.65625 2.25V17.25C0.65625 18.4922 1.66406 19.5 2.90625 19.5H3.65625C3.65625 21.9844 5.67188 24 8.15625 24C10.6406 24 12.6562 21.9844 12.6562 19.5H18.6562C18.6562 21.9844 20.6719 24 23.1562 24C25.6406 24 27.6562 21.9844 27.6562 19.5H29.1562C29.9859 19.5 30.6562 18.8297 30.6562 18C30.6562 17.1703 29.9859 16.5 29.1562 16.5V13.5V12V11.1234C29.1562 10.3266 28.8422 9.5625 28.2797 9L24.6562 5.37656C24.0938 4.81406 23.3297 4.5 22.5328 4.5H20.1562V2.25C20.1562 1.00781 19.1484 0 17.9062 0H2.90625ZM20.1562 7.5H22.5328L26.1562 11.1234V12H20.1562V7.5ZM5.90625 19.5C5.90625 18.9033 6.1433 18.331 6.56526 17.909C6.98722 17.4871 7.55951 17.25 8.15625 17.25C8.75299 17.25 9.32528 17.4871 9.74724 17.909C10.1692 18.331 10.4062 18.9033 10.4062 19.5C10.4062 20.0967 10.1692 20.669 9.74724 21.091C9.32528 21.5129 8.75299 21.75 8.15625 21.75C7.55951 21.75 6.98722 21.5129 6.56526 21.091C6.1433 20.669 5.90625 20.0967 5.90625 19.5ZM23.1562 17.25C23.753 17.25 24.3253 17.4871 24.7472 17.909C25.1692 18.331 25.4062 18.9033 25.4062 19.5C25.4062 20.0967 25.1692 20.669 24.7472 21.091C24.3253 21.5129 23.753 21.75 23.1562 21.75C22.5595 21.75 21.9872 21.5129 21.5653 21.091C21.1433 20.669 20.9062 20.0967 20.9062 19.5C20.9062 18.9033 21.1433 18.331 21.5653 17.909C21.9872 17.4871 22.5595 17.25 23.1562 17.25Z"
              fill="#4F46E5" />
          </svg>



        </div>
        <h4>Fast Delivery</h4>
        <p>Receive your custom products at your doorstep within days.</p>

      </div>
    </div>

  </div>
  <div id="cta">
    <h3>Ready to Create Your Custom Design?</h3>
    <p>Start designing your custom products today and bring your ideas to life.</p>
    <a href="personalizavel.html"><button type="button" class="btn btn-light"
        style="background-color: #ffffff; border:none; color: #4F46E5; justify-self:center; height:5vh; width:20vh;">Start
        Creating Now</button></a>
  </div>
  <!-- Footer -->
  <?php include 'src/includes/footer.php'; ?>

  <script src="src/js/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>

</html>