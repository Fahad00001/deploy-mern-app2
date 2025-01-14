const userModel = require("../Models/user");

const addExpenses = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await userModel.findByIdAndUpdate(
      _id, //user id
      {
        $push: { expenses: body },
      },
      { new: true } //for returning the updated documents
    );
    return res.status(200).json({
      message: "expenses added successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went worng",
      error: error,
      success: false,
    });
  }
  //   console.log(body, _id);
  //   res.send("success");
  //   res.send("addexpenses");
};

const fetchExpenses = async (req, res) => {
  //   res.send("fetchexpenses");
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await userModel.findById(_id).select("expenses");
    return res.status(200).json({
      message: "fetch expenses  successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went worng",
      error: error,
      success: false,
    });
  }
};

const deleteExpenses = async(req, res) => {
//   res.send("dleeteexpenses");
const { _id } = req.user;
const {expenseId}=req.params
try {
  const userData = await userModel.findByIdAndUpdate(
    _id, //user id
    {
      $pull: { expenses: {_id:expenseId} },
    },
    { new: true } //for returning the updated documents
  );
  return res.status(200).json({
    message: "expenses deleted successfully",
    success: true,
    data: userData?.expenses,
  });
} catch (error) {
  return res.status(500).json({
    message: "Something went worng",
    error: error,
    success: false,
  });
}

};

module.exports = {
  addExpenses,
  fetchExpenses,
  deleteExpenses,
};
