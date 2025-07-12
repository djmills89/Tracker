class TrackerCard extends HTMLElement {
    constructor() {
        super()

        const template = document.getElementById('template')
        const content = template.content.cloneNode(true)

        this.appendChild(content)

        this.styleMap = {
            'Work' : {
                color: 'var(--work-bg-color)',
                image: '../images/icon-work.svg'
            },
            'Play' : {
                color: 'var(--play-bg-color)',
                image: '../images/icon-play.svg'
            },
            'Study' : {
                color: 'var(--study-bg-color)',
                image: '../images/icon-study.svg'
            },
            'Exercise' : {
                color: 'var(--exercise-bg-color)',
                image: '../images/icon-exercise.svg'
            },
            'Social' : {
                color: 'var(--social-bg-color)',
                image: '../images/icon-social.svg'
            },
            'Self Care' : {
                color: 'var(--care-bg-color)',
                image: '../images/icon-self-care.svg'
            },
        }
    }
    setData(data, timeframe) {
            this.querySelector('.title').textContent = data.title
            this.querySelector('.time').textContent = `${data.timeframes[timeframe].current}hrs`
            this.querySelector('.previous-time').textContent = `Last week - ${data.timeframes[timeframe].previous}hrs`
        }
    setStyles(data) {
        const style = this.styleMap[data.title]

        if (!style) return

        const bg = this.querySelector('.card-bg')
        bg.style.backgroundColor = style.color
        bg.style.backgroundImage = `url(${style.image})`
    }
}

customElements.define('tracker-card' , TrackerCard)

const profile = document.querySelector('.times')
const timeFilter = profile.querySelectorAll('p')
let currentFilter = 'Monthly'.toLowerCase()
let cards = []
let data = []

timeFilter.forEach(filter => {
    filter.addEventListener('click', (e) => {
        timeFilter.forEach(f => f.classList.remove('active'))
        e.target.classList.add('active')
        currentFilter = e.target.textContent.toLowerCase()
        renderCards()
    })
})

function renderCards() {
    const container = document.querySelector('.card-container')
    container.innerHTML = ''

    data.forEach(item => {
        const card = new TrackerCard()
        card.setData(item, currentFilter)
        card.setStyles(item)
        container.appendChild(card)
    })
}

fetch('../data.json')
    .then(res => res.json())
    .then(json => {
        data = json
        renderCards()
    })