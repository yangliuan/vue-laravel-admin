<template>
  <admin-detail :is-edit="false" />
</template>

<script>
import AdminDetail from './components/AdminDetail'
export default {
  name: 'CreateAdmin',
  components: { AdminDetail }
}
</script>
