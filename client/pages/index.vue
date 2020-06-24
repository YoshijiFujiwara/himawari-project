<template>
  <div>
    <GuestNavbar
      :colorx="gradiationButton.colorx"
      :colorx2="gradiationButton.colorx2"
    />
    <main>
      <TopSection
        :colorx="gradiationButton.colorx"
        :colorx2="gradiationButton.colorx2"
      />
      <div class="main-contents">
        <FirstContent />
        <SecondContent />
        <ThirdContent />
      </div>
    </main>
    <GuestFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GuestNavbar from '@/components/organisms/index/GuestNavbar.vue'
import TopSection from '@/components/organisms/index/TopSection.vue'
import FirstContent from '@/components/organisms/index/FirstContent.vue'
import SecondContent from '@/components/organisms/index/SecondContent.vue'
import ThirdContent from '@/components/organisms/index/ThirdContent.vue'
import GuestFooter from '@/components/organisms/index/GuestFooter.vue'

export default Vue.extend({
  layout: 'guest',
  middleware: 'guest',
  components: {
    GuestNavbar,
    TopSection,
    FirstContent,
    SecondContent,
    ThirdContent,
    GuestFooter
  },
  data() {
    return {
      gradiationButton: {
        colorx: '#81bbf5',
        colorx2: '#1996fe'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
main {
  display: block;
  position: relative;
  width: 100%;

  button {
    width: 300px;
  }
  @media screen and (min-width: 0px) {
    .main-contents {
      text-align: center;
      margin: 0 10% 10% 10%;
    }
  }
  @media screen and (min-width: 901px) {
    .main-contents {
      text-align: left;
      margin: 0 10%;
    }
  }
}
</style>
