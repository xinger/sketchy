<template>
  <!--  https://codepen.io/uNickHow/pen/WOYBQP -->
  <div class="drawing">
    <svg id="svg" ref="drawing"></svg>
  </div>
</template>

<script>
  import Drawing from '@/classes/Drawing';
  import Mousetrap from 'mousetrap';

  export default {
    name: 'Drawing',
    components: {},
    props: {
      thickness: {
        type: Number,
        default: 3
      },
      dashed: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: 'rgba(0,0,0,1)'
      }
    },
    computed: {},
    methods: {
      undoHandler() {
        this.drawing.undo();
      }
    },
    mounted() {
      this.drawing = new Drawing(this.$refs.drawing, {
        events: {
          start: () => {
            this.$emit('start');
          },
          stop: () => {
            this.$emit('stop');
          }
        }
      });

      Mousetrap.bind('meta+z', this.undoHandler.bind(this));

      this.drawing.thickness(this.thickness);
      this.drawing.color(this.color);
      this.drawing.dashed(this.dashed);
    },
    watch: {
      thickness(val) {
        this.drawing.thickness(val);
        this.drawing.dashed(val);
      },
      color(val) {
        this.drawing.color(val);
      },
      dashed(val) {
        this.drawing.dashed(val);
      }
    }
  }
</script>

<style lang="stylus">
  .drawing
    width 100%
    height 100%

    canvas,
    svg
      display block
      width 100%
      height 100%

</style>
