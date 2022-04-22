const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    console.log(newCustomer);
    delete newCustomer.dataValues.user.dataValues.password;
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
