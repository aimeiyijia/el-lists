<template>
  <div id="app">
    <el-lists
      :data="listData"
      :columns="columns"
      :pagination="{
        pageSizes: [10, 20, 50, 70],
        pageSize: 10,
        layout: 'prev, pager, next, sizes, jumper, ->, total',
        background: true,
        small: false,
      }"
      :total="100"
      @page-change="pageChangeHandle"
    >
      <template v-slot:status="{ row }">
        <div>
          {{ row.status }}
        </div>
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
        { name: '测试', name1: 1, name2: 2, name3: 3, status: 1, title: 'ah' },
        {
          name: '测试1',
          name1: 11,
          name2: 22,
          name3: 33,
          status: 2,
          title: 'ah',
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: 333,
          status: 3,
          title: 'ah',
        },
      ],
      columns: [
        { label: '数据名', prop: 'name', width: '10px' },
        { label: '数据名1', prop: 'name1' },
        { label: '数据名2', prop: 'name2' },
        { label: '数据名3', prop: 'name3' },
      ],
    }
  },
  methods: {
    detailHandle(row) {
      console.log(row)
    },
    delHandle({ name }) {
      this.$message.error(`删除 ${name}`)
    },

    rowClickHandle(row, column, event) {
      console.log(column)
      // console.log(row, column, event)
    },
    sortChangeHandle(o) {
      console.log(o)
    },
    pageChangeHandle(e) {
      console.log(e)
      // console.log(pageSize, currentPage)
    },

    // formatter
    formatter(row, column, cellValue, index) {
      console.log(row, column, cellValue, index)
      return 111
    },
  },
}
</script>
