<template>
  <q-dialog v-model="modelValue" @show="onShow" @hide="onHide">
    <q-card>
      <q-card-section>
        <div class="text-h6" v-text="`${isEdit ? 'ویرایش محصول' : 'افزودن محصول جدید'}`"></div>
      </q-card-section>

      <q-form greedy @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="form.name"
            :rules="[requiredRule]"
            label="نام محصول"
          />

          <q-input
            v-model="form.price"
            :rules="[requiredRule]"
            label="قیمت محصول"
            type="number"
          />

          <q-input
            v-model="form.description"
            :rules="[requiredRule]"
            label="توضیحات محصول"
            type="textarea"
          />

          <q-input
            v-model="form.image"
            label="تصویر محصول"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="submit"
            label="ذخیره"
            color="primary"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { api } from 'boot/axios';
import { requiredRule } from 'src/utils/rules';

const emits = defineEmits(['success', 'update']);


const modelValue = defineModel({
  default: false
});

const data = inject('data');

const initialData = {
  name: null,
  price: null,
  description: null,
  image: null
};

const form = ref(initialData);
const loading = ref(false);

const isEdit = computed(() => !!data.value?.id);

async function onSubmit() {
  loading.value = true;

  try {
    const config = {
      url: isEdit.value
        ? `https://6763b5f717ec5852cae9ae16.mockapi.io/clothing/${data.value.id}`
        : 'https://6763b5f717ec5852cae9ae16.mockapi.io/clothing',
      method: isEdit.value ? 'put' : 'post',
      data: form.value,
    };

    const { data: formData } = await api(config);

    modelValue.value = false;

    const emitName = isEdit.value ? 'update' : 'success';

    emits(emitName, formData); 
  } catch (error) {
    console.error('Error in onSubmit:', error);
  } finally {
    loading.value = false;
  }
}


function onShow() {
  form.value = data.value ? { ...data.value } : initialData;
}

function onHide() {
  data.value = {}; 
  form.value = initialData; 
}
</script>
