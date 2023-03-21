<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import { object, string, date } from 'yup'

    const props = defineProps({
      initialState: {
        corporateName: String | undefined,
        document: String | undefined,
        openingDate: String | undefined,
        phoneNumber: String | undefined,
      },
      onNext: Function,
      onBack: Function,
    })

    const errors = ref([])
    const state = reactive({ 
      corporateName: undefined,
      document: undefined,
      openingDate: undefined,
      phoneNumber: undefined,
    })
    
    onMounted(() => {
      const { corporateName, document, openingDate, phoneNumber } = props.initialState

      state.corporateName = corporateName
      state.document = document
      state.openingDate = openingDate
      state.phoneNumber = phoneNumber
    })

    async function next() {
      let schema = object({
        corporateName: string().required(),
        document: string().required().min(14).max(14),
        openingDate: date().required(),
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
    <div class="title">Pessoa Jurídica</div>
    <div class="mb-10">
      <div class="input-box">
        <label class="label" >Razão social</label>
        <input class="input" v-model="state.corporateName"  />
      </div>
      <div class="input-box">
        <label class="label" >CNPJ</label>
        <input class="input" type="number" v-model="state.document" maxlength="14" />
      </div>
      <div class="input-box">
        <label class="label" >Data de abertura</label>
        <input type="date" class="input" v-model="state.openingDate"  />
      </div>
      <div class="input-box">
        <label class="label" >Telefone</label>
        <input class="input" type="number" v-model="state.phoneNumber" maxlength="11" />
      </div>
    </div>
    <div class="box-errors mb-10" v-if="errors.length != 0">
      <div v-for="error in errors" :key="error">{{error}}</div>
    </div>
    <div class="flex gap-10">
      <button class="button button-outline" @click="back">Voltar</button>
      <button class="button" @click="next">Continuar</button>
    </div>
  </div>
</template>


