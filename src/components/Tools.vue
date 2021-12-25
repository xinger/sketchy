<template>
  <div class="tools">
    <div class="tools__thicks">
      <div
        v-for="(t, i) in thicks"
        :key="i"
        class="tools__thick"
        :class="{'active': lineThickness === t}"
        @click="chooseThicknessHandler(t)"
      />
    </div>

    <div class="tools__dashed">
      <div
        class="tools__dash"
        :class="{'active': lineDashed}"
        @click="chooseDashedHandler"
      />
    </div>

    <div class="tools__colors">
      <div
        v-for="(clr, i) in colors"
        :key="i"
        class="tools__color"
        :style="colorStyles(clr)"
        :class="{'active': color === clr}"
        @click="chooseColorHandler(clr)"
      />
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },

  data () {
    return {
      colors: [
        '--color-1',
        '--color-2',
        '--color-3',
        '--color-4',
        '--color-5'
      ],
      color: '--color-1',

      thicks: [3, 6, 12],
      lineThickness: 6,

      lineDashed: true
    }
  },

  computed: {
    lineColor () {
      var style = getComputedStyle(document.body)

      return style.getPropertyValue(this.color)
    }
  },

  mounted () {
    this.chooseColorHandler(this.color)
    this.chooseDashedHandler()
    this.chooseThicknessHandler(this.lineThickness)
  },

  methods: {
    chooseColorHandler (color) {
      this.color = color

      this.$emit('color', this.lineColor)
    },

    chooseDashedHandler () {
      this.lineDashed = !this.lineDashed

      this.$emit('dashed', this.lineDashed)
    },

    chooseThicknessHandler (thickness) {
      this.lineThickness = thickness

      this.$emit('thickness', this.lineThickness)
    },

    colorStyles (clr) {
      return {
        background: `var(${clr})`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tools
    display flex
    box-shadow 0px 0px 0px 1px rgba(0,0,0,0.04), 0px 4px 8px 0px rgba(0,0,0,0.1)
    padding 0 24px
    // width 300px
    height 44px
    border-radius 12px
    pointer-events auto
    align-items center
    justify-content center
    gap 24px
    background: var(--body-bg)

    &__colors
      display flex
      gap 8px

    &__color
      border-radius 100%
      width 18px
      height 18px

      &:hover
        box-shadow: 0px 0px 0px 4px var(--hover)

      &.active
        display: flex
        align-items: center
        justify-content: center

        &:after
          content ''
          width 8px
          height 8px
          background var(--active-color)
          border-radius 100%
          mix-blend-mode: screen

    &__dashed
      display flex
      gap 8px

    &__dash
      border-radius 100%
      width 18px
      height 18px
      background-image var(--dashed-bg)

      &:hover
        background-color: var(--hover)

      &.active
        display: flex
        align-items: center
        justify-content: center

        &:after
          content ''
          width 8px
          height 8px
          background var(--active-color)
          border-radius 100%

    &__thicks
      display flex
      gap 8px
      align-items center

    &__thick
      display: flex
      align-items: center
      justify-content: center
      width 18px
      height 18px
      border-radius 100%

      &:hover
        background: var(--hover)

      &.active:after
        background: var(--active-color)

      &:after
        content ''
        border-radius 100%
        background: var(--body-color)

      &:nth-child(1):after
        width: 4px
        height: 4px

      &:nth-child(2):after
        width: 6px
        height: 6px

      &:nth-child(3):after
        width: 12px
        height: 12px
</style>
