<template>
  <div>
    <FirstSection />
    <SecondSection />
    <ThirdSection />
    <FourthSection />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FirstSection from '@/components/organisms/index/1stSection.vue'
import SecondSection from '@/components/organisms/index/2ndSection.vue'
import ThirdSection from '@/components/organisms/index/3rdSection.vue'
import FourthSection from '@/components/organisms/index/4thSection.vue'

export default Vue.extend({
  layout: 'guest/index',
  middleware: 'guest',
  components: {
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection
  }
})
</script>
