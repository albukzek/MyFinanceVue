<template>
  <div>
    <div class="page-title">
      <h3>{{"Planning_planning" | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{"Planing_NotCategory" | localize}} <router-link to="/categories">Добавить новую категорию</router-link></p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{"Planing_Iz" | localize}} {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filter/currencyFilter'
import localizeFilter from '@/filter/localize.filter'
export default {
  name: 'planning',
   metaInfo() {
    return {
      title: this.$title('Planning_planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
      const records = await this.$store.dispatch('fetchRecords')
      const categoires = await this.$store.dispatch('fetchCategories')

        this.categories = categoires.map(cat => {
          console.log(cat.title)
          const spend = records
            .filter(r =>r.categoryId === cat.id)
            .filter(r => r.type === 'outcome')
            .reduce((total, r) => {
            return  total += r.amount
            }  , 0)

          const percent = 100 * spend / cat.limit
          const progressPercent = percent > 100 ? 100 : percent
          const progressColor = percent < 60
            ? 'green'
            : percent < 100
              ? 'yellow'
              : 'red'

          console.log(spend)
          const tooltipValue = cat.limit - spend
          const tooltip = `${tooltipValue <0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`

          return {
            ...cat,
            progressPercent,
            progressColor,
            spend,
            tooltip
          }
        })

      this.loading = false
    }
  }
</script>
