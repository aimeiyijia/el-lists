<template>
  <div id="app">
    <el-lists
      :layout="layout"
      :data="listData"
      :columns="columns"
    >
      <template #handleTitle>
        <span>自定义title</span>
      </template>
      <!-- 内置插槽。#left #status #title #opera #middle #right -->
      <template #left>
        <span>左</span>
      </template>
      <!-- <template #status="row">
        <span>
          {{ row.status }}
        </span>
      </template>
      <template #title>
        <span>名称</span>
      </template> -->
      <template #right>
        <span>右边</span>
      </template>
      <template #opera="row">
        <span>操作部分</span>
      </template>
    </el-lists>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      listData: [
        {
          name: '测试',
          name1: 111111,
          name2: 2,
          name3: 33333,
          // 内置 状态描述
          status: '转账成功',
          // 内置 css className 或者使用内置
          statusType: 'success',
          // 内置 行名称
          title: '标题一',
          other: 123
        },
        {
          name: '测试1',
          name1: 11,
          name2: '超长的字符字符字符字符字符字符字符字符',
          name3: 33,
          status: '转账失败',
          statusType: 'error',
          title: '标题二'
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: 333,
          status: '等待结果中',
          statusType: 'wait',
          title: '标题三'
        }
      ],
      columns: [
        {
          // 数据项名
          label: '数据名',
          // 数据项对应的数据字段名称
          prop: 'name',
          // 当前数据项的布局
          // col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 8 },
          customRender: () => {
            return <span>自定义的数据</span>
          },
          customTitle: () => {
            return <div>自定义的名称</div>
          }
        },
        {
          label: '数据名0',
          prop: 'name1',
          showTooltip: 'auto',
          // col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 8 },
          scopedSlots: {
            customRender: 'handle',
            customTitle: 'handleTitle'
          }
        },
        {
          label: '数据名2',
          prop: 'name2'
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名3',
          prop: 'name3'
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名4',
          prop: 'name3'
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        }
      ],
      // 整体的布局配置
      layout: {
        row: {
          gutter: 20
        },
        // 优先级低于columns列配置内的col配置项
        col: { xs: 24, sm: 12, md: 6, lg: 6, xl: 8 }
      }
    }
  },
  methods: {}
}
</script>
<style>
#app {
  background-color: #fafbff;
}
</style>
