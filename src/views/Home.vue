<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{ userInfo.name }} 数字：{{ number1 }}==={{ userInfo1.name }}
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState, mapMutations } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'Home',
  components: {},
  mounted() {
    this.queryDome()
    const loading = this.$loading()
    console.log('loading', loading)
    setTimeout(() => {
      loading.close()
    }, 3000)
  },
  computed: {
    // 写法一 官方文档写法
    ...mapState('dome', {
      userInfo: state => state.userInfo
    }),
    // 写法二 个人喜欢写法
    ...mapState('dome', {
      userInfo1: 'userInfo',
      number1: 'number'
    })
  },
  methods: {
    ...mapActions('dome', ['queryDome']),
    ...mapMutations([])
  }
}
</script>
