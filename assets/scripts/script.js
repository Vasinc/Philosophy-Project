const burgerMenu = document.querySelector('.burger-menu');
const burgerLines = burgerMenu.querySelectorAll('.burger-line');
const burgerMenuOptions = document.querySelectorAll('.burger-menu__option');
const menuUI = document.querySelector('.menu-UI')
const h1 = document.getElementById('header-text');
const splitText = h1.textContent.trim().split(' ');
h1.textContent = '';

let curWord = 0;
let timer = setInterval(onTick, 50)

let count = 0;
let burgerTimer;

for (let i = 0; i < splitText.length; i++) {
    const word = splitText[i];
    h1.innerHTML += `<span class='splitWord'>${word}</span>`;
}

function onTick() {
    const splitWord = document.querySelectorAll('.splitWord')[curWord];
    splitWord.classList.add('fade');
    curWord++;
    if(curWord == splitText.length) {
        clearInterval(timer);
        timer = null;
        return;
    }
}

function onBurgerTick() {
    const option = burgerMenuOptions[count];
    option.classList.add('go-up');
    count++;
    if(count == burgerMenuOptions.length) {
        clearInterval(burgerTimer);
        count = 0;
        return;
    }
}

burgerMenu.addEventListener('click', () => {
    burgerLines[0].classList.toggle('first-line');
    burgerLines[1].classList.toggle('second-line');

    if(burgerLines[0].classList.contains('first-line')) {
        document.body.style.overflow = 'hidden'
        burgerMenu.style.background = '#693f09'
        burgerLines[0].style.background = '#fff';
        document.querySelector('header').scrollIntoView();
        menuUI.classList.toggle('display-block')
        setTimeout(() => {
            menuUI.classList.toggle('go-up')
        }, 1);
        setTimeout(() => {
            burgerTimer = setInterval(onBurgerTick, 50);
        }, 200);
    } else {
        burgerMenu.style.background = '#fff'
        burgerLines[0].style.background = '#693f09';
        document.body.style.overflow = 'visible'
        setTimeout(() => {
            menuUI.classList.toggle('go-up')
            for (let i = 0; i < burgerMenuOptions.length; i++) {
                const option = burgerMenuOptions[i];
                option.classList.remove('go-up')
            }
        }, 1);
        menuUI.classList.toggle('display-block')
    }
})

menuUI.addEventListener('click', event => {
        burgerLines[0].classList.toggle('first-line');
        burgerLines[1].classList.toggle('second-line');
        burgerMenu.style.background = '#fff'
        burgerLines[0].style.background = '#693f09';
        document.body.style.overflow = 'visible'
        setTimeout(() => {
            menuUI.classList.toggle('go-up')
            for (let i = 0; i < burgerMenuOptions.length; i++) {
                const option = burgerMenuOptions[i];
                option.classList.remove('go-up')
            }
        }, 1);
        menuUI.classList.toggle('display-block')
})