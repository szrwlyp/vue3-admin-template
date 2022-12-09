<script lang="ts" setup>
import { ref, toRefs, computed, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type {
  UploadCompOptions,
  formItemArrTypes,
} from "@/types/elementPlusTypes";
import type {
  UploadProps,
  UploadUserFile,
  UploadFile,
  UploadFiles,
} from "element-plus";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";

const { set_sessionIdStore } = storeToRefs(useUserInfoStore());

interface Props {
  formItemData: formItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);
console.log(import.meta.env.VITE_BASE_URL);

const uploadUrl = `${
  import.meta.env.VITE_BASE_URL
}/vpas/radar-server/resource-upload`;

// const { checkboxArr, width } = toRefs(
//   props.formItemData.uploadCompOptions as UploadCompOptions
// );

const fileListFormat = () => {
  return props.formModel[model.value].map((item: any) => {
    if (typeof item === "object" && Reflect.has(item, "url")) {
      return item;
    } else {
      return (item = { url: item });
    }
  });
};

const fileList = ref<UploadUserFile[]>(fileListFormat());
console.log(fileList.value);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const disabled = ref(false);
const updateParams = {
  sessionid: set_sessionIdStore.value,
  module: 7,
  jsonparam: JSON.stringify({ appid: "" }),
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

// 文件上传成功时的钩子
const handleSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  if (response.code == 0) {
    props.formModel[model.value].push(response.data);
  }
};

// 文件上传失败时的钩子
const handleError = (
  error: Error,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log(error);
};

const handleDownload = (uploadFile: any) => {
  console.log(uploadFile);
};

onMounted(() => {
  // fileListComputed();
});
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-upload
      v-model="formModel[model]"
      :action="uploadUrl"
      :file-list="fileList"
      list-type="picture-card"
      name="file"
      :data="updateParams"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file, file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
