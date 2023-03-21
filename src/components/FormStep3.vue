<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import { object, string } from 'yup'

    const props = defineProps({
      initialState: {
        password: String | undefined,
      },
      onNext: Function,
      onBack: Function,
    })

    const errors = ref([])
    const state = reactive({ 
      password: undefined,
    })
    
    onMounted(() => {
      const { password } = props.initialState

      state.password = password
    })

    async function next() {
      let schema = object({
        password: string().required()
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
    <div class="title">Senha de acesso</div>
    <div class="mb-10">
      <div class="input-box">
        <label class="label" >Sua senha</label>
        <input type="password" class="input" v-model="state.password"  />
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


