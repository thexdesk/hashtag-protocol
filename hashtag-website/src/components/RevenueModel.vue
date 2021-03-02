<template>
  <table class="table revenue is-bordered is-striped is-hoverable">
    <thead>
      <tr>
        <th class="empty"></th>
        <th colspan="3">Revenue source</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="empty"></th>
        <th>HASHTAG auction</th>
        <th>HASHTAG resale</th>
        <th>Content tagging</th>
      </tr>
      <tr>
        <th>Publisher</th>
        <td>20-40%</td>
        <td>--</td>
        <td>40-45%</td>
      </tr>
      <tr>
        <th>Creator</th>
        <td>40%</td>
        <td>--</td>
        <td>50% pre-auction</td>
      </tr>
      <tr>
        <th>Tagger</th>
        <td>--</td>
        <td>--</td>
        <td>TBD Phase 4</td>
      </tr>
      <tr>
        <th>Owner</th>
        <td>--</td>
        <td>100%</td>
        <td>50% post-auction</td>
      </tr>
      <tr>
        <th>Curator</th>
        <td>--</td>
        <td>--</td>
        <td>TBD Phase 4</td>
      </tr>
      <tr>
        <th>Auctioneer</th>
        <td>20-40%</td>
        <td>--</td>
        <td>--</td>
      </tr>
      <tr>
        <th>Protocol</th>
        <td>20%</td>
        <td>--</td>
        <td>5-10%</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
table.revenue {
  thead,
  tbody {
    th,
    td {
      text-align: center;
      vertical-align: middle;
    }

    td {
      white-space: nowrap;
    }

    .empty {
      border-top: none;
      border-left: none;
      border-bottom: none;
    }
  }
}
</style>
