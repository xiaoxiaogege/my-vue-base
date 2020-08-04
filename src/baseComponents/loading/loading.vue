<template>
  <div class="zj-loading" v-if="loading">
    <div class="loading">loading</div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less">
.zj-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
