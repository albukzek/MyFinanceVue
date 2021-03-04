<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{"HC_ExchageRates" | localize}}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{"HC_Bill" | localize}}</th>
              <th>{{"HC_Curse" | localize}}</th>
              <th>{{"HC_Date" | localize}}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur]}}</td>
              <td>{{date}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:['rates', 'date'],
  data: ()=>({
    currencies: ['RUB','USD','EUR']
  })
}
</script>
