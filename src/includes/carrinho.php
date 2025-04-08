<?php
// Array simulando itens do carrinho
$cart_items = [
    [
        'name' => 'Premium Cotton T-shirt',
        'size' => 'L',
        'color' => 'White',
        'price' => 29.99,
        'quantity' => 1,
        'image' => '/PTAW/imagens/produtos varios hero.png'
    ],
    [
        'name' => 'Premium Cotton T-shirt',
        'size' => 'L',
        'color' => 'White',
        'price' => 29.99,
        'quantity' => 1,
        'image' => '/PTAW/imagens/produtos varios hero.png'
    ]
];
?>

<div class="offcanvas offcanvas-end" tabindex="-1" id="carrinho" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Shopping Cart (<?php echo count($cart_items); ?>)</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="container">
            <?php foreach ($cart_items as $item): ?>
                <div class="row align-items-start">
                    <div class="col-4">
                        <img src="<?php echo $item['image']; ?>" class="img-small" alt="produtos">
                    </div>
                    <div class="col-8 d-flex justify-content-between align-items-start">
                        <div>
                            <p class="product-info mb-1"><?php echo $item['name']; ?></p>
                            <span class="product-info">Size: <?php echo $item['size']; ?></span>
                            <span class="product-info"> | </span>
                            <span class="product-info">Color: <?php echo $item['color']; ?></span>
                            <!-- Quantidade e Preço -->
                            <div class="d-flex align-items-center mt-2">
                                <button type="button" class="btn btn-outline-secondary me-2">-</button>
                                <span class="me-2">1</span>
                                <button type="button" class="btn btn-outline-secondary me-3">+</button>
                                <span class="price"><?php echo number_format($item['price'], 2); ?>€</span>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-link p-0">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
            <?php endforeach; ?>
        </div>
    </div>
</div>