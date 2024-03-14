
<template>
    <div id="big-screens-navbar" class="social-media-icons">
        <a class="icon" @click="openFacebook">
            <img src="/images/facebook_black.svg" alt="facebook icon">
        </a>
        <a class="icon" @click="openInstagram">
            <img src="/images/instagram_black.svg" alt="instagram icon">
        </a>
        <a class="icon" @click="openWhatsApp">
            <img src="/images/whatsapp_black.svg" alt="whatsapp icon">
        </a>
    </div>

    <div class="nav-links">
        <a id="home" class="nav-link" :class="{ 'active-link': isActiveLink('/') }" href="/">
            <span class="nav-link-span">{{ navNames.Home }}</span>
        </a>
        <div class="logo-dropdown" @mouseover="handleDropdownHover(true)" @mouseleave="handleDropdownHover(false)">
            <a class="icon logo-icon">
                <span :class="{
                    'nav-link-span': true,
                    'drop-down-parent': true,
                    'parent-hovered': isDropdownOpen,
                    'active-link': isDropdownChildActive
                }">
                    {{ navNames.About }}
                </span>
            </a>
            <div class="dropdown-content">
                <a id="about" class="nav-link" :class="{ 'active-link': isActiveLink('/about') }" href="/about">
                    <span class="nav-link-span dropdown-link">אודות</span>
                </a>
                <a id="services" class="nav-link" :class="{ 'active-link': isActiveLink('/services') }" href="/services">
                    <span class="nav-link-span dropdown-link">{{ navNames.services }}</span>
                </a>
                <a id="reviews" class="nav-link" :class="{ 'active-link': isActiveLink('/reviews') }" href="/reviews">
                    <span class="nav-link-span dropdown-link">{{ navNames.Reviews }}</span>
                </a>
            </div>
        </div>
        <a id="projects" class="nav-link" :class="{ 'active-link': isActiveLink('/projects') }" href="/projects">
            <span class="nav-link-span">{{ navNames.Projects }}</span>
        </a>
        <a id="blog" class="nav-link" :class="{ 'active-link': isActiveLink('/blog') }" href="/blog">
            <span class="nav-link-span">{{ navNames.Blog }}</span>
        </a>
        <a id="contact" class="nav-link" :class="{ 'active-link': isActiveLink('/contact') }" href="/contact">
            <span class="nav-link-span">{{ navNames.Contact }}</span>
        </a>
        <a class="nav-link" href="#">
            <span class="nav-link-span">English</span>
        </a>
    </div>
    <div class="logo-icons">
        <a class="icon phone-number" @click="openDialer(phoneNumber)">
            <p>{{ phoneNumber }}</p>
        </a>
        <a class="icon logo-icon" href="/">
            <img v-if="navNames.logoImage && navNames.logoImage.data && navNames.logoImage.data.attributes && navNames.logoImage.data.attributes.url"
                :src="navNames.logoImage.data.attributes.url" alt="MWS logo">
        </a>
    </div>

    <div class="social-media-icons small-screens-navbar">
        <a class="icon" @click="openFacebook">
            <img src="/images/facebook_black.svg" alt="facebook icon">
        </a>
        <a class="icon" @click="openInstagram">
            <img src="/images/instagram_black.svg" alt="instagram icon">
        </a>
        <a class="icon" @click="openWhatsApp">
            <img src="/images/whatsapp_black.svg" alt="whatsapp icon">
        </a>
    </div>

    <button aria-label="compressed navbar menu" class="menu-button" @click="toggleMenu">
        <img src="/images/list.svg" alt="hamburger menu icon">
    </button>
</template>


<script>
import contactForm from './contactForm.vue';
export default {
    data() {
        return {
            navNames: [],
            phoneNumber: '',
            isMenuOpen: false,
            isDropdownOpen: false,
            currentPath: '',
            dropdownRef: null,
        };
    },
    async created() {
        try {
            this.navNames = await fetchNavNames();
            this.phoneNumber = await getPhoneNumber();
            this.isActiveLink()
        } catch (error) {
            console.error('Error fetching navigation names:', error);
            // Handle the error appropriately
        }
    },

    mounted() {
        this.currentPath = window.location.pathname;
        document.addEventListener('click', this.handleOutsideClick);
    },

    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },

    methods: {
        openWhatsApp() {
            window.open('https://wa.me/972587809493');
        },
        openFacebook() {
            window.open('https://www.facebook.com/MWSStudioStyle');
        },
        openInstagram() {
            window.open('https://www.instagram.com/moran_interior_design/');
        },
        openDialer(number) {
            const telLink = `tel:${number}`;
            window.open(telLink, '_blank');
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            const navLinks = document.querySelector('.nav-links');
            const navbars = document.querySelector('.navbars');
            const dorpdownParent = document.querySelector('.drop-down-parent');
            if (navLinks) {
                if (this.isMenuOpen) {
                    navLinks.classList.add('nav-links-open');
                    navbars.classList.add('navbars-open');
                } else {
                    navLinks.classList.remove('nav-links-open');
                    navbars.classList.remove('navbars-open');
                }
            }

        },
        handleDropdownHover(isHovered) {
            const dropdownParent = this.$el.querySelector('.drop-down-parent');
            if (isHovered) {
                dropdownParent.classList.add('parent-hovered');
            } else {
                dropdownParent.classList.remove('parent-hovered');
            }
        },
        handleDropdownHover(isHovered) {
            this.isDropdownOpen = isHovered;
        },

        handleOutsideClick(event) {
            if (this.dropdownRef && !this.dropdownRef.contains(event.target)) {
                this.isDropdownOpen = false;
            }
        },
    },

    computed: {
        isActiveLink() {
            return path => this.currentPath === path;
        },
        isDropdownChildActive() {
            return this.isActiveLink('/about') || this.isActiveLink('/services');
        },

        logoImageUrl() {
            // Navigate through the object safely and return the URL if it exists
            return this.navNames.logoImage?.data?.attributes?.url || null;
        }
    },

    components: {
        contactForm,
    }
};

async function fetchNavNames() {
    try {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/navigation-name?populate=*");
        const { data } = await response.json();
        return data.attributes;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function getPhoneNumber() {
    try {
        const phoneNumber = (await contactForm.data().GetContactInfo()).phoneNumber;
        return phoneNumber
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

</script>
