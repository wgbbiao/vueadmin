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
      this.date = fecha.format(new Date(), inputDateFormat)
    },
    now() {
      this.time = fecha.format(new Date(), inputTimeFormat)
    },
    getDateFormat() {
      if (this.schema.dateTimePickerOptions && this.schema.dateTimePickerOptions.format) {
        return this.schema.dateTimePickerOptions.format
      } else {
        return inputFormat
      }
    },

    ...dateFieldHelper
  },

  mounted() {
    this.$nextTick(function() {
      if (window.$ && window.$.fn.datetimepicker) {
        let input = this.$el.querySelector('.date')
        $(input).datetimepicker(defaults({ format: inputDateFormat }, {
          format: inputDateFormat
        })).on('dp.change', () => {
          this.date = input.value
        })

        let timeInput = this.$el.querySelector('.time')
        $(timeInput).datetimepicker({ format: inputTimeFormat }).on('dp.change', () => {
          this.time = timeInput.value
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
    date: function(val) {
      console.log('111111111111')
      console.log(val)
    },
    time: function(val) {
      console.log('33333333333')
      console.log(val)
    }
  },
  computed: {
    value: function() {
      return this.date + ' ' + this.time
    }
  }
}

</script>
<style>


</style>
