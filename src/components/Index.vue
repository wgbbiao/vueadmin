<template>
  <div>
    <b-navbar toggleable type="inverse" variant="success" style="margin-bottom:15px;">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="#">
        <span>{{site.site_title}}</span>
      </b-link>
    </b-navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-1 col-md-2">
          <b-nav pills :vertical='true' class="menu">
            <b-nav-item to='/'>首页</b-nav-item>
            <template v-for="item in site.nav_menu">
              <li>
                <b-nav-text>{{item.title}}</b-nav-text>
              </li>
              <b-nav-item :to='it.url' v-for="it in item.menus" :key="it.url">{{it.title}}</b-nav-item>
            </template>
          </b-nav>
        </div>
        <div class="col-sm-11 col-md-10">
          <router-view class="view two"></router-view>
          <!-- <div class="dashboard row" v-if="site.columns">
            <div class='col-sm-6 column ui-sortable'>
              <template v-for="col in site.columns[0]">
                <div class="card" style="margin-bottom:15px;">
                  <h3 class="card-header">Featured</h3>
                  <div class="card-block">
                    <h4 class="card-title">Special title treatment</h4>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </template>
            </div>
            <div class='col-sm-6 column ui-sortable'>
              <template v-for="col in site.columns[1]">
                <div class="card" style="margin-bottom:15px;">
                  <h3 class="card-header">Featured</h3>
                  <div class="card-block">
                    <h4 class="card-title">Special title treatment</h4>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </template>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
.menu {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 10px;
  background-color: #f5f5f5;
}

</style>
<script type="text/javascript">
export default {
  data() {
    return {
      site: {}
    }
  },
  mounted() {
    this.$api.index().then(res => {
      this.site = res['data']
    })
  }
}

</script>
