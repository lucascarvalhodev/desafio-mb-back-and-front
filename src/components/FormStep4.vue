<script setup>
    import { reactive, onMounted } from 'vue'

    const props = defineProps({
      initialState: Object,
      onNext: Function,
      onBack: Function,
    })

    const state = reactive({ 
      data: {},
    })
    
    onMounted(() => {
      const initialState = props.initialState

      state.data = initialState
    })

    function next() {
      props.onNext()
    }

    function back() {
      props.onBack()
    }
</script>

<template>
  <div>
    <div class="title">Revise suas informações</div>
    <div class="mb-10">
      <div class="input-box">
        <label class="label" >Endereço de e-mail</label>
        <input class="input" :value="state.data.email" disabled />
      </div>
      <div class="input-box">
        <label class="label" >{{ state.data.person === "PJ" ? "Razão social" : "Nome" }}</label>
        <input class="input" :value="state.data.person === 'PJ' ? state.data.corporateName : state.data.name" disabled />
      </div>
      <div class="input-box">
        <label class="label" >{{ state.data.person === "PJ" ? "CNPJ" : "CPF" }}</label>
        <input class="input" :value="state.data.person === 'PJ' ? state.data.document : state.data.document" disabled />
      </div>
      <div class="input-box">
        <label class="label" >{{ state.data.person === "PJ" ? "Data de abertura" : "Data de nascimento" }}</label>
        <input type="date" class="input" :value="state.data.person === 'PJ' ? state.data.openingDate : state.data.birthDate" disabled />
      </div>
      <div class="input-box">
        <label class="label" >Telefone</label>
        <input class="input" :value="state.data.phoneNumber" disabled />
      </div>
      <div class="input-box">
        <label class="label" >Sua senha</label>
        <input type="password" class="input" :value="state.data.password" disabled />
      </div>
    </div>
    <div class="flex gap-10">
      <button class="button button-outline" @click="back">Voltar</button>
      <button class="button" @click="next">Continuar</button>
    </div>
  </div>
</template>

