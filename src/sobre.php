<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print & Go - About Us</title>
  <link rel="stylesheet" href="css/sobre.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="js/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <?php include 'includes/carrinho.php'; ?>
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
  <?php include 'includes/header-mobile.php'; ?>

  <!-- Menu Desktop -->
  <?php include 'includes/header-desktop.php'; ?>

  <div id="containerHeroe">
    <div class="esqHeroe">
      <h1>Crafting Your Vision Into Reality</h1>
      <p><b>Print & Go</b> has been bringing creative ideas to life since 2025. We're passionate about delivering
        high-quality custom printed products that exceed your expectations. </p>
      <div class="botoesHeroe">
        <button type="button" class="btn btn-primary" style="background-color: #4F46E5; border:none;">Start
          Designing</button>
      </div>
    </div>
    <div class="dirHeroe">
      <img src="../imagens/produtos varios hero.png" alt="" style="width:70%;">
    </div>
  </div>


  <h2 style="text-align:center; margin-top:10vh; font-weight:700;">Our Core Values</h2>
  <div id="containerFeatures">

    <div class="featureBox">
      <div class="featureImagem">
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.6829 0.84375C14.4345 0.328125 13.9095 0 13.3329 0C12.7564 0 12.236 0.328125 11.9829 0.84375L8.96886 7.04531L2.23761 8.03906C1.67511 8.12344 1.20636 8.51719 1.03292 9.05625C0.859482 9.59531 1.00011 10.1906 1.40323 10.5891L6.28761 15.4219L5.13448 22.2516C5.04073 22.8141 5.27511 23.3859 5.73917 23.7188C6.20323 24.0516 6.81729 24.0938 7.32354 23.8266L13.3376 20.6156L19.3517 23.8266C19.8579 24.0938 20.472 24.0562 20.936 23.7188C21.4001 23.3813 21.6345 22.8141 21.5407 22.2516L20.3829 15.4219L25.2673 10.5891C25.6704 10.1906 25.8157 9.59531 25.6376 9.05625C25.4595 8.51719 24.9954 8.12344 24.4329 8.03906L17.697 7.04531L14.6829 0.84375Z"
            fill="#4F46E5" />
        </svg>


      </div>
      <h4>Quality First</h4>
      <p>We never compromise on quality, using only the finest materials and latest printing technology.</p>
    </div>
    <div class="featureBox">
      <div class="featureImagem2">
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.7344 18C13.1844 16.5047 14.1172 15.2297 15.0406 13.9594C15.2844 13.6266 15.5281 13.2937 15.7625 12.9562C16.6906 11.6203 17.2344 10.0031 17.2344 8.25469C17.2344 3.69375 13.5406 0 8.98438 0C4.42813 0 0.734375 3.69375 0.734375 8.25C0.734375 9.99844 1.27813 11.6203 2.20625 12.9516C2.44063 13.2891 2.68437 13.6219 2.92812 13.9547C3.85625 15.225 4.78906 16.5047 5.23438 17.9953H12.7344V18ZM8.98438 24C11.0563 24 12.7344 22.3219 12.7344 20.25V19.5H5.23438V20.25C5.23438 22.3219 6.9125 24 8.98438 24ZM5.23438 8.25C5.23438 8.6625 4.89688 9 4.48438 9C4.07187 9 3.73438 8.6625 3.73438 8.25C3.73438 5.34844 6.08281 3 8.98438 3C9.39688 3 9.73438 3.3375 9.73438 3.75C9.73438 4.1625 9.39688 4.5 8.98438 4.5C6.9125 4.5 5.23438 6.17812 5.23438 8.25Z"
            fill="#4F46E5" />
        </svg>

      </div>

      <h4>Inovation</h4>
      <p>Constantly involving and adapting to bring you the latest in printing techonology and design.</p>

    </div>
    <div class="featureBox">
      <div class="featureImagem">
        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.4062 3.49999C9.72188 3.49999 6.60469 5.91405 5.54531 9.24218C7.12031 8.4453 8.89688 7.99999 10.7812 7.99999H14.9062C15.3188 7.99999 15.6562 8.33749 15.6562 8.74999C15.6562 9.16249 15.3188 9.49999 14.9062 9.49999H14.1562H10.7812C10.0031 9.49999 9.24844 9.58905 8.52188 9.75311C7.30781 10.0297 6.17812 10.5219 5.175 11.1922C2.45156 13.0062 0.65625 16.1047 0.65625 19.625V20.375C0.65625 20.9984 1.15781 21.5 1.78125 21.5C2.40469 21.5 2.90625 20.9984 2.90625 20.375V19.625C2.90625 17.3422 3.87656 15.2891 5.42813 13.85C6.35625 17.3891 9.57656 20 13.4062 20H13.4531C19.6453 19.9672 24.6562 13.8641 24.6562 6.34061C24.6562 4.34374 24.3047 2.4453 23.6672 0.734364C23.5453 0.410926 23.0719 0.424989 22.9078 0.729676C22.0266 2.37968 20.2828 3.49999 18.2812 3.49999H13.4062Z"
            fill="#4F46E5" />
        </svg>

      </div>
      <h4>Sustainability</h4>
      <p>Commited to eco-friendly practices and sustainable materials in our production process.</p>

    </div>
  </div>

  <div class="bg-body-tertiary mb-5">
    <div class="container py-4" style="max-width: 1000px;">
      <h5 class="text-center mb-5">Meet Our Team</h5>
      <div class="row">
        <!-- Filipe Rocha -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/filipe.jpg" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Filipe Rocha</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Back-End Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Sara Presa -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/sara.jpg" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Sara Presa</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Back-End Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Rodrigo Oliveira -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/rodrigo.jpg" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Rodrigo Oliveira</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Designer and Front-End Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bruno Jardim -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/bruno.jpg" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Bruno Jardim</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Full-Stack Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Diogo Pinto -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/diogo.JPG" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Diogo Pinto</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Front-End Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Guilherme Ferreira -->
        <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="position-relative">
              <img src="../imagens/guilerme.jpg" class="card-img-top bg-light" alt="Camiseta Branca">
            </div>
            <div class="card-body px-3 pb-3">
              <h5 class="card-title fw-bold mb-1">Guilherme Ferreira</h5>
              <h6 class="card-text text-muted small">CEO & Founder</h6>
              <h6 class="card-text text-muted small mb-3">Back-End Developer</h6>

              <div class="social d-flex justify-content-start align-items-center">
                <a href="https://www.instagram.com" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.00303 3.40623C5.01553 3.40623 3.4124 5.00935 3.4124 6.99685C3.4124 8.98435 5.01553 10.5875 7.00303 10.5875C8.99053 10.5875 10.5937 8.98435 10.5937 6.99685C10.5937 5.00935 8.99053 3.40623 7.00303 3.40623ZM7.00303 9.33123C5.71865 9.33123 4.66865 8.28435 4.66865 6.99685C4.66865 5.70935 5.71553 4.66248 7.00303 4.66248C8.29053 4.66248 9.3374 5.70935 9.3374 6.99685C9.3374 8.28435 8.2874 9.33123 7.00303 9.33123ZM11.578 3.25935C11.578 3.72498 11.203 4.09685 10.7405 4.09685C10.2749 4.09685 9.90303 3.72185 9.90303 3.25935C9.90303 2.79685 10.278 2.42185 10.7405 2.42185C11.203 2.42185 11.578 2.79685 11.578 3.25935ZM13.9562 4.10935C13.903 2.98748 13.6468 1.99373 12.8249 1.17498C12.0062 0.356225 11.0124 0.0999756 9.89053 0.0437256C8.73428 -0.0218994 5.26865 -0.0218994 4.1124 0.0437256C2.99365 0.0968506 1.9999 0.353101 1.17803 1.17185C0.356152 1.9906 0.103027 2.98435 0.0467773 4.10623C-0.0188477 5.26248 -0.0188477 8.7281 0.0467773 9.88435C0.0999023 11.0062 0.356152 12 1.17803 12.8187C1.9999 13.6375 2.99053 13.8937 4.1124 13.95C5.26865 14.0156 8.73428 14.0156 9.89053 13.95C11.0124 13.8968 12.0062 13.6406 12.8249 12.8187C13.6437 12 13.8999 11.0062 13.9562 9.88435C14.0218 8.7281 14.0218 5.2656 13.9562 4.10935ZM12.4624 11.125C12.2187 11.7375 11.7468 12.2094 11.1312 12.4562C10.2093 12.8219 8.02178 12.7375 7.00303 12.7375C5.98428 12.7375 3.79365 12.8187 2.8749 12.4562C2.2624 12.2125 1.79053 11.7406 1.54365 11.125C1.17803 10.2031 1.2624 8.0156 1.2624 6.99685C1.2624 5.9781 1.18115 3.78748 1.54365 2.86873C1.7874 2.25623 2.25928 1.78435 2.8749 1.53748C3.79678 1.17185 5.98428 1.25623 7.00303 1.25623C8.02178 1.25623 10.2124 1.17498 11.1312 1.53748C11.7437 1.78123 12.2155 2.2531 12.4624 2.86873C12.828 3.7906 12.7437 5.9781 12.7437 6.99685C12.7437 8.0156 12.828 10.2062 12.4624 11.125Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
                <a href="http://www.linkedin.com/" class="me-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 0H0.996875C0.446875 0 0 0.453125 0 1.00938V12.9906C0 13.5469 0.446875 14 0.996875 14H13C13.55 14 14 13.5469 14 12.9906V1.00938C14 0.453125 13.55 0 13 0ZM4.23125 12H2.15625V5.31875H4.23438V12H4.23125ZM3.19375 4.40625C2.52812 4.40625 1.99063 3.86562 1.99063 3.20312C1.99063 2.54063 2.52812 2 3.19375 2C3.85625 2 4.39687 2.54063 4.39687 3.20312C4.39687 3.86875 3.85938 4.40625 3.19375 4.40625ZM12.0094 12H9.93437V8.75C9.93437 7.975 9.91875 6.97813 8.85625 6.97813C7.775 6.97813 7.60938 7.82188 7.60938 8.69375V12H5.53438V5.31875H7.525V6.23125H7.55312C7.83125 5.70625 8.50938 5.15312 9.51875 5.15312C11.6187 5.15312 12.0094 6.5375 12.0094 8.3375V12Z"
                      fill="#9CA3AF" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div id="stats">
    <div class="stat">
      <h2>10K+</h2>
      <p>Happy Customers</p>
    </div>
    <div class="stat">
      <h2>50K+</h2>
      <p>Products Delivered</p>
    </div>
    <div class="stat">
      <h2>25+</h2>
      <p>Countries Served</p>
    </div>
    <div class="stat">
      <h2>4.9</h2>
      <p>Average Rating</p>
    </div>
  </div>
  <div id="cta">
    <h3>Ready to start your project?</h3>
    <p>Let's bring your ideas to life. Our team is ready to help you create something amazing.</p>
    <a href="#"><button type="button" class="btn btn-light"
        style="background-color: #ffffff; border:none; color: #4F46E5;">Contact Us Today</button></a>
  </div>

  <!-- Footer -->
  <?php include 'includes/footer.php'; ?>

</body>

</html>