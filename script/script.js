const cardContainer = document.getElementById('cardContainer')
const template = document.getElementById('template')
const profileFilers = document.querySelector('.profile__filters')
let currentTimeframe = 'weekly'

fetch('../data.json')
.then((response) => {
    if(!response.ok) return console.log('Oops! Something went wrong!')
    
    return response.json()
})
.then((activities) => {
    loopActivities(activities)
    profileFilers.addEventListener('click', (e) => {
        currentTimeframe = e.target.textContent.toLowerCase()
        e.currentTarget.querySelectorAll('p').forEach( el => el.classList.remove('filters__active'))
        e.target.classList.toggle('filters__active')
        cardContainer.innerHTML = ''
        loopActivities(activities)
    })
})

function renderCards(card, activity, timeframe) {
    const cardEl = card
    const titleEl = cardEl.querySelector('.title')
    const timeEl = cardEl.querySelector('.time')
    const previousTimeEl = cardEl.querySelector('.previous-time')
    const cardBackground = cardEl.querySelector('.card__bg')

    titleEl.textContent = activity.title
    titleEl.dataset.title = activity.title

    timeEl.textContent = `${activity.timeframes[timeframe].current}hrs`
    timeEl.dataset.currentTime = activity.timeframes[timeframe].current

    previousTimeEl.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hrs`
    previousTimeEl.dataset.previousTime = activity.timeframes[timeframe].previous

    cardBackground.classList.add(`${activity.title.toLowerCase() === 'self care' ? 'self-care' : activity.title.toLowerCase()}`)
    return cardEl
}

function loopActivities(data) {
    data.forEach(d => {
    const clone = template.content.cloneNode(true)

    renderCards(clone, d, currentTimeframe)
        

    cardContainer.appendChild(clone)
    })
}