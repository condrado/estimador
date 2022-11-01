<template>
  <section class="total">
    <h2>Total</h2>
    <input type="text" v-bind:value="total">
  </section>
  
</template>

<script>
export default {
  name: 'Total',
  props: {
    total: String
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .total {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
      padding: 8px;
  }
</style>
