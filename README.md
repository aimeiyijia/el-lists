# el-table-ts

el-table-plus的ts重写版，并做了一些适用性改动、及优化

> 兼容element table的全属性/事件，同时支持slot/jsx/h函数三种方式自定义渲染列数据，集成了el-pagination组件以及扩展api。

1. 传递data和column两个必须属性即可渲染出表格
2. 兼容element table的属性及事件
3. 支持slot自定义渲染表头，列数据
5. 增加el-table scroll事件
6. 可在非TS环境下正常使用，但需自行构建jsx环境([参考babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx))

## 安装和引入

安装

```js
npm install el-table-ts
```

引入

该组件强依赖于element-ui的el-table组件

``` js
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import ElTableTs from 'el-table-ts'

Vue.use(ElementUI);
Vue.use(ElTableTs)
```

## 基本用法

 `data` 和 `columns` 两个属性

 data定义表格数据([参考element  table-attributes部分](https://element.eleme.io/#/zh-CN/component/table#table-attributes))，columns定义列属性([参考element  table-column-attributes部分](https://element.eleme.io/#/zh-CN/component/table#table-column-attributes))

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage' },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  }
};
</script>
```

:::

## 属性事件全继承elementui

集成el-table 和el-table-column所有属性和事件。表格属性绑定在组件，列属性绑定在columns属性值中

更多可看[element官方属性和事件列表](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
      @row-click="rowClickHandle"
      @sort-change="sortChangeHandle"
      stripe
      border
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px', fixed: 'left' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage' },
        { label: '邮箱', prop: 'member.email', 'show-overflow-tooltip': true },
        { label: '创建时间', prop: 'gmtCreate', align: 'right' }
      ]
    };
  },
  methods: {
    rowClickHandle(row, column, event) {
      console.log(row, column, event)
    },
    sortChangeHandle(o) {
      console.log(o)
    },
  }
};
</script>
```

:::

## 格式化列

element-ui字段列中有 [formatter](https://element.eleme.cn/#/zh-CN/component/table) - Function({cellValue, row, column, $index}) 属性支持格式化，这里el-table-ts兼容该写法。

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage', formatter: ({ cellValue }) => `${cellValue}G` },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  }
};
</script>
```

:::

## 自定义列模板

支持jsx/slot/h函数三种方式的自定义渲染。

熟悉slot语法，可以在`scopedSlots.customRender`中设置slot名称，然后在template模板中书写slot

熟悉jsx语法，可直接在列定义中设置`customRender`函数中返回JSX（注意此时需要babel支持，vue-cli3自带），或者直接书写h函数创建最终VNode。

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
    >
      <template #handle="{cellValue, row, column, $index, h}">
        <el-button size="small" type="primary" @click="detailHandle(row)">查看详情</el-button>
        <el-button size="small" type="danger" @lick="this.delHandle(row)">删除</el-button>
      </template>
    </el-table-ts>
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage', 
         // 可以这样
         customRender: ({ cellValue, row, column }) => {
            return (
              <div>
                {row.name}、{row.storage}
              </div>
            )
          },
          customTitle: ({ $index }) => {
            return $index + 1
          } 
  		},
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' },
        { label: '操作', fixed: 'right',  prop: 'handle', minWidth: '120px',
         // 也可以这样
          scopedSlots: { customRender: 'handle' },
          // 同时customRender/customTitle支持JSX，返回VNode
          // customRender: ({cellValue, row, column, $index, h}) => {
          //   return (<div>
          //     <el-button size="small" type="primary" onClick={() => this.detailHandle(row)}>查看详情</el-button>
          //     <el-button size="small" type="danger" onClick={() => this.delHandle(row)}>删除</el-button>
          //   </div>)
          // }
        }
      ]
    };
  },
  methods: {
    detailHandle({ name }) {
      this.$message.success(`${name} 详情`);
    },
    delHandle({ name }) {
      this.$message.error(`删除 ${name}`);
    }
  }
};
</script>
```

:::

## 远程排序

使用`sortable: 'custom'`,搭配`sort-change`事件，进行远程排序。

使用`default-sort`设置默认排序方向。

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
      @sort-change="sortChangeHandle"
      :default-sort = "{prop: 'storage', order: 'ascending'}"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage', sortable: 'custom', 'sort-orders': ['ascending', 'descending'] },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  },
  methods: {
    sortChangeHandle(o) {
      console.log(o)
    },
  }
};
</script>
```

:::

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: '', type: 'expand', customRender: (val, row, column,index, h) => h('div', `${row.name}、${row.storage}`) },
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage' },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  }
};
</script>
```

