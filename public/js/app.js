'use strict';
const ls = localStorage;

let catalogClosed = true;
let loginClosed = true;
let burgerClosed = true;
let profileClosed = true;

const header = document.querySelector('.header')
const headerFlex = document.querySelector('.header-flex');
const navItem = document.querySelectorAll('.header-nav-item');
const burger = document.querySelector('.burger');


const toggleBurger = () => {
    burger.classList.toggle('burger-active');
    headerFlex.classList.toggle('header-flex-active');
    if(burgerClosed){
        burgerClosed = false;
        if(loginClosed == false) toggleLogin();
        if(profileClosed == false) toggleProfile();
        if(catalogClosed == false) toggleCatalog();
    } 
    else{
        burgerClosed = true;
    }
}

var phoneInput = document.querySelector('input[type=tel]');

var getInputNumbersValue = function (input) {
    // Возвращаем только цифры из введенного значения
    return input.value.replace(/\D/g, '');
}

var onPhonePaste = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
            // При вставке некорректного символа оставляем только цифры
            input.value = inputNumbersValue;
            return;
        }
    }
}

var onPhoneInput = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return input.value = "";
    }

    if (input.value.length != selectionStart) {
        // Если редактируем не в конце поля
        if (e.data && /\D/g.test(e.data)) {
            // Если вводим не числовой символ
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
}

var onPhoneKeyDown = function (e) {
    // Удаление последнего символа очищает поле
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
}

var onPhoneFocus = function (e) {
    var input = e.target;
    if (input.value === "") {
        input.value = "+7 "; // Устанавливаем начальное значение
        input.setSelectionRange(3, 3); // Устанавливаем курсор после +7
    }
}
phoneInput.addEventListener('keydown', onPhoneKeyDown);
phoneInput.addEventListener('input', onPhoneInput, false);
phoneInput.addEventListener('paste', onPhonePaste, false);
phoneInput.addEventListener('focus', onPhoneFocus);

const passInput = document.querySelector('input[type=password]');
passInput.addEventListener('input', e => {
    const input = e.target.value;
    const noSpacePls = input.replace(/\s+/g, "");
    e.target.value = noSpacePls;
})

const toggleCatalog = () =>{
    const catalogModal = document.querySelector('.modal-catalog');
    catalogModal.classList.toggle('show');
    if(catalogClosed){
        catalogClosed = false;
        if(loginClosed == false) toggleLogin();
        if(profileClosed == false) toggleProfile();
        if(burgerClosed == false) toggleBurger();
    } 
    else{
        catalogClosed = true;
    }
}

const toggleLogin = () =>{
    const loginModal = document.querySelector('.modal-login')
    loginModal.classList.toggle('show')
    if(loginClosed){
        loginClosed = false; 
        if(catalogClosed == false) toggleCatalog();
        if(burgerClosed == false) toggleBurger();
    }
    else{
        loginClosed = true;
    }
}

const profileModal = document.querySelector('.modal-profile')
if(ls.getItem('authorized')){
    profileModal.firstChild.textContent = JSON.parse(ls.getItem('authorized'));
}
const toggleProfile = () =>{
    profileModal.classList.toggle('show')
    if(profileClosed){
        profileClosed = false; 
        if(catalogClosed == false) toggleCatalog();
        if(burgerClosed == false) toggleBurger();
    }
    else{
        profileClosed = true;
    }
}
profileModal.addEventListener('click', e => {
    const target = e.target;
    if(target.closest('.modal-profile-btns-out')){
        ls.setItem('authorized', '');
        alert("Вы вышли из профиля!");
        location.reload();
    }
    if(target.closest('.modal-profile-btns-del')){
        const storage = JSON.parse(ls.getItem('users'));
        storage.splice(storage[storage.findIndex(item => item.login === ls.getItem('authorized'))], 1);
        ls.setItem('users', JSON.stringify(storage));
        ls.setItem('authorized', '');
        alert("Вы удалили ваш профиль!");
        location.reload();
    }
})


const displayProduct = () => {
    const storage = JSON.parse(ls.getItem('products'));
    console.log('storage: ', storage);
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    console.log('productId: ', productId);
    const indexStoreObj = storage.findIndex(item => item.id === String(productId));
    console.log('indexStoreObj: ', indexStoreObj);
    console.log('storage[indexStoreObj].image: ', storage[indexStoreObj].image);
    const main = document.querySelector('.main-section');
    main.innerHTML = '';
    main.insertAdjacentHTML('afterbegin', `
        <div class="main-section-product">
            <div class="product-header">
                <div class="product-img"><img src="{{asset('imgs/games/${storage[indexStoreObj].image}')}}" alt="${storage[indexStoreObj].name}"></div>
                <div class="product-title">
                    <h1 class="product-name">${storage[indexStoreObj].title}</h1>
                    <div class="product-cost">
                        <div class="product-cost-old">${storage[indexStoreObj].price}₽</div> 
                        <div class="product-cost-current">${Math.floor(storage[indexStoreObj].price - storage[indexStoreObj].price * (storage[indexStoreObj].discount/100))}₽</div> 
                    </div>
                    <div class="product-control">
                        <div class="cards-item__overlay-to-basket btn">В корзину</div>
                        <div class="cards-item__overlay-to-favorite btn">
                            <svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5355 3.46436C19.4881 5.41698 19.4881 8.5828 17.5355 10.5354L10.7071 17.3639C10.3166 17.7544 9.68341 17.7544 9.29288 17.3639L2.46447 10.5354C0.511845 8.5828 0.511845 5.41698 2.46447 3.46436C4.0168 1.91202 5.89056 1.43671 7.78125 2.35927C8.53167 2.72543 9.51561 3.46436 9.99999 4.42958C10.4844 3.46436 11.4683 2.72543 12.2187 2.35927C14.1094 1.43671 15.9832 1.91202 17.5355 3.46436Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="product-slider">
                        <div class="product-slider-track">
                            <div class="product-slide"><img src="{{asset('imgs/no-game-here.png')}} alt="Game Screenshot 1"></div>
                            <div class="product-slide"><img src="{{asset('imgs/no-game-here.png')}}" alt="Game Screenshot 2"></div>
                            <div class="product-slide"><img src="{{asset('imgs/no-game-here.png')}}" alt="Game Screenshot 3"></div>
                            <div class="product-slide"><img src="{{asset('imgs/no-game-here.png')}}" alt="Game Screenshot 4"></div>
                        </div>
                        <div class="main-section-slider-prev slider-control"><img src="{{asset('icons/arrow-prev.svg')}}" alt="prv"></div>
                        <div class="main-section-slider-next slider-control"><img src="{{asset('icons/arrow-next.svg')}}" alt="nxt"></div>
                    </div>
                </div>
            </div>
            <div class="product-main">
                <div class="product-requirments">
                    <span>Минимальные требования:</span><br>
                    <span>Операционная система: <span>Windows 7, 8, 10.</span><br>
                        Процессор: <span>Intel Core i5-4440.</span><br>
                        Оперативная память: <span>8 гигабайт.</span><br>
                        Видеокарта: <span>Nvidia GTX 670, GTX 1050 или AMD Radeon HD 7870, объём памяти 2 гигабайта.</span><br>
                        Поддержка: <span>DirectX 11 или 12.</span></span>
                </div>
                <div class="product-description">
                    <span>Описание</span>
                    <span>${storage[indexStoreObj].description} крутая игра с захватывающими механиками и дизайном.</span>
                </div>
            </div>
        </div>`)

    const sliderTrack = document.querySelector('.product-slider-track');
    const slides = document.querySelectorAll('.product-slide');
    const prevButton = document.querySelector('.main-section-slider-prev');
    const nextButton = document.querySelector('.main-section-slider-next');

    let currentIndex = 0;

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    });
}

