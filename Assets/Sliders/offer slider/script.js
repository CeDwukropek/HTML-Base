

class Slider {
    constructor(el) {
        this.el = el
        this.wrapper = el.querySelector('.wrapper')
        this.itemSize = el.querySelectorAll('.item')[0].offsetWidth
        this.itemsAmount = el.querySelectorAll('.item').length
        this.dots = Array.from(el.querySelector('.nav').querySelectorAll('.dot'))
        this.bodyFontSize = Number(window.getComputedStyle(document.querySelector('body')).fontSize.split('px')[0])
        this.index = 0
        
        this.resize()
    }

    setOffset() {
        this.wrapper.style.setProperty('--offset', -1 * this.index * (this.itemSize + 2 * this.bodyFontSize) + 'px')
    }

    changeSlide() {
        this.dots.forEach(dot => {
            dot.addEventListener("click", e => {
                e.preventDefault()
                this.dots.forEach(element => {
                    element.classList.remove('active-dot')
                });

                dot.classList.add('active-dot')

                this.index = this.dots.indexOf(dot)

                this.setOffset()
            })
        })
    }

    events() {
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    maxSlidesCounter() {
        return Math.floor(this.elSize / (this.itemSize + 2 * this.bodyFontSize))
    }

    resize() {
        this.elSize = (this.el).offsetWidth
        this.maxSlides = this.maxSlidesCounter()
        this.dotsAmount = this.itemsAmount - this.maxSlides + 1

        this.index = this.index >= this.dotsAmount ? this.dotsAmount - 1 : this.index

        console.log('this.index :>> ', this.index);
        console.log('this.dotsAmount :>> ', this.dotsAmount);

        this.createDots(this.dotsAmount)
        this.changeSlide()
        this.setOffset()
        this.events()
    }
    
    createDots(amount) {
        const nav = this.el.querySelector('.nav')

        nav.querySelectorAll('.dot').forEach(dot => {
            nav.removeChild(dot)
        })

        for (let i = 0; i < amount; i++) {
            const a = document.createElement("a")
            a.href = '#'
            a.classList.add('dot')
            nav.appendChild(a)
        }

        this.dots = Array.from(nav.querySelectorAll('.dot'))

        this.dots[this.index].classList.add('active-dot')
        this.dots[this.dots.length - 1].classList.add('last-dot')
    }
}

const slider = new Slider(document.querySelector('.slider'))

