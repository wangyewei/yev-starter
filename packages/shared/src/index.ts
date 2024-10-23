export const isFunction = (val: unknown) => typeof val === 'function'
export const inBrowser = typeof document !== 'undefined'

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export * from './css-class'
export * from './pauseable-timeout'
export * from './pauseable-interval'
export * from './random'
