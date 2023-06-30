"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addConstraint("emailvalidationtokens", {
      type: "FOREIGN KEY",
      fields: ["user_id"], // field name of the foreign key
      name: "fk_user_id_3436536",
      references: {
        table: "users", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "no action",
      onDelete: "no action",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeConstraint(
      "emailvalidationtoken", // Source model
      "fk_user_id_3436536" // key to remove
    );
  },
};