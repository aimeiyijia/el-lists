<template>
  <div id="app">
    <div class="big-leg">
      我是超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的超级长的占位元素
    </div>
    <el-button type="primary" @click="handleSetCom('ViewElLists')">
      ElLists
    </el-button>
    <el-button type="primary" @click="handleSetCom('ViewElListsSingle')">
      ElListsSingle
    </el-button>
    <component :is="curComponent"></component>
  </div>
</template>

<script>
import ViewElLists from './testView/ViewElLists'
import ViewElListsSingle from './testView/ViewElListsSingle'
export default {
  name: 'app',
  components: { ViewElLists, ViewElListsSingle },
  data() {
    return {
      curComponent: ViewElListsSingle
    }
  },
  methods: {
    handleSetCom(name) {
      this.curComponent = name
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
