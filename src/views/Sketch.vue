<template>
  <div class="sketch">
    <drawing
        :thickness="parseInt(lineThickness)"
        :color="lineColor"
        :dashed="lineDashed"
        @start="startDrawingHandler"
        @stop="stopDrawingHandler"
    />

    <div class="sketch__panel">

      <div class="sketch__control">
        <label>Thickness</label>
        <input type="range" v-model.number="lineThickness" min="3" max="23" step="5">
      </div>

      <div class="sketch__control">
        <label>Opacity</label>
        <input style="direction: rtl" type="range" v-model.number="opacity" min="0" max="100" step="10">
      </div>

      <div class="sketch__control">
        <label>Dashed</label>
        <input type="range" v-model.number="lineDashed" min="0" max="8" step="2">
      </div>

      <div class="sketch__control" style="flex-direction: row">
        <label>Color</label>
        <div class="color"
             v-for="(clr, i) in colors"
             :key="i"
             :style="colorStyles(clr)"
             :class="{'color--active': color === clr}"
             @click="chooseColorHandler(clr)"
        ></div>

      </div>

    </div>

  </div>
</template>

<script>
  import Drawing from '@/components/Drawing';
  import Mousetrap from 'mousetrap';
  import {ipcRenderer} from 'electron';
  import dateFormat from 'dateformat';
  import * as ssvg from 'save-svg-as-png';

  export default {
    name: 'Sketch',
    data: function () {
      return {
        lineThickness: 3,
        lineDashed: 0,
        opacity: 100,
        colors_rgb: [
          [0, 0, 0],
          [242, 95, 92],
          [255, 224, 102],
          [36, 123, 160],
          [12, 193, 179],
          [255, 255, 255],
        ],
        colors: [
          '--color-1',
          '--color-2',
          '--color-3',
          '--color-4',
          '--color-5',
          '--color-6',
        ],
        color: '--color-1',
      };
    },
    components: {
      Drawing,
    },
    props: {},
    computed: {
      lineColor() {
        // return this.toRgb(this.color, this.opacity / 100);
        return `var(${this.color})`;
      },
    },
    methods: {
      chooseColorHandler(color) {
        this.color = color;
      },

      toRgb(color, alpha = null) {
        if (color[3] === undefined) {
          color[3] = 1;
        }

        if (alpha !== null) {
          color[3] = alpha;
        }

        return `rgba(${color.join(',')})`;
      },

      startDrawingHandler() {
        document.body.classList.add('drawing');
      },

      stopDrawingHandler() {
        document.body.classList.remove('drawing');
      },

      saveImageHandler() {
        // const localPath = remote.app.getPath('desktop');
        const date = dateFormat(new Date(), 'dd.mm.yyyy HH.MM.ss');
        const fileName = `Sketch ${date}.png`;

        ssvg.saveSvgAsPng(document.getElementById('svg'), fileName, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
      },

      colorStyles(clr) {
        if (this.color === clr) {
          return {
            background: `var(${clr})`,
            boxShadow: '0px 0px 0px 1px var(--app-bg), 0px 0px 0px 2px ' + `var(${clr})`,
          };
        } else {
          return {
            background: `var(${clr})`,
          };
        }
      },

      newWindowHandler() {
        ipcRenderer.send('open-new-window');
      },
    },
    mounted() {
      Mousetrap.bind('meta+s', this.saveImageHandler.bind(this));
      Mousetrap.bind('meta+n', this.newWindowHandler.bind(this));
    },
  };
</script>

<style lang="stylus">
  .sketch
    width 100%
    height 100%

    &__panel
      position absolute
      display flex
      z-index 10
      /*pointer-events none*/
      user-select none
      opacity 0.25
      transition all 0.3s ease
      width 100%
      height 42px
      bottom 0
      padding 0 12px
      box-sizing border-box
      justify-content: flex-end;
      border-top 1px solid var(--border-default)

      &__container
        display flex
        border-radius 100px
        height 60px
        align-items center
        justify-content right

        input
          width 100px

      &:hover
        opacity 1
        border-top 1px solid var(--border-hover)
        background var(--panel-bg)

    &__control
      pointer-events auto
      display flex
      margin-left 30px
      align-items center

      label
        margin-right 10px
        letter-spacing 0.5px

  .color
    width 16px
    height 16px
    border-radius 100%
    margin-right 5px
    border 1px solid var(--border)
    box-sizing border-box

    &:last-child
      margin-right 0

    &:hover
      opacity 0.75

  input[type="range"]
    -webkit-appearance none
    padding 10px 0
    background transparent
    width 75px

    &:focus
      outline none

    &::-webkit-slider-runnable-track
      height 2px
      background var(--border)

    &::-webkit-slider-thumb
      -webkit-appearance: none;
      width 10px
      height 10px
      background var(--slider-thumb)
      margin-top -4px
      border-radius 100%

</style>
