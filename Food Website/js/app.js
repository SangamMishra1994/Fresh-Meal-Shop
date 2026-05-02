$(document).ready(function () {
    $('.food-slider').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: ".prev-btn",
        nextArrow: ".next-btn",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]

    });

    $('.nav-trigger').click(function () {
        $('.site-content-wrapper').toggleClass('scaled');
    })

    // Add to cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartUI() {
        let cartCount = cart.length;
        let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        
        $('.auth div:last-child a').text(`${cartCount} Items - ($${totalPrice.toFixed(2)})`);
        $('.mobile-nav .cart a').text(`${cartCount} Items - ($${totalPrice.toFixed(2)})`);
    }

    updateCartUI(); // Initial update

    $('.food-card button').click(function () {
        const itemName = $(this).closest('.food-card').find('h2').text();
        const itemPriceStr = $(this).closest('.food-card').find('.price').text().replace('$', '').trim();
        const itemPrice = parseFloat(itemPriceStr);

        cart.push({ name: itemName, price: itemPrice });
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartUI();
        alert(`${itemName} added to cart!`);
    });

    // Countdown Timer
    const countdownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000); // 2 days 5 hours from now

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('.timer div:nth-child(1) span:first-child').text(days < 10 ? "0" + days : days);
        $('.timer div:nth-child(2) span:first-child').text(hours < 10 ? "0" + hours : hours);
        $('.timer div:nth-child(3) span:first-child').text(minutes < 10 ? "0" + minutes : minutes);
        $('.timer div:nth-child(4) span:first-child').text(seconds < 10 ? "0" + seconds : seconds);

        if (distance < 0) {
            clearInterval(x);
            $('.timer').html("EXPIRED");
        }
    }, 1000);

    // Subscribe form
    $('.subscribe button').click(function () {
        const email = $('.subscribe input').val();
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            $('.subscribe input').val('');
        } else {
            alert('Please enter a valid email address.');
        }
    });
});