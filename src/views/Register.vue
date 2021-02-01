<template>
  <div class="register-page">
    <div class="card">
      <div class="header-container">
        <div v-if="score <= 0">
          <i class="fa fa-user"/>
        </div>
        <div class="row justify-content-center" v-if="score > 0 ">
          <div class="col-md-12 text-center">
            <span class="display-1 d-block">PUAN {{ score }}</span>
            <div class="mb-4 lead">RESULT</div>
            <a href="/form" class="btn btn-link">Back to Game</a>
          </div>
        </div>
      </div>
      <div v-if="errorMessage">
        <div  class="alert alert-danger" role="alert">
          {{errorMessage}}
        </div>
        <a href="/form" class="btn btn-link">Back to Game</a>
      </div>

      <form name="form" @submit.prevent="handleRegister" novalidate :class="submitted ? 'was-validated' : ''">
        <div class="form-group">
          <label for="idNumber">Tc Kimlik No: </label>
          <input type="text" v-model="formData.id" class="form-control" name="idNumber" id="idNumber" placeholder="TC Kimlik Numarası" required minlength="11"  maxlength="11"/>
          <div class="invalid-feedback">
            Lütfen Geçerli bir Tc Kimlik No Giriniz.
          </div>
        </div>

        <div class="form-group">
          <label for="name">Ad: </label>
          <input type="text" v-model="formData.name" class="form-control" name="name" id="name" placeholder="Ad" required />
          <div class="invalid-feedback">
            A valid name is required.
          </div>
        </div>

        <div class="form-group">
          <label for="surname">Soyad: </label>
          <input type="text" v-model="formData.surname" class="form-control" name="surname" id="surname" placeholder="Soyad" required />
          <div class="invalid-feedback">
            A valid surname is required.
          </div>
        </div>

        <div class="form-group">
          <label for="city">Şehir:</label>
          <select v-model="formData.cityCode" class="form-control" name="city" id="city" required>
            <option selected value="">Şehir</option>
            <option v-for="c in cities" v-bind:key="c.id"  v-bind:value="c.id">
              {{ c.text }}
            </option>
          </select>
          <div class="invalid-feedback">
            City is required.
          </div>
        </div>

        <div class="form-group">
          <label for="salary">Aylık Gelir:</label>
          <select v-model="formData.salaryId" class="form-control" name="salary" id="salary" required>
            <option selected value="">Aylık Gelir</option>
            <option v-for="s in salaries" v-bind:key="s.id"  v-bind:value="s.id">
              {{ s.text }}
            </option>
          </select>
          <div class="invalid-feedback">
            Salary is required.
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Telefon No: </label>
          <input type="text" v-model="formData.phoneNumber" class="form-control" name="phone" id="phone" placeholder="Telefon Numarası" required minlength="11"  maxlength="11"/>
          <div class="invalid-feedback">
            Lütfen geçerli bir Telefon No giriniz.
          </div>
        </div>


        <div v-if="!errorMessage && !score">
          <button class="btn btn-primary btn-block" @click="submitted = true" :disabled="loading">Sonucu Öğren</button>
        </div>
      </form>


    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import CityService from '../services/city.service';
import SalaryService from '../services/salary.service';
import User from '../models/user';


export default {
  name: 'register',
  data() {
    return {
      formData: new User('', '', '', '', '', ''),
      loading: false,
      submitted: false,
      errorMessage: '',
      cities:[],
      salaries:[],
      score:0

    };
  },
  methods: {

    pullCities() {
      CityService.cities().then(
          response => {
            this.cities = response.data.resultList;
          },
          error => {
            console.log(error);
            if (error.response.status === 500) {
              console.log( 'Unexpected error occurred : ' + ((error && error.errorMessage) || (error)));
              this.$router.push('/500');
            } else if (error.response.status === 409) {
              this.errorMessage = error.response.data;
            }
          }
      )
    },

    pullSalaries() {
      SalaryService.salaries().then(
          response => {
            this.salaries = response.data.resultList;
          },
          error => {
            console.log(error);
            if (error.response.status === 500) {
              console.log( 'Unexpected error occurred : ' + ((error && error.errorMessage) || (error)));
              this.$router.push('/500');
            } else if (error.response.status === 409) {
              this.errorMessage = error.response.data;
            }
          }
      )
    },



    handleRegister() {
      if (!this.formData.id || !this.formData.name || !this.formData.surname || !this.formData.salaryId || !this.formData.cityCode || !this.formData.phoneNumber) {
        return;
      }
      this.loading = true;
      UserService.register(this.formData).then(
          (response) => {
            console.log(response);
            this.score=response.data.response;
          },
          error => {
            console.log(error);
            if (error.response.status === 500) {
              console.log( 'Unexpected error occurred : ' + ((error && error.errorMessage) || (error)));
              this.$router.push('/500');
            } else if (error.response.status === 409) {
              this.errorMessage = error.response.data;
            }
          },
      ).then(() => {
        this.loading = false;
      });
    },

  },
  mounted(){
    this.pullCities();
    this.pullSalaries();
  }
};
</script>

<style scoped>
.card {
  max-width: 350px!important;
  padding: 40px;
  background-color: #f7f7f7;
  margin: 50px auto 25px;
}
.header-container {
  text-align: center;
  margin-bottom: 20px;
}

.header-container i {
  font-size: 80px;
}

.card-link {
  text-align: center;
  margin-top: 10px;
}
</style>
