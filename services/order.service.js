const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const order = await models.Order.findAll();
    return order;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'items'],
    });
    if (!order) {
      throw boom.notFound('Customer not found');
    }
    return order;
  }

  async update(id, changes) {
    const Order = await this.findOne(id);
    const rta = await Order.update(changes);
    return rta;
  }

  async delete(id) {
    const Order = await this.findOne(id);
    await Order.destroy();
    return { id };
  }
}

module.exports = OrderService;