if (!window.location.pathname.includes('product.html')) {
    const mainSectionSlider = document.querySelector('.main-section-slider');
    const sliderList = mainSectionSlider.querySelector('.main-section-slider-list');

    const bannerImgs = ['bannerTest2','bannerTest1','no-game-here-banner','no-game-here-banner1',]

    for(let i = 1; i <= bannerImgs.length; i++){
        sliderList.insertAdjacentHTML('beforeend','<div class="main-section-slider-list-item"></div>')
    }

    const sliderListItems = sliderList.querySelectorAll('.main-section-slider-list-item');
    for(let i = 0; i < sliderListItems.length; i++){
        sliderListItems[i].style.backgroundImage = `url(imgs/${bannerImgs[i]}.png)`
    }

    const images = document.querySelectorAll('.main-section-slider-list-item');
    let currentIndex = 0;

    const showImage = (index) => {
        images[currentIndex].classList.remove('active');
        setTimeout(() => {
            images[index].classList.add('active');
        }, 600);
        currentIndex = index;
    }

    document.querySelectorAll('.slider-control').forEach(controlItem =>{
        controlItem.addEventListener('click', event => {
            if (event.target.classList.contains('main-section-slider-prev')) {
                let index = currentIndex - 1;
                if (index < 0) {
                    index = images.length - 1;
                }
                showImage(index);
            } else if (event.target.classList.contains('main-section-slider-next')) {
                let index = currentIndex + 1;
                if (index >= images.length) {
                    index = 0;
                }
                showImage(index);
            }
        });
    })

    showImage(currentIndex);

    const mainSectionCards = document.querySelector('.main-section-cards');

    function getRandom(max){
        return Math.floor(Math.random() * max);
    }

    //ЦЕНЫ И СКИДКИ РАНДОМНЫ, КАК И ПОРЯДОК ИГР (ПОКА НЕТ БД)

    const currentArr = [599, 1599, 199, 499, 1299, 2499, 99, 799, 3499, 49]
    const discountArr = [5, 15, 9, 12, 24, 50, 7, 34, 70, 47]
    const gamesImgs = [{name: 'Dark_Souls_III.jpg',id: '1'},{name: 'Dark_Souls_III_deluxe_edition.jpg',id: '2'}
        ,{name: 'Dark_Souls_III_the_ringed_city.jpg',id: '3'}
        ,{name: 'Dead_by_daylight.jpg',id: '4'},{name: 'Dead_cells.jpg',id: '5'}
        ,{name: 'Dead_island_definitive_collection.jpg',id: '6'},{name: 'Dead_island_definitive_edition.jpg',id: '7'}
        ,{name: 'Dead_rising_2.jpg',id: '8'},{name: 'Dead_space.jpg',id: '9'}
        ,{name: 'Dishonored_death_of_the_outsider.jpg',id: '10'},{name: 'Dishonored_definitive_edition.jpg',id: '11'}
        ,{name: 'Elden_ring.jpg',id: '12'},{name: 'Farcry_4.jpg',id: '13'}
        ,{name: 'Helldivers_2.jpg',id: '14'},{name: 'Hitman_2.jpg',id: '15'},{name: 'Jedi_survivor.jpg',id: '16'}
        ,{name: 'Killing_floor_2.jpg',id: '17'},{name: 'Mafia_II.jpg',id: '18'},{name: 'Metro_exodus_gold_edition.jpg',id: '19'}
        ,{name: 'Mortal_kombat_11.jpg',id: '20'},{name: 'Mortal_kombat_11_aftermath.jpg',id: '21'},{name: 'Mortal_kombat_XL.jpg',id: '22'}
        ,{name: 'Naruto_ultimate_ninja_storm_4.jpg',id: '23'},{name: 'Naruto_ultimate_ninja_storm_revolution.jpg',id: '24'},{name: 'Red_dead_redemption_II.jpg',id: '25'}
        ,{name: 'Resident_evil_3.jpg',id: '26'},{name: 'Resident_evil_village.jpg',id: '27'},{name: 'Resident_evil_zero.jpg',id: '28'}
        ,{name: 'Rise_of_the_tomb_rider_20_year_celebration.jpg',id: '29'},{name: 'Secret_neighbor.jpg',id: '30'},{name: 'Spider-man_Miles_Morales.jpg',id: '31'}
        ,{name: 'Spongebob_battle_for_bikini_bottom_rehydrated.jpg',id: '32'},{name: 'Titanfall_2.jpg',id: '33'}
        ,{name: 'Assasins_creed_odyssey.jpg',id: '34'},{name: 'Batman_arkham_knight_premium_edition.jpg',id: '35'},{name: 'Battlefield_V.jpg',id: '36'}
        ,{name: 'Beyond_two_souls.jpg',id: '37'},{name: 'Biomutant.jpg',id: '38'},{name: 'Bioshock_infinite.jpg',id: '39'}
        ,{name: 'Black_clover_quartet_knights.jpg',id: '40'},{name: 'Borderlands_the_handsome_collection.jpg',id: '41'},]

    const gamesImgsBase = gamesImgs.slice(0);
    const gamesImgsSlide = gamesImgs.slice(0);

    const products = [];

    mainSectionCards.innerHTML = '';
    if(ls.getItem('products')){
        const storage = JSON.parse(ls.getItem('products'));
        for(let i = 0; i < 41; i++){
            mainSectionCards.insertAdjacentHTML('beforeend',`
                <div class="cards-item">
                    <div class="cards-item__overlay">
                        <div class="cards-item__overlay-to-basket btn">В корзину</div>
                        <div class="cards-item__overlay-to-favorite btn">
                            <svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5355 3.46436C19.4881 5.41698 19.4881 8.5828 17.5355 10.5354L10.7071 17.3639C10.3166 17.7544 9.68341 17.7544 9.29288 17.3639L2.46447 10.5354C0.511845 8.5828 0.511845 5.41698 2.46447 3.46436C4.0168 1.91202 5.89056 1.43671 7.78125 2.35927C8.53167 2.72543 9.51561 3.46436 9.99999 4.42958C10.4844 3.46436 11.4683 2.72543 12.2187 2.35927C14.1094 1.43671 15.9832 1.91202 17.5355 3.46436Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="cards-item__discount-decoration"><div class="cards-item__price-discount">${storage[i].discount ? storage[i].discount : '0'}%</div></div>
                    <a href="/product?id=${storage[i].id}" class="cards-item__img">
                        <img src="${baseImagePath}/${storage[i].image ? storage[i].image : '../no-game-here.png'}" alt="some-game-here">
                    </a>
                    <a href="/product?id=${storage[i].id}" class="cards-item__title">${storage[i].title ? storage[i].title : 'NO Game'}</a>
                    <div class="cards-item__price">
                        <div class="cards-item__price-old">${storage[i].price ? storage[i].price : '0'}₽</div>
                        <div class="cards-item__price-current">${storage[i].discount ? Math.floor(storage[i].price - storage[i].price * (storage[i].discount/100)) : storage[i].price}₽</div>
                    </div>
                </div>`)
        }
    }
    else{
        for(let i = 1; i <= 41; i++){
            let game = getRandom(gamesImgsBase.length);
            let randomCost = getRandom(currentArr.length);
            let randomDiscount = getRandom(discountArr.length)
            
            products.push({
                id: gamesImgsBase[game].id,
                title: `${gamesImgsBase[game].name.replace(/_/g,' ').slice(0,-4)}`,
                description: `Описание игры - ${gamesImgsBase[game].name.replace(/_/g,' ').slice(0,-4)}`,
                price: currentArr[randomCost],
                discount: discountArr[randomDiscount],
                image: gamesImgsBase[game].name
            })
    
            mainSectionCards.insertAdjacentHTML('beforeend',`
                <div class="cards-item">
                    <div class="cards-item__overlay">
                        <div class="cards-item__overlay-to-basket btn">В корзину</div>
                        <div class="cards-item__overlay-to-favorite btn">
                            <svg class="btn-hov" width="100%" height="100%" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5355 3.46436C19.4881 5.41698 19.4881 8.5828 17.5355 10.5354L10.7071 17.3639C10.3166 17.7544 9.68341 17.7544 9.29288 17.3639L2.46447 10.5354C0.511845 8.5828 0.511845 5.41698 2.46447 3.46436C4.0168 1.91202 5.89056 1.43671 7.78125 2.35927C8.53167 2.72543 9.51561 3.46436 9.99999 4.42958C10.4844 3.46436 11.4683 2.72543 12.2187 2.35927C14.1094 1.43671 15.9832 1.91202 17.5355 3.46436Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="cards-item__discount-decoration"><div class="cards-item__price-discount">${gamesImgsBase[game] ? discountArr[randomDiscount] : '0'}%</div></div>
                    <a href="/product.html?id=${gamesImgsBase[game].id}" class="cards-item__img">
                        <img src="${baseImagePath}/${gamesImgsBase[game].name ? gamesImgsBase[game].name : '../no-game-here.png'}" alt="some-game-here">
                    </a>
                    <a href="/product?id=${gamesImgsBase[game].id}" class="cards-item__title">${gamesImgsBase[game].name ? gamesImgsBase[game].name.replace(/_/g,' ').slice(0,-4) : 'NO Game'}</a>
                    <div class="cards-item__price">
                        <div class="cards-item__price-old">${gamesImgsBase[game].name ? currentArr[randomCost] : '0'}₽</div>
                        <div class="cards-item__price-current">${gamesImgsBase[game].name ? Math.floor(currentArr[randomCost] - currentArr[randomCost] * (discountArr[randomDiscount]/100)) : '0'}₽</div>
                    </div>
                </div>`)
            
            gamesImgsBase.splice(game, 1)
        }
    
        ls.setItem('products', JSON.stringify(products))
    }
}
else{
    displayProduct()
}

