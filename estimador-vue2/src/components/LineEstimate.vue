<template>
  <fieldset class="c-form__fielset" v-bind:id="'estimate-base-'+id">
    <input class="inputDescription" type="text">
    <div class="select-group">
      <select name="template" v-bind:id="'SelTemplate'+id" @change="onChangeTemplate($event)">
        <option value="">Template</option>
        <option v-bind:value="esti.value" v-for="esti in item.estimatorSel" v-bind:key="esti.id">{{esti.title}}</option>
      </select>
      <select name="type" v-bind:id="'SelType'+id" @change="onChangeType($event)">
        <option value="">Tipo</option>
        <option 
          v-bind:class="type.parent !== item.classTemplateSelected ? 'hide' : ''"  
          v-bind:disabled="type.parent !== item.classTemplateSelected"
          v-bind:value="type.value" 
          v-bind:data-parent="type.parent" 
          v-for="type in item.typesSel" 
          v-bind:key="type.id">
            {{type.title}}
          </option>
      </select>
      <select name="complexity" v-bind:id="'SelComplexity'+id" @change="onChangeComplexity($event)">
        <option value="">Complejidad</option>
        <option v-bind:class="comp.parent !== item.classComplexitySelected ? 'hide' : ''" v-bind:value="comp.value" v-for="comp in item.complexitySel" v-bind:data-parent="comp.parent" v-bind:key="comp.id">{{comp.title}}</option>
      </select>
    </div>
    <input class="c-form__input" type="text" v-bind:value="item.valueIntput" readonly>
    <input class="c-form__input c-form__input--plus" type="number" v-bind:value="item.valueIntputPlus" @keydown="onKeyDownPlus($event)">
    <button 
      class="c-btn"
      type="button"
      @click="onClickRemoveline"
    >
      <i class="mdi mdi-close"></i>
    </button>
  </fieldset>
</template>

<script>

export default {
  name: 'LineEstimate',
  props: {
    item: Object,
    id: Number
  },
  mounted: function(){
    this.initSelect();
  },
  methods: {
    initSelect() {
    },

    onChangeTemplate(e) {
      this.$emit("onChangeTemplate", {
        e: e,
        id: this.id
      })
    },
    
    onChangeType(e) {
      this.$emit("onChangeType", {
        e: e,
        id: this.id
      })
    },

    onChangeComplexity(e) {
      this.$emit("onChangeComplexity", {
        e: e,
        id: this.id
      })
    },

    onClickRemoveline(e){
      this.$emit("onClickRemoveline", {
        e: e,
        id: this.id
      })
    },

    onKeyDownPlus(e) {
      this.$emit("onKeyDownPlus", {
        e: e,
        id: this.id
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
