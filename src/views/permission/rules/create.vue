<template>
  <admin-rules-detail :is-edit="false" />
</template>

<script>
import AdminRulesDetail from './components/RulesDetail'
export default {
  name: 'CreateAdminRules',
  components: { AdminRulesDetail }
}
</script>
