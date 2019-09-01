<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="mb-3">List of {{username}} Repository <span class="badge badge-primary">{{total}}</span></h3>

      <img
        v-if="userRepos.length!=0"
        :src="userRepos[0].owner.avatar_url"
        class=" p-2"
        style="max-height: 70px; max-width: 70px;"
      >
    </div>
    <div class="clearfix"></div>
    <div
      v-if="errorMessage"
      class="alert alert-warning"
    >{{errorMessage}}</div>
    <template v-else>
      <div
        v-if="isBusy"
        class="d-flex justify-content-center"
      >

        <div
          class="spinner-border my-5"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <template v-else>
        <div v-if="userRepos.length==0">
          <div class="alert alert-primary">No data. <br>
            <router-link
              to='/'
              class="small"
            >
              Back to Home
            </router-link>
          </div>
        </div>
        <div
          v-for="repo in userRepos"
          :key="repo.id"
          class="card my-3"
        >
          <div class="card-body">
            <router-link
              :to="`/${repo.full_name}`"
              class="h5 card-title"
            >{{repo.name}}
              <span class="badge badge-dark">{{repo.language}}</span>
            </router-link>
            <p class="card-text">{{repo.description}}</p>
            <p class="card-text"><a
                :href="repo.html_url"
                class="text-muted"
              >Link to repo</a></p>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Axios from '@/ApiService'
export default {
  name: 'Home',
  data() {
    return {
      userRepos: [],
      total: 0,
      errorMessage: null,
      isBusy: false
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
  },
  methods: {
    async getUserRepos() {
      this.isBusy = true
      this.clearResult()
      try {
        const getUserRepos = await Axios.getUserRepos(this.username);
        this.userRepos = getUserRepos.data;
        this.total = this.userRepos.length;
        this.isBusy = false;
      } catch (error) {
        this.errorMessage = error.response.data.message
        this.isBusy = false;
      }
    },
    clearResult() {
      this.userRepos = []
      this.total = 0
      this.errorMessage = null
    },
    reset() {
      this.clear()
      this.username = null
    }
  },
  created() {
    this.getUserRepos()
  },
  beforeRouteUpdate(to, from, next) {
    //dynamic route matching
    next();
    this.getUserRepos()
  }
}
</script>
