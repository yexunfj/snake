import Offset from "./Offset"

export default class Snake {
    element: HTMLElement
    head: HTMLElement
    bodies: HTMLCollection
    private _offset: Offset

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
        this._offset = new Offset(this.head.offsetLeft, this.head.offsetTop)
    }

    get offset() {
        return this._offset
    }

    set offset(offset: Offset) {
        if (offset.x < 0 || offset.y < 0 || offset.x > 290 || offset.y > 290) {
            throw new Error('GAME OVER')
        }

        if (this._offset.x === offset.x) {
            if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === offset.y) {
                if (offset.y > this._offset.y) {
                    offset.y = this._offset.y - 10
                } else {
                    offset.y = this._offset.y + 10
                }
            }
        }

        if (this._offset.y === offset.y) {
            if (this.bodies[1] && ((this.bodies[1] as HTMLElement).offsetLeft === offset.x)) {
                if (offset.x > this._offset.x) {
                    offset.x = this._offset.x - 10
                } else {
                    offset.x = this._offset.x + 10
                }
            }
        }

        this.moveBodies()
        this._offset = offset
        this.head.style.left = offset.x + 'px'
        this.head.style.top = offset.y + 'px'
        this.check()
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    moveBodies() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            const x = (this.bodies[i - 1] as HTMLElement).offsetLeft
            const y = (this.bodies[i - 1] as HTMLElement).offsetTop

                ; (this.bodies[i] as HTMLElement).style.left = x + 'px'
                ; (this.bodies[i] as HTMLElement).style.top = y + 'px'
        }
    }

    check() {
        for (let i = 1; i < this.bodies.length; i++) {
            const body = this.bodies[i] as HTMLElement;
            if (this._offset.x === body.offsetLeft && this._offset.y === body.offsetTop) {
                throw new Error('GAME OVER')
            }
        }
    }
}