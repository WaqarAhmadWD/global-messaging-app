<!-- Your existing template -->
<template>
  <Form v-if="schema" @submit="submitForm" class="rounded-lg border border-default-200 p-6" :class="{
    'w-1/2': custom_class === 0,
    'w-full': custom_class === 1,
    'border-0 w-full p-0': custom_class === 2,
  }" :validation-schema="schema">
    <div :class="{
      'mb-6 grid gap-6 lg:grid-cols-2 w-full': custom_class === 0,
      'mb-6 grid gap-6 lg:grid-cols-2': custom_class === 1,
      'grid gap-6 grid-cols-1': custom_class === 2,
    }">
      <div v-for="(field, index) in filter" :key="index" class="w-full">
        <label class="mb-2 block text-sm font-medium text-default-900" :for="field.name">{{ field.label }}</label>

        <!-- Textarea Field -->
        <Field v-if="field.type === 'textarea'" :id="field.name" v-model="props.model[field.name]" as="textarea"
          :placeholder="field.placeholder"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full" :class="field.class"
          :name="field.name" />
        <!-- multiInput -->
        <Field v-if="field.type === 'multiInput'" :id="field.name" v-model="props.model[field.name]"
          :placeholder="field.placeholder"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full" :class="field.class"
          :name="field.name" />
        <!-- multiselect -->
        <div class="card flex justify-center" v-if="field.type === 'multiselect'">
          <MultiSelect v-model="props.model[field.name]" :options="field.options" filter optionLabel="name"
            optionValue="id" :placeholder="field.placeholder" class="w-full md:w-80" />
        </div>

        <!-- Searchable Select Field -->
        <div v-if="field.type === 'searchableSelect'">
          <Select v-model="props.model[field.name]" :options="field.options" filter optionLabel="name"
            :placeholder="field.placeholder" class="w-full h-11 flex items-center">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
          <div v-if="!props.model[field.name]" class="text-red-500">
            {{ field.name }} is a required field
          </div>
        </div>

        <!-- Regular Select Field -->
        <Field v-if="field.type === 'select' && field.type !== 'searchableSelect'"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full"
          v-model="props.model[field.name]" :placeholder="field.placeholder" as="select" :name="field.name">
          <option v-for="option in field.options" :key="option.id" :value="option?.id ? option.id : option.name">
            {{ option.name }}
          </option>
        </Field>
        <!-- Text or Email Field -->
        <Field v-if="
          field.type === 'text' ||
          field.type === 'email' ||
          field.type === 'time' ||
          field.type === 'date' ||
          field.type === 'number'
        " :id="field.name" v-model="props.model[field.name]" :type="field.type" :placeholder="field.placeholder"
          class="rounded-lg border border-default-200 px-4 py-2.5 dark:bg-default-50 w-full" :class="field.class"
          :name="field.name" />

        <!-- Custom Checkbox -->
        <div v-if="field.type === 'checkbox'" class="flex flex-col gap-[1vw]">
          <div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" v-model="props.model[field.name]" :id="field.name"
                :name="field.name" />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-300 peer-checked:after:translate-x-full peer-checked:bg-[#f48220] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:border-white">
              </div>
            </label>
          </div>
        </div>

        <!-- Password Field with Show/Hide Toggle -->
        <div class="rounded-lg border border-default-200 outline-none  w-full flex justify-between items-center "
          v-if="field.type === 'password'">
          <Field :id="field.name" v-model="props.model[field.name]" :type="field.showPass ? 'text' : 'password'"
            :placeholder="field.placeholder"
            class="w-full h-full border-0 ring-0 outline-none focus:outline-none focus:ring-0" :class="field.class"
            :name="field.name" />
          <AkEyeSlashed class="cursor-pointer w-5 h-5" v-if="field.showPass" @click="togglePass(index)" />
          <AkEyeOpen class="cursor-pointer w-5 h-5" v-if="!field.showPass" @click="togglePass(index)" />
        </div>

        <!-- Error Message -->
        <div class="mt-1">
          <ErrorMessage class="text-red-500" :name="field.name" />
        </div>
      </div>
    </div>
    <slot name="rest"></slot>

    <!-- Submit Button -->
    <div class="w-full flex justify-end">
      <!-- <div class="">wat as;ldfkasldkf</div> -->
      <button type="submit"
        class="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary"
        :class="{ 'w-full ': custom_class === 2 }">
        <slot name="button"></slot>
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
          stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Submit
      </button>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import { AkEyeSlashed, AkEyeOpen } from "@kalimahapps/vue-icons";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  model: {
    type: Object,
    required: true,
  },
  custom_class: {
    required: false,
  },
});

