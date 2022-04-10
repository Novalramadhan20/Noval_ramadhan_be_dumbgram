
const { product, user, category, categoryProduct } = require('../../models');
//get all data products
exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = data.map((item) => {
      item.image = process.env.PATH_FILE + item.image;
      return item;
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//get detail product
exports.getProductDetail = async (req, res) => {
  try {
    const id = req.params.id
    const data = await product.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      where: {
        id,
      }
    });
    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//add product
exports.addProduct = async (req, res) => {
  try {
    const data = req.body;

    data.image = req.file.filename;
    data.idUser = req.user.id;

    const newProduct = await product.create(data);

    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//updateProduct
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await product.update(req.body, {
      where: {
        id,
      }
    });
    res.send({
      status: 'success...',
      data: {
        product: {
          id,
          data,
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

//deleteProduct
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await product.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success...',
      message: `Your product with id: id: ${id} success`,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};