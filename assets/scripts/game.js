const backdrop = document.getElementById('backdrop');
const tutorialMessage = document.querySelector('.tutorial-message')
const courtYard = document.getElementById('courtyard');
const desk = document.getElementById('desk');
const punishmentsContainer = document.querySelector('.punishments');
const punishments = document.querySelectorAll('.punishment');
const submitBtn = document.querySelector('.submit-case');
const caseUI = document.querySelector('.case');
const pages = document.querySelector('.pages');
const pageNumber = document.getElementById('page-number');
const caseNumber = document.getElementById('case-number');
const breakBtn = document.querySelector('.break-button');

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

punishmentsContainer.addEventListener('click', event => {
    if(event.target.className == 'punishment') {
        submitBtn.style.background = '#b7ea84';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.style.background = '#858585'
        submitBtn.style.cursor = 'not-allowed'
    }
    for (const punishment of punishments) {
        if(punishment === event.target) {
            punishment.style.background = '#0F2194'
            punishment.style.color = 'white'
        } else {
            punishment.style.background = '#7d8df2'
            punishment.style.color = 'black'
        }
    }
})

submitBtn.addEventListener('click', () => {
    if (submitBtn.style.cursor == 'not-allowed') return;
    caseUI.classList.remove('display-flex')
    breakBtn.classList.add('display-block');
})

pages.addEventListener('click', () => {
    if (caseUI.classList.contains('display-flex')) {
        alert('You already have a case on the table!')
    } else { 
        breakBtn.classList.remove('display-block');
        caseUI.classList.add('display-flex');
        caseNumber.textContent = parseInt(pageNumber.textContent);
        pageNumber.textContent = parseInt(pageNumber.textContent) + 1

        for (const punishment of punishments) { 
            punishment.style.background = '#7d8df2'
            punishment.style.color = 'black'
        }
        submitBtn.style.background = '#858585'
        submitBtn.style.cursor = 'not-allowed'
    }
})