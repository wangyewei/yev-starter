import { ref, isRef, type Ref } from 'vue'

// TODO: added vitest
/**
 * convert props to reactive and support default reactive value
 * @param props - props
 * @param defaults - default value
 * @returns toRefs with default
 */

export function toRefsWithDefault<T extends object>(
  props: T,
  defaults: Partial<T>
): { [K in keyof T]: T[K] extends Ref<any> ? T[K] : Ref<T[K] | undefined> } {
  const result: Partial<Record<keyof T, any>> = {}

  Object.keys(props).forEach((key) => {
    result[key as keyof T] = isRef(props[key as keyof T])
      ? props[key as keyof T]
      : ref(
          props[key as keyof T] !== undefined
            ? props[key as keyof T]
            : defaults[key as keyof T]
        )
  })

  return result as {
    [K in keyof T]: T[K] extends Ref<any> ? T[K] : Ref<T[K] | undefined>
  }
}