:::

## 自定义表头

跟element一致，支持自定义列的内容以及自定义表头的内容，分别对应`customRender`和`customTitle`。参数顺序和element一致，分别是 { row, column, $index }和 { column, $index }

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
    >
      <template #handle="{cellValue, row, column, $index, h}">
        <el-button size="small" type="primary" @click="detailHandle(row)">查看详情</el-button>
        <el-button size="small" type="danger" @lick="this.delHandle(row)">删除</el-button>
      </template>
      <template #handleTitle="{ column, $index }">
        <el-input size="mini" placeholder="输入关键字搜索"/>
      </template>
    </el-table-ts>
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage', fn: val => `${val}G` },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' },
        { label: '操作', fixed: 'right',  prop: 'handle', minWidth: '120px',
          scopedSlots: { customRender: 'handle', customTitle: 'handleTitle' },
        }
      ]
    };
  },
  methods: {
    detailHandle({ name }) {
      this.$message.success(`${name} 详情`);
    },
    delHandle({ name }) {
      this.$message.error(`删除 ${name}`);
    }
  }
};
</script>
```

:::

## scroll事件

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
      height="250"
      @scroll="scrollHandle"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: Array(5).fill(listData).reduce((arr, current) => [...arr, ...current], []),
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage' },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  },
  methods: {
    scrollHandle(e) {
      console.log(e)
    }
  }
};
</script>
```

:::

## 集成pagination

默认不展示

