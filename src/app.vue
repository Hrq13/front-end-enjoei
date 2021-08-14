<template>
  <div id="app">
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script>
  // import vContainer from '@/components/container.vue'

  export default {
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://use.typekit.net/af/cebe0e/00000000000000003b9b3060/27/d?primer=0c3631e75e900eb7ab7d66a2fee20946f78a393e6c6ee4fad09de3617cc4709d&fvd=n3&v=3') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://use.typekit.net/af/705e94/00000000000000003b9b3062/27/d?primer=0c3631e75e900eb7ab7d66a2fee20946f78a393e6c6ee4fad09de3617cc4709d&fvd=n4&v=3') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://use.typekit.net/af/576d53/00000000000000003b9b3066/27/d?primer=0c3631e75e900eb7ab7d66a2fee20946f78a393e6c6ee4fad09de3617cc4709d&fvd=n6&v=3') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://use.typekit.net/af/949f99/00000000000000003b9b3068/27/d?primer=0c3631e75e900eb7ab7d66a2fee20946f78a393e6c6ee4fad09de3617cc4709d&fvd=n7&v=3') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://use.typekit.net/af/d82519/00000000000000003b9b306a/27/d?primer=0c3631e75e900eb7ab7d66a2fee20946f78a393e6c6ee4fad09de3617cc4709d&fvd=n8&v=3') format('woff');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --color-white: #ffffff;
    --color-gray-1: #f9f8f7;
    --color-gray-2: #f1eeec;
    --color-gray-3: #cac7c5;
    --color-gray-4: #7d7a77;
    --color-gray-5: #494949;
    --color-pink: #f05b78;

    --color-highlight: var(--color-pink);
    --color-placeholder: var(--color-gray-1);
    --color-border: var(--color-gray-2);
    --color-text-1: var(--color-gray-3);
    --color-text-3: var(--color-gray-5);

    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-semi-bold: 600;
    --font-weight-bold: 700;
    --font-weight-extra-bold: 800;

    --font-family: 'Proxima Nova';
    @keyframes enterAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1
      }
    }
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: var(--font-family);
    color: var(--color-text-3);
  }

  /* *,
  *::before,
  *::after {
    box-sizing: border-box;
  } */

  button,
  input,
  select,
  textarea {
    font: inherit;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: var(--color-highlight);
    text-decoration: none;
  }
</style>
