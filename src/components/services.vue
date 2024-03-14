<template>
  <pre v-if="richTextParser" v-for="(stage, index) in stages" :key="index" class="stage-pre">
        <h3>{{ stage.title }}</h3>
        <p class="steps" v-html="richTextParser.convertToMarkdown(stage.desc)"></p>
      </pre>
</template>

<script>
// Import the richTextParser object
import { richTextParser } from "../js/richTextParser";

export default {
  data() {
    return {
      baseUrl: "",
      stages: [],
      richTextParser: null,
    };
  },
  async created() {
    // Set richTextParser when the component is created
    this.richTextParser = richTextParser;

    // Fetch the data when the component is created
    this.stages = await this.GetStages();
  },
  methods: {
    async GetStages() {
      const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/services");
      const { data } = await response.json();

      const stages = data.map((stage) => ({
        id: stage.attributes.stageID,
        title: stage.attributes.title,
        desc: stage.attributes.description,
      }));

      stages.sort((a, b) => a.id - b.id)

      return stages;
    },
  },
};
</script>
