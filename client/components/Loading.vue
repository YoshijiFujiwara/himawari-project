<template>
  <!-- loadingのcomputedプロパティを強制的に活性化するため。表示はしない -->
  <!-- mixin経由しないと、[vuex] do not mutate vuex store state outside mutation handlers. -->
  <!-- が出るためそうしています -->
  <div style="display: none;">{{ globalLoading }}</div>
</template>
