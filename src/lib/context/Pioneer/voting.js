import { KeychainSDK } from "keychain-sdk";

const voteOnContent = async (user, author, permlink, weight) => {
  try {
    const { name } = user; // Extract the username from the user object
    const keychain = new KeychainSDK(window);
    const formParamsAsObject = {
      data: {
        username: name, // Use the extracted username
        permlink: permlink,
        author: author,
        weight: weight,
      },
    };

    const voteResult = await keychain.vote(formParamsAsObject.data);
    console.log(voteResult)
    return voteResult;
  } catch (error) {
    console.log({ error });
    throw new Error("Voting failed");
  }
};

export default voteOnContent;