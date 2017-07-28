<template>
  <div>
    <template v-if="list.breadcrumbs">
      <b-breadcrumb :items="list.breadcrumbs" />
    </template>
    <b-navbar toggleable type="inverse" class="rounded" variant="success" style="margin-bottom:20px;">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
        <span>BootstrapVue</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item>Support</b-nav-item>
          <b-nav-item>Docs</b-nav-item>
          <b-nav-item>Contact Us</b-nav-item>
        </b-nav>
        <b-nav is-nav-bar class="ml-auto">
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item to="#">EN</b-dropdown-item>
            <b-dropdown-item to="#">ES</b-dropdown-item>
            <b-dropdown-item to="#">RU</b-dropdown-item>
            <b-dropdown-item to="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <span style="font-weight: bold;">User</span>
            </template>
            <b-dropdown-item to="#">Profile</b-dropdown-item>
            <b-dropdown-item to="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <div class="clearfix">
      <nav aria-label="Page navigation example" class="float-left">
        <ul class="pagination">
          <li class="page-item">
            <span class="page-link"><span class="text-success" >8</span>微信用户</span>
          </li>
        </ul>
      </nav>
      <div class="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary">导出</button>
        </div>
        <div class="btn-group mr-2" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary">显示列</button>
        </div>
        <div class="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">大</button>
          <button type="button" class="btn btn-secondary">小</button>
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary">全屏</button>
        </div>
      </div>
    </div>
    <form class="clearfix">
      <b-table v-if='list.results.length' striped hover bordered :items="list.results" :fields="list.result_headers" :current-page="currentPage" :per-page="perPage" @head-clicked="headClicked">
        <template slot="HEAD_action_checkbox" scope="field">
          <b-form-checkbox v-model="all" value="all" unchecked-value="all_not"></b-form-checkbox>
        </template>
        <template :slot='he.filed_name' v-for="he in list.result_headers" scope="item">
          <template v-if="he.filed_name == 'action_checkbox'">
            <b-form-checkbox v-model="select" :value="item.item.cells[he.filed_name].value"></b-form-checkbox>
          </template>
          <template v-else>
            <router-link :to="item.item.cells[he.filed_name].wraps[0]" v-if='item.item.cells[he.filed_name].is_display_link'>{{item.item.cells[he.filed_name].value}}</router-link>
            <div v-else v-html="item.item.cells[he.filed_name].value"></div>
          </template>
        </template>
      </b-table>
      <div v-else>
        <b-navbar toggleable type="inverse" class="rounded" variant="" style="margin-bottom:20px;background-color: #e3f2fd;">
          空列表
        </b-navbar>
      </div>
      <div class="border-1">
        <input type="hidden" id="action" name="action" value="">
        <input type="hidden" id="select-across" name="select_across" value="0">
        <div class="btn-group clearfix dropup">
          <a class="dropdown-toggle btn btn-success" data-toggle="dropdown" href="#">
        <i class="fa fa-wrench"></i> 
        <span class="action-counter">选中了 {{list.results.length}} 个中的 {{select.length}} 个</span>
        <span class="all" style="display: none;">选中了 66 个</span>
        <span class="caret"></span>
        </a>
          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a onclick="$.do_action('delete_selected');"><i class="fa fa-times"></i> 删除所选的 权限</a></li>
          </ul>
        </div>
        <a class="question btn btn-default" href="javascript:;" style="display: none;" title="点击此处选择所有页面中包含的对象。">选中所有的 66 个 权限</a>
        <a class="clear btn btn-default" href="javascript:;" style="display: none;">清除选中</a>
      </div>
    </form>
    <div class="justify-content-center my-1" v-if='list.results'>
      <b-pagination size="md" :total-rows="list.results.length" :per-page="perPage" v-model="currentPage">
      </b-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      list: {
        results: []
      },
      currentPage: 1,
      perPage: 5,
      filter: null,
      all: 'all_not',
      select: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    headClicked(fieldName) {
      if (fieldName === 'action_checkbox') {
        this.all = this.all === 'all' ? 'all_not' : 'all'
      }
    },
    getlist() {
      let appName = this.$route.params.app
      let modelName = this.$route.params.model
      let parms = {}
      this.$api.list(appName, modelName, parms).then(res => {
        var fields = {}
        res.data.result_headers.cells.map((header, i) => {
          fields[header.field_name] = { label: header.text, sortable: header.sortable, filed_name: header.field_name }
        })
        res['data']['result_headers'] = fields
        this.list = res['data']
      })
    }
  },
  watch: {
    all(v) {
      if (v === 'all') {
        this.list.results.map(re => {
          if (this.select.indexOf(re.cells.action_checkbox.value) === -1) {
            this.select.push(re.cells.action_checkbox.value)
          }
        })
      } else {
        if (this.list.results.length === this.select.length) {
          this.select = []
        }
      }
    },
    select(v) {
      if (v.length === this.list.results.length) {
        this.all = 'all'
      } else {
        this.all = 'all_not'
      }
    },
    '$route' (to, from) {
      // 对路由变化作出响应...

      this.getlist()
    }
  }
}

</script>
<style type="text/css">
.menu {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 10px;
  background-color: #f5f5f5;
}

</style>
