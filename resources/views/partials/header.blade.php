<header class="header">
    <a href="{{ route('welcome') }}" class="logo"><img src="{{ asset('icons/logo.svg') }}" alt="logo"></a>
    <div class="burger" onclick="toggleBurger()">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="header-flex">
        <nav class="header-nav nav-left">
            <div class="header-catalog-btn btn" onclick="toggleCatalog()">Каталог игр</div>
            <div class="header-search-wrap">
                <input type="button" class="search-btn btn">
                <input type="search" class="search-bar">
            </div>
        </nav>
        <nav class="header-nav nav-right">
            <li class="header-nav-item"><div class="header-login-btn btn" onclick="toggleLogin()">Войти</div></li>
            <li class="header-nav-item"><div class="header-favorite btn"><svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5355 3.46436C19.4881 5.41698 19.4881 8.5828 17.5355 10.5354L10.7071 17.3639C10.3166 17.7544 9.68341 17.7544 9.29288 17.3639L2.46447 10.5354C0.511845 8.5828 0.511845 5.41698 2.46447 3.46436C4.0168 1.91202 5.89056 1.43671 7.78125 2.35927C8.53167 2.72543 9.51561 3.46436 9.99999 4.42958C10.4844 3.46436 11.4683 2.72543 12.2187 2.35927C14.1094 1.43671 15.9832 1.91202 17.5355 3.46436Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div></li>
            <li class="header-nav-item"><div class="header-basket btn"><svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 11H12M18 6V17C18 18.1046 17.1046 19 16 19H4C2.89543 19 2 18.1046 2 17V6M19 6V3C19 1.89543 18.1046 1 17 1H3C1.89543 1 1 1.89543 1 3V6H19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div></li>
        </nav>
    </div>
    <div class="modal-catalog modal">
        <div class="modal-catalog__categories">
            <ul class="modal-catalog__categories-fast-categories-list">
                <li class="modal-catalog__categories-fast-categories-list-item"><a href="#">Лидеры продаж</a></li>
                <li class="modal-catalog__categories-fast-categories-list-item"><a href="#">Новинки</a></li>
                <li class="modal-catalog__categories-fast-categories-list-item"><a href="#">Предзаказы</a></li>
                <li class="modal-catalog__categories-fast-categories-list-item"><a href="#">Скидки</a></li>
            </ul>
            <div class="modal-catalog__categories-genres">
                <div class="modal-catalog__categories-title">Жанры</div>
                <ul class="modal-catalog__categories-list">
                    <li class="modal-catalog__categories-list-item"><a href="#">Инди</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Экшен</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Симуляторы</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Стратегии</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Гонки</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Приключения</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Онлайн</a></li>
                </ul>
            </div>
            <div class="modal-catalog__categories-publishers">
                <div class="modal-catalog__categories-title">Издатели</div>
                <ul class="modal-catalog__categories-list">
                    <li class="modal-catalog__categories-list-item"><a href="#">Capcom</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Ubisoft</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Electronic Arts</a></li>
                    <li class="modal-catalog__categories-list-item"><a href="#">Bethesda Softworks</a></li>
                </ul>
            </div>
            <div class="modal-catalog__categories-developers">
                <div class="modal-catalog__categories-title">Разработчики</div>
                <ul class="modal-catalog__categories-list">
                    <li class="modal-catalog__categories-list-item"><a href="#">Да</a></li>
                </ul>
            </div>
        </div>
        <span style="position: absolute; bottom: 15px; right: 15px; color: rgba(255, 255, 255, .3); font-weight: 700; user-select: none;">В разработке ._.</span>
    </div>
    <div class="modal-login">
        <div class="modal-login-wrap">
            <h1 class="modal-login__title">Вход</h1>
            <input class="modal-login__input" title="Введите номер телефона" type="tel" placeholder="+7 999 999 99 99">
            <div class="password-flex">
                <input class="modal-login__input" title="Введите пароль" type="password" placeholder="Введите пароль">
                <div class="password-show"><svg class="btn-hov" width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.0006 1.00067C18.2536 4.57662 14.8779 6.99995 11 6.99995M11 6.99995C7.12204 6.99995 3.7463 4.57662 1.99977 1.00024M11 6.99995L11 9.99996M18.4218 3.42184L20.4999 5.49996M15.2304 5.9687L16.5 8.49995M3.57812 3.42184L1.5 5.49996M6.76953 5.96871L5.5 8.49996" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <input class="modal-login__btn btn-danger" type="button" value="Войти">
        </div>
    </div>
    <div class="modal-profile">
        <div class="modal-profile-wrap">
            <span class="modal-profile__login"></span>
            <div class="modal-profile-btns">
                <input type="button" class="modal-profile-btns-out btn-danger" value="Выйти">
                <input type="button" class="modal-profile-btns-del btn-danger" value="Удалить аккаунт">
            </input>
        </div>
    </div>
    <div class="modal-favorite modal"></div>
    <div class="modal-basket modal"></div>
</header>