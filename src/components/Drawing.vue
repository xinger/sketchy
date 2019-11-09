<template>
    <div class="drawing">
        <canvas ref="drawing"></canvas>
    </div>
</template>

<script>
    import Drawing from '@/classes/Drawing'

    export default {
        name: 'Drawing',
        components: {},
        props: {
            thickness: {
                type: Number,
                default: 3
            },
            opacity: {
                type: Number,
                default: 1
            }
        },
        computed: {

        },
        mounted() {
            this.drawing = new Drawing(this.$refs.drawing, {
                thickness: this.thickness
            });
        },
        watch: {
            thickness(val) {
                this.drawing.thickness(val);
            },
            opacity(val) {
                this.drawing.opacity(val / 100);
            }
        }
    }
</script>

<style lang="stylus">
    .drawing
        width 100%
        height 100%

        canvas
            display block
            width 100%
            height 100%

</style>