const filter = ref();

const schema = ref();

const togglePass = (index) => {
  const field = filter.value[index];
  if (field && field.type === "password") {
    field.showPass = !field.showPass;
  }
};

onMounted(async () => {
  if (props?.fields?.length > 0) {
    filter.value = props.fields.map((field) => {
      if (field.type === "password") {
        field.showPass = field.showPass || false;
      }
      if (field.type === "searchableSelect") {
        field.options = field.options || [];
      }
      return field;
    });
  }
  // Initialize the first option as default for select fields
  const selectField = props.fields.find(
    (field) => field.type === "select" || field.type === "searchableSelect"
  );
  if (selectField && selectField.options.length > 0) {
    props.model[selectField.name] =
      selectField.options[0].id || selectField.options[0].name;
  }

  // schema for fields
  schema.value = await yup.object(
    props.fields.reduce((result, field) => {
      let validationRule = yup.mixed();

      if (field.schema) {
        const methods = [...field.schema.matchAll(/\.([a-zA-Z]+)\(([^)]*)\)/g)];
        // yup.string.required()
        let schema;
        if (methods[0][1] === "string") {
          schema = yup.string();
        } else if (methods[0][1] === "number") {
          schema = yup.number();
        } else {
          schema = yup.mixed();
        }

        methods.slice(1).forEach(([_, method, args]) => {
          const parsedArgs = args
            ? args
              .split(",")
              .map((arg) =>
                arg.trim().startsWith("'") || arg.trim().startsWith('"')
                  ? arg.trim().slice(1, -1)
                  : Number(arg.trim())
              )
            : [];

          // Check if method exists on schema and apply it with parsed arguments
          if (typeof schema[method] === "function") {
            schema = schema[method](...parsedArgs);
          }
        });

        validationRule = schema;
      } else if (field.type === "checkbox") {
        validationRule = yup
          .boolean()
          .oneOf([true], `${field.label} must be accepted`);
      }

      result[field.name] = validationRule || yup.mixed();
      return result;
    }, {})
  );
});

const emit = defineEmits(["submit"]);
const submitForm = async () => {
  props.fields.map((e) => {
    if (e.type === "multiInput") {
      const value = props.model[e.name] || "";
      props.model[e.name] =
        typeof value === "string"
          ? value.split(",").map((item) => item.trim())
          : value;
    }
    return 0;
  });
  const isValid = await props.fields.every((field) => {
    if (field.type === "searchableSelect") {
      // Check if the corresponding model field is filled
      return !!props.model[field.name];
    }
    // For other field types, just return true (or apply any other checks if needed)
    return true;
  });
  if (isValid) {
    emit("submit", props.model);
    // Initialize the first option as default for select fields
    const selectField = props.fields.find(
      (field) => field.type === "select" || field.type === "searchableSelect"
    );
    if (selectField && selectField.options.length > 0) {
      props.model[selectField.name] = selectField.options[0].name;
    }
  } else {
    // Handle the case when validation fails (e.g., show an error message)
    console.log("Validation failed: Some searchableSelect fields are empty.");
  }
};
</script>

<style scoped></style>
