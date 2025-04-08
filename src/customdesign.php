<!DOCTYPE html>
<html lang="pt">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Print & Go - Custom Design</title>
<link rel="stylesheet" href="css/customdesign.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="js/customdesign.js"></script>
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
      <h1>Create Your Perfect Design</h1>
      <p>Bring your ideas to life with our easy-to-use design tools and premium printing services</p>
      <div class="botoesHeroe">
        <button type="button" class="btn btn-primary" style="background-color: #4F46E5; border:none; cursor:auto;">Start
          Designing Now</button>
      </div>
    </div>
    <div class="dirHeroe">
      <img src="../imagens/produtos varios hero.png" alt="" style="width:70%;">
    </div>
  </div>

  <div id="containerFeatures">
    <div class="row g-4 py-5 row-cols-1 row-cols-md-3">
      <div class="feature col" id="featureCol">

        <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.752 2.50195L11.543 3.32812C11.3672 3.39258 11.25 3.5625 11.25 3.75C11.25 3.9375 11.3672 4.10742 11.543 4.17188L13.752 4.99805L14.5781 7.20703C14.6426 7.38281 14.8125 7.5 15 7.5C15.1875 7.5 15.3574 7.38281 15.4219 7.20703L16.248 4.99805L18.457 4.17188C18.6328 4.10742 18.75 3.9375 18.75 3.75C18.75 3.5625 18.6328 3.39258 18.457 3.32812L16.248 2.50195L15.4219 0.292969C15.3574 0.117188 15.1875 0 15 0C14.8125 0 14.6426 0.117188 14.5781 0.292969L13.752 2.50195ZM2.70117 23.168C1.60547 24.2637 1.60547 26.0449 2.70117 27.1465L4.72852 29.1738C5.82422 30.2695 7.60547 30.2695 8.70703 29.1738L31.0488 6.82617C32.1445 5.73047 32.1445 3.94922 31.0488 2.84766L29.0215 0.826172C27.9258 -0.269531 26.1445 -0.269531 25.043 0.826172L2.70117 23.168ZM28.3945 4.83984L22.2422 10.9922L20.877 9.62695L27.0293 3.47461L28.3945 4.83984ZM0.439453 6.86719C0.175781 6.9668 0 7.21875 0 7.5C0 7.78125 0.175781 8.0332 0.439453 8.13281L3.75 9.375L4.99219 12.6855C5.0918 12.9492 5.34375 13.125 5.625 13.125C5.90625 13.125 6.1582 12.9492 6.25781 12.6855L7.5 9.375L10.8105 8.13281C11.0742 8.0332 11.25 7.78125 11.25 7.5C11.25 7.21875 11.0742 6.9668 10.8105 6.86719L7.5 5.625L6.25781 2.31445C6.1582 2.05078 5.90625 1.875 5.625 1.875C5.34375 1.875 5.0918 2.05078 4.99219 2.31445L3.75 5.625L0.439453 6.86719ZM21.0645 21.8672C20.8008 21.9668 20.625 22.2188 20.625 22.5C20.625 22.7812 20.8008 23.0332 21.0645 23.1328L24.375 24.375L25.6172 27.6855C25.7168 27.9492 25.9688 28.125 26.25 28.125C26.5312 28.125 26.7832 27.9492 26.8828 27.6855L28.125 24.375L31.4355 23.1328C31.6992 23.0332 31.875 22.7812 31.875 22.5C31.875 22.2188 31.6992 21.9668 31.4355 21.8672L28.125 20.625L26.8828 17.3145C26.7832 17.0508 26.5312 16.875 26.25 16.875C25.9688 16.875 25.7168 17.0508 25.6172 17.3145L24.375 20.625L21.0645 21.8672Z"
            fill="#4F46E5" />
        </svg>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
          probably just keep going until we run out of words.</p>

      </div>
      <div class="feature col" id="featureCol">
        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1543 0.304688C15.0273 -0.0996094 16.0352 -0.0996094 16.9082 0.304688L29.7168 6.22266C30.2148 6.45117 30.5312 6.94922 30.5312 7.5C30.5312 8.05078 30.2148 8.54883 29.7168 8.77734L16.9082 14.6953C16.0352 15.0996 15.0273 15.0996 14.1543 14.6953L1.3457 8.77734C0.847656 8.54297 0.53125 8.04492 0.53125 7.5C0.53125 6.95508 0.847656 6.45117 1.3457 6.22266L14.1543 0.304688ZM26.5996 12.2813L29.7168 13.7227C30.2148 13.9512 30.5312 14.4492 30.5312 15C30.5312 15.5508 30.2148 16.0488 29.7168 16.2773L16.9082 22.1953C16.0352 22.5996 15.0273 22.5996 14.1543 22.1953L1.3457 16.2773C0.847656 16.043 0.53125 15.5449 0.53125 15C0.53125 14.4551 0.847656 13.9512 1.3457 13.7227L4.46289 12.2813L13.3691 16.3945C14.7402 17.0273 16.3223 17.0273 17.6934 16.3945L26.5996 12.2813ZM17.6934 23.8945L26.5996 19.7812L29.7168 21.2227C30.2148 21.4512 30.5312 21.9492 30.5312 22.5C30.5312 23.0508 30.2148 23.5488 29.7168 23.7773L16.9082 29.6953C16.0352 30.0996 15.0273 30.0996 14.1543 29.6953L1.3457 23.7773C0.847656 23.543 0.53125 23.0449 0.53125 22.5C0.53125 21.9551 0.847656 21.4512 1.3457 21.2227L4.46289 19.7812L13.3691 23.8945C14.7402 24.5273 16.3223 24.5273 17.6934 23.8945Z" fill="#4F46E5" />
        </svg>

        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
          probably just keep going until we run out of words.</p>

      </div>
      <div class="feature col" id="featureCol">
        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.82812 0C5.75977 0 4.07812 1.68164 4.07812 3.75V9.375H7.82812V3.75H21.1113L22.8281 5.4668V9.375H26.5781V5.4668C26.5781 4.4707 26.1855 3.51562 25.4824 2.8125L23.7656 1.0957C23.0625 0.392578 22.1074 0 21.1113 0H7.82812ZM22.8281 20.625V22.5V26.25H7.82812V22.5V21.5625V20.625H22.8281ZM26.5781 22.5H28.4531C29.4902 22.5 30.3281 21.6621 30.3281 20.625V15C30.3281 12.9316 28.6465 11.25 26.5781 11.25H4.07812C2.00977 11.25 0.328125 12.9316 0.328125 15V20.625C0.328125 21.6621 1.16602 22.5 2.20312 22.5H4.07812V26.25C4.07812 28.3184 5.75977 30 7.82812 30H22.8281C24.8965 30 26.5781 28.3184 26.5781 26.25V22.5ZM25.6406 14.5312C26.0136 14.5312 26.3713 14.6794 26.635 14.9431C26.8987 15.2069 27.0469 15.5645 27.0469 15.9375C27.0469 16.3105 26.8987 16.6681 26.635 16.9319C26.3713 17.1956 26.0136 17.3438 25.6406 17.3438C25.2677 17.3438 24.91 17.1956 24.6463 16.9319C24.3825 16.6681 24.2344 16.3105 24.2344 15.9375C24.2344 15.5645 24.3825 15.2069 24.6463 14.9431C24.91 14.6794 25.2677 14.5312 25.6406 14.5312Z" fill="#4F46E5" />
        </svg>

        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
          probably just keep going until we run out of words.</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <?php include 'includes/footer.php'; ?>

</body>

</html>