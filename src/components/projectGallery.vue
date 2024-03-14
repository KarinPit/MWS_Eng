<template>
    <a v-if="project && typeof project === 'object'" v-for="(image, index) in images" :key="index"
        @click="showImage(index)">
        <img class="project-image" :src="baseUrl + image.url" alt="designed house project image" />
    </a>

    <vue-easy-lightbox :visible="lightboxVisible" :imgs="lightboxImages" :index="lightboxIndex" :moveDisabled="true"
        @hide="hideLightbox"></vue-easy-lightbox>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
    components: {
        VueEasyLightbox,
    },
    props: {
        project: Object,
    },
    data() {
        return {
            baseUrl: '', // Set the base URL for images
            images: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            lightboxImages: [],
        };
    },
    methods: {
        showImage(index) {
            // Adjust index for reversed array
            this.lightboxIndex = this.lightboxImages.length - 1 - index;
            this.lightboxVisible = true;
        },
        hideLightbox() {
            this.lightboxVisible = false;
        },
    },
    async created() {
        if (this.project && typeof this.project === 'object' && this.project.images && this.project.images.data) {
            this.images = this.project.images.data.map(image => ({
                url: image.attributes.url
            }));

            // Reverse the order for lightbox
            this.lightboxImages = this.images.map(image => this.baseUrl + image.url).reverse();
        }
    }
};
</script>
