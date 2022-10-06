// Models
const { Product } = require("../models/product.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const protectProductOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, product } = req;

  if (sessionUser.id !== product.userId) {
    return next(new AppError("This product dont below to you", 403));
  }

  next();
});

const productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ where: { id, status: "active" } });

  if (!product) {
    return next(new AppError("Could not find product by given id", 404));
  }

  req.product = product;
  next();
});

module.exports = { protectProductOwner, productExists };
