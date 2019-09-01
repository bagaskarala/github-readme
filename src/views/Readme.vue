<template>
  <div>
    <div class="card">
      <div>
        <h3 class="p-3">Readme of {{username}}/{{project}}</h3>
        <hr class="my-0 py-0">
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
        <div
          v-else
          v-html="projectReadme"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '@/ApiService'
export default {
  name: 'Readme',
  data() {
    return {
      projectReadme: {},
      errorMessage: null,
      isBusy: false
    }
  },
  computed: {
    // get username and project from url
    username() {
      return this.$route.params.username
    },
    project() {
      return this.$route.params.project
    }
  },
  methods: {
    async getProjectReadme() {
      this.isBusy = true
      try {
        // fetch API using service in ApiService.js
        // fetch html-form readme using custom header
        const getProjectReadme = await Axios.getProjectReadme(this.username, this.project);
        this.projectReadme = getProjectReadme.data;
        this.isBusy = false;
      } catch (error) {
        this.errorMessage = error.response.data.message
        this.isBusy = false;
      }
    }
  },
  created() {
    this.getProjectReadme()
  },
  beforeRouteUpdate(to, from, next) {
    //dynamic route matching
    next();
    this.getProjectReadme()
  }
}
</script>
