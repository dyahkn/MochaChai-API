module.exports = {
  generateAmount: async (min, max) => {
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    if (isNaN(result)) {
      throw new Error("Error in generateAmount");
    }
    return result;
  },

  generateString: async (length) => {
    return [...Array(length)]
      .map(() => (~~(Math.random() * 36)).toString(36))
      .join("");
  },

  generateRegEmail: async () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now().toString(36).substring(2, 10);
    const email = `${timestamp}${randomString}W@regUserp.id`;

    return email;
  },
  generatePhone: async () => {
    lastdigit = Math.floor(Math.random() * (900000000 - 9000000 + 1) + 9000000);
    return "07" + lastdigit;
  },

  generateGender: async () => {
    const genders = ["male", "female"];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
  },
};
