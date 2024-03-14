<template>
  <button class="add-review-button" @click="showPopup = true">
    <p>Add review</p>
  </button>
  <transition name="fade" appear>
    <div v-if="showPopup">
      <div class="popup-overlay" @click.self="closePopup">
        <div class="popup-menu" ref="popupElement">
          <div class="popup-content">
            <button class="close-button" type="button" @click="closePopup" aria-label="Close">x</button>
            <input type="text" id="customerName" v-model="customerName" placeholder="Customer name" required>
            <textarea id="reviewText" v-model="reviewText" placeholder="Write your review here" required></textarea>
            <button class="send-button" @click="submitReview">Send</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showPopup: false,
      customerName: '',
      reviewText: '',
      apiUrl: 'https://mws-data-280b2464bf34.herokuapp.com/api/reviews'
    };
  },
  methods: {
    forceClosePopup() {
      this.showPopup = false;
      this.customerName = '';
      this.reviewText = '';
    },

    closePopup(event) {
      // Close the popup if the click is outside the popup content or on the close button
      if (!this.$refs.popupElement || !this.$refs.popupElement.contains(event.target) || event.target.classList.contains('close-button')) {
        this.forceClosePopup();
      }
    },
    submitReview() {
      if (this.customerName.trim() === '' || this.reviewText.trim() === '') {
        alert('שם הלקוח והביקורת חייבים להיות מלאים');
        return;
      }

      const reviewData = {
        "data": {
          title: this.customerName,
          reviewContent: this.reviewText,
          publishedAt: null
        }
      };

      axios
        .post(this.apiUrl, reviewData)
        .then((response) => {
          this.forceClosePopup()
        })
        .catch((error) => {
          console.error('Error adding new entry:', error);
        });
    }
  }
};
</script>
