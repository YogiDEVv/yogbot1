const { getCaptcha } = require('../utils/captcha');
const UserVerification = require('../schemas/userVerification');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const captcha = getCaptcha();
      await captcha.verify(member);

      await UserVerification.create({
        userId: member.id,
        username: member.user.tag
      });

      console.log(`✅ Zapisano weryfikację: ${member.user.tag}`);
    } catch (error) {
      console.error(`❌ Błąd weryfikacji użytkownika ${member.user.tag}:`, error);
    }
  }
};
