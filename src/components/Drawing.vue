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
            color: {
                type: String,
                default: 'rgba(0,0,0,1)'
            }
        },
        computed: {

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
        },
        watch: {
            thickness(val) {
                this.drawing.thickness(val);
            },
            color(val) {
                this.drawing.color(val);
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
