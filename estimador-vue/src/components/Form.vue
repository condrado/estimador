<template>
  <section class="list-group">
    <form id="estimate-form" action="">
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
      />
    </form>
  </section>

  <fieldset class="button-group">
    <button @click="onClickNewline($event)">Nueva linea</button>
  </fieldset>

  <Total 
    v-bind:total="total"
  />
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
            valueIntput: '0'
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

    sumateHours() {
      this.total = '0';

      for(let item of this.listItems) {
        const hour = parseInt(item.valueIntput);
        this.total = (parseInt(this.total) + hour).toString();
      }
    },

    onClickNewline() {
      this.fetchData();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.list-group {
  margin: 0 0 120px 0;
}

.button-group {
  position: fixed;
  right: 0;
  top: 0;
  background-color: #ffffff;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  padding: 8px 8px 0 0;
}

.button-group button {
  height: 40px;
  border-radius: 0;
}
</style>
