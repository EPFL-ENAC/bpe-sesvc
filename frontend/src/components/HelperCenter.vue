<template>
  <v-dialog
    v-model="dialog"
    absolute
    content-class="helper-center"
    temporary
    scrollable
    :max-width="helper?.type === 'pdf' ? '100%' : '540px'"
    max-height="100%"
    @click:outside="toggleHelperCenter"
  >
    <v-card>
      <v-card-title>
        <span>Helper</span>
        <v-btn color="blue darken-1" text @click="toggleHelperCenter">
          <v-icon>$mdiClose</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        :class="helper?.type === 'pdf' ? 'pdf-card' : 'default-card'"
      >
        <template v-if="helper?.type === 'pdf'">
          <iframe
            id="pdf"
            title="PDF in an i-Frame"
            :src="helper.href"
            frameborder="0"
            scrolling="auto"
            height="100%"
            width="100%"
            style="
              margin: 0px;
              padding: 0px;
              border: 0px;
              width: 100%;
              height: 100%;
            "
          ></iframe>
        </template>
        <template v-if="helper?.type === 'video'">
          <video
            controls
            width="100%"
            @enterpictureinpicture="toggleHelperCenter"
          >
            <source :src="helper?.href" type="video/mp4" />

            Download the
            <a href="helper?.href">MP4</a>
            video.
          </video>
        </template>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["helperDialog", "helper"]),
  },
  methods: {
    ...mapActions(["toggleHelperCenter", "setHelperDialog"]),
  },
})
export default class HelperCenter extends Vue {
  helperDialog!: boolean;
  helper!: Record<string, string>;
  toggleHelperCenter!: () => Promise<void>;
  setHelperDialog!: (value: boolean) => void;

  set dialog(value: boolean) {
    this.setHelperDialog(value);
  }
  get dialog(): boolean {
    return this.helperDialog;
  }
}
</script>

<style lang="scss">
.pdf-card {
  height: 80vh;
  display: inline-block;
  line-height: 0;
}
.default-card {
  height: 300px;
}
// .v-dialog__content--active:has(> .notification-center),
// .v-dialog__content:has(> .notification-center) {
//   /* justify-content: right;
//   align-items: baseline; */
//   /* top: 32px; */
// }
</style>
