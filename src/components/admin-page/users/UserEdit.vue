<template>
  <v-dialog
    v-if="formattedUser"
    v-model="dialog"
    width="80vw">
    <v-card>
      <v-card-title>
        <span class="text-h5">Manage user subscriptions</span>
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="2">
            <span class="text-h6">User</span>
          </v-col>
          <v-col cols="10">
            <v-chip class="user-chip">
              {{ user.email }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
      <UserAddProduct
        :user="user"
        @updateTable="handleTableUpdate" />
      <UserProductManage
        :user="user"
        @updateTable="handleTableUpdate" />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { differenceBy } from 'lodash-es';
import { nextTick, onMounted, ref, watch } from 'vue';
import { getProducts } from '../../../services/api.js';
import UserAddProduct from './UserAddProduct.vue';
import UserProductManage from './UserProductManage.vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => {},
  },
  userId: {
    type: Number,
    required: true,
    default: () => null,
  },
});
const emit = defineEmits(['closeModal', 'updateTable']);

const dialog = ref(true);
const form = ref(null);

const allProductList = ref([]);
const availableProductList = ref([]);

const initialUserDetails = ref({});
const formattedUser = ref(null);
const editedFields = ref({});

function handleInputChange(value, key, inputType) {
  const initialFieldValue = initialUserDetails.value[key];
  const editedFieldValue = value === -1 ? null : value;

  if (initialFieldValue === editedFieldValue) {
    delete editedFields.value[key];
    return;
  }

  if (inputType === 'checkbox') editedFields.value[key] = +editedFieldValue;
  else if (inputType === 'select') editedFields.value[key] = editedFieldValue?.id;
  else editedFields.value[key] = editedFieldValue;
}

const setInitialData = () => {
  formattedUser.value = { ...props.user };
  initialUserDetails.value = JSON.parse(JSON.stringify(props.user));
};

async function loadProductList() {
  const response = await getProducts();
  allProductList.value = [...response?.free_products, ...response?.subscription_products] || [];
  availableProductList.value = differenceBy(allProductList.value, props.user.products, 'id');
}

function handleTableUpdate() {
  emit('updateTable');
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedFields.value = {};
    emit('closeModal');
  });
}

watch(dialog, (val) => {
  val || close();
});

onMounted(() => {
  setInitialData();
  loadProductList();
});
</script>

<style lang="scss" scoped>
.user-chip {
  margin: 0.25rem;
}
</style>
