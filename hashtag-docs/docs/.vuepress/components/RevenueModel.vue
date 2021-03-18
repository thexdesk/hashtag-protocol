<template>
  <div class="container">
    <table
      class="table revenue is-fullwidth is-bordered s-striped is-hoverable"
    >
      <thead>
        <tr>
          <th class="empty"></th>
          <th colspan="3">
            <span class="has-text-weight-normal">REVENUE SOURCE</span>
          </th>
        </tr>
        <tr>
          <th>Participant</th>
          <th>HASHTAG auction</th>
          <th>HASHTAG resale</th>
          <th>Content tagging</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="participant">Publisher</td>
          <td>20%</td>
          <td>--</td>
          <td>30%</td>
        </tr>
        <tr>
          <td class="participant">Creator</td>
          <td>40%</td>
          <td>--</td>
          <td>50% pre-auction</td>
        </tr>
        <tr>
          <td class="participant">Tagger</td>
          <td>--</td>
          <td>--</td>
          <td>TBD Phase 4</td>
        </tr>
        <tr>
          <td class="participant">Owner</td>
          <td>--</td>
          <td>100%</td>
          <td>50% post-auction</td>
        </tr>
        <tr>
          <td class="participant">Curator</td>
          <td>--</td>
          <td>--</td>
          <td>TBD Phase 4</td>
        </tr>
        <tr>
          <td class="participant">Auctioneer</td>
          <td>20%</td>
          <td>--</td>
          <td>--</td>
        </tr>
        <tr>
          <td class="participant">Protocol</td>
          <td>20%</td>
          <td>--</td>
          <td>20%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "RevenueModel",
};
</script>
<style scoped lang="scss">
.content {
  table {
    border-bottom: 1px solid $grey-lighter;

    &.revenue {
      thead,
      tbody {
        width: 100%;

        th,
        td {
          width: 250px;
          text-align: center;
          vertical-align: middle;
        }

        td {
          //white-space: nowrap;
          width: auto;
        }

        .empty {
          border-top: none;
        }

        .participant {
          border-right: 1px solid $grey-lighter;
          font-weight: 500;
          font-style: italic;
        }
      }
    }
  }
}
</style>
