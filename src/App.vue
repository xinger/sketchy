<template>
    <div id="app">
        <div class="drag"></div>
        <router-view/>
    </div>
</template>

<style lang="stylus">
    *
        margin 0
        padding 0

    #app
        width 100%
        height 100vh

    body
        font-family Arial
        font-size 12px

    .drag
        position absolute
        width 100%
        height 22px
        -webkit-app-region drag
        border-bottom 1px solid rgba(0,0,0,0)
        transition all 0.3s ease

        &:hover
            border-bottom 1px solid rgba(0,0,0,0.1)

    .drawing
        .sketch__panel,
        .sketch__panel *,
        .drag
            pointer-events none !important


</style>
