import { defineComponent, Fragment, toRefs, ref } from 'vue'

const HelloWorld = defineComponent<{ msg: string }>((props) => {
  const { msg } = toRefs(props)

  const count = ref(0)

  return () => (
    <Fragment>
      <h1>{msg.value}</h1>

      <div class="card">
        <button type="button" onClick={() => count.value++}>
          count is {count.value}
        </button>
        <p>
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
      </div>
      <p>
        Check out
        <a
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
        >
          create-vue
        </a>
        , the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
        >
          Vue Docs Scaling up Guide
        </a>
        .
      </p>
      <p class="text-[#888]">Click on the Vite and Vue logos to learn more</p>
    </Fragment>
  )
})

// @ts-ignore
HelloWorld.props = ['msg']

export default HelloWorld
