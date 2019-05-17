import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, email, firstName = "", lastName = "", bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            name
          },
          {email}
        ]
      })
      if(exists){
        throw Error("이 아이디 또는 이메일은 이미 존재합니다")
      }
      await prisma.createUser({
        name,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
