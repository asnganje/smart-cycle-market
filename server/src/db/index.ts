import { connect } from "mongoose";

export const connectDB = async (uri: string): Promise<void> => {
  await connect(uri);
};
