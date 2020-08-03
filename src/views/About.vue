<template>
  <div id="CustomerAssets">
    <a-card style="width: 100%;border-radius:4px;">
      <h2>行业整体 — 经纪业务客户资产</h2>
      <div class="contentBox">
        <div>
          <span>时间筛选：</span>
          <a-range-picker
            :placeholder="['开始时间','结束时间']"
            format="YYYY-MM"
            :value="value"
            :mode="mode2"
            @panelChange="handlePanelChange2"
            @change="handleChange"
          >
            <a-icon
              slot="suffixIcon"
              type="calendar"
            />
          </a-range-picker>
        </div>
        <div class="unit">单位: 亿元</div>
        <div class="echartsBox">
          <div
            id="chartDiv"
            style="width:100%;height:100%;"
          ></div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment' // 引入moment
var data1 = [{
  value: 2,
  number: 50,
  label: { show: true, color: '#47B9C7' }
},
{ value: 2 },
{ value: 2 },
{ value: 2 },
{ value: 2 },
{
  value: 2,
  number: 500,
  label: { show: true, color: '#FB687A' }
},
{ value: 2 }]

var data2 = [{
  value: 2,
  number: 20,
  label: { show: true, color: '#47B9C7' }
},
{ value: 2 },
{
  value: 2,
  number: 200,
  label: { show: true, color: '#FB687A' }
},
{ value: 2 },
{ value: 2 },
{ value: 2 },
{ value: 2 }]

var data3 = [{
  value: 2,
  number: 100,
  label: { show: true, color: '#47B9C7' }
},
{ value: 2 },
{ value: 2 },
{ value: 2 },
{ value: 2 },
{ value: 2 },
{
  value: 2,
  number: 1000,
  label: { show: true, color: '#FB687A' }
}]
export default {
  name: 'CustomerAssets',
  data () {
    return {
      mode1: 'time', // 日期控件
      mode2: ['month', 'month'],
      value: [],
      isShow: true, // 控制极值显示
      xAxisData: [], // 图表x轴的数据
      data: {
        a: [],
        b: [],
        c: [],
        d: [] // 动态获取极值得数据
      },
      aa: [],
      data1,
      data2,
      data3
    }
  },
  created () {
    // this.businessEntiretyAction() // 调用接口函数
  },
  mounted () {
    this.aa = [this.data1, this.data2, this.data3]
    this.CustomerAssetsEcharts()
  },
  computed: {
    params () { // 行业整体 — 经纪业务客户资产图表接口 参数
      return {
        class: 'industrial',
        type: ['broker_property', 'trusteeship_remain', 'trusteeship_value'],
        start: this.value.length ? this.value[0] : moment().subtract(12, 'months').format('YYYY-MM'),
        end: this.value.length ? this.value[1] : moment().format('YYYY-MM')
      }
    }
  },
  methods: {
    moment,
    handleChange (value) {
      this.value = value
    },
    handlePanelChange2 (value, mode) {
      this.value = value
      this.mode2 = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    },
    // 获取数据中的最大最小值
    getMaxMinData (arr) {
      var min = [arr[0], 0]
      var max = [arr[0], 0]
      arr.forEach((item, index) => {
        if (!(typeof (item) === 'number' || typeof (item) === 'string')) return
        if (item > max[0]) {
          max = [item, index]
        }
        if (item < min[0]) {
          min = [item, index]
        }
      })
      return {
        min,
        max
      }
    },
    CustomerAssetsEcharts () {
      this.chartDiv = this.$echarts.init(document.getElementById('chartDiv'))
      var option = {
        color: ['#02E4FF', '#005DF2', '#FC9700'],
        legend: {
          icon: 'circle',
          bottom: '5%',
          data: [
            '经纪业务客户资产',
            '托管证券市值',
            '托管客户交易结算资金余额'
          ],
          selected: {
            经纪业务客户资产: false,
            托管证券市值: true,
            托管客户交易结算资金余额: true
          }
        },
        tooltip: {
          // 过滤掉统计的series
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var res = params[0].name + '<br/>'
            for (let i = 0; i < params.length - 1; i++) {
              res +=
                params[i].marker +
                params[i].seriesName +
                '：' +
                params[i].value +
                '<br/>'
            }
            return res
          }
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['19/05', '19/06', '19/07', '19/08', '19/09', '19/10', '19/11']
            // data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '经纪业务客户资产',
            type: 'bar',
            barWidth: 35,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: '托管证券市值',
            type: 'bar',
            barWidth: 35,
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
            // data: this.data.b
          },
          {
            name: '托管客户交易结算资金余额',
            type: 'bar',
            barWidth: 35,
            stack: '搜索引擎',
            data: [60, 72, 71, -74, 190, 130, 110]
            // data: this.data.c
          },
          {
            name: '统计',
            type: 'bar',
            stack: '搜索引擎',
            data: this.aa[0],
            label: {
              normal: {
                offset: [0, -20], // 左右，上下
                // show: true,
                position: 'inside',
                formatter: function (params) {
                  if (params.data.number) { // 使用number而不是value，是为了防止图表y轴数据太大
                    return params.data.number
                  }
                },
                fontSize: 14,
                fontWeight: 'bold',
                textStyle: {
                  color: '#199ED8',
                  borderColor: '#DAE3F2',
                  backgroundColor: 'rgba(255,255,255,1)',
                  padding: [6, 8, 3, 8],
                  borderWidth: 1,
                  borderRadius: 4,
                  extraCssText: 'box-shadow:0px 0px 10px 0px rgba(218,227,242,1)'
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(128, 128, 128, 0)'
              }
            }
          }
        ]
      }
      this.chartDiv.setOption(option)
      window.addEventListener('resize', () => {
        this.branchChart.resize()
      })
      this.chartDiv.on('legendselectchanged', params => {
        const isBoolear = params.selected['经纪业务客户资产']
        var tmp = this.chartDiv.getOption() // 获取所有当前属性和数据
        if (isBoolear && params.name === '经纪业务客户资产') { // 控制图例的显示状态
          tmp.legend[0].selected['托管证券市值'] = false
          tmp.legend[0].selected['托管客户交易结算资金余额'] = false
        } else {
          tmp.legend[0].selected['经纪业务客户资产'] = false
        }
        this.chartDiv.clear() // 清空所有属性和数据
        const selectorArr = Object.values(tmp.legend[0].selected)
        var index = selectorArr.indexOf(true) // 获取选中图例的下标
        let arr = []
        arr = selectorArr.filter((item, index) => { // 过滤掉未被选中的图例
          return item
        })
        if (arr.length === 1) { // 动态的显示极值
          tmp.series[3].data = this.aa[index]
        } else if (arr.length === 2) {
          tmp.series[3].data = this.aa[0]
        } else {
          tmp.series[3].data = []
        }
        this.chartDiv.setOption(tmp) // 改变后的数据重新绘制
      })
    }
  }
}
</script>

<style scoped>
/deep/ .ant-card-body {
  padding: 0;
}
/deep/ h2 {
  padding: 18px 0 18px 24px;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  border-bottom: 1px solid rgba(235, 235, 235, 1);
}
.contentBox {
  padding: 0 24px;
}
.contentBox > div:first-child {
  padding-top: 30px;
}
.contentBox > .unit {
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  /* padding: 0 24px; */
}
.contentBox > .echartsBox {
  height: 300px;
  position: relative;
}
</style>
