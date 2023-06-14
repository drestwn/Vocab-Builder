<script setup>
import TheWelcome from '../components/TheWelcome.vue'
window.onload = () => {

  const fragment = new URLSearchParams(window.location.hash.slice(1));

  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  if (!accessToken) {
    return (document.getElementById('login').style.display = 'block');
  }

  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then(result => result.json())
    .then(response => {
      const { username, discriminator } = response;
      document.getElementById('info').innerText += ` ${username}#${discriminator}`;
    })
    .catch(console.error);
};
console.log(accessToken)
</script>

<template>
  <main>
    <TheWelcome />
    <div id="info">Hoi!</div>
    <a id="login" style="display: none;"
      href="https://discord.com/api/oauth2/authorize?client_id=696328795962998825&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify">Identify
      Yourself</a>
  </main>
</template>
