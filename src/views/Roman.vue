<template>
  <div>
    <h2>Sorting Roman Name</h2>
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
      <h5
        v-show="!validation.isArray"
        style="color:red"
      >Provide CSV format</h5>
      <h5
        v-show="!validation.maxLength"
        style="color:red"
      >Array between 1-50</h5>
      <button
        class="btn btn-success btn-block"
        @click.prevent="sort(romanNames)"
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
      validation: {
        isArray: true,
        maxLength: true
      },
      result: null
    }
  },
  methods: {
    romanToNum(roman) {
      if (roman === undefined) {
        this.validation.isArray = false;
        return false
      }
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
      romanNames = romanNames.split(',').map(function (item) {
        return item.trim();
      });
      console.log(romanNames);
      console.log(Array.isArray(romanNames));
      this.validation.isArray = true
      this.validation.maxLength = true
      if (Array.isArray(romanNames) == false) {
        // this.validation.isArray = false
      }
      else if (romanNames.length > 50) {
        this.validation.maxLength = false
      }
      else {
        var collator = new Intl.Collator('num', { numeric: true, sensitivity: 'base' });
        this.result = romanNames
          .map((n) => ({ name: n, num: n.split(" ")[0] + this.romanToNum(n.split(" ")[1]) }))
          .sort((a, b) => collator.compare(a.num, b.num))
          .map(({ name }) => name)
      }
    }
  },
}
</script>
