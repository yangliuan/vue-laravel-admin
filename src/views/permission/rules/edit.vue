<template>
  <admin-rules-detail :is-edit="true" />
</template>

<script>
import AdminRulesDetail from './components/RulesDetail'
export default {
  name: 'EditAdminRules',
  components: { AdminRulesDetail }
}
</script>
