<template>
  <div
    class="d-flex align-items-center justify-content-center"
    style="height:80vh"
  >
    <div class="card w-100">
      <div class="card-body">
        <h3>Search github user</h3>
        <div class="input-group my-3">
          <input
            ref="username"
            v-model="username"
            type="text"
            autofocus
            class="form-control "
            placeholder="Enter github user"
            @keyup.enter="goToUser()"
          >
          <div class="input-group-append">
            <button
              @click="reset()"
              class="btn btn-secondary"
              type="button"
            >Reset</button>
          </div>
          <div class="input-group-append">
            <button
              @click="goToUser()"
              class="btn btn-primary"
              type="button"
            >Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: null,
      userRepos: [],
      total: 0,
      errorMessage: null,
      isBusy: false
    }
  },
  methods: {
    // go to user page
    async goToUser() {
      this.$router.push({ path: `/${this.username}` })
    },
    reset() {
      this.username = null
    }
  },
  mounted() {
    // autofocus to input
    this.$refs.username.focus();
  },
}
</script>
