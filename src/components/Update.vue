<template>
  <div>
    <b-breadcrumb :items="detail.breadcrumbs" />
    <b-navbar toggleable type="inverse" class="rounded" variant="success" style="margin-bottom:20px;">
      ddd
    </b-navbar>
    <b-card>
      <b-form ref='update_form'>
        <vue-form-generator :schema="detail.schema" :model="update_model">
        </vue-form-generator>
        <b-button size="sm" variant="primary" href="" @click="save">
          保存
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  components: {},
  data() {
    return {
      state: {
        date: new Date(2016, 9, 16)
      },
      startDatetime: moment(),
      endDatetime: null,
      detail: { breadcrumbs: [] },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'user-'
      },
      update_model: {}
    }
  },
  created() {
    this.appName = this.$route.params.app
    this.modelName = this.$route.params.model
    this.pk = this.$route.params.id
  },
  mounted() {
    this.getdetail()
  },
  methods: {
    getdetail() {
      let parms = {}
      this.$api.detail(this.appName, this.modelName, this.pk, parms).then(res => {
        this.detail = res['data']
        this.update_model = res.data.original
      })
    },
    save() {
      this.$api.save(this.appName, this.modelName, this.pk, this.update_model).then(res => {
        console.log(res)
      })
    }
  }
}

</script>
<style>
.vue-form-generator .form-group label {
  width: 150px;
  float: left;
  text-align: right;
}

.vue-form-generator .field-wrap {
  float: left;
  margin-left: 15px;
}

@import '../../static/bootstrap-datetimepicker.min.css'

</style>
