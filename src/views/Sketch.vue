<template>
    <div class="sketch">
        <drawing
            :thickness="parseInt(thickness)"
            :opacity="parseInt(opacity)"
        ></drawing>

        <div class="sketch__panel">

            <div class="sketch__panel__container">

                <div class="sketch__control">
                    <label>Thickness</label>
                    <input type="range" v-model="thickness" min="1" max="20">
                </div>

                <div class="sketch__control">
                    <label>Opacity</label>
                    <input type="range" v-model="opacity" min="1" max="100">
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
                thickness: 3,
                opacity: 100
            }
        },
        components: {
            Drawing
        },
        props: {

        },
        computed: {

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
                width 400px
                height 60px
                opacity 0.5
                align-items center
                justify-content space-around

                input
                    width 100px

        &__control
            display flex
            flex-direction column

</style>
