<template>
    <q-page >
      <q-table
        title="لیست محصولات"
        :rows="rows"
        :columns="columns"
        class="q-mt-lg no-shadow"
        rows-per-page-label=" رکورد در هر صفحه"
        no-data-label="هیچ محصولی یافت نشد"
>
      >
        <template #top-right>
          <q-btn
            label="افزودن محصول جدید"
            color="primary"
            class="text-black text-weight-medium"
            @click="productFormModal = true"
          />
        </template>
  
        <template #body-cell-image="props">
          <q-td :props="props">
            <q-avatar size="60px">
              <img :src="props.value">
            </q-avatar>
          </q-td>
        </template>
  
        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="q-gutter-sm ">
              <q-btn
                class="text-black no-shadow"
                icon="edit"
                label='ویرایش'
                color="accent"
                @click="editProduct(props.row)"
              />
              <q-btn
                class="text-black no-shadow"
                icon="delete"
                label="حذف"
                color="red-1"
                @click="deleteProduct(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
  
      <q-dialog v-model="deleteDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              آیا مطمئن هستید که می‌خواهید محصول
              <span class="text-bold">{{ productToDelete?.name }}</span>
              را حذف کنید؟
            </div>
          </q-card-section>
  
          <q-card-actions>
            <q-btn flat label="لغو" color="primary" @click="deleteDialog = false" />
            <q-btn flat label="حذف" color="negative" @click="confirmDeleteProduct" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <product-form
        v-model="productFormModal"
        @success="onSuccess"
        @update="onUpdate"
      />
    </q-page>
  </template>
  
  <script setup>
  import { provide, ref } from 'vue'
  import { api } from 'boot/axios'
  import ProductForm from 'components/ProductForm.vue'
  
  const columns = [
    {
      name: 'name',
      label: 'نام محصول',
      align: 'left',
      field: 'name',
      sortable: true
    },
    {
      name: 'price',
      label: ' قیمت به تومان',
      align: 'left',
      field: 'price',
      sortable: true
    },
    {
      name: 'image',
      label: 'تصویر',
      align: 'left',
      field: 'image',
      sortable: false
    },
    {
      name: 'actions',
      label: 'عملیات',
      align: 'right',
      sortable: false
    }
  ]
  
  const rows = ref([])
  const productData = ref({})
  const productFormModal = ref(false)
  const deleteDialog = ref(false)
  const productToDelete = ref(null)
  
  async function fetchProducts() {
    const { data } = await api.get('https://6763b5f717ec5852cae9ae16.mockapi.io/clothing')
    rows.value = data
  }
  
  async function deleteProductRequest(id) {
    await api.delete(`https://6763b5f717ec5852cae9ae16.mockapi.io/clothing/${id}`)
  }
  
  function findRowIndex(dataId) {
    return rows.value.findIndex(({ id }) => id === dataId)
  }
  
  function onSuccess(data) {
    rows.value.unshift(data)
  }
  
  function onUpdate(data) {
    const rowIndex = findRowIndex(data.id)
    rows.value[rowIndex] = data
  }
  
  function editProduct(data) {
    productData.value = data
    productFormModal.value = true
  }
  
  function openDeleteDialog(product) {
    productToDelete.value = product
    deleteDialog.value = true
  }
  
  async function confirmDeleteProduct() {
    if (productToDelete.value) {
      await deleteProductRequest(productToDelete.value.id)
  
      const rowIndex = findRowIndex(productToDelete.value.id)
      rows.value.splice(rowIndex, 1)
  
      deleteDialog.value = false
      productToDelete.value = null
    }
  }
  
  function deleteProduct(product) {
    openDeleteDialog(product)
  }
  
  fetchProducts()
  provide('data', productData)

  
  </script>
  