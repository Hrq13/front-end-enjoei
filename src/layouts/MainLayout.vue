<template>
  <div>
    <header id="header">
      <a class="header__link" href="https://www.enjoei.com.br/" target="_blank" aria-label="link para a página inicial da Enjoei">
        <img class="header__logo" src="@/assets/enjoei-logo.svg" alt="Letra E do logo da Enjoei"/>
      </a>
    </header>
    <body id="body">
      <RouterView/>
    </body>
  </div>
</template>
vue.<script>
export default {
  name: 'MainLayout'
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  width: 100%;
  height: 75px;
  border-bottom: 1px solid var(--color-border);
}

.header__link,
.header__logo {
  display: block;
  width: 35px;
  margin: auto;
}

#body {
  width: 90vw;
  margin: 1em auto;
}
</style>
