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
const infoSection = document.getElementById('info-section');
const continueBtn = document.getElementById('continue-button');
const homepageBtn = document.getElementById('homepage-button');
const infos = document.querySelectorAll('.info');
const judgeType = document.getElementById('judge-type');

let currentPunishment;
let givenPunishments = {"let-free": 0, "community-service": 0, "fine": 0, "jail": 0, "capital-punishment": 0}

function updateInfo () {
    const values = Object.values(givenPunishments);

    for (let i = 0; i < infos.length; i++) {
        const info = infos[i];
        info.textContent = values[i];
    }
}

function updateJudgeType () {
    let value = 0;
    let totalValue = 0;

    for (let i = 0; i < Object.values(givenPunishments).length; i++) {
        const objVal = Object.values(givenPunishments)[i];
        
        value += objVal * (i + 1);
    }

    for (let i = 0; i < Object.values(givenPunishments).length; i++) {
        const objVal = Object.values(givenPunishments)[i];
        totalValue += objVal;
    }

    if( value <= totalValue * 1) {
        judgeType.textContent = 'forgiving'
        judgeType.style.color = '#1CEF38';
    } else if (value <= totalValue * 2 && value >= totalValue * 1){
        judgeType.textContent = 'clement'
        judgeType.style.color = '#1313FA';
    } else if (value <= totalValue * 3 && value >= totalValue * 2){
        judgeType.textContent = 'mediocre'
        judgeType.style.color = '#ECEC00';
    } else if (value <= totalValue * 4 && value >= totalValue * 3){
        judgeType.textContent = 'harsh'
        judgeType.style.color = '#B95600';
    } else if (value <= totalValue * 5 && value >= totalValue * 4){
        judgeType.textContent = 'cruel'
        judgeType.style.color = '#FF0000';
    }

    // console.log(value);
}

onload = () => {
    if (!localStorage.getItem('storedPunishments')) return;
    givenPunishments = JSON.parse(localStorage.getItem('storedPunishments'));
    if(!localStorage.getItem('storedCase')) {
        pageNumber.textContent = 1;
    } else {
        pageNumber.textContent = localStorage.getItem('storedCase')
    }
}

courtYard.addEventListener('click', () => {
    courtYard.classList.add('zoom-in');
    setTimeout(() => {
        courtYard.style.display = 'none';
        desk.classList.add('display-block')
        courtYard.classList.remove('zoom-in');
    }, 500)
})

backdrop.addEventListener('click', () => {
    backdrop.classList.add('display-none');
    tutorialMessage.classList.add('display-none');
    infoSection.classList.remove('display-flex')
})

punishmentsContainer.addEventListener('click', event => {
    if(event.target.className == 'punishment') {
        submitBtn.style.background = '#b7ea84';
        submitBtn.style.cursor = 'pointer';
        currentPunishment = event.target.textContent.trim().toLowerCase().replaceAll(' ', '-');
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
    givenPunishments[`${currentPunishment}`] += 1;
    localStorage.setItem('storedPunishments', JSON.stringify(givenPunishments));
    // console.log(givenPunishments);
})

pages.addEventListener('click', () => {
    if (caseUI.classList.contains('display-flex')) {
        alert('You already have a case on the table!')
        // document.activeElement.blur();
    } else { 
        // document.activeElement.blur();
        breakBtn.classList.remove('display-block');
        caseUI.classList.add('display-flex');
        caseNumber.textContent = parseInt(pageNumber.textContent);
        pageNumber.textContent = parseInt(pageNumber.textContent) + 1
        localStorage.setItem('storedCase', parseInt(pageNumber.textContent));
        for (const punishment of punishments) { 
            punishment.style.background = '#7d8df2'
            punishment.style.color = 'black'
        }
        submitBtn.style.background = '#858585'
        submitBtn.style.cursor = 'not-allowed'
    }
})

breakBtn.addEventListener('click', () => {
    infoSection.classList.add('display-flex');
    updateInfo();
    updateJudgeType();
    backdrop.classList.remove('display-none')
})

continueBtn.addEventListener('click', () => {
    backdrop.classList.add('display-none');
    infoSection.classList.remove('display-flex');
    breakBtn.classList.remove('display-block');
})

homepageBtn.addEventListener('click', () => {
    courtYard.style.display = 'block';
    desk.classList.remove('display-block')
    backdrop.classList.add('display-none');
    infoSection.classList.remove('display-flex');
    breakBtn.classList.remove('display-block');
})