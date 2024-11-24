<template>
  <div class="lg:w-[75rem] md:w-[83.3%] px-8 pt-[1.875em] mx-auto" v-if="model && fields">
    <img src="/images/logo.svg" alt="Logo" class="w-[7.75rem] md:mx-8" />

    <div class="flex justify-between md:gap-[5.9375rem] md:p-8">
      <img src="/images/signup.svg" alt="Logo" class="h-full hidden lg:block" />
      <div class="grow">
        <div>
          <h1 class="text-[2.625rem] font-bold mb-[1.3125rem]">Sign up</h1>
          <p class="mb-[2.0625rem]">
            Let’s get you all set up so you can access your personal account.
          </p>
        </div>

        <FormD :model="model" :fields="fields" @submit="formModel" :rest="formRest" />

        <div class="flex justify-center items-center mb-4">
          Already have an account?
          <router-link to="/auth/login" class="text-[#A052C6]">Login</router-link>
        </div>
        <div class="flex justify-between items-center flex-col md:flex-row gap-4">
          <p>Or Sign up with</p>
          <div class="border-[1px] border-black px-16 py-4 rounded-lg">
            google
          </div>
          <div class="border-[1px] border-black px-16 py-4 rounded-lg">
            facebook
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-screen w-screen flex justify-center items-center animate-pulse ">
    <div class="h-[70vh] w-[70vw] bg-gray-200 rounded-xl dark:bg-gray-700 lg:mb-2  justify-self-start">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormD from '../../components/dynamic_component/form.vue';
import { useApiStore } from '@/stores/apiStore';

const router = useRouter();
const store = useApiStore();

// Define form fields
const fields = ref([
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true, min: 2, max: 50 } },
  { name: 'userId', label: 'Username', type: 'text', placeholder: 'Enter your name', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true, min: 2, max: 50 } },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true, email: true } },
  { name: 'birthday', label: 'Birthday', type: 'date', placeholder: 'Enter your birth date', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true } },
  { name: 'type', label: 'Account Type', type: 'select', placeholder: 'Enter type', options: [{ id: 1, name: 'private' }, { id: 2, name: 'public' }], class: 'border-2 border-gray-300 rounded-lg p-2 col-span-2', validation: { required: true } },
  { name: 'gender', label: 'Gender', type: 'select', placeholder: 'Select your gender', options: [{ id: 1, name: 'male' }, { id: 2, name: 'female' }, { id: 3, name: 'Prefer not to say' }], class: 'border-2 border-gray-300 rounded-lg p-2 col-span-2', validation: { required: true } },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true } },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter your password again', class: 'border-2 border-gray-300 rounded-lg p-2', validation: { required: true } }
]);

// Define form data model
const model = ref({
  name: '',
  userId: '',
  email: '',
  password: '',
  birthday: '',
  type: '',
  confirmPassword: '',
  gender: '',
  terms: false
});

// Define form submission handler
const formModel = async (data) => {
  // if (!model.value.terms) {
  //   store.fetchData({ throwMe: 'Terms must be provided' });
  //   return;
  // }

  const result = await store
    .fetchData({ url: '/auth/create', method: 'POST', data })
    .then((res) => res)
    .catch((err) => err);

  if (result.token && result.user) {
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('Authorization', result.token);
    router.push('/');
  }
};

// Terms checkbox and additional form elements
const formRest = {
  template: `
    <div class="flex gap-2 col-span-2 items-center">
      <input type="checkbox" class="w-4 h-4" v-model="model.terms" />
      <div class="flex gap-1">
        <p class="text-[10px] md:text-[16px]">I agree to all the</p>
        <p class="text-[10px] md:text-[16px]"><span class="text-[#A052C6]">Terms</span> and clear</p>
        <p class="text-[10px] md:text-[16px]"><span class="text-[#A052C6]">Privacy Policies</span></p>
      </div>
    </div>
  `
};
</script>

<style scoped>
/* Add any additional styles as needed */
</style>
