<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ userInfo.name }}</p>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  mounted() {
    this.queryDome()
  },
  computed: {
    // 写法一 官方推荐
    ...mapState('dome', {
      userInfo: state => state.userInfo
    }),
    // 写法二
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
