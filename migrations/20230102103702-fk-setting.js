"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // 고객 아이디
    await queryInterface.addColumn("Orders", "customer_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Orders", {
      fields: ["customer_id"],
      type: "foreign key",
      name: "Users_orders_costomerId_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // 드라이버 아이디
    await queryInterface.addColumn("Orders", "driver_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Orders", {
      fields: ["driver_id"],
      type: "foreign key",
      name: "Users_orders_driverId_fk",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // 리뷰어 (고객 아이디 참조)
    await queryInterface.addColumn("Reviews", "reviewer_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Reviews", {
      fields: ["reviewer_id"],
      type: "foreign key",
      name: "orders_reviews_reviewerId_fk",
      references: {
        table: "Orders",
        field: "customer_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // 리뷰어 (드라이버 아이디 참조)
    await queryInterface.addColumn("Reviews", "reviewee_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Reviews", {
      fields: ["reviewee_id"],
      type: "foreign key",
      name: "orders_reviews_revieweeId_fk",
      references: {
        table: "Orders",
        field: "driver_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "customer_id");
    await queryInterface.removeColumn("Orders", "driver_id");
    await queryInterface.removeColumn("Reviews", "reviewer_id");
    await queryInterface.removeColumn("Reviews", "reviewee_id");
  },
};
