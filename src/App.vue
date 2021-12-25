<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'the-new-css-reset/css/reset.css'

export default {

}
</script>

<style lang="stylus">
#app
  width 100vw
  height 100vh
  background: var(--body-bg)
  color: var(--body-color)

/* Universal colors */
:root
   --active-color: #1363E1

/* Light mode */
@media (prefers-color-scheme: light) {
   :root {
      --body-bg: rgba(255, 255, 255, 1)
      --body-color: rgba(0, 0, 0, 1)
      --color-1: rgba(0, 0, 0, 1)
      --color-2: rgba(242, 95, 92, 1)
      --color-3: rgba(255, 224, 102, 1)
      --color-4: rgba(36, 123, 160, 1)
      --color-5: rgba(12, 193, 179, 1)
      --color-6: rgba(255, 255, 255, 1)
      --hover: rgba(0, 0, 0, 0.1)
      --dashed-bg: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23000000FF' stroke-width='3' stroke-dasharray='1%2c6' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
border-radius: 100px;
   }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
   :root {
      --body-bg: rgba(53, 53, 53, 1)
      --body-color: rgba(255, 255, 255, 1)
      --color-1: rgba(230, 230, 230, 1)
      --color-2: rgba(242, 95, 92, 1)
      --color-3: rgba(255, 224, 102, 1)
      --color-4: rgba(36, 123, 160, 1)
      --color-5: rgba(12, 193, 179, 1)
      --color-6: rgba(0, 0, 0, 1)
      --hover: rgba(255, 255, 255, 0.1)
      --dashed-bg: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='white' stroke-width='3' stroke-dasharray='1%2c6' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
border-radius: 100px;
   }
}
</style>
