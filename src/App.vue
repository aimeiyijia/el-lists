<template>
  <div id="app">
    <el-lists
      :styleConfig="styleConfig"
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
      <template v-slot:status="{row}">
        <span>
          {{ row.status }}
        </span>
      </template>
      <template v-slot:opera="{row}">
        <span>
          操作部分{{ row.status }}
        </span>
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
        { name: '测试', name1: 11111111111111111111, name2: 2, name3: 3, status: 1, title: 'ah' },
        {
          name: '测试1',
          name1: 11,
          name2: 22,
          name3: 33,
          status: 2,
          title: 'ah'
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: 333,
          status: 3,
          title: 'ah'
        }
      ],
      columns: [
        {
          label: '数据名',
          prop: 'name',
          bootstrap: { xs: 8, sm: 6, md: 6, lg: 6, xl: 4 }
        },
        {
          label: '数据名1234567890',
          prop: 'name1',
          showTooltip: 'auto',
          bootstrap: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名2',
          prop: 'name2',
          bootstrap: { xs: 8, sm: 6, md: 6, lg: 6, xl: 6 }
        },
        {
          label: '数据名3',
          prop: 'name3',
          bootstrap: { xs: 8, sm: 6, md: 6, lg: 6, xl: 6 }
        },
        {
          label: '数据名4',
          prop: 'name3',
          bootstrap: { xs: 8, sm: 6, md: 6, lg: 6, xl: 6 }
        }
      ],
      styleConfig: {
        operaWd: 100
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
  background-color: #92A5FC;
}
</style>
