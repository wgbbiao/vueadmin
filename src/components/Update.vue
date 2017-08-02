<template>
  <div>
    <b-breadcrumb :items="detail.breadcrumbs" />
    <b-navbar toggleable type="inverse" class="rounded" variant="success" style="margin-bottom:20px;">
      ddd
    </b-navbar>
    <b-alert variant="success" :show="show">
      {{detail.verbose_name}}"{{alter_message}}"修改成功。 你可以在下面再次编辑它。
    </b-alert>
    <b-card>
      <b-form ref='update_form'>
        <vue-form-generator :schema="detail.schema" :model="update_model">
        </vue-form-generator>
        <b-button variant="primary" @click="save('list')">
          保存
        </b-button>
        <b-button variant="secondary" @click="save('add')">
          保存并增加另一个
        </b-button>
        <b-button variant="secondary" @click="save('self')">
          保存并编辑
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
      show: false,
      alter_message: '',
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
    save(act) {
      this.$api.save(this.appName, this.modelName, this.pk, this.update_model).then(res => {
        if (res.data.status === 'success') {
          if (act === 'list') {
            this.$router.push('../../')
          } else if (act === 'add') {
            this.$router.push('../../create')
          } else if (act === 'self') {
            // this.getdetail()
            this.alter_message = res.data.obj
            this.show = true
          }
        }
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
