<template>
    <h1 v-if="navNames">{{ navNames.services }}</h1>
    <div class="all-projects">
        <div class="project-box" v-for="(project, index) in mainProjects" :key="index">
            <a class="project-name" :href="`/services/${project.name}`">
                <h4>{{ project.name }}</h4>
                <!-- <p class="summary-text" v-html="richTextParser.convertToMarkdown(project.summary)"></p> -->
            </a>
            <a class="project-image" :href="`/services/${project.name}`">
                <img :src="baseUrl + project.imageUrl" alt="service main image" />
            </a>
        </div>
    </div>
</template>

<script>
import navNames from './navigation.vue';
import { richTextParser } from "../js/richTextParser";

export default {
    data() {
        return {
            baseUrl: "", // Set the base URL for images
            mainProjects: [], // Array to store projects
            hovered: -1, // Track hover state
            navNames: null,
        };
    },
    async created() {
        this.mainProjects = await this.GetProjects();
        this.navNames = await fetchNavNames();
        this.richTextParser = richTextParser;
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetProjects() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/services?populate=*");
            const { data } = await response.json();
            return data.map((project) => ({
                name: project.attributes.title,
                summary: project.attributes.serviceSummary,
                imageUrl: project.attributes.serviceImage.data.attributes.url,
            }));
        },
    },
};

async function fetchNavNames() {
    try {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/navigation-name");
        const { data } = await response.json();
        return data.attributes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
</script>

