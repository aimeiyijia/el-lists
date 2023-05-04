<template>
  <div class="el-lists-single-container">
    <el-lists-single
      :expand="true"
      :data="singleListData"
      :rows="singleRows"
      :rowProps="singleRowProps"
    >
      <template #opera="{data}">
        <el-button type="primary" size="small" @click="handleViewRow(data)">
          {{ data.$rowData.statusType }}
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
          nodeName:
            '超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长超级长标题1',
          status: 'status',
          statusType: 'success',
          childData1: '数据1',
          childData2: '数据2',
          extra: [
            {
              childData1: '额外的数据1',
              childData2: '额外的数据2'
            }
          ]
        },
        data123: {
          nodeName: '标题2',
          name: '刘小凡',
          age: '18'
        },
        data1: {
          nodeName: '标题3',
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
            { prop: 'name', label: '姓名' },
            { prop: 'age', label: '年龄' }
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
  },
  methods: {
    handleViewRow(data) {
      console.log(data, '行数据')
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
