// import mongoose from "mongoose";
// const transactionSchema = new mongoose.Schema(
//   {
//     customerDetails: {
//       name: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//       },
//     },
//     product_name: {
//       type: String,
//       required: true,
//     },
//     product_id: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     payment_gateway: {
//       type: String,
//       required: true,
//       enum: ["esewa", "khalti"],
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
//       default: "PENDING",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Transaction = mongoose.model("Transaction", transactionSchema);

// export default Transaction;

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },

    order_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_gateway: {
      type: String,
      required: true,
      enum: ["esewa", "khalti"],
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
