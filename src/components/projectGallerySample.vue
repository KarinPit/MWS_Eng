<template>
    <div class="all-projects">
        <div class="project-box" v-for="(project, index) in selectedProjects" :key="index" @mouseover="toggleHovered(index)"
            @mouseout="toggleHovered(-1)">
            <a class="project-name" :href="`/projects/${project.name}`"><h4>{{ project.name }}</h4></a>
            <a :href="`/projects/${project.name}`">
                <img class="project-image" :src="baseUrl + project.imageUrl" alt="designed house project image" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // baseUrl: "https://mws-data-280b2464bf34.herokuapp.com/",
            baseUrl: "",
            mainProjects: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
        };
    },
    computed: {
        selectedProjects() {
            // Filter out projects that are not category-selected
            return this.mainProjects.filter(project => project.publishStatus === 'selected');
        }
    },
    async created() {
        // Fetch the data when the component is created
        this.mainProjects = await this.GetProjects(); // Call the GetProjects method
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetProjects() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/projects?populate=*");
            const { data } = await response.json();
            const projects = data.map((project) => ({
                name: project.attributes.title, // Set project name
                imageUrl: project.attributes.mainImage.data.attributes.url,
                publishStatus: project.attributes.publishStatus.data[0].attributes.title,
            }));
            return projects;
        },
    },
};
</script>
