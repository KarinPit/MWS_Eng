<template>
    <div>
        <div class="carousel-images" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
            <transition name="fade">
                <img :key="currentImage.key" v-if="urls.mainImageUrl !== ''" :src="currentImage.url"
                    class="carousel-img d-block w-100" alt="carousel images showing interior designs of the designer">
            </transition>
        </div>
        <div class="carousel-button">
            <button aria-label="previous arrow button for the carousel" class="prev" @click="showPrevImage">
                <img src="/images/arrow-left.svg" alt="left arrow">
            </button>
        </div>
        <div class="carousel-button">
            <button aria-label="next arrow button for the carousel" class="next" @click="showNextImage">
                <img src="/images/arrow-right.svg" alt="right arrow">
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: '',
            urls: {
                mainImageUrl: '',
                imagesUrl: [],
            },
            currentIndex: 0,
            touchStartX: 0,
            touchEndX: 0,
        };
    },
    async created() {
        try {
            this.urls = await GetHomeImages();
        } catch (error) {
            console.error('Error fetching images:', error);
            // Handle the error appropriately
        }
    },
    methods: {
        showPrevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.urls.imagesUrl.length - 1;
            }
        },
        showNextImage() {
            if (this.currentIndex < this.urls.imagesUrl.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },
        handleTouchStart(e) {
            this.touchStartX = e.changedTouches[0].clientX;
        },
        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipeGesture();
        },
        handleSwipeGesture() {
            if (this.touchStartX - this.touchEndX > 75) {
                // Swipe left
                this.showNextImage();
            } else if (this.touchEndX - this.touchStartX > 75) {
                // Swipe right
                this.showPrevImage();
            }
        },
    },
    computed: {
        currentImage() {
            return {
                url: this.baseUrl + (this.currentIndex === 0 ? this.urls.mainImageUrl : this.urls.imagesUrl[this.currentIndex]),
                key: this.currentIndex
            };
        },
    },
};

async function GetHomeImages() {
    try {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/home-image?populate=*");
        const { data } = await response.json();
        const mainImageUrl = data.attributes.mainImage.data.attributes.url;
        const images = data.attributes.images.data;
        const imagesUrl = images.map((image) => image.attributes.url);
        return {
            mainImageUrl: mainImageUrl,
            imagesUrl: imagesUrl,
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
