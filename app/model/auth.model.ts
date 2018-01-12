import * as mongoose from "mongoose";
import * as config from "../../config";
import Crypto from "../utils/crypto";

interface AuthModel extends mongoose.Document {
  name: string;
  username: string;
  slogan: string;
  gravatar: string;
  password: string;
}

const authSchema = new mongoose.Schema({
  // 名字
  name: { type: String, default: "" },

  username: {
    type: String,
    default: config.AUTH.defaultUsername
  },

  // 签名
  slogan: { type: String, default: "" },

  // 头像
  gravatar: { type: String, default: "" },

  // 密码
  password: {
    type: String,
    default: Crypto.encrypt(config.AUTH.defaultPassword)
  }
});

export default mongoose.model<AuthModel>("Auth", authSchema);
