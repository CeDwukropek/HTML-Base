

class Slider {
    constructor(el, itemsAmount = 4) {
        this.slider = el;
        this.wrapper = el.querySelector('.wrapper')
        this.dots = [...el.querySelectorAll('.dot')]
        this.numberOfItems = [...el.querySelectorAll('.item')].length
        this.itemWidth = el.querySelector('.item').offsetWidth
        this.itemsAmount = itemsAmount
        this.clickedDotIndex = 0
        
        this.setGap()
        this.resize()

        window.addEventListener("resize", () => this.resize())
    }

    // TODO: infinite carusel
    // TODO: auto-play

    setGap() {
        // taking bdy font size in px
        const bodyFontSize = window.getComputedStyle(this.slider, null).getPropertyValue('font-size').replace(/[^0-9]/g, '')
        // taking wrapper font size from REM value and calculate it to pixels
        this.gap = Number(getComputedStyle(document.documentElement).getPropertyValue('--wrapper-gap').replace(/[^0-9]/g, '')) * bodyFontSize
    }

    handleDotsClicking() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", e => {
                this.setActiveDot(e.target)
                this.scrollToDot(e.target)
            })
        })
    }

    scrollToDot(dot) {
        let offset = (this.itemWidth + this.gap) * this.dots.indexOf(dot) * this.itemsToScroll
        this.wrapper.scrollLeft = offset
    }

    setActiveDot(clickedDot = this.dots[this.dots.length - 1]) {
        this.dots.forEach(dot => {
            dot.classList.remove('active')
        })
        clickedDot.classList.add('active')
        this.clickedDotIndex = this.dots.indexOf(clickedDot)
    }

    calcDotsNumber() {
        // when we calculate dots we need to omit items on first slide,
        // because they'll be taken as additional slide
        // e.g. itemsAmount = 2
        // ([][])[][]
        // e.g. itemsAmount = 3
        // ([][][])[]
        // we want to ignore first two items, so we substract them from items on screen
        let items = (this.calcNumberOfItems() - this.itemsToScroll)
        // and return how many slides we need to take care of
        // TODO: round returned number
        return Number(((this.numberOfItems - items) / this.itemsToScroll).toFixed(1))
    }

    // calculating how many items can fit in wrapper
    calcNumberOfItems() {
        return Math.floor(this.wrapper.offsetWidth / this.itemWidth)
    }
    
    createDots(number) {
        const nav = this.slider.querySelector('.nav')
        
        //TODO: instead of removing and creating all dots, create missing ones or remove additional

        // delete all dots
        nav.querySelectorAll('.dot').forEach(dot => {
            nav.removeChild(dot)
        })

        // and create new ones
        for (let i = 0; i < number; i++) {
            const div = document.createElement("div")
            div.classList.add('dot')
            nav.appendChild(div)
        }
        
        this.dots = [...nav.querySelectorAll('.dot')]
        // check if last clicked dots index is out of range
        this.clickedDotIndex = this.clickedDotIndex >= this.dots.length ? this.dots.length - 1 : this.clickedDotIndex
        this.dots[this.clickedDotIndex].classList.add('active')

        this.handleDotsClicking()
    }

    // update all necessary variables
    resize() {
        if(window.innerWidth > 1200) {
            this.itemsToScroll = this.itemsAmount
        } else if(window.innerWidth > 850 && window.innerWidth <= 1200) {
            this.itemsToScroll = this.itemsAmount - 1 <= 0 ? 1 : this.itemsAmount - 1
        } else if(window.innerWidth > 550 && window.innerWidth <= 850){
            this.itemsToScroll = this.itemsAmount - 2 <= 0 ? 1 : this.itemsAmount - 2
        } else {
            this.itemsToScroll = this.itemsAmount - 3 <= 0 ? 1 : this.itemsAmount - 3
        }

        this.itemWidth = this.slider.querySelector('.item').offsetWidth
        this.wrapper = this.slider.querySelector('.wrapper')
        this.numberOfItems = [...this.slider.querySelectorAll('.item')].length
        
        this.createDots(this.calcDotsNumber())
        this.scrollToDot(this.dots[this.clickedDotIndex])
    }
}

const slider = new Slider(document.querySelector('.slider'), 4)

