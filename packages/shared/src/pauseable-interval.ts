export class PauseableInterval {
  private intervalId: NodeJS.Timeout | null = null
  private callback: (() => void) | null = null
  private isPaused: boolean = false

  start(callback: () => void, duration: number = 1000) {
    this.callback = callback
    this.isPaused = false
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.callback!()
      }
    }, duration)
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.isPaused = true
    }
  }

  resume() {
    if (this.isPaused && this.callback) {
      this.isPaused = false
      this.intervalId = setInterval(this.callback, 1000)
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
