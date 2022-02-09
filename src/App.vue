<template>
  <div id="app">
    <el-lists
      :styleConfig="styleConfig"
      :layout="layout"
      :data="listData"
      :columns="columns"
      :pagination="{
        pageSizes: [10, 20, 50, 70],
        pageSize: 10,
        layout: 'prev, pager, next, sizes, jumper, ->, total',
        background: true,
        small: false
      }"
      :total="100"
      @page-change="pageChangeHandle"
    >
      <template #handleTitle>
        <span>自定义title</span>
      </template>
      <template #status="{row}">
        <span>
          {{ row.status }}
        </span>
      </template>
      <template #opera="row">
        <span>操作部分{{ row.status }}</span>
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
          status: 1,
          title: 'ah'
        }
        // {
        //   name: '测试1',
        //   name1: 11,
        //   name2: 22,
        //   name3: 33,
        //   status: 2,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 3,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 4,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 5,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 6,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 7,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 8,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 3,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 9,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 3,
        //   title: 'ah'
        // },
        // {
        //   name: '测试3',
        //   name1: 111,
        //   name2: 222,
        //   name3: 333,
        //   status: 3,
        //   title: 'ah'
        // }
      ],
      columns: [
        {
          // 数据项名
          label: '数据名',
          // 数据项对应的数据字段名称
          prop: 'name',
          // 当前数据项的布局
          col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 },
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
          col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 },
          scopedSlots: {
            customRender: 'handle',
            customTitle: 'handleTitle'
          }
        },
        {
          label: '数据名2',
          prop: 'name2',
          col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名3',
          prop: 'name3',
          col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名4',
          prop: 'name3',
          col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        }
      ],
      // 整体的布局配置
      layout: {
        row: {},
        col: {},
        opera: {}
      },
      // 样式配置
      styleConfig: {
        // 操作栏宽度
        operaWidth: 100
      }
    }
  },
  methods: {
    detailHandle(row) {
      console.log(row)
    },
    delHandle({ name }) {
      this.$message.error(`删除 ${name}`)
    },
    sortChangeHandle(o) {
      console.log(o)
    },
    pageChangeHandle(e) {
      console.log(e)
      // console.log(pageSize, currentPage)
    }
  }
}
</script>
<style>
#app {
  background-color: #fafbff;
}
</style>
