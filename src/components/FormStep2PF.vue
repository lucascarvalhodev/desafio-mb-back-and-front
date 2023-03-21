<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import { object, string, date } from 'yup'

    const props = defineProps({
      initialState: {
        name: String | undefined,
        document: String | undefined,
        birthDate: String | undefined,
        phoneNumber: String | undefined,
      },
      onNext: Function,
      onBack: Function,
    })

    const errors = ref([])
    const state = reactive({ 
      name: undefined,
      document: undefined,
      birthDate: undefined,
      phoneNumber: undefined,
    })
    
    onMounted(() => {
      const { name, document, birthDate, phoneNumber } = props.initialState

      state.name = name
      state.document = document
      state.birthDate = birthDate
      state.phoneNumber = phoneNumber
    })

    async function next() {
      let schema = object({
        name: string().required(),
        document: string().required().min(11).max(11),
        birthDate: date().required(),
        phoneNumber: string().required().min(10).max(11)
      });

      try {
        await schema.validate(state, {abortEarly: false})

        props.onNext(state)
      } catch(e) {
        errors.value = e.errors
      }
    }

    function back() {
      props.onBack()
    }

</script>

<template>
  <div>
    <div class="title">Pessoa Física</div>
    <div class="mb-10">
      <div class="input-box">
        <label class="label" >Nome</label>
        <input class="input" v-model="state.name"  />
      </div>
      <div class="input-box">
        <label class="label" >CPF</label>
        <input class="input" type="number" v-model="state.document" maxlength="11" />
      </div>
      <div class="input-box">
        <label class="label" >Data de nascimento</label>
        <input type="date" class="input" v-model="state.birthDate"  />
      </div>
      <div class="input-box">
        <label class="label" >Telefone</label>
        <input class="input" type="number" v-model="state.phoneNumber" maxlength="11" />
      </div>
    </div>
    <div class="box-errors mb-10" v-if="errors.length != 0">
      <div v-for="error in errors" :key="error">{{ error }}</div>
    </div>
    <div class="flex gap-10">
      <button class="button button-outline" @click="back">Voltar</button>
      <button class="button" @click="next">Continuar</button>
    </div>
  </div>
</template>
