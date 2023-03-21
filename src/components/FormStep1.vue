<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import { object, string } from 'yup'

    const props = defineProps({
      initialState: {
        email: String | undefined,
        person: String | undefined,
      },
      onNext: Function,
      onBack: Function,
    })

    const errors = ref([])
    const state = reactive({ 
      email: undefined,
      person: undefined,
    })
    
    onMounted(() => {
      const { email, person } = props.initialState

      state.email = email
      state.person = person
    })

    async function next() {
      let schema = object({
        email: string().email().required(),
        person: string().required(),
      });

      try {
        await schema.validate(state, {abortEarly: false})

        props.onNext(state)
      } catch(e) {
        errors.value = e.errors
      }
    }
</script>

<template>
  <div>
    <div class="title">Seja bem vindo(a)</div>
    <div class="mb-10">
      <div class="input-box">
        <label class="label" >Endereço de e-mail</label>
        <input class="input" v-model="state.email"  />
      </div>
      <div class="flex gap-10">
        <input type="radio" id="one" value="PF" v-model="state.person" />
        <label class="label" for="one">Pessoa física</label>
        <input type="radio" id="two" value="PJ" v-model="state.person" />
        <label class="label" for="two">Pessoa jurídica</label>
      </div>
    </div>
    <div class="box-errors mb-10" v-if="errors.length != 0">
      <div v-for="error in errors" :key="error">{{error}}</div>
    </div>
    <div class="flex gap-10">
      <button class="button" @click="next">Continuar</button>
    </div>
  </div>
</template>


