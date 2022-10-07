export default class ScorePanel {
    score = 0
    level = 1
    scoreEle: HTMLElement = document.getElementById('score')!
    levelEle: HTMLElement = document.getElementById('level')!

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if (this.score % 2 === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        if (this.level < 10) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }

}