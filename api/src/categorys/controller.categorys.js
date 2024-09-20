const categoryService = require("./service.category");
const categoryController = {};

categoryController.addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await categoryService.add({ categoryName });
    return res.send({
      status: "OK",
      message: "Created category Successfulluy",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.send({ status: "Error", message: "Error adding meal", error });
  }
};

categoryController.getCategory = async (req, res) => {
  try {
    const getAllCategory = await categoryService.get();
    return res.send({
      status: "OK",
      message: "Get all Category",
      data: getAllCategory,
    });
  } catch (error) {
    return res.send({ status: "Error", message: error, data: null });
  }
};

module.exports = categoryController;
