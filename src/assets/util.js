// 定义项目中的公用方法

const getMaxMinData = (arr) => { // 获取数组中最大最小元素的值、及其对应的下标
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
}

export { getMaxMinData }
