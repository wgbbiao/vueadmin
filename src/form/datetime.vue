<template>
  <div class="form-inline">
    <div class="input-group" style="margin-right:5px;">
      <div class="input-group-addon">
        <span class="iconfont icon-rili"></span>
      </div>
      <input type="text" class="form-control date" v-model="date" :autocomplete="schema.autocomplete" :disabled="disabled" :placeholder="schema.placeholder" :readonly="schema.readonly" :name="schema.inputName+'_0'" :id="getFieldID(schema)+'_0'">
      <span class="input-group-btn">
      <button class="btn btn-secondary" type="button" @click='today'>今天</button>
      </span>
    </div>
    <div class="input-group">
      <div class="input-group-addon">
        <span class="iconfont icon-time"></span>
      </div>
      <input type="text" class="form-control time" v-model="time" :autocomplete="schema.autocomplete" :disabled="disabled" :placeholder="schema.placeholder" :readonly="schema.readonly" :name="schema.inputName+'_1'" :id="getFieldID(schema)+'_1'">
      <span class="input-group-btn">
      <button class="btn btn-secondary" type="button" @click='now'>现在</button>
      </span>
    </div>
  </div>
</template>
<script>
/* global $ */
import fecha from 'fecha'
import { abstractField } from 'vue-form-generator'
import { defaults } from 'lodash'
import dateFieldHelper from 'vue-form-generator/src/utils/dateFieldHelper.js'

let inputFormat = 'YYYY-MM-DD HH:mm:ss'
let inputDateFormat = 'YYYY-MM-DD'
let inputTimeFormat = 'HH:mm'

export default {
  mixins: [abstractField],

  data() {
    return {
      date: '',
      time: ''
    }
  },
  methods: {
    today() {
      console.log(this.value)
      this.date = fecha.format(new Date(), inputDateFormat)
      this.value = this.getValue()
    },
    now() {
      this.time = fecha.format(new Date(), inputTimeFormat)
      this.value = this.getValue()
    },
    getDateFormat() {
      if (this.schema.dateTimePickerOptions && this.schema.dateTimePickerOptions.format) {
        return this.schema.dateTimePickerOptions.format
      } else {
        return inputFormat
      }
    },

    getValue() {
      return this.date + ' ' + this.time + ':00'
    },
    ...dateFieldHelper
  },

  mounted() {
    this.date = fecha.format(fecha.parse(this.value, inputFormat), inputDateFormat)
    this.time = fecha.format(fecha.parse(this.value, inputFormat), inputTimeFormat)
    this.model[this.schema.inputName + '_0'] = this.date
    this.model[this.schema.inputName + '_1'] = this.time
    this.$nextTick(function() {
      if (window.$ && window.$.fn.datetimepicker) {
        let input = this.$el.querySelector('.date')
        $(input).datetimepicker(defaults({ format: inputDateFormat }, {
          format: inputDateFormat
        })).on('dp.change', () => {
          this.date = input.value
          this.value = this.getValue()
        })

        let timeInput = this.$el.querySelector('.time')
        $(timeInput).datetimepicker({ format: inputTimeFormat }).on('dp.change', () => {
          this.time = timeInput.value
          this.value = this.getValue()
        })
      } else {
        console.warn('Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!')
      }
    })
  },

  beforeDestroy() {
    if (window.$ && window.$.fn.datetimepicker) {
      $(this.$el).data('DateTimePicker').destroy()
    }
  },
  watch: {
    date(val) {
      this.model[this.schema.inputName + '_0'] = val
    },
    time(val) {
      this.model[this.schema.inputName + '_1'] = val + ':00'
    }
  },
  computed: {}
}

</script>
<style>


</style>
