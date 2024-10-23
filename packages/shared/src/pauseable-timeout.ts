export class PauseableTimeout {
  private timeoutId: NodeJS.Timeout | null = null
  private remainingTime: number = 0
  private callback: (() => void) | null = null

  start(callback: () => void, duration: number) {
    this.callback = callback
    this.remainingTime = duration
    this.timeoutId = setTimeout(callback, duration)
  }

  pause() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  resume() {
    if (this.callback && this.remainingTime > 0) {
      this.timeoutId = setTimeout(this.callback, this.remainingTime)
    }
  }
}
