<template>
  <div id="app">
    <div class="pt-wrapper">
      <div class="pt-container">
        <div class="pt-img-header mb-100">
          <h1>ツールアプリ写真ジョイナー</h1>
        </div>
        <div class="pt-img__body">
          <div class="pt-img__body__box mb-100">

            <div class="left">

              <label for="name">
                名前
                <input type="text" placeholder="ファイル名を書き込む..." id="name">
              </label>
            </div>

            <div class="right">
              <button @click="clearImages()">
                晴れ
              </button>
              <button :disabled="!fileRecordsForUpload.length" @click="mergeFiles()">
                マージ
              </button>
            </div>
          </div>
          <div class="pt-img__body__add">
            <VueFileAgent
              ref="vueFileAgent"
              :multiple="true"
              :deletable="true"
              :meta="true"
              :accept="'image/*'"
              :maxFiles="14"
              :helpText="'画像ファイルを選択'"
              @select="filesSelected($event)"
              @delete="fileDeleted($event)"
              v-model="fileRecords">
            </VueFileAgent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',

    data() {
      return {
        fileRecords: [],
        fileRecordsForUpload: []
      };
    },

    methods: {
      mergeFiles() {
        console.log(this.$refs.vueFileAgent.fileRecords);
      },

      clearImages() {
        console.log('aa');
        this.fileRecords = [];
        this.fileRecordsForUpload = [];
      },

      filesSelected: function (fileRecordsNewlySelected) {
        const validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },

      fileDeleted(fileRecord) {
        const i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  #app {
    /deep/ .vue-file-agent.file-input-wrapper {
      border: 2px solid #f9f9f9;
      text-align: center;
    }

    /deep/ .vue-file-agent .file-preview {
      .file-name,
      .image-dimension,
      .file-ext,
      .file-size {
        display: none;
      }

      .file-delete {
        font-size: 25px;
        height: 25px;
        width: 25px;
      }

      .help-text {
        margin-top: 20px;
      }
    }

    /deep/ .file-preview-wrapper {
      width: 12%;
      margin: 5px !important;
    }

    .pt-wrapper {
      .pt-container {
        padding: 0 15%;
        margin-top: 100px;

        .pt-img-header {
          text-align: center;
          font-size: 25px;
        }

        .pt-img__body__box {
          display: flex;
          justify-content: space-between;
          align-content: center;

          .left {
            input {
              border: 1px solid #ddd;
              padding: 10px 30px;
              margin-left: 15px;
            }
          }

          .right {
            button:first-child {
              margin-right: 10px;
            }

            button {
              width: 110px;
              padding: 10px 30px;
              background: none;
              border: 1px solid #ddd;

              &:focus {
                outline: none;
              }
            }
          }
        }
      }
    }

    .mb-100 {
      margin-bottom: 100px;
    }

  }
</style>
