const { Captcha } = require('discord.js-captcha');

const config = {
  roleID: '1421585897614213211',
  channelID: '1421587232040554568',
  sendToTextChannel: false,
  addRoleOnSuccess: true,
  kickOnFailure: true,
  caseSensitive: true,
  attempts: 3,
  timeout: 30000,
  showAttemptCount: true
};

let captchaInstance;

function initCaptcha(client) {
  captchaInstance = new Captcha(client, config);
}

function getCaptcha() {
  return captchaInstance;
}

module.exports = { initCaptcha, getCaptcha };