分页器，参考 [el-pagination文档](https://element.eleme.cn/#/zh-CN/component/pagination#attributes)，在不设置或者pagination对象为空时均不展示该组件，默认pagination为`{}`, pagination对象中的默认值有`pageSize = 10` `currentPage = 1`

> 在原ElTable组件中prev-click，next-click事件均会触发current-change事件，这可能会让你无法得知页数的变化是来自页码点击还是上一页或下一页，ElTableTs组件中也未进行区分，可自行根据页数的大小变化判断

:::demo

``` vue
<template>
    <el-table-ts
      :data="list"
      :columns="columns"
      :pagination="{layout:'prev, pager, next', background: true}"
      :total="100"
      @page-change="pageChangeHandle"
    />
</template>

<script>
const  listData = JSON.parse(
        `{"code":200,"message":"success","data":[{"id":50745,"name":"rtBNhgqCDR","storage":8620,"member":{"id":50961,"userId":"51262","email":"Nu87YypnB@AK22e.rgu","projectRole":"Qa4ohl6qhT"},"mount":[{"mountType":"M8Rhh2Ntp6","mountName":"bFTDHyixr3","mountPath":"uwDTMtnbCW","userName":"nYIE5YoQve"},{"mountType":"8pUyKzNPjL","mountName":"TVaV7bjr1y","mountPath":"HoazVStmm5","userName":"nbGzaRjLjK"},{"mountType":"nD3hnojrY0","mountName":"vtJvtG05Jw","mountPath":"p5VWi1ptsi","userName":"8ERyVxGL3R"}],"gmtCreate":34327},{"id":51414,"name":"1A6ogTNZl1","storage":36580,"member":{"id":51767,"userId":"52603","email":"606UKO@AgasP.qmt","projectRole":"q8KkeQyD8f"},"mount":[{"mountType":"VG3JPYd4n5","mountName":"ijPznKZnUQ","mountPath":"SiQIq2ypee","userName":"rAhVP1UTUQ"},{"mountType":"B900pSNnAf","mountName":"MGFUwpuZq2","mountPath":"RQJOgsV806","userName":"acfdNaETLA"},{"mountType":"L81aEPhXWJ","mountName":"7hWszN6MpP","mountPath":"e99n7mLoHe","userName":"t2d5oVwRqV"}],"gmtCreate":78533},{"id":52659,"name":"srO0gfnHho","storage":46240,"member":{"id":52998,"userId":"53927","email":"M37YXor@949Y0.acq","projectRole":"2ikIgsSabL"},"mount":[{"mountType":"YjxjSNSyOv","mountName":"lRsFRwSWgc","mountPath":"Z1rMIGu0cR","userName":"CoUSbae92N"},{"mountType":"N716xNCa4q","mountName":"uxYPo7TGcG","mountPath":"pXyJpuZ1CX","userName":"oiubmGJ4dQ"},{"mountType":"r3PqYBkT9y","mountName":"Pp6B1yZXhi","mountPath":"SjbANI8SmS","userName":"9h8k3elmdM"}],"gmtCreate":98416}]}`
      ).data
export default {
  data() {
    return {
      list: listData,
      columns: [
        { label: 'ID', prop: 'id', width: '80px' },
        { label: '存储卷名', prop: 'name' },
        { label: '总容量', prop: 'storage' },
        { label: '邮箱', prop: 'member.email' },
        { label: '创建时间', prop: 'gmtCreate' }
      ]
    };
  },
  methods: {
    pageChangeHandle({ pageSize, currentPage }) {
      console.log(pageSize, currentPage)
    }
  }
};
</script>
<style>
.el-pagination {
  margin-top: 10px;
  margin-left: -10px;
}
</style>
```

:::

## API

### el-table-ts 属性

支持el-table上所有[原有属性](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)，同时扩展以下api。

| 参数       | 类型    | 默认值 | 说明                                                         |
| ---------- | ------- | ------ | ------------------------------------------------------------ |
| loading    | Boolean | false  | 动效loading                                                  |
| data       | Array   | []     | 列表数据                                                     |
| columns    | Array   | []     | column item配置列表，详细见[如下columns Attrs](#columns-属性) |
| pagination | Object  | {}     | 翻页器配置，默认未设置，不显示翻页器。相关api可查看[el-pagination](https://element.eleme.cn/#/zh-CN/component/pagination#attributes) |
| total      | Number  | 0      | 翻页器条数总数                                               |

### el-table-ts 事件

支持el-table上所有[原有事件](https://element.eleme.cn/#/zh-CN/component/table#table-events)，同时扩展以下api。

| 事件名称    | 说明            | 说明                      |
| ----------- | --------------- | ------------------------- |
| scroll      | table滚动条事件 | e                         |
| page-change | 页码改变事件    | { pageSize, currentPage } |
| size-change | 页数改变事件    | { pageSize, currentPage } |

### columns 属性

支持el-table-column所有[原有属性](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)、[Scoped Slot](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot),同时扩展以下api：

| Attr         | Type     | Default | Description                                                  |
| ------------ | -------- | ------- | ------------------------------------------------------------ |
| label        | String   |         | 列名称                                                       |
| prop         | String   |         | 列数据字段，支持多层对象嵌套，如user.email.prefix            |
| hidden       | Boolean  |         | 是否隐藏该列。建议是一个computed，使得可以响应式显示隐藏     |
| customRender | Function |         | 自定义列数据渲染。函数参数(value, row, column, $index, h)，**支持jsx和h函数** |
| customTitle  | Function |         | 自定义列头部渲染。函数参数(column, $index, h)，**支持jsx和h函数** |
| scopedSlots  | Object   |         | **使用slot方式自定义渲染**，替换customRender/customTitle函数。比如：{ customRender: 'slotName1', customTitle: 'slotName2' } |