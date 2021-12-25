<template>
  <div class="sketch-layout">
    <div class="sketch-canvas">
      <canvas
        ref="canvas"
        resize="true"
        @mousedown="mouseDownHandler"
        @mousemove="mouseMoveHandler"
        @mouseup="mouseUpHandler"
        @mousewheel="mouseWheelHandler"
      />
    </div>

    <div class="sketch-tools">
      <tools
        @color="colorChanged"
        @dashed="dashedChanged"
        @thickness="thicknessChanged"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars, no-new */
import paper from 'paper'
import { getStroke, getStrokePoints } from 'perfect-freehand'
import Mousetrap from 'mousetrap'

import Tools from '../components/Tools'

const emptyState = '["Layer",{"applyMatrix": true,"children":[]}]'

export default {
  components: {
    Tools
  },

  data () {
    return {
      scrope: null,
      paths: [],
      viewBounds: {},
      currentPath: null,

      color: null,
      thickness: null,

      undoStack: [emptyState],
      undoIndex: 1
    }
  },

  mounted () {
    this.scope = new paper.PaperScope()
    this.scope.setup(this.$refs.canvas)

    Mousetrap.bind('command+z', () => {
      this.undo()
    })

    Mousetrap.bind('command+shift+z', () => {
      this.redo()
    })

    Mousetrap.bind('command+r', () => {
      this.clearCanvas()
    })

    this.updateViewBounds()

    window.scope = this.scope
  },

  methods: {
    draw (clear = true) {
      if (clear) {
        this.clearLastPath()
      }

      const pathObj = this.paths[0]

      if (this.dashed) {
        const stroke = getStrokePoints(pathObj.points)

        new paper.Path({
          segments: stroke,
          strokeColor: pathObj.color,
          dashArray: [2 * this.thickness, 3 * this.thickness],
          strokeWidth: this.thickness * 0.5,
          strokeCap: 'round'
        })
      } else {
        const stroke = getStroke(pathObj.points, {
          size: this.thickness,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5
        })

        const path = new paper.Path(this.getSvgPathFromStroke(stroke))

        path.fillColor = pathObj.color
      }
    },

    /**
     * Utils
     */
    clearCanvas () {
      this.scope.project.activeLayer.removeChildren()
      this.undoStack = [emptyState]
      this.undoIndex = 1
    },

    clearLastPath () {
      const l = this.scope.project.activeLayer.children.length

      if (l) {
        this.scope.project.activeLayer.children[l - 1].remove()
      }
    },

    addPointToLastPath (x, y) {
      this.paths[0].points.push([x + this.viewBounds.x, y + this.viewBounds.y])
    },

    updateViewBounds () {
      this.viewBounds = this.scope.view.getBounds()
    },

    getSvgPathFromStroke (stroke) {
      if (!stroke.length) return ''

      const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
          const [x1, y1] = arr[(i + 1) % arr.length]
          acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
          return acc
        },
        ['M', ...stroke[0], 'Q']
      )

      d.push('Z')
      return d.join(' ')
    },

    undo () {
      const l = this.undoStack.length

      if (l > 1) {
        if (this.undoIndex < l) {
          this.undoIndex++
          this.scope.project._activeLayer.importJSON(this.undoStack[l - this.undoIndex])
        }
      }
    },

    redo () {
      const l = this.undoStack.length

      if (this.undoIndex > 1) {
        this.undoIndex--
        this.scope.project._activeLayer.importJSON(this.undoStack[l - this.undoIndex])
      }
    },

    saveState () {
      if (this.undoIndex > 1) {
        this.undoStack = this.undoStack.slice(0, this.undoStack.length - this.undoIndex + 1)
        this.undoIndex = 1
      }

      this.undoStack.push(this.scope.project._activeLayer.exportJSON())
    },

    /**
     * Event handlers
     */
    mouseDownHandler (event) {
      // if (this.redoStack.length > 0) {
      //   this.saveState()
      // }

      this.paths.unshift({
        points: [],
        color: this.color,
        thickness: this.thickness,
        dashed: this.dashed
      })

      this.addPointToLastPath(event.pageX, event.pageY)

      this.draw(false)
    },

    mouseMoveHandler (event) {
      if (event.buttons !== 1) return

      this.addPointToLastPath(event.pageX, event.pageY)

      this.draw()
    },

    mouseUpHandler () {
      this.saveState()
    },

    mouseWheelHandler (event) {
      if (event.buttons === 1) return

      event.preventDefault()

      if (event.ctrlKey || event.metaKey) {
        const i = Math.exp(-event.deltaY / 100)

        // this.scope.view.zoom *= i
        console.log('zoom not implemented', i)
      } else {
        this.scope.view.scrollBy(new this.scope.Point(event.deltaX, event.deltaY))
        this.viewBounds = this.scope.view.getBounds()
      }
    },

    colorChanged (color) {
      this.color = color
    },

    dashedChanged (state) {
      this.dashed = state
    },

    thicknessChanged (thickness) {
      this.thickness = thickness
    }
  }
}
</script>

<style lang="stylus" scoped>
.sketch-canvas
  height 100vh

  canvas
    display block
    width 100%
    height 100%

.sketch-tools
  position fixed
  width 100%
  bottom 0
  z-index 2
  display flex
  justify-content center
  padding-bottom 12px
  pointer-events none
</style>
