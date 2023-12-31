import bcrypt from "bcrypt";

const createHash = async (password) => {
  const salts = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salts);
};

const isValidPassword = ( user, password) => bcrypt.compare(password, user);

export { createHash, isValidPassword };