<template>
  <div class="Assets">
    <a-card style="width: 100%;border-radius:4px;">
      <h2>行业整体 — 净资产与财务杠杆</h2>
      <div class="contentBox">
        <div>
          <span>时间筛选：</span>
          <a-range-picker
            :placeholder="['2019-5', '2020-5']"
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
            id="main"
            style="width:100%;height:100%"
          ></div>
          <div class="selectorBox">
            <a-tree-select
              v-model="values"
              style="width: 100%"
              tree-checkable
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="请选择"
              tree-default-expand-all
              :maxTagCount="splitNumber"
              :maxTagPlaceholder="maxTagPlaceholder"
              @focus="dropdownVisibleChange"
              @blur="blur"
            >
              <!-- <a-icon slot="suffixIcon" type="smile" /> -->
              <div
                slot="title"
                slot-scope="{ key, value, color }"
                style="display: flex;align-items: center;"
              >
                <span
                  class="select"
                  :style="{ background: color }"
                ></span>
                {{ value }}
              </div>
            </a-tree-select>
          </div>
        </div>
        <!-- 折叠面板 -->
        <div class="checkBox">
          <a-collapse expandIconPosition="right">
            <template #expandIcon="props">
              <a-icon
                type="up"
                :rotate="props.isActive ? 180 : 0"
              />
            </template>
            <a-collapse-panel
              key="1"
              :bordered="false"
            >
              <template slot="header">
                <a-icon type="dribbble" />
                {{text}}
              </template>
              <a-checkbox-group
                @change="onChange"
                :default-value="['净资产']"
              >
                <a-row>
                  <a-col
                    :span="24"
                    v-for="(item, index) in treeData"
                    :key="index"
                  >
                    <a-checkbox
                      :value="item.value"
                      :disabled="item.disabled"
                    >
                      <a-icon
                        type="dribbble"
                        :style="{color: item.color}"
                      />
                      {{item.value}}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </a-card>
    <a-select
      v-model="value_a"
      mode="multiple"
      style="width: 100%"
      placeholder="select one country"
      option-label-prop="label"
    >
      <a-select-option
        value="china"
        label="China"
      >
        <span
          role="img"
          aria-label="China"
        >
          🇨🇳
        </span>
        China (中国)
      </a-select-option>
      <a-select-option
        value="usa"
      >
        <template slot="label">
          <!-- <span
            role="img"
            aria-label="USA"
          >
            🇺🇸
          </span> -->
          USA (美国)
        </template>

      </a-select-option>
      <a-select-option
        value="japan"
        label="Japan"
      >
        <span
          role="img"
          aria-label="Japan"
        >
          🇯🇵
        </span>
        Japan (日本)
      </a-select-option>
      <a-select-option
        value="korea"
        label="Korea"
      >
        <span
          role="img"
          aria-label="Korea"
        >
          🇰🇷
        </span>
        Korea (韩国)
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { getMaxMinData } from '@/assets/util.js'
var treeData = [
  {
    value: '总资产（不含客户保证金）',
    key: '0',
    color: '#ccc',
    disabled: true
  },
  {
    value: '净资产',
    key: '1',
    color: 'red'
  },
  {
    value: '负债（不含客户保证金）',
    key: '2',
    color: '#ccc'
  },
  {
    value: '客户保证金',
    key: '3',
    color: '#ccc'
  }
]
export default {
  name: 'Assets',
  data () {
    return {
      mode1: 'time',
      mode2: ['month', 'month'],
      value: [],
      values: '净资产',
      treeData,
      valuess: '好的',
      splitNumber: 0,
      selectValue: [],
      text: '净资产',
      items: [],
      aa: '净资产',
      value_a: ['china']
      // activeKey: ['1']
    }
  },
  mounted () {
    this.echartsAction()
    console.log('getMaxMinData===', getMaxMinData([null, 3, 5, 2, 1, 10, null, 30]))
  },
  watch: {
    values (value) {
      // this.selectValue = value
      console.log('selectValue', value)
      this.maxTagPlaceholder()
      // if (value.length > 0) {
      //   value.map(item => {
      //     console.log('item==', item);
      //   });
      // } else {
      //   console.log('执行了', this.treeData);
      //   this.treeData.map(items => {
      //     console.log(items);
      //     if (items.disabled) {
      //       items.disabled = false;
      //     }
      //   });
      // }
    },
    value_a (value) {
      console.log('value', value)
    }
  },
  methods: {
    // 获取数据中的最大最小值
    getMaxMinData (arr) {
      var min = [arr[0], 0]
      var max = [arr[0], 0]
      arr.forEach((item, index) => {
        if (!(typeof (item) === 'number' || typeof (item) === 'string')) return
        console.log()
        if (item > max[0] || !max[0]) {
          max = [item, index]
        }
        if (item < min[0] || !min[0]) {
          min = [item, index]
        }
      })
      return {
        min,
        max
      }
    },
    onChange2 (e) {
      console.log(e)
      console.log(`checked = ${e.target.checked}`)
    },
    // addItem () {
    //   console.log('addItem')
    //   this.items.push(`New item ${index++}`)
    // },
    handleChange2 (value) {
      console.log(value) // { key: "lucy", label: "Lucy (101)" }
      this.aa = value.key
    },
    dropdownVisibleChange (open) {
      console.log('open', open)
    },
    blur () {
      console.log('blur', blur)
    },
    maxTagPlaceholder (omittedValues) {
      // console.log('omittedValues==', omittedValues)
      var length = this.selectValue.length
      // var str = (
      //   <div>
      //     <span class="select" style="background: red"></span>omittedValues
      //   </div>
      // )
      switch (length) {
        case 1:
          this.splitNumber = 1
          break
        case 2:
          this.splitNumber = 0
          // return (
          //   <div>
          //     <span class="select" style="background: red"></span>净资产
          //   </div>
          // )
          break
        default:
          // return (
          //   <div>
          //     <span class="select" style="background: red"></span>净资产
          //   </div>
          // )
          break
      }
    },
    onChange (e) {
      console.log(e)
      var color = ['green', 'red', 'blue', 'yellow']
      let arr = []
      arr = this.treeData.map((item, index, input) => {
        var obj = {
          value: item.value,
          key: index,
          color: e.includes(item.value) ? color[index] : '#ccc'
        }
        if (e.includes('总资产（不含客户保证金）')) {
          if (item.value === '净资产' || item.value === '负债（不含客户保证金）') {
            obj.disabled = true
          } else {
            obj.disabled = false
          }
        } else if (e.includes('净资产') || e.includes('负债（不含客户保证金）')) {
          if (item.value === '总资产（不含客户保证金）') {
            obj.disabled = true
          } else {
            obj.disabled = false
          }
        }
        return obj
      })
      this.treeData = arr
      console.log('this.treeData', this.treeData)
      if (e.length === 1) {
        this.text = e[0]
      } else if (e.length > 1) {
        this.text = '总资产'
      } else {
        this.text = ''
      }
    },
    handleChangeff (value) {
      console.log(value)
      console.log(`selected ${value}`)
      this.valuess = value
      console.log('this.valuess==', this.valuess)
    },
    handleOpenChange1 (open) {
      if (open) {
        this.mode1 = 'time'
      }
    },
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
    // echarts
    echartsAction () {
      // 本次示例所使用到的表格插件为Echarts，所使用的功能配置都是参见http://echarts.baidu.com/option.html#title
      this.myChart = this.$echarts.init(document.getElementById('main'))
      var option = {
        color: ['#005DF2', '#02E4FF', '#FC9700'],
        tooltip: {
          // 聚焦触发的效果，详情可参见。全局设置
          trigger: 'axis',
          alwaysShowContent: true,
          axisPointer: {
            type: 'line'
          },
          // backgroundColor: 'rgba(255,255,255,1)',
          extraCssText: 'box-shadow:0px 0px 6px 0px rgba(0,0,0,0.16)',
          formatter: params => {
            // var dom = ''
            var str = ''
            params.forEach((item, index) => {
              // dom += item.marker + item.seriesName + "：" + item.value + "<br>";
              str += `
                  <div style="margin-bottom:10px;">
                  <div style="height:20px;line-height:20px;text-align:right;display: flex;justify-content: flex-end;align-items: center;">
                   <span>${item.seriesName}</span>
                   <div style="position:relative;width:24px;height:12px;margin-left:10px;">
                    <span style="width:24px;height:1px;background:#02E4FF;display:block;display:inline-block;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);"></span>
                    <span style="width:12px;height:12px;border-radius:50%;border:1px solid rgba(2,228,255,1);background:#fff;display:inline-block;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);"></span>
                   </div>
                  </div> 
                  <div style="height:20px;line-height:20px;color:#FB687A;text-align:right;font-weight:600;">+ ${item.value}</div>
                  <div style="height:20px;line-height:20px;color:#FB687A;text-align:right;font-weight:600;">环比：+ ${item.value + '%'}</div>
                  </div>
              `
            })
            return str
          }
        },
        legend: {
          // 图表图例注释
          // right: '10%',
          bottom: '5%',
          data: ['财务杠杆倍数（不含客户保证金）', '财务杠杆倍数']
        },
        xAxis: [
          // x轴属性设置，需要详细了解该模块属性配置，可参见http://echarts.baidu.com/option.html#xAxis
          {
            type: 'category', // 表示类型为科目类
            data: [
              '19/05',
              '19/06',
              '19/07',
              '19/08',
              '19/09',
              '19/10',
              '19/11',
              '19/12',
              '20/01',
              '20/02',
              '20/03',
              '20/04'
            ] // 坐标轴的值
          }
        ],
        yAxis: [
          // （可以有多个坐标轴），数组中的对象位置决定了yAxisIndex的值（yAxisIndex会在series中用到）
          {
            type: 'value', // 表示属性为value类
            // name: '降水', // 坐标轴名称
            minInterval: 1, // 坐标最小划分单位，设置为1表示坐标轴节点保留整数
            splitNumber: 4, // 指定坐标轴节点分割数（非强制），会按照预算自行调整最合适的分割数
            axisLine: {
              // 表示坐标轴是否显示
              show: false
            },
            splitLine: {
              // 表示分割线属性设置
              lineStyle: {
                // 表示分割线的样式
                type: 'dashed' // 虚线
              }
            },
            axisLabel: {
              formatter: '{value}' // 表示所有值得单位
            }
          }
        ],
        series: [
          // 坐标轴实际数据内容
          {
            name: '净资产', // 数据名称
            type: 'bar', // 数据表现形式（bar为柱形图，line为折线图）
            barWidth: '20%', // 柱形图宽度
            itemStyle: {
              // 柱子的属性设置
              normal: {
                color: '#005DF2', // 柱子的颜色设置
                label: {
                  show: false,
                  position: ['120%', '-15%'],
                  align: 'center',
                  formatter (params) {
                    console.log('params==', params)
                    const { seriesId, name } = params
                    return `${name} \n 环比${seriesId}`
                  },
                  textStyle: {
                    fontSize: '20px',
                    borderWidth: '1px',
                    borderRadius: '10px',
                    padding: [5, 8, 2, 8],
                    lineHeight: 20
                  }
                }
              }
            },
            data: [
              {
                value: 2.0,
                label: { show: true, color: '#47B9C7', borderColor: '#47B9C7' }
              },
              { value: 2.2 },
              { value: 3.3 },
              { value: 4.5 },
              { value: 6.3 },
              { value: 10.2 },
              { value: 20.3 },
              {
                value: 2344444444444444444.4,
                label: { show: true, color: '#FB687A', borderColor: '#FB687A' }
              },
              { value: 23.0 },
              { value: 16.5 },
              { value: 12.0 },
              { value: 16.2 }
            ] // 该条数据对应一条记录
          },
          {
            name: '财务杠杆倍数（不含客户保证金）',
            type: 'line',
            yAxisIndex: 0,
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#02E4FF',
                label: {
                  show: false,
                  position: ['120%', '-15%'],
                  textStyle: {
                    fontSize: '20px',
                    borderWidth: '2px',
                    borderRadius: '10px',
                    padding: [5, 8, 2, 8]
                  }
                }
              }
            },
            data: [
              { value: 2.0 },
              { value: 2.2 },
              { value: 3.3 },
              { value: 4.5 },
              {
                value: 1.8,
                label: { show: true, color: '#47B9C7', borderColor: '#47B9C7' }
              },
              { value: 10.2 },
              { value: 20.3 },
              { value: 23.4 },
              {
                value: 23.8,
                label: { show: true, color: '#FB687A', borderColor: '#FB687A' }
              },
              { value: 16.5 },
              { value: 12.0 },
              { value: 16.2 }
            ]
          },
          {
            name: '财务杠杆倍数',
            type: 'line', // 折线图
            yAxisIndex: 0,
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#FC9700', // 柱子的颜色设置
                // color: {
                //   type: 'linear',
                //   x: 0,
                //   y: 0,
                //   colorStops: [
                //     {
                //       // 渐变模式
                //       offset: 0,
                //       color: '#5fabff' // 0% 处的颜色      //折线开始的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: '#5fabff' // 100% 处的颜色    //折线结束的颜色，
                //     }
                //   ],
                //   globalCoord: true // 缺省为 false
                // },
                label: {
                  show: false,
                  position: ['120%', '-15%'],
                  textStyle: {
                    fontSize: '20px',
                    borderWidth: '2px',
                    borderRadius: '10px',
                    zIndex: 100,
                    padding: [5, 8, 2, 8]
                  }
                }
              }
            },
            data: [
              { value: 2.0 },
              { value: 2.2 },
              { value: 3.3 },
              { value: 4.5 },
              {
                value: 0.1,
                label: { show: true, color: '#47B9C7', borderColor: '#47B9C7' }
              },
              { value: 10.2 },
              { value: 20.3 },
              { value: 23.4 },
              { value: 23.0 },
              { value: 16.5 },
              {
                value: 25.0,
                label: { show: true, color: '#FB687A', borderColor: '#FB687A' }
              },
              { value: 16.2 }
            ]
          }
        ],
        grid: {
          // 设置网格属性
          top: '10%',
          left: '5%', // 网格距离容器左侧的距离
          right: '5%', // 网格距离容器右侧的距离
          bottom: '25%',
          borderWidth: 1
        }
      }
      this.myChart.setOption(option)
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0, // 显示第几个series
        dataIndex: 11 // 显示第几个数据
      })
      this.myChart.getZr().on('mouseout', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY]
        if (this.myChart.containPixel('grid', pointInPixel)) {
          const index = this.myChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
          console.log('index==', index)
        } else {
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0, // 显示第几个series
            dataIndex: 11 // 显示第几个数据
          })
        }
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
.contentBox > .echartsBox > .selectorBox {
  min-width: 250px;
  position: absolute;
  bottom: 10px;
  left: 16%;
}
.checkBox {
  width: 260px;
  position: absolute;
  left: 50px;
  top: 428px;
}
.select {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
/deep/ .ant-select-selection--multiple .ant-select-selection__choice {
  border: 0;
  padding: 0 0 0 10px;
}
/deep/ .ant-select-selection__choice__remove {
  display: none;
}
/deep/
  .ant-collapse-icon-position-right
  > .ant-collapse-item
  > .ant-collapse-header {
  padding: 6px 10px;
}
</style>
