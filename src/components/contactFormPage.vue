<template>
    <form @submit.prevent="submitForm">
        <h2>רוצים שאצור איתכם קשר? השאירו פרטים ואחזור אליכם</h2>
        <input type="text" v-model="name" placeholder="שם מלא" required />
        <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required />
        <input type="email" v-model="email" placeholder="מייל" />
        <input type="text" v-model="comments" placeholder="הערות" required />
        <input class="submit-button" type="submit" value="שלח" />
    </form>
    <div class="info-div">
        <h2>מוזמנים גם לפנות אלי</h2>
        <p>טלפון: {{ info.phoneNumber }}</p>
        <p>אימייל: {{ info.emailAddress }}</p>
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
            comments: '',
            apiUrl: 'https://mws-data-280b2464bf34.herokuapp.com/api/to-contacts', // Replace with your Strapi API endpoint
            info: {
                emailAddress: '',
                phoneNumber: [],
                logoUrl: [],
            },
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.info = await GetContactInfo();
    },

    methods: {
        async submitForm() {
            const formData = {
                "data": {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    comments: this.comments,
                    publishedAt: null
                }
            };

            try {
                const response = await axios.post(this.apiUrl, formData);
                console.log('Form submitted:', response.data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }

            // Clear the form fields after submission
            this.name = '';
            this.phone = '';
            this.email = '';
            this.comments = '';
        },
    },
};

async function GetContactInfo() {
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/contact-info");
    const { data } = await response.json();
    const eaddress = data.attributes.address;
    const phonenum = data.attributes.phone;
    const info = {
        emailAddress: eaddress,
        phoneNumber: phonenum,
    };
    return info;
}

</script>
  