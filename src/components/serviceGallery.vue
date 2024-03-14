<template>
    <div class="service-option-menu">
        <div class="service-box" v-for="(project, index) in mainProjects" :key="index" @mouseover="toggleHovered(index)"
            @mouseout="toggleHovered(-1)">
            <!-- <a :href="`/services/${project.name}`"> -->
            <img class="service-image" :src="baseUrl + project.imageUrl" alt="service main image" />
            <!-- </a> -->
            <div class="service-name">
                <h4>{{ project.name }}</h4>
                <pre class="summary-text" v-html="richTextParser.convertToMarkdown(project.summary)"></pre>
                <a :href="`/services/${project.name}`">
                    <p class="read-more">Read more</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { richTextParser } from "../js/richTextParser";

export default {
    data() {
        return {
            baseUrl: "",
            mainProjects: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
        };
    },
    // computed: {
    //     selectedProjects() {
    //         // Filter out projects that are not category-selected
    //         return this.mainProjects.filter(project => project.publishStatus === 'selected');
    //     }
    // },
    async created() {
        // Fetch the data when the component is created
        this.mainProjects = await this.GetProjects(); // Call the GetProjects method
        this.richTextParser = richTextParser;
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetProjects() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/services?populate=*");
            const { data } = await response.json();
            const projects = data.map((project) => ({
                name: project.attributes.title, // Set project name
                summary: project.attributes.serviceSummary,
                imageUrl: project.attributes.serviceImage.data.attributes.url,
            }));
            return projects;
        },
    },
};
</script>
