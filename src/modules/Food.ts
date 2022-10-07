export default class Food {
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('food')!
    }

    get x() {
        return this.element.offsetLeft
    }

    get y() {
        return this.element.offsetTop
    }

    change() {
        const left = Math.round(Math.random() * 29) * 10
        const top = Math.round(Math.random() * 29) * 10

        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }

}