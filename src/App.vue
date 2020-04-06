<template>
  <div id="app">
    <div class="pt-wrapper">
      <div class="pt-container">
        <div class="pt-img-header">
          <h2>TOOL APP PHOTO JOINER</h2>
        </div>
        <div class="pt-img__body">
          <div class="pt-img__body__box mb-30">
            <button class="btn-light" @click="clearImages()">
              Clear
            </button>
            <button class="btn-info" :disabled="!fileRecordsForUpload.length" @click="mergeFiles()">
              Merge
            </button>
          </div>
          <div class="pt-img__body__add">
            <VueFileAgent
              ref="vueFileAgent"
              :multiple="true"
              :deletable="true"
              :meta="true"
              :accept="'image/*'"
              :maxFiles="10"
              :helpText="'Choose Image Files'"
              :useDragHandle="true"
              @select="filesSelected($event)"
              v-model="fileRecords">
            </VueFileAgent>

            <SlickList
              axis="xy"
              v-model="fileRecordsForUpload"
              :style="{'padding': fileRecordsForUpload.length ? '10px': '0'}"
              class="slick-list"
              :useDragHandle="isDrag"
              @input="getChangeLists"
              @sort-end="sortEnd($event)">
              <SlickItem
                v-for="(item, index) in fileRecordsForUpload"
                :index="index"
                :key="index"
                class="slick-item">
                <div class="box-img">
                  <span :class="{'img-delete': indexLoaded[index]}" @click="fileDelete(index)"/>
                  <img
                    :src="item.urlResized"
                    :alt="item.file.name"
                    @load="onLoadImage($event)"
                    @mousedown="sortStart(index)"
                    style="width: 100%">
                </div>
              </SlickItem>
            </SlickList>
          </div>
          <div class="pt-after" :class="{'d-none': !isClicked}">
            <div class="left">

              <label for="name">
                Tên File
                <input type="text" id="name" v-model="fileName">
                .PNG
              </label>
            </div>

            <div class="right">
              <button class="btn-info" @click="saveImage()">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <canvas id="joined" class="div-center" :class="{'d-none': !isClicked}"></canvas>
      <img src="./assets/sample.png" alt="sample" class="div-center" :class="{'d-none': isClicked}">
    </div>
  </div>
</template>

<script>
  import photoJoiner from "./utils/helper";
  import {saveAs} from 'file-saver';
  import {SlickList, SlickItem} from 'vue-slicksort';

  export default {
    name: 'App',

    components: {
      SlickItem,
      SlickList
    },

    data() {
      return {
        fileRecords: [],
        fileRecordsForUpload: [],
        indexLoaded: [],
        photoJoiner,
        height: 170,
        images: [],
        fileName: 'picture',
        isClicked: false,
        isDrag: true
      };
    },

    methods: {
      mergeFiles() {
        let joiner = new photoJoiner();

        this.$refs.vueFileAgent.fileRecords.forEach(val => {
          this.images.push(val.urlResized);
        });

        joiner.join({
          'images': this.images,
          'canvasHeight': this.height
        });

        this.isClicked = true
      },

      saveImage() {
        const canvas = document.getElementById('joined');

        canvas.toBlob((blob) => {
          saveAs(blob, `${this.fileName}.png`);
        });
      },

      clearImages() {
        const canvas = document.getElementById('joined');
        const context = canvas.getContext('2d');

        // clear img uploaded
        this.fileRecords = [];
        this.fileRecordsForUpload = [];

        // clear img joiner
        context.clearRect(0, 0, canvas.width, canvas.height);

        // hidden
        this.isClicked = false
      },

      filesSelected() {
        // Update record in fileRecordsForUpload
        this.fileRecordsForUpload = this.$refs.vueFileAgent.fileRecords;
      },

      fileDelete(index) {
        this.isDrag = true;
        this.fileRecordsForUpload.splice(index, 1);
      },

      sortStart() {
        this.isDrag = false;
      },

      sortEnd() {
        this.isDrag = true;
      },

      getChangeLists(val) {
        this.$refs.vueFileAgent.fileRecords = val;
      },

      onLoadImage(e) {
        if (e.isTrusted) {
          this.indexLoaded.push(e.isTrusted)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    /deep/ .vue-file-agent.file-input-wrapper {
      text-align: center;
      border: none;
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
        margin-top: 10px;
        font-size: 12px;
      }
    }

    /deep/ .file-preview-wrapper {
      width: 12%;
      margin: 5px !important;
      display: none;
    }

    /deep/ .file-preview-new {
      display: inline-block;
    }

    .pt-wrapper {
      .pt-container {
        padding: 0 15%;
        margin-top: 50px;

        .pt-img-header {
          text-align: center;
          font-size: 25px;
        }

        .pt-img__body__box {
          display: flex;
          justify-content: flex-end;
          align-content: center;

          button:first-child {
            color: #2C2C2C;
            background: #fff;
            border: 1px solid #686868;
            margin-right: 15px;
          }
        }

        .pt-img__body__add {
          margin-bottom: 30px;
          border: 2px solid #f9f9f9;

          .slick-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 10px;

            .slick-item {
              .box-img {
                position: relative;

                .img-delete {
                  background: url("./assets/icons8-delete-24.png");
                  width: 20px;
                  height: 20px;
                  position: absolute;
                  right: 8px;
                  top: 5px;
                }
              }
            }
          }
        }

        .pt-after {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 30px;

          .left {
            margin-right: 20px;

            label {
              font-size: 18px;
            }

            input {
              border: 1px solid #ddd;
              padding: 10px 30px 10px 10px;
              margin-left: 15px;
            }
          }

          .right {
            button {
              width: 160px;
              padding: 10px 20px;
            }
          }
        }
      }
    }

    .mb-30 {
      margin-bottom: 30px;
    }

    .btn-info {
      &:hover, &.disabled:hover {
        background: #1e88e5;
        border: 1px solid #1e88e5;
        -webkit-box-shadow: 0 14px 26px -12px rgba(23, 105, 255, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(23, 105, 255, 0.2);
        box-shadow: 0 14px 26px -12px rgba(23, 105, 255, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(23, 105, 255, 0.2);
      }
    }

    .div-center {
      display: block;
      margin: 0 auto;
    }

    .txt-center {
      text-align: center;
    }

    button {
      width: 110px;
      padding: 10px 30px;
      color: #fff;
      background: #0D69B3;
      border: 1px solid #028ee1;
      font-size: 16px;
      border-radius: 5px;

      &:focus {
        outline: none;
      }
    }

    .d-none {
      display: none !important;
    }

  }
</style>
