<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KeyHub</title>
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}" type="image/x-icon">
    <link rel="icon" href="{{asset('favicon.ico')}}" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script defer src="{{ asset('js/app.js') }}"></script>
</head>
<body>
    @include('partials.header')
    <main class="main-section">
        <div class="main-section-slider">
            <img src="imgs/in_development.svg" alt="in_development" style="width: 300px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, .5); padding: 10px; box-shadow: 0 0 10px #000; user-select: none; z-index: 1; opacity: .2;">
            <div class="main-section-slider-list">
            </div>
            <div class="main-section-slider-prev slider-control"><img src="icons/arrow-prev.svg" alt="prv"></div>
            <div class="main-section-slider-next slider-control"><img src="icons/arrow-next.svg" alt="nxt"></div>
        </div>
        <div class="main-section-cards">
            <div class="cards-item">
                <div class="cards-item__overlay">
                    <div class="cards-item__overlay-to-basket btn">В корзину</div>
                    <div class="cards-item__overlay-to-favorite btn">
                        <svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5355 3.46436C19.4881 5.41698 19.4881 8.5828 17.5355 10.5354L10.7071 17.3639C10.3166 17.7544 9.68341 17.7544 9.29288 17.3639L2.46447 10.5354C0.511845 8.5828 0.511845 5.41698 2.46447 3.46436C4.0168 1.91202 5.89056 1.43671 7.78125 2.35927C8.53167 2.72543 9.51561 3.46436 9.99999 4.42958C10.4844 3.46436 11.4683 2.72543 12.2187 2.35927C14.1094 1.43671 15.9832 1.91202 17.5355 3.46436Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="cards-item__discount-decoration"><div class="cards-item__price-discount">0%</div></div>
                <a href="#" class="cards-item__img">
                    <img src="{{asset('imgs/no-game-here.png')}}" alt="some-game-here">
                </a>
                <a href="#" class="cards-item__title">Заглушка</a>
                <div class="cards-item__price">
                    <div class="cards-item__price-old">0₽</div>
                    <div class="cards-item__price-current">0₽</div>
                </div>
            </div>
        </div>
    </main>
    @include('partials.footer')
</body>
</html>