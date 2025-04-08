<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products Custom</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="css/productscustom.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script type="importmap"> 
    {
      "imports": {
        "three": "https://unpkg.com/three@0.174.0/build/three.module.js"
      }
    }
    </script>
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

  <div class="productPreview">

    <div id="productImage" class="productGallery">
      <button id="openModal" class="ViewModel">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
          <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"/>
        </svg>
        View 3D Model
      </button>

      <!-- Main Product Image -->
      <div class="main-image">
        <img id="bigImage" src="../imagens/TShirtfront.png" alt="Product Image">
      </div>
      
      <!-- Thumbnail Images -->
      <div class="thumbnail-gallery">
      <!-- It will differentiate based on Data Base --> 
        <img class="thumbnail active" src="../imagens/TShirtfront.png" alt="TShirt Front">
        <img class="thumbnail" src="../imagens/TShirtback.png" alt="TShirt Back">
      </div>
    </div>

    <div id="productInfo" class="productInformation">
      <h1 id="productName" class="nameOfProduct">Premium Cotton T-shirt</h1>
      
      <div class="starReviews"> 
        <svg width="150" height="30" viewBox="0 0 150 30">
        <!-- Define a gradient for the half-star -->
        <defs>
            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stop-color="orange"/>  <!-- Left half is orange -->
                <stop offset="50%" stop-color="lightgray"/>  <!-- Right half is gray -->
            </linearGradient>
        </defs>
    
        <!-- Full stars -->
        <polygon points="15,1 19,11 30,11 21,17 24,27 15,21 6,27 9,17 0,11 11,11" fill="orange"/>
        <polygon points="45,1 49,11 60,11 51,17 54,27 45,21 36,27 39,17 30,11 41,11" fill="orange"/>
        <polygon points="75,1 79,11 90,11 81,17 84,27 75,21 66,27 69,17 60,11 71,11" fill="orange"/>
        <polygon points="105,1 109,11 120,11 111,17 114,27 105,21 96,27 99,17 90,11 101,11" fill="orange"/>
        
        <!-- Half-star -->
        <polygon points="135,1 139,11 150,11 141,17 144,27 135,21 126,27 129,17 120,11 131,11" fill="url(#half-star)"/>
      </svg>
        (128 reviews)
      </div>

      <div id="idDivProductPrice" class="classDivProductPrice">
        <h3 id="productPrice" class="priceOfProduct">29.99€</h3>
      </div>

      <h5 id="productSize" class="sizeOfProduct">Size</h5>
      <div id="idSizeOptions" class="sizeOptions">
      </div>

      <h5 id="productColor" class="colorOfProduct">Color</h5>
      <div id="idColorOptions" class="colorOptions">
      </div>

      <button id="btnAddToCart" class="addToCart">Add to Cart</button>
      
      <button id="btnSaveToWishlist" class="saveToWishlist">Save to Wishlist</button>
  
      <div class="couponContainer">
          <input type="text" class="couponInput" placeholder="Enter coupon code">
          <button class="applyButton">Apply</button>
      </div>

      <p id="productDescription" class="descriptionTitle">Product Description</p>
      <p id="productDescriptionText" class="descriptionText">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>

  <div class="modalsContainers">

    <div id="modal3D" class="modal3D">
      <div class="modal3D-content">
        <span id="closeModal" class="close">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </span>
        <div id="loading">Please first select the logo or design!</div>
        <canvas id="modelCanvas"></canvas>
        <span class="btnRmvDecal">
          <button id="rmvDecal" class="removeDecal disableButton">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path
                d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
            </svg>
          </button>
        </span>
      </div>
    </div>

    <div id="modalImage" class="modalImage">
      <div class="modal-content-image">
        <div id="uploadImage">
          <label id="uploadImage" class="imageUpload">
            Upload your logo or design
            <span>Choose File</span>
            <input type="file">
          </label>
        </div>
        <span class="replaceImage">
          <button id="btnReplaceImage" class="buttonReplace hideButton">
            <label for="inputReplaceImage">
              <input type="file" id="inputReplaceImage">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#000000">
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
              </svg>
            </label>
          </button>
        </span>
        <p id="warningsId" class="warnings"></p>
        <button id="btnAdd" class="buttonAdd disableButton">Add to Cart</button>
      </div>
    </div>
  </div>


  <div class="greyBackgroundContainer">
    <div class="mayAlsoLike">
      <h1 class="mayAlsoLikeText">You May Also Like</h1>
      <div class="containerDestaques">
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="../imagens/TShirtfront.png" alt="" class="boxItemImg">
            <p class="boxItemTitle">Product Title</p>
            <div class="boxItemFooter">
              <span class="boxItemPrice">10,00€</span>
            </div>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="../imagens/TShirtfront.png" alt="" class="boxItemImg">
            <p class="boxItemTitle">Product Title</p>
            <div class="boxItemFooter">
              <span class="boxItemPrice">10,00€</span>
            </div>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="../imagens/TShirtfront.png" alt="" class="boxItemImg">
            <p class="boxItemTitle">Product Title</p>
            <div class="boxItemFooter">
              <span class="boxItemPrice">10,00€</span>
            </div>
          </div>
        </a>
        <a href="" class="boxItemLink">
          <div class="boxItem">
            <img src="../imagens/TShirtfront.png" alt="" class="boxItemImg">
            <p class="boxItemTitle">Product Title</p>
            <div class="boxItemFooter">
              <span class="boxItemPrice">10,00€</span>
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
  </div>


  <div class="formContainer">
    <h1 class="formTitle">Rate Your Experience</h1>
    <form action="#" method="post" class="feedbackForm">
      <!-- Overall Satisfaction -->
      <div class="formGroup">
        <label class="formLabel">Overall Satisfaction</label>
        <div class="rating">
          <input type="radio" id="rating1" name="rating" value="1" class="ratingInput">
          <label for="rating1" class="ratingLabel">1</label>
          <input type="radio" id="rating2" name="rating" value="2" class="ratingInput">
          <label for="rating2" class="ratingLabel">2</label>
          <input type="radio" id="rating3" name="rating" value="3" class="ratingInput">
          <label for="rating3" class="ratingLabel">3</label>
          <input type="radio" id="rating4" name="rating" value="4" class="ratingInput">
          <label for="rating4" class="ratingLabel">4</label>
          <input type="radio" id="rating5" name="rating" value="5" class="ratingInput">
          <label for="rating5" class="ratingLabel">5</label>
        </div>
      </div>

      <!-- Dropdown -->
      <div class="formGroup">
        <label for="purchase" class="formLabel">What did you purchase?</label>
        <select id="purchase" name="purchase" class="selectBox">
          <option value="">Select an option...</option>
          <option value="tshirt">T-Shirt</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      <!-- Comments -->
      <div class="formGroup">
        <label for="comments" class="formLabel">Your Comments</label>
        <textarea id="comments" name="comments" placeholder="Share your experience with us..." class="textArea"></textarea>
      </div>

      <!-- Recommendation -->
      <div class="formGroup">
        <p class="formLabel">Would you recommend us?</p>
        <div class = "recommendation">
            <input type="radio" id="recommendYes" name="recommend" value="yes" class="recommendInput">
            <label for="recommendYes" class="recommendLabel">Yes</label>
            <input type="radio" id="recommendNo" name="recommend" value="no" class="recommendInput">
            <label for="recommendNo" class="recommendLabel">No</label>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submitButton">Submit Feedback</button>
    </form>
  </div>




  <!-- Footer -->
  <?php include 'includes/footer.php'; ?>

</body>

<script type="module" src="js/productscustom.js"></script>
<script src="js/script.js"></script>

</html>



