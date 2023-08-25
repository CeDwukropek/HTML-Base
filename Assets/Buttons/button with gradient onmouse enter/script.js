const button = document.querySelector('.button')

button.addEventListener("mousemove", e => {
    console.log('e-x enter:>> ', e.clientX);

    const x = e.pageX - button.offsetLeft
    const y = e.pageY - button.offsetTop

    button.style.setProperty('--x', x + 'px')
    button.style.setProperty('--y', y + 'px')
})
