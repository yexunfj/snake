import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./SocrePanel";
import Offset from "./Offset";

export class GameController {
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    direction: string = 'ArrowRight'
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
    }

    init() {
        document.addEventListener<'keydown'>('keydown', this.keydownHandler)
        this.run()
    }

    keydownHandler = (event: KeyboardEvent) => {
        this.direction = event.key
    }

    run() {
        let x = this.snake.offset.x
        let y = this.snake.offset.y

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                x -= 10
                break
            case 'ArrowRight':
            case 'Right':
                x += 10
                break
        }

        this.checkEat(x, y)

        const offset = new Offset(x, y)
        try {
            this.snake.offset = offset
        } catch (e: Error | unknown) {
            this.isLive = false
            if (e instanceof Error) {
                alert(e.message)
            } else {
                alert('游戏崩溃了。。。')
            }
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}