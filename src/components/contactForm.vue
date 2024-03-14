<template>
    <div class="logo">
        <a href="/">
            <img :src=info.logoUrl alt="MWS Logo" />
        </a>
    </div>
    <div class="contact-info">
        <h2>צרו קשר</h2>
        <div class="info">
            <p @click="openEmail(info.emailAddress)" style="cursor: pointer" class="info-text">{{ info.emailAddress
            }}</p>
            <p @click="openDialer(info.phoneNumber)" style="cursor: pointer" class="info-text">{{ info.phoneNumber
            }}</p>
        </div>
    </div>
    <div class="social-media ">
        <h2>עקבו אחרי</h2>
        <div class="social-media-icons contact-icons">
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
    </div>
    <div class="contact-form">
        <form @submit.prevent="submitForm">
            <h2>השאירו פרטים ואחזור אליכם</h2>
            <label for="name">שם מלא</label>
            <input type="text" v-model="name" placeholder="שם מלא" required />
            <label for="phone">טלפון</label>
            <input type="tel" v-model="phone" placeholder="טלפון" pattern="(\+?\d{1,3})?(\d{3})-?(\d{3})-?(\d{4})"
                required />
            <label for="email">מייל</label>
            <input type="email" v-model="email" placeholder="מייל" />
            <input class="submit-button" type="submit" value="שלח" />
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            apiUrl: 'https://mws-data-280b2464bf34.herokuapp.com/api/to-contacts',
            info: {
                emailAddress: '',
                phoneNumber: [],
                logoUrl: [],
            },
            GetContactInfo
        };
    },
    async created() {
        this.info = await GetContactInfo();
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
        openEmail(mail) {
            const mailtoLink = `mailto:${mail}?`;
            window.open(mailtoLink);
        },

        async submitForm() {
            const formData = {
                "data": {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    publishedAt: null
                }
            };

            try {
                const response = await axios.post(this.apiUrl, formData);
                console.log('Form submitted:', response.data);

                // Clear the form fields after submission
                this.name = '';
                this.phone = '';
                this.email = '';
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
};

async function GetContactInfo() {
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/contact-info?populate=*");
    const { data } = await response.json();
    const eaddress = data.attributes.address;
    const phonenum = data.attributes.phone;
    const logo = data.attributes.logo.data.attributes.url;
    const info = {
        emailAddress: eaddress,
        phoneNumber: phonenum,
        logoUrl: logo,
    };
    return info;
}
</script>
  