<template>
  <group-detail :is-edit="true" />
</template>

<script>
import GroupDetail from './components/GroupDetail'
export default {
  name: 'EditGroup',
  components: { GroupDetail }
}
</script>
