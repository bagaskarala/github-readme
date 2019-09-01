<template>
  <div>
    <h2>Sorting Roman Name</h2>
    <div class="small alert alert-info">Max 50 names, every names max 20 characters, Using format 'Single_String Roman_Number'</div>
    <form>
      <div class="form-group">
        <textarea
          type="textarea"
          class="form-control"
          required
          placeholder="Louis IX,Louis VIII,David II"
          v-model="romanNames"
          rows="3"
        ></textarea>
      </div>
      <p
        v-show="!validation"
        style="color:red"
      >Invalid Input</p>
      <button
        class="btn btn-success btn-block"
        @click.prevent="sanitize(romanNames)"
      >Sort Roman Name</button>
    </form>
    <hr class="my-3">
    <h2>Result</h2>
    <div
      v-show="!result"
      class="alert alert-primary"
    >Click sort to process</div>
    <ul
      v-if="result"
      class="list-group"
    >
      <li
        v-for="(item, index) in result"
        :key="index"
        class="list-group-item"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Roman',
  data() {
    return {
      romanNames: 'Louis IX,Louis VIII, David I',
      validation: true,
      result: null
    }
  },
  methods: {
    // convert roman to number
    romanToNum(roman) {
      if (roman === "") return 0;
      if (roman.startsWith("L")) return 50 + this.romanToNum(roman.substr(1));
      if (roman.startsWith("XL")) return 40 + this.romanToNum(roman.substr(2));
      if (roman.startsWith("X")) return 10 + this.romanToNum(roman.substr(1));
      if (roman.startsWith("IX")) return 9 + this.romanToNum(roman.substr(2));
      if (roman.startsWith("V")) return 5 + this.romanToNum(roman.substr(1));
      if (roman.startsWith("IV")) return 4 + this.romanToNum(roman.substr(2));
      if (roman.startsWith("I")) return 1 + this.romanToNum(roman.substr(1));
      return 0;
    },

    sort(romanNames) {
      // sorting roman name using number
      var collator = new Intl.Collator('num', { numeric: true, sensitivity: 'base' });
      this.result = romanNames
        // create num key for sorting purpose
        .map((n) => ({ name: n, num: n.split(" ")[0] + this.romanToNum(n.split(" ")[1]) }))
        // sorting usiong collator
        .sort((a, b) => collator.compare(a.num, b.num))
        // show name only
        .map(({ name }) => name)
    },

    sanitize(romanNames) {
      // reset validation and result
      this.reset()
      // split CSV input, then check validations
      romanNames = romanNames
        .split(',')
        .map(function (item) {
          return item.trim().toUpperCase();
        })
        .map(function (item) {
          // check character length every name
          if (item.length < 1 || item.length > 20) { return false }
          // check format every name
          if (item.split(" ").length != 2) { return false }
          return item
        });
      if (romanNames.includes(false)) {
        //if validation fail, show error
        this.validation = false
        return false
      }
      if (Array.isArray(romanNames) == false) {
        // check if input is array
        this.validation = false
      }
      if (romanNames.length > 50) {
        // check all names length
        this.validation = false
        return false
      }
      this.sort(romanNames)
    },

    reset() {
      // reset validation and result
      this.validation = true
      this.result = null
    }
  },
}
</script>
