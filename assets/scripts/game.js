const backdrop = document.getElementById('backdrop');
const tutorialMessage = document.querySelector('.tutorial-message')
const courtYard = document.getElementById('courtyard');
const desk = document.getElementById('desk');

courtYard.addEventListener('click', () => {
    courtYard.classList.add('zoom-in');
    setTimeout(() => {
        courtYard.style.display = 'none';
        desk.classList.add('display-block')
    }, 500)
})

backdrop.addEventListener('click', () => {
    backdrop.classList.add('display-none');
    tutorialMessage.classList.add('display-none')
})