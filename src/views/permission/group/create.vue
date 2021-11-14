<template>
  <admin-group-detail :is-edit="false" />
</template>

<script>
import AdminGroupDetail from './components/GroupDetail'
export default {
  name: 'CreateAdminGroup',
  components: { AdminGroupDetail }
}
</script>
