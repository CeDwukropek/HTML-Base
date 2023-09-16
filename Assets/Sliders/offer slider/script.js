
class Slider {
    constructor(el) {
        this.slider = el;
        this.wrapper = el.querySelector('.wrapper')
        this.dots = [...el.querySelectorAll('.dot')]
        this.numberOfItems = [...el.querySelectorAll('.item')].length
        this.itemWidth = el.querySelector('.item').offsetWidth
        this.fontSize = window.getComputedStyle(el, null).getPropertyValue('font-size').replace(/[^0-9]/g, '')
        this.gap = Number(getComputedStyle(document.documentElement).getPropertyValue('--wrapper-gap').replace(/[^0-9]/g, '')) * this.fontSize
        this.wrapperRealWidth = this.itemWidth * this.numberOfItems + this.gap * (this.numberOfItems - 1)
        this.deviceMultiplier = 1;
        this.clickedDotIndex = 0
        
        this.resize()
        this.handleClicking()

        window.addEventListener("resize", () => this.resize())
    }

    handleClicking() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", e => {
                this.handleActiveDot(e.target)
                this.scrollToDot(e.target)
            })
        })
    }

    // scrolling based on amount of dots, eg. 2nd dot => 50% scroll
    scrollToDot(dot) {
        let offset = (this.itemWidth + this.gap) * this.dots.indexOf(dot) * this.deviceMultiplier
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
        return ((this.numberOfItems * (this.itemWidth + this.gap) - 2 * this.gap) / this.wrapper.offsetWidth).toFixed(1)
    }

    resize() {
        if(document.body.clientWidth >= 1920) {
            this.deviceMultiplier = 4
        } else if(document.body.clientWidth > 1200 && document.body.clientWidth < 1920) {
            this.deviceMultiplier = 3
        } else if(document.body.clientWidth > 550 && document.body.clientWidth < 1200) {
            this.deviceMultiplier = 2
        } else{
            this.deviceMultiplier = 1
        }

        this.itemWidth = this.slider.querySelector('.item').offsetWidth
        this.wrapper = this.slider.querySelector('.wrapper')
        this.numberOfItems = [...this.slider.querySelectorAll('.item')].length

        this.createDots(this.calcDotsNumber())
        this.scrollToDot(this.dots[this.clickedDotIndex])
        this.handleClicking()
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
    }
}

const slider = new Slider(document.querySelector('.slider'))
