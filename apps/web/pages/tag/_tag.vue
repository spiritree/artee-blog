<template>
  <div class="tag">
    <p class="title">
      <span class="title-name"><i class="iconfont icon-tag"></i> {{ tag.name }} </span>
      <span class="line"></span>
    </p>
    <div class="article">
      <articleView
        :articleList = "list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>
import articleView from '~/components/common/article.vue';

export default {
  name: 'tag',

  transition: 'fade',

  scrollToTop: true,

  fetch({ store, params }) {
    return store.dispatch('getArtList', params);
  },

  head() {
    return { title: `${this.tag.name} | tag` };
  },

  data() {
    return {};
  },

  components: {
    articleView
  },

  computed: {
    mobileLayout() {
      return this.$store.state.options.mobileLayout;
    },

    tag() {
      const _id = this.$route.params.tag;
      return this.$store.state.tag.data.list.find(item => item._id === _id);
    },

    list() {
      return this.$store.state.article.art.list;
    },

    haveMoreArt() {
      return (
        this.$store.state.article.art.pagination.current_page !==
        this.$store.state.article.art.pagination.total_page
      );
    }
  },

  methods: {
    loadMore() {
      this.$store.dispatch('getArtList', {
        current_page: this.$store.state.article.art.pagination.current_page + 1,
        tag: this.$route.params.tag
      });
    }
  },

  updated() {
    const thumbNodes = document.getElementsByClassName('onelist-item-thumb');
    Array.from(thumbNodes).map(item => {
      let randomNumber = parseInt(Math.random() * 9);
      item.style = `background-image:url(/images/${randomNumber}.jpg)`;
    });
  },

  mounted() {
    this.$nextTick(() => {
      const thumbNodes = document.getElementsByClassName('onelist-item-thumb');
      Array.from(thumbNodes).map(item => {
        let randomNumber = parseInt(Math.random() * 9);
        item.style = `background-image:url(/images/${randomNumber}.jpg)`;
      });
    });
  }
};
</script>

<style scoped lang="scss">
@import '~assets/scss/variable.scss';

.tag > .title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 3rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;

  i {
    margin-right: 0.5rem;
  }

  > .title-name {
    position: relative;
    padding-right: $lg-pad;
    background: $white;
    z-index: 99;
  }

  > .line {
    top: 50%;
  }
}
</style>
