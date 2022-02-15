<template>
    <div id="myChart" :style="{width:'600px',height:'350px'}" class="udg-line"></div>
</template>

<script>
export default {
    name:"UgdLine",
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var echarts = require('echarts')
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            tooltip: {
        trigger: 'axis'
        },
        legend: {
        data: ['第一段', '第二段','第三段']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '第一段',
            type: 'line',
            data: [577, 588, 595, 594]
          },
        {
            name: '第二段',
            type: 'line',
            data: [480,490,496,495]
        },{
            name:'第三段',
            type:'line',
            data:[359,344,264,279]
        }
        ]
        });
    }
  }
}
</script>

<style>
.udg-line{
  margin-top: 20px;
}
</style>