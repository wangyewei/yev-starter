export function supportsGradientText() {
  return (
    CSS.supports('background-clip', 'text') &&
    CSS.supports('-webkit-text-fill-color', 'transparent')
  )
}