const auth = () => {
    const phone = phoneInput.value;
    const password = passInput.value;

    if (phone.length === 18 && password.length > 5) {
        const users = JSON.parse(ls.getItem('users')) || [];

        const existingUser = users.find(user => user.login === phone);

        if (existingUser) {
            if (existingUser.password === password) {
                ls.setItem('authorized', JSON.stringify(phone));
                alert("Вы успешно вошли!");
                location.reload();
            } else {
                alert("Неверный пароль! Попробуйте снова.");
            }
        } else {
            users.push({ login: phone, password: password });
            ls.setItem('users', JSON.stringify(users));
            ls.setItem('authorized', JSON.stringify(phone));
            alert("Вы успешно зарегистрировались и вошли!");
            location.reload();
        }
    } else {
        alert("Введите корректный номер телефона и пароль!");
    }
};

const authBtn = document.querySelector('.modal-login__btn');
authBtn.addEventListener('click', auth);

if(ls.getItem('authorized')){
    const headerNav = document.querySelector('.header-nav.nav-right');
    const loginBtn = document.querySelector('.header-login-btn');
    loginBtn.remove();
    headerNav.insertAdjacentHTML('afterbegin', `
        <div class='header-profile-btn btn' onclick='toggleProfile()'><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 17C14.1046 17 15.0454 16.0899 14.7951 15.0141C14.1723 12.338 12.0897 11 8 11C3.91032 11 1.8277 12.338 1.20492 15.0141C0.954552 16.0899 1.89543 17 3 17H13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C10 8 11 7 11 4.5C11 2 10 1 8 1C6 1 5 2 5 4.5C5 7 6 8 8 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></div>`)
}
