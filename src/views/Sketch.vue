<template>
    <div class="sketch">
        <drawing
            :thickness="parseInt(lineThickness)"
            :color="lineColor"
        ></drawing>

        <div class="sketch__panel">

            <div class="sketch__panel__container">

                <div class="sketch__control">
                    <label>Thickness</label>
                    <input type="range" v-model="lineThickness" min="1" max="20">
                </div>

                <div class="sketch__control">
                    <label>Opacity</label>
                    <input type="range" v-model="opacity" min="1" max="100">
                </div>

                <div class="sketch__control" style="flex-direction: row">

                    <div class="color"
                         v-for="clr in colors"
                         :style="{
                            background: toRgb(clr)
                         }"
                         @click="chooseColorHandler(clr)"
                    ></div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import Drawing from '@/components/Drawing'

    export default {
        name: 'Sketch',
        data: function() {
            return {
                lineThickness: 3,
                opacity: 100,
                colors: [
                    [0, 0, 0],
                    [80, 81, 79],
                    [242, 95, 92],
                    [255, 224, 102],
                    [36, 123, 160],
                    [12, 193, 179]
                ],
                color: [0,0,0]
            }
        },
        components: {
            Drawing
        },
        props: {

        },
        computed: {
            lineColor() {
                return this.toRgb(this.color, this.opacity / 100);
            }
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
            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus">
    .sketch
        width 100%
        height 100%

        &__panel
            position absolute
            display flex
            justify-content center
            bottom 20px
            width 100%
            height 60px
            z-index 10
            pointer-events none

            &__container
                pointer-events auto
                display flex
                background #fff
                box-shadow:0 12px 28px 0 rgba(0,0,0,0.2),0 2px 4px 0 rgba(0,0,0,0.1)
                border-radius 100px
                /*width 400px*/
                height 60px
                opacity 0.5
                align-items center
                justify-content space-around

                input
                    width 100px

        &__control
            display flex
            flex-direction column
            margin 0 20px

    .color
        width 16px
        height 16px
        border-radius 100%
        margin-left 4px
        border 2px solid rgba(0,0,0,0.2)
        cursor pointer

        &:hover
            opacity 0.9

    input[type="range"]
        -webkit-appearance none
        padding 10px 0

        &:focus
            outline none

        &::-webkit-slider-runnable-track
            height 2px
            background rgba(0,0,0,0.2)

        &::-webkit-slider-thumb
            -webkit-appearance: none;
            width 10px
            height 10px
            background rgba(0,0,0,1)
            margin-top -4px
            border-radius 100%



</style>
