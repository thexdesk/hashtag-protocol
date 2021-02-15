<template>
  <div class="card drawdown">
    <header class="card-header">
      <p class="card-header-title is-centered">
        Your Hashtag Protocol earnings summary
      </p>
    </header>
    <div class="card-content">
      <div class="summary">
        <p class="title is-1">0.00003 ETH</p>
        <p class="subtitle is-6">TOTAL EARNED</p>
      </div>
      <button class="button is-primary">Withdraw</button>
    </div>
  </div>
</template>
<style lang="scss">
.card.drawdown {
  width: 350px;
  background-color: $grey-dark;

  .card-image {
    .image {
      margin: auto;
      padding: 1rem 0;
    }
  }

  .card-header-title,
  .title,
  .subtitle {
    color: $white;
  }

  .card-header-title,
  .card-content {
    text-align: center;
  }

  .summary {
    padding: 50px 0 80px 0;
  }
}
</style>
