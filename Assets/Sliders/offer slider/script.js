
class Slider {
    constructor(el, itemsAmount = 4) {
        this.slider = el;
        this.wrapper = el.querySelector('.wrapper')
        this.dots = [...el.querySelectorAll('.dot')]
        this.numberOfItems = [...el.querySelectorAll('.item')].length
        this.itemWidth = el.querySelector('.item').offsetWidth
        this.fontSize = window.getComputedStyle(el, null).getPropertyValue('font-size').replace(/[^0-9]/g, '')
        this.gap = Number(getComputedStyle(document.documentElement).getPropertyValue('--wrapper-gap').replace(/[^0-9]/g, '')) * this.fontSize
        this.wrapperRealWidth = this.itemWidth * this.numberOfItems + this.gap * (this.numberOfItems - 1)
        this.itemsToSlide = itemsAmount;
        this.itemsAmount = itemsAmount
        this.clickedDotIndex = 0
        
        this.resize()

        window.addEventListener("resize", () => this.resize())
    }

    handleDotClicking() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", e => {
                this.handleActiveDot(e.target)
                this.scrollToDot(e.target)
            })
        })
    }

    scrollToDot(dot) {
        let offset = (this.itemWidth + this.gap) * this.dots.indexOf(dot) * this.itemsToSlide
        this.wrapper.scrollLeft = offset
    }

    handleActiveDot(clickedDot = this.dots[this.dots.length - 1]) {
        this.dots.forEach(dot => {
            dot.classList.remove('active')
        })
        clickedDot.classList.add('active')
        this.clickedDotIndex = this.dots.indexOf(clickedDot)
    }

    calcDotsNumber() {
        // when we calculate dots we need to omit items that we can see on screen
        // so we substract items that should be ignored
        let items = (this.calcNumberOfItems() - this.itemsToSlide)
        // and return how many slides we need to take care of
        return Number(((this.numberOfItems - items) / this.itemsToSlide).toFixed(1))
    }

    // calculating how many items can fit in wrapper
    calcNumberOfItems() {
        return Math.floor(this.wrapper.offsetWidth / this.itemWidth)
    }

    resize() {
        if(window.innerWidth > 1200) {
            this.itemsToSlide = this.itemsAmount
        } else if(window.innerWidth > 850 && window.innerWidth <= 1200) {
            this.itemsToSlide = this.itemsAmount - 1 <= 0 ? 1 : this.itemsAmount - 1
        } else if(window.innerWidth > 550 && window.innerWidth <= 850){
            this.itemsToSlide = this.itemsAmount - 2 <= 0 ? 1 : this.itemsAmount - 2
        } else {
            this.itemsToSlide = this.itemsAmount - 3 <= 0 ? 1 : this.itemsAmount - 3
        }

        this.itemWidth = this.slider.querySelector('.item').offsetWidth
        this.wrapper = this.slider.querySelector('.wrapper')
        this.numberOfItems = [...this.slider.querySelectorAll('.item')].length
        
        this.createDots(this.calcDotsNumber())
        this.scrollToDot(this.dots[this.clickedDotIndex])
    }
    
    createDots(number) {
        const nav = this.slider.querySelector('.nav')
        
        nav.querySelectorAll('.dot').forEach(dot => {
            nav.removeChild(dot)
        })
        
        for (let i = 0; i < number; i++) {
            const div = document.createElement("div")
            div.classList.add('dot')
            nav.appendChild(div)
        }
        
        this.dots = [...nav.querySelectorAll('.dot')]
        this.clickedDotIndex = this.clickedDotIndex >= this.dots.length ? this.dots.length - 1 : this.clickedDotIndex
        this.dots[this.clickedDotIndex].classList.add('active')

        this.handleDotClicking()
    }
}

const slider = new Slider(document.querySelector('.slider'), 4)
