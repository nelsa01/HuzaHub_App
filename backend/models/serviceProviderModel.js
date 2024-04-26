const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const serviceProviderSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    //   required: true,
      enum: ["service provider"],
    },

    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "password must have at least (6) caracters"],
    },

    fee: {
      type: Number,
      required: false,
    },

    serviceType: {
      type: String,
      trim: true,
      required: false,
    },

    location: {
      type: String,
      trim: true,
      required: false,
    },

    description: {
      type: String,
      trim: true,
      required: false,
    },
    booking: {
      
    }
  },

  { timestamps: true }
);

//encrypting password before saving
serviceProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
serviceProviderSchema.methods.comparePassword = async function (enteredPassword) {
  try {
      const isMatch = await bcrypt.compare(enteredPassword, this.password);
      return isMatch;
  } catch (error) {
      throw new Error(error);
  }
}


// return a JWT token
serviceProviderSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("serviceProvider", serviceProviderSchema);
