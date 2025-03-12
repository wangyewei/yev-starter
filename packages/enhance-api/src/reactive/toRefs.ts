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

  for (const [key, value] of Object.entries(props)) {
    result[key as keyof T] = isRef(value) ? value : ref(value !== undefined ? value : defaults[key as keyof T]);
  }

  return result as {
    [K in keyof T]: T[K] extends Ref<any> ? T[K] : Ref<T[K] | undefined>
  }
}
