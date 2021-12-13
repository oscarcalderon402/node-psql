const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }

  async findOne(id) {
    const Customer = await models.Customer.findByPk(id);
    if (!Customer) {
      throw boom.notFound('Customer not found');
    }
    return Customer;
  }

  async update(id, changes) {
    const Customer = await this.findOne(id);
    const rta = await Customer.update(changes);
    return rta;
  }

  async delete(id) {
    const Customer = await this.findOne(id);
    await Customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
