<template>
  <div id="app">
    <el-row class="merge-image">
      <el-col :span="8" class="merge-image__left">
        <div class="sub-title">Name</div>
        <el-input placeholder="Please input" v-model="input"></el-input>
      </el-col>
      <el-col :span="4" class="merge-image__right">
        <el-button style="margin-left: 10px;" size="small" type="success">Merge Images</el-button>
      </el-col>
    </el-row>

    <el-upload
      action="#"
      list-type="picture-card"
      ref="upload"
      :auto-upload="false"
      accept="image/png, image/jpeg"
      multiple>
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'App',

    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        input: ''
      };
    },

    methods: {
      handleRemove(file) {
        console.log(file);
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>

<style>
  .merge-image {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .merge-image__left {
    display: flex;
    align-items: center;
  }

  .merge-image__left .sub-title {
    padding-right: 20px;
  }
</style>
