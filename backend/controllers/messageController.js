const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const messageController = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

//   await conversation.save();
//   await newMessage.save();

//   this will run in parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  // // SOCKET IO FUNCTIONALITY WILL GO HERE
  // const receiverSocketId = getReceiverSocketId(receiverId);
  // if (receiverSocketId) {
  //         // io.to(<socket_id>).emit() used to send events to specific client
  //         io.to(receiverSocketId).emit("newMessage", newMessage);
  // }

  res.status(201).json(newMessage);
});

const getMessage = asyncHandler(async (req, res) => {
  const { id: userToChatTo } = req.params;
  const senderId = req.user._id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatTo] },
  }).populate("messages");

  if (!conversation) {
    return res.status(404).json([]);
  }

  return res.status(200).json(conversation.messages);
});
module.exports = { messageController, getMessage };
