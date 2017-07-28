<template>
  <div>
    <b-breadcrumb :items="detail.breadcrumbs" />
    <b-navbar toggleable type="inverse" class="rounded" variant="success" style="margin-bottom:20px;">
      ddd
    </b-navbar>
    <b-card>
      <vue-form-generator :schema="detail.schema" :model="detail.original">
      </vue-form-generator>
    </b-card>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      detail: { breadcrumbs: [] },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'user-'
      }
    }
  },
  mounted() {
    this.getdetail()
  },
  methods: {
    getdetail() {
      let appName = this.$route.params.app
      let modelName = this.$route.params.model
      let pk = this.$route.params.id
      let parms = {}
      this.$api.detail(appName, modelName, pk, parms).then(res => {
        this.detail = res['data']
      })
    }
  }
}

</script>
<style type="text/css">
.vue-form-generator .form-group label {
    width: 150px;
    float: left;
    text-align: right;
}
.vue-form-generator .field-wrap {
    float: left;margin-left: 15px;
}
</style>
