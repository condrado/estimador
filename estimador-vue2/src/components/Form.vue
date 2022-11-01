<template>
  <div class="o-wrapper">
    <div class="o-col__left">
      <button 
        class="c-btn c-btn--primary"
        type="button"
        @click="onClickNewline($event)"
      >
        Nuevo contenido
        <i class="mdi mdi-plus-circle-outline"></i>
      </button>
    </div>
    <dir class="o-col__right">
      <form class="c-form" id="estimate-form" action="">
        <LineEstimate 
          v-for="item in listItems"
          v-bind:key="item.id"
          v-bind:id="item.id"
          v-bind:item="item"
          v-bind:classTemplateSelected="classTemplateSelected"
          v-bind:classTypeSelected="classTypeSelected"
          v-bind:classComplexitySelected="classComplexitySelected"
          @onChangeTemplate="handleChangeTemplate"
          @onChangeType="handleChangeType"
          @onChangeComplexity="handleChangeComplexity"
          @onClickRemoveline="hadleClickRemoveline"
          @onKeyDownPlus="hadleKeyDownPlus"
        />
      </form>

      <Total v-bind:total="total"/>
    </dir>
  </div>
</template>

<script>
import LineEstimate from './LineEstimate.vue'
import Total from './Total.vue'
import axios from 'axios'

export default {
  name: 'Form',
  data() {
    return{
        estimatorUrl: process.env.VUE_APP_ESTIMATOR_URL,
        estimatorSel: [],
        typesSel: [],
        complexitySel: [],
        listItems: [],
        classTemplateSelected: '',
        classTypeSelected:'',
        classComplexitySelected:'',
        valueIntput: '0',
        valueIntputPlus: '0',
        total:'0'
    }
  },
  components: {
    LineEstimate,
    Total
  },
  methods: {
    fetchData(){
      axios
        .get(this.estimatorUrl)
        .then(response => {
          const estimatorSelTemp = [];
          const typesSelTemp = [];
          const complexitySelTemp = [];

          response.data.template.forEach(element => {
            const newEle = {};
            newEle.title = element.title;
            newEle.value = element.value;
            estimatorSelTemp.push(newEle);
          });

          response.data.types.forEach(element => {
            const newEle = {};
            newEle.title = element.title;
            newEle.value = element.value;
            newEle.parent = element.parent;
            typesSelTemp.push(newEle);
          });

          response.data.complexity.forEach(element => {
            const newEle = {};
            newEle.title = element.title;
            newEle.value = element.value;
            newEle.parent = element.parent;
            complexitySelTemp.push(newEle);
          });

          this.listItems.push({
            id: Date.now(),
            estimatorSel: estimatorSelTemp,
            typesSel: typesSelTemp,
            complexitySel: complexitySelTemp,
            classTemplateSelected: '',
            classComplexitySelected: '',
            valueIntput: '0',
            valueIntputPlus: '0'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleChangeTemplate(selectProp) {
      const optSel = selectProp.e.target;
      const optSelVal = optSel.value;
      const nextSel = optSel.nextElementSibling;
      const nextNextSel = nextSel.nextElementSibling;
      const itemIndex = this.listItems.findIndex(i => i.id==selectProp.id);
      const itemAct = this.listItems[itemIndex];


      itemAct.classTemplateSelected = '';
      itemAct.classTypeSelected = '';
      nextSel.value = '';
      nextNextSel.value = '';

      if (optSelVal !== '') {
        itemAct.classTemplateSelected = optSelVal;
        itemAct.valueIntput = '0';
      } else {
        itemAct.classTemplateSelected = '';
        itemAct.classTypeSelected = '';
        itemAct.valueIntput = '0';
      }

      this.sumateHours();
    },

    handleChangeType(selectProp) {
      const optSel = selectProp.e.target;
      const optSelVal = optSel.value;
      const nextSel = optSel.nextElementSibling;
      const itemIndex = this.listItems.findIndex(i => i.id==selectProp.id);
      const itemAct = this.listItems[itemIndex];

      nextSel.value = '';

      if (optSelVal !== '') {
        itemAct.classComplexitySelected = optSelVal;
        itemAct.valueIntput = '0';
      } else {
        itemAct.classTypeSelected = '';
        itemAct.classComplexitySelected  = '';
        itemAct.valueIntput = '0';
      }

      this.sumateHours();
    },

    handleChangeComplexity(selectProp) {
      const optSel = selectProp.e.target;
      const optSelVal = optSel.value;
      const itemIndex = this.listItems.findIndex(i => i.id==selectProp.id);
      const itemAct = this.listItems[itemIndex];

      if (optSelVal !== '') {
        itemAct.valueIntput = optSelVal;

      } else {
        itemAct.valueIntput = '0';
      }

      this.sumateHours();
    },

    hadleClickRemoveline(lineProp) {
      const btn = lineProp.e.currentTarget;
      const itemIndex = this.listItems.findIndex(i => i.id==lineProp.id);

      this.listItems.splice(itemIndex,1);
      btn.parentElement.remove();
      this.sumateHours();
    },

    hadleKeyDownPlus(inputProp) {
      let inputPlusVal = inputProp.e.currentTarget.value;
      let keyCodePlusVal = inputProp.e.keyCode;
      // let keyPlusVal = inputProp.e.key;
      const itemIndex = this.listItems.findIndex(i => i.id==inputProp.id);
      const itemAct = this.listItems[itemIndex];

        if (keyCodePlusVal === 69 ) {
          return false;
       } else if (inputPlusVal === '') {
          inputPlusVal = '0';
       }

      itemAct.valueIntputPlus = inputPlusVal;
      this.sumateHours();
    },

    sumateHours() {
      this.total = '0';

      for(let item of this.listItems) {
        const hour = parseInt(item.valueIntput);
        const hourPlus = parseInt(item.valueIntputPlus);
        this.total = (parseInt(this.total) + hour + hourPlus).toString();
      }
    },

    onClickNewline() {
      this.fetchData();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
