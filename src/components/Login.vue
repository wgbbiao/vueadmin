<template>
  <div>
    <form action="" method="post" id="login-form">
      <div class="d-flex justify-content-center">
        <b-card style="width: 25rem;" id="panel-login" header=''>
          <div slot='header'>
            <h2 class="form-signin-heading">Please Login</h2>
          </div>
          <div class="card-block">
            <div id="div_id_username" class="form-group">
              <b-form-input v-model="username" id="id_username" maxlength="254" name="username" type="text" placeholder="Username"></b-form-input>
            </div>
            <div id="div_id_password" class="form-group">
              <input v-model='password' class="form-control input-lg" id="id_password" name="password" type="password" placeholder="Password">
            </div>
            <input type="hidden" name="this_is_the_login_form" value="1" />
            <button class="btn btn-lg btn-primary btn-block" type="button" @click="Login">log in</button>
          </div>
        </b-card>
      </div>
    </form>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    Login() {
      var data = this.$data
      data['this_is_the_login_form'] = 1
      data['next'] = '/'
      data['csrfmiddlewaretoken'] = this.$api.getCookie('csrftoken')
      // data['csrftoken'] = this.$api.getCookie('csrftoken')
      this.$api.login(data, res => {
        console.log(res)
      })
      return false
    }
  }
}

</script>
