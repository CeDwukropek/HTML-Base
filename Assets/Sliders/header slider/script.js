

class Slider {
    constructor(el) {
        this.el = el
        this.dots = Array.from(el.querySelectorAll('.h-nav-dot'))

        console.log('this.el :>> ', this.el);
        console.log('this.dots :>> ', this.dots);
    }

    
}

const slider = new Slider(document.querySelector('.header-slider'))