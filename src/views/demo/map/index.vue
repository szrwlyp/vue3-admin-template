<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Map, View } from 'ol'
import { ZoomToExtent, ZoomSlider, FullScreen, MousePosition, ScaleLine } from 'ol/control'
import Feature from 'ol/Feature.js'
import { Geometry, Point } from 'ol/geom'
import { XYZ, Vector as VectorSource, OSM } from 'ol/source'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import { GeoJSON } from 'ol/format'
import 'ol/ol.css'

const mapElement = ref(HTMLElement) as any
let mapInstance = ref()
let currentPosition = ref([108.367, 22.8163])

onMounted(() => {
  mapInstance.value = new Map({
    target: mapElement.value,
    layers: [
      //   new Tile({
      //     source: new OSM()
      //   })
      new Tile({
        // visible: false,
        source: new XYZ({
          //   projection: gcj02Mecator,
          wrapX: false,
          url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
      })
    ],
    view: new View({
      projection: 'EPSG:4326',
      // 坐标
      center: currentPosition.value,
      // 地图最小缩放比例
      //   minZoom: 10,
      // 地图缩放级别（打开页面时默认级别）
      zoom: 14
    })
  })

  //   视图跳转控件
  const ZoomToExtentControl = new ZoomToExtent({ extent: [108.367, 22.8163, 109, 23] })
  mapInstance.value.addControl(ZoomToExtentControl)

  //   放大缩小控件
  const ZoomSliderControl = new ZoomSlider()
  mapInstance.value.addControl(ZoomSliderControl)

  //   全屏控件
  const fullScreenControl = new FullScreen()
  mapInstance.value.addControl(fullScreenControl)

  //   鼠标位置控件
  const mousepositionControl = new MousePosition()
  mapInstance.value.addControl(mousepositionControl)

  //   比例尺控件
  const ScaleLineControl = new ScaleLine()
  mapInstance.value.addControl(ScaleLineControl)

  /**
   * 绘制矢量图形
   * start
   */
  //    1、通过样式信息和几何信息构建点要素
  //   几何
  const point = new Feature({
    geometry: new Point([108.367, 22.8163])
  })

  //   设置点要素样式
  let style = new Style({
    image: new Circle({
      radius: 10, //设置点的半径，单位是degree
      fill: new Fill({
        color: '#ff2d51'
      }),
      stroke: new Stroke({
        width: 2,
        color: '#333'
      })
    })
  })

  point.setStyle(style)

  //   2、将要素添加到矢量数据源
  let source = new VectorSource({
    features: [point]
  })

  //   3、将矢量图数据源添加到矢量图层
  let layer = new VectorLayer({ source })

  //   4、添加矢量图层到地图容器
  mapInstance.value.addLayer(layer)

  //  给地图绑定一个点击事件
  mapInstance.value.on('click', (evt) => {
    console.log(evt)
    let { coordinate } = evt
    console.log(coordinate)
    let point = new Feature({
      geometry: new Point(coordinate)
    })
    source.addFeature(point)

    //   实现飞行视角-漫游
    const view = mapInstance.value.getView()
    view.animate({ center: coordinate })
  })

  /******************************************************************/

  /**
   * geojson设置点要素
   */
  // GeoJSON点数据
  const geojsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [108.367, 22.8163]
        },
        properties: {
          name: 'My Point'
        }
      }
    ]
  }

  //   将数据添加到矢量数据源中
  const geojsonFormat = new GeoJSON()
  let pointSource1 = new VectorSource({
    features: geojsonFormat.readFeatures(geojsonData)
  })
  //   设置矢量图层
  var pointLayer1 = new VectorLayer({ source: pointSource1 })
  const pointStyle1 = new Style({
    image: new Circle({ radius: 10, fill: new Fill({ color: '#ff2d51' }) })
  })
  pointLayer1.setStyle(pointStyle1)
  //   添加矢量图层到地图容器中
  //   mapInstance.value.addLayer(pointLayer1)

  /**
   * geojson设置线要素
   */
  let lineGeoJsonData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [108.367, 22.8163],
            [109, 22.8263]
          ]
        },
        properties: {
          name: 'My Point'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [108.367, 22.8163],
              [108.372, 22.83],
              [108.38, 22.8163]
            ]
          ]
        }
      }
    ]
  }

  let lineSource = new VectorSource({
    features: geojsonFormat.readFeatures(lineGeoJsonData)
  })
  let lineLayer = new VectorLayer({ source: lineSource })
  const lineStyle = new Style({
    stroke: new Stroke({ color: '#ff2d51', width: 3 }),
    fill: new Fill({ color: 'rgba(50,50,50,0.2)' })
  })
  lineLayer.setStyle(lineStyle)
  //   mapInstance.value.addLayer(lineLayer)
})

const reset = () => {
  mapInstance.value.getView().animate({ center: currentPosition.value, zoom: 14 })
}

const canvasRef = ref()
onMounted(() => {
  setInterval(draw, 20)
  //   draw()
})

let radius = 60,
  increase = true
const draw = () => {
  const ctx = canvasRef.value.getContext('2d')
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  //   设置第一个圆
  ctx.beginPath()
  ctx.arc(100, 100, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fillStyle = 'rgba(0,136,255,0.2)'
  ctx.fill()

  //   设置第二个圆
  ctx.beginPath()
  ctx.arc(100, 100, 50, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fillStyle = '#0088ff'
  ctx.fill()

  //   requestAnimationFrame(draw())
  if (radius > 100) {
    increase = false
  } else if (radius < 60) {
    increase = true
  }
  if (increase) {
    radius++
  } else {
    radius--
  }
}
</script>

<template>
  <div ref="mapElement" class="map"></div>
  <div class="reset" @click="reset">复位地图</div>
  <canvas ref="canvasRef" class="aa" width="200" height="200"></canvas>
</template>

<style lang="scss" scoped>
.map {
  width: 100vw;
  height: 100vh;
}

:deep(.ol-zoomslider) {
  top: 6.5em;
}
.reset {
  position: absolute;
  top: 38px;
  right: 10px;
  background: white;
  padding: 2px 6px;
  font-size: 14px;
  cursor: pointer;
}
.aa {
  position: absolute;
  top: 100px;
  left: 100px;
}
</style>
