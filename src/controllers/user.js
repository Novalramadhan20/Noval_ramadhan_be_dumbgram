const { user, profile } = require("../../models");

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body);

    res.send({
      status: "success",
      message: "Add user finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({
      where: {
        id,
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update user id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};




/*
const { user } = require('../../models/user');
//const {bcrypt} = require ("bcrypt");
const {jwt} = require ("jsonwebtoken");
//addUsers
exports.register = async (req, res) => {
    const { name, email, password} = req.body;
    //const salt = await bcrypt.genSalt();
    //const hashPassword = await bcrypt.hash(password, salt);
    try {
        await user.create({
            name: name,
            email: email,
            password: password,
        });

        res.send({
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Error add user',
        });
    }
}
//getUser
exports.login = async (req, res) => {
    try {
        const user = await users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        //const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            //expiresIn: '20s'
        //});
        res.send({
            status:'success',
            data,
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Error get user',
        });
    }
}

//getUserbyID
exports.getUser = async (req, res) => {
    try {
        const data = user.findOne({
         where: {
             id,
         },       
            attributes: {
                exclude: [
                    'password', 'createAt', 'postAt']
            }
        });

        if (!data) {
            return res.send({
                error: {
                    message: 'Account with ID: ${id} not found',
                },
            });
        }

        res.send({
            status:'success',
            data,
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Error get user',
        });
    }
}

//UpdatebyID
exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const newData = req.body;

        await user.update(newData, {
            where: {
                id,
            },       
               attributes: {
                   exclude: [
                       'password', 'createAt', 'postAt']
               }
           });

        res.send({
            status:'success',
            message: 'Update user data with ID: ${id} Done',
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Error update user',
        });
    }
}
//Delete
exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        await user.destroy({
            where: {
                id,
            },  
           });

        res.send({
            status:'success',
            message: 'Delete user data with ID: ${id} Done',
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Error delete user',
        });
    }
}
*/