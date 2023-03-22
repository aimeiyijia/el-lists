<template>
  <div class="el-lists-single-container">
    <el-lists-single
      :data="singleListData"
      :rows="singleRows"
      :rowProps="singleRowProps"
    >
      <template #opera="row">
        <el-button type="primary" size="small">
          {{ row.data.status }}
        </el-button>
        <div>操作栏占位</div>
        <div>又一个占位</div>
      </template>
    </el-lists-single>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      singleRowProps: {
        titleProp: 'nodeName'
      },
      singleListData: {
        data: {
          title: 'title',
          status: 'status',
          statusType: 'success',
          childData1: '数据1',
          childData2: '数据2'
        },
        data1: {
          childData3: '数据3',
          childData4: '数据4'
        }
      },
      singleRows: [
        {
          prop: 'data',
          cell: [
            { prop: 'childData1', label: '数据项1' },
            { prop: 'childData2', label: '数据项2' }
          ]
        },
        {
          prop: 'data123',
          cell: [
            { prop: 'childData1', label: '数据项1' },
            { prop: 'childData2', label: '数据项2' }
          ]
        },
        {
          prop: 'data1',
          cell: [
            { prop: 'childData3', label: '数据项3' },
            { prop: 'childData4', label: '数据项4' }
          ]
        }
      ]
    }
  }
}
</script>
<style>
#app {
  background-color: #fafbff;
  padding: 0 12px;
}
.big-leg {
  font-size: 24px;
}
</style>
