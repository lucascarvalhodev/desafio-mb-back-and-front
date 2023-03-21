<script setup>
  import { reactive } from 'vue'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import FormStep1 from './FormStep1.vue'
  import FormStep2PF from './FormStep2PF.vue'
  import FormStep2PJ from './FormStep2PJ.vue'
  import FormStep3 from './FormStep3.vue'
  import FormStep4 from './FormStep4.vue'

  const state = reactive({
    currentStep: 1,
    maxStep: 4,
    data: {}
  })

  function onNext(data = {}) {
    state.data = {
      ...state.data,
      ...data
    }
    if(state.currentStep < state.maxStep) {
      state.currentStep = state.currentStep + 1
    } else {
      onComplete()
    }
  }

  function onBack() {
    if(state.currentStep > 1)
      state.currentStep = state.currentStep - 1
  }

  function onComplete() {
    axios.post('http://127.0.0.1:3000/registration', state.data).then(res => {
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
      })

      state.data = {}
      state.currentStep = 1
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
</script>

<template>
  <div>
    <div class="step-info">Etapa <span class="text-orange">{{ state.currentStep }}</span> de 4</div>
    <FormStep1 v-if="state.currentStep === 1" :onNext="onNext" :initialState="state.data" />
    <FormStep2PF v-if="state.currentStep === 2 && state.data.person === 'PF'" :onNext="onNext" :onBack="onBack" :initialState="state.data" />
    <FormStep2PJ v-if="state.currentStep === 2 && state.data.person === 'PJ'" :onNext="onNext" :onBack="onBack" :initialState="state.data" />
    <FormStep3 v-if="state.currentStep === 3" :onNext="onNext" :onBack="onBack" :initialState="state.data" />
    <FormStep4 v-if="state.currentStep === 4" :onNext="onNext" :onBack="onBack" :initialState="state.data" />
  </div>
</template>

