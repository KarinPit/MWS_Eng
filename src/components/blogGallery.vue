<template>
    <div v-if="post && typeof post === 'object'">
        <img class="gimage" :src="baseUrl + postImage" alt="blog image" />
    </div>
</template>
  
<script>
export default {
    props: {
        post: Object,
    },
    data() {
        return {
            // baseUrl: "https://mws-data-280b2464bf34.herokuapp.com/",
            baseUrl: "",
            postImage: [],
        };
    },
    methods: {
        async GetPost() {
            return this.post.attributes.image.data.attributes.url;
        },
    },
    async created() {
        if (this.post && typeof this.post === 'object') {
            this.postImage = await this.GetPost();
        }
    },
};
</script>
  
<style scoped></style>
  