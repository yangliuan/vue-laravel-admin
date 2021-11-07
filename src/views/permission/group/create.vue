<template>
  <group-detail :is-edit="false" />
</template>

<script>
import GroupDetail from './components/GroupDetail'
export default {
  name: 'CreateGroup',
  components: { GroupDetail }
}
</script>
