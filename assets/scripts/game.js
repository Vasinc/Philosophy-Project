const courtYard = document.getElementById('courtyard');
const desk = document.getElementById('desk');

courtYard.addEventListener('click', () => {
    courtYard.classList.add('zoom-in');
    setTimeout(() => {
        courtYard.style.display = 'none';
        desk.classList.add('display-block')
    }, 500)
})