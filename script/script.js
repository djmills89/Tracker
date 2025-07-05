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
}

customElements.define('tracker-card' , TrackerCard)

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const card = new TrackerCard()
            card.setData(item, 'monthly')
            document.querySelector('.card-container').appendChild(card)
        })
    })