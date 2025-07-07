class TrackerCard extends HTMLElement {
    constructor() {
        super()

        const template = document.getElementById('template')
        const content = template.content.cloneNode(true)

        this.appendChild(content)

        const cardBg = this.querySelector('.card-bg')
        const card = this.querySelector('.card')
        const title = this.querySelector('.title')
        const time = this.querySelector('.time')
        const previousTime = this.querySelector('.previous-time')
    }
    setData(data, timeframe) {
            this.querySelector('.title').textContent = data.title
            this.querySelector('.time').textContent = `${data.timeframes[timeframe].current}hrs`
            this.querySelector('.previous-time').textContent = `Last week - ${data.timeframes[timeframe].previous}hrs`
        }
    setStyles(data) {
        switch (data.title) {
            case 'Play':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--play-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage = `url(../images/icon-play.svg)`
                break
            case 'Work':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--work-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage = `url(../images/icon-work.svg)`
                break
            case 'Study':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--study-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage  = `url(../images/icon-study.svg)`
                break
            case 'Exercise':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--exercise-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage  = `url(../images/icon-exercise.svg)`
                break
            case 'Social':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--social-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage  = `url(../images/icon-social.svg)`
                break
            case 'Self Care':
                this.querySelector('.card-bg').style.backgroundColor = 'var(--care-bg-color)'
                this.querySelector('.card-bg').style.backgroundImage  = `url(../images/icon-self-care.svg)`
                break
        }
        
    }
}

customElements.define('tracker-card' , TrackerCard)

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const card = new TrackerCard()
            card.setData(item, 'monthly')
            card.setStyles(item)
            document.querySelector('.card-container').appendChild(card)
        })
    })