<template>
  <div class="el-lists-container">
    <el-lists
      :expand="true"
      :data="listData"
      :columns="columns"
      :rowProps="rowProps"
      :col-attrs="{mask: true}"
      :empty="empty"
      :layout="layout"
      :pagination="pagination"
      :directives="{
        offset: 60
      }"
      :total="100"
      @current-click="currentClick"
      @expand="currentClick"
    >
      <!-- <template #emptyDefault>Default 插槽</template>
      <template #emptyImage>Image 插槽</template>
      <template #emptyDescription>Description 插槽</template> -->
      <template #insertLeft>左</template>
      <template #insertMiddle>中</template>
      <template #insertRight>右</template>
      <template #handleTitle>
        <span>自定义title</span>
      </template>
      <!-- 内置插槽。#left #status #title #opera #middle #right #expand -->
      <!-- <template #left>
        <span>左</span>
      </template> -->
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
      <template #topRight>
        <span>右上角</span>
      </template>
      <!-- expand的优先级高于extra配置项 -->
      <!-- <template #expand>
        <span>展开插槽</span>
      </template> -->
      <template #opera="row">
        <el-button type="primary" size="small">
          {{ row.data.status }}
        </el-button>
        <div>操作栏占位</div>
        <div>又一个占位</div>
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
          name2: '1456723200@qq.com',
          name3: { name: '多层对象' },
          name4: 4,
          // 内置 状态描述
          status: '转账成功',
          // 内置 css className 或者使用内置
          statusType: 'success',
          // 内置 行名称
          title: '标题一',
          title123: {
            abc: '我是超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的标题'
          },
          other: 123,
          extra: [
            {
              name: 'in1测试',
              name1: 111111,
              name2: 2,
              name3: { name: 'in1测试' },
              // 内置 状态描述
              status: '转账成功',
              // 内置 css className 或者使用内置
              statusType: 'success',
              // 内置 行名称
              title: '标题一'
            },
            {
              name: 'in2测试',
              name1: 111111,
              name2: 2,
              name3: { name: 'in2测试' },
              // 内置 状态描述
              status: '转账成功',
              // 内置 css className 或者使用内置
              statusType: 'success',
              // 内置 行名称
              title: '标题一'
            }
          ]
        },
        {
          name: '测试1',
          name1: 11,
          name2:
            '超长的字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符字符',
          name3: { name: '多层对象' },
          status: '转账失败',
          statusType: 'error',
          title: '标题二'
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: { name: '多层对象' },
          status: '等待结果中',
          statusType: 'wait',
          title: '标题三',
          title123: {
            abc: '我是超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的标题'
          }
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: { name: '多层对象' },
          status: '等待结果中',
          statusType: 'wait',
          title: '标题四',
          extra: [
            {
              name: 'in1测试',
              name1: 111111,
              name2: 2,
              name3: { name: 'in1测试' },
              // 内置 状态描述
              status: '转账成功',
              // 内置 css className 或者使用内置
              statusType: 'success',
              // 内置 行名称
              title: '标题一'
            },
            {
              name: 'in2测试',
              name1: 111111,
              name2: 2,
              name3: { name: 'in2测试' },
              // 内置 状态描述
              status: '转账成功',
              // 内置 css className 或者使用内置
              statusType: 'success',
              // 内置 行名称
              title: '标题一'
            }
          ]
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: { name: '多层对象' },
          status: '等待结果中',
          statusType: 'wait',
          title: '标题五'
        },
        {
          name: '测试3',
          name1: 111,
          name2: 222,
          name3: { name: '多层对象' },
          status: '等待结果中',
          statusType: 'wait',
          title: '标题六'
        }
      ],
      // 行配置项
      rowProps: {
        // 标题过长时省略显示、鼠标移上去后显示toolTip
        titleTooltip: true,
        // 每行的通用的字段在data中的取值key
        titleProp: 'title123.abc'
        // statusProp: 'status',
        // extraProp: 'extra',
        // statusTypeProp: 'statusType',
      },
      empty: {
        image:
          'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        imageSize: 56,
        description: '自定义的描述信息'
      },
      columns: [
        {
          // 数据项名
          label: '数据名',
          // 数据项对应的数据字段名称
          prop: 'name',
          showTooltip: true,
          // 当前数据项的布局
          // col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 8 },
          customRender: () => {
            return <span>自定义的数据啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
          },
          customTitle: () => {
            return <div>自定义的名称</div>
          }
        },
        {
          label: '数据名0',
          prop: 'name1',
          showTooltip: true,
          // col: { xs: 12, sm: 12, md: 6, lg: 6, xl: 8 },
          scopedSlots: {
            customRender: 'handle',
            customTitle: 'handleTitle'
          }
        },
        {
          label: '数据名2',
          prop: 'name2',
          showTooltip: true
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名3',
          prop: 'name3.name',
          hidden: false,
          showTooltip: true
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        },
        {
          label: '数据名4',
          prop: 'name4',
          showTooltip: true
          // col: { xs: 8, sm: 6, md: 6, lg: 6, xl: 8 }
        }
      ],
      // 整体的布局配置
      layout: {
        row: {
          gutter: 20
        },
        // 优先级低于columns列配置内的col配置项
        col: { xs: 24, sm: 12, md: 6, lg: 6, xl: 8 },
        operaStyleClass: '',
        operaStyle: {
          width: '240px'
        }
      },
      pagination: {
        pageSizes: [10, 20, 50, 70],
        pageSize: 10,
        layout: 'slot, pager, sizes',
        background: true,
        currentPage: 1
      }
    }
  },
  methods: {
    currentClick(data) {
      console.log(data, '项点击')
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
