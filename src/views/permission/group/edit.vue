<template>
  <admin-group-detail :is-edit="true" />
</template>

<script>
import AdminGroupDetail from './components/GroupDetail'
export default {
  name: 'EditAdminGroup',
  components: { AdminGroupDetail }
}
</script>
