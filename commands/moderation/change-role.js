const { SlashCommandBuilder, Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('change-role')
    .setDescription("Changes role for a member in the server")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("Select the member")
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription("Select the role to add/remove")
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('add')
        .setDescription("Add or remove the role")
        .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      await interaction.reply("You don't have permission to manage roles.");
      return;
    }

    const user = interaction.options.getMember('user');
    const role = interaction.options.getRole('role');
    const addRole = interaction.options.getBoolean('add');

    if (!interaction.guild.me.roles.highest.comparePositionTo(role) > 0) {
      await interaction.reply("Don't have permission to manage this role.");
      return;
    }

    if (user && role) {
      try {
        if (addRole) {
          if (user.roles.cache.has(role.id)) {
            await interaction.reply(`${user.user.tag} already has the "${role.name}" role.`);
            return;
          }
          await user.roles.add(role);
          await interaction.reply(`Added the role "${role.name}" to ${user.user.tag}.`);
        } else {
          if (!user.roles.cache.has(role.id)) {
            await interaction.reply(`${user.user.tag} does not have the "${role.name}" role.`);
            return;
          }
          await user.roles.remove(role);
          await interaction.reply(`Removed the role "${role.name}" from ${user.user.tag}.`);
        }
      } catch (error) {
        console.error(error);
        await interaction.reply('There was an error changing the member\'s roles.');
      }
    } else {
      await interaction.reply('Please provide a valid user and role.');
    }
  },
};
