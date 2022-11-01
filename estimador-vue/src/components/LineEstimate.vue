<template>
  <fieldset class="form-fielset" v-bind:id="'estimate-base-'+id">
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
    <input class="inputEstimateLine" type="text" v-bind:value="item.valueIntput">
    <button class="btn-remove" type="button" @click="onClickRemoveline">Remover linea</button>
  </fieldset>
</template>

<script>

export default {
  name: 'LineEstimate',
  props: {
    item: Object,
    valueIntput: String,
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
      const btn = e.target;
      btn.parentElement.remove();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hide {
  display: none;
}


form {
  padding: 8px 0 0 8px;
}

fieldset {
  width: 100%;
  display: flex;
  border: 0;;
  padding: 0;
}

.form-fielset {
  margin-top: -1px;
  padding: 0;
}

select {
  height: 40px;
  border-radius: 0;
  border: 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 0 12px;
}

.select-group {
  display: flex;
}

.select-wrapper {
  min-width: 200px;
}

.select-wrapper input.select-dropdown {
  padding: 0 20px;
}

.inputDescription,
input[type=text]:not(.browser-default).inputDescription {
  padding: 0 12px;
  width: auto;
}

.inputEstimateLine {
  border: 1px solid;
  border-left: 0;
  padding: 0 12px;
  width: 50px;
  text-align: center;
}

button {
  border: 1px solid;
}

.btn-remove {
  border-left: 0;
}
</style>
