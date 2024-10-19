import {User} from "../models/user.js";
import {v4 as uuidv4} from "uuid";
import {emailService} from "./email.service.js";
import {ApiError} from "../exceptions/api.error.js";

export async function getAllActivated() {
  return User.findAll({
    where: {
      activationToken: null,
    },
  });
}

function normalize({id, email}) {
  return {id, email};
}

function getByEmail(email) {
  return User.findOne({where: {email}});
}

async function register(email, password) {
  const activationToken = uuidv4();

  const existUser = await getByEmail(email);

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: 'User already exist'
    })
  }
  await User.create({email, password, activationToken});

  await emailService.sendActivationEmail(email, activationToken);
}

export const userService = {
  getAllActivated,
  normalize,
  getByEmail,
  register
};
