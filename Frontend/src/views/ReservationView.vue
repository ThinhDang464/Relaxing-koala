<template>
  <div class="reservation-form container mt-5">
    <h2 class="text-center mb-4">Book a Reservation</h2>
    <form @submit.prevent="submitReservation" class="form-group">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="user.email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date:</label>
        <input type="date" id="date" v-model="reservation.date" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="time" class="form-label">Time:</label>
        <input type="time" id="time" v-model="reservation.time" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="numberOfPeople" class="form-label">Number of People:</label>
        <input type="number" id="numberOfPeople" v-model="reservation.numberOfPeople" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="specialComments" class="form-label">Special Comments:</label>
        <textarea id="specialComments" v-model="reservation.specialComments" class="form-control"></textarea>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-success">Create Reservation</button>
        <button type="button" class="btn btn-primary" @click="openEditModal">Edit Reservation</button>
        <button type="button" class="btn btn-danger" @click="openDeleteModal">Delete Reservation</button>
      </div>
    </form>

    <!-- Edit Modal -->
    <div class="modal" tabindex="-1" v-if="showEditModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Reservation</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <input type="email" v-model="email" class="form-control" placeholder="Enter your email to edit reservation" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="fetchReservation">Fetch Reservation</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Reservation Modal -->
    <div class="modal" tabindex="-1" v-if="showEditReservationModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Reservation Details</h5>
            <button type="button" class="btn-close" @click="closeEditReservationModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="editFirstName" class="form-label">First Name:</label>
              <input type="text" id="editFirstName" v-model="user.firstName" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editLastName" class="form-label">Last Name:</label>
              <input type="text" id="editLastName" v-model="user.lastName" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editEmail" class="form-label">Email:</label>
              <input type="email" id="editEmail" v-model="user.email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editDate" class="form-label">Date:</label>
              <input type="date" id="editDate" v-model="reservation.date" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editTime" class="form-label">Time:</label>
              <input type="time" id="editTime" v-model="reservation.time" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editNumberOfPeople" class="form-label">Number of People:</label>
              <input type="number" id="editNumberOfPeople" v-model="reservation.numberOfPeople" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="editSpecialComments" class="form-label">Special Comments:</label>
              <textarea id="editSpecialComments" v-model="reservation.specialComments" class="form-control"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateReservation">Update Reservation</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal" tabindex="-1" v-if="showDeleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Reservation</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            <input type="email" v-model="email" class="form-control" placeholder="Enter your email to delete reservation" required>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="fetchReservationToDelete">Delete Reservation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservation: {
        date: '',
        time: '',
        numberOfPeople: '',
        specialComments: '',
      },
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
      email: '',
      showEditModal: false,
      showEditReservationModal: false,
      showDeleteModal: false,
    };
  },
  methods: {
    async submitReservation() {
      try {
        const requestBody = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          reservations: [
            {
              date: this.reservation.date,
              time: this.reservation.time,
              numberOfPeople: this.reservation.numberOfPeople,
              specialComments: this.reservation.specialComments,
            },
          ],
        };
        const response = await fetch('http://localhost:3000/api/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          alert('Reservation created successfully!');
          this.resetForm();
        } else {
          throw new Error('Error creating reservation');
        }
      } catch (error) {
        console.error('Error creating reservation:', error);
      }
    },
    resetForm() {
      this.reservation = {
        date: '',
        time: '',
        numberOfPeople: '',
        specialComments: '',
      };
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    openDeleteModal() {
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    async fetchReservation() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/${this.email}`);
        if (response.ok) {
          const data = await response.json();
          this.user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
          this.reservation = data.reservations[0]; // Assuming one reservation per user
          this.closeEditModal();
          this.showEditReservationModal = true; //open modal that receives reservation details
        } else {
          throw new Error('Reservation not found');
        }
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    },
    async fetchReservationToDelete() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/${this.email}`);
        if (response.ok) {
          const data = await response.json();
          this.user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
          this.reservation = data.reservations[0]; // Assuming one reservation per user
          this.closeDeleteModal();
          this.deleteReservation();
        } else {
          throw new Error('Reservation not found');
        }
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    },
    async updateReservation() {
      try {
        const requestBody = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          reservations: [
            {
              date: this.reservation.date,
              time: this.reservation.time,
              numberOfPeople: this.reservation.numberOfPeople,
              specialComments: this.reservation.specialComments,
            },
          ],
        };
        const response = await fetch(`http://localhost:3000/api/reservations/${this.email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          alert('Reservation updated successfully!');
          this.showEditReservationModal = false;
          this.resetForm();
        } else {
          throw new Error('Error updating reservation');
        }
      } catch (error) {
        console.error('Error updating reservation:', error);
      }
    },
    async deleteReservation() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/${this.email}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Reservation deleted successfully!');
          this.resetForm();
        } else {
          throw new Error('Error deleting reservation');
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    },
  },
};
</script>

<style scoped>
.reservation-form {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-label {
  font-weight: bold;
}
.form-control {
  padding: 10px;
}
.btn {
  min-width: 150px;
}
h2 {
  color: #333;
}
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  position: relative;
  margin: auto;
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Adjust for height */
  max-width: 500px;
  width: 100%;
}

.modal-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 15px;
}
.modal-body {
  padding: 20px 0;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #dee2e6;
  padding-top: 15px;
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
}
</style>
