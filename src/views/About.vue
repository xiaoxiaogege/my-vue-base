<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ userInfo.name }}</p>
  </div>
</template>

<script>
import storage from '@/utils/localstorage.js'
import { mapActions, mapMutations, mapState } from 'vuex'
import { queryList, restfulList } from '../api/dome'
export default {
  mounted () {
    this.queryDome()
    queryList().then(res => {
      console.log('list', res)
    })
    restfulList().then(res=>{
      console.log('restfulList', res)
    })
    storage.setItem('a','123',3000)
    storage.setItem('b','456')
    storage.setItem('userInfo',{name:'ljx',age:18})
    storage.setItem('listData',[{name:'ljx',age:18}])
    console.log('get storage===1',storage.getItem('a'))
    console.log('get storage===1',storage.getItem('b'))
    console.log('get storage===1',storage.getItem('c'))
    console.log('get storage===1',storage.getItem('userInfo'))
    console.log('get storage===1',storage.getItem('listData'))
    setTimeout(()=>{
      console.log('get storage===2',storage.getItem('a'))
    },4000)
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
