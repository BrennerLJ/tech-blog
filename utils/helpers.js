module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="grinning face with sweat">😅</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="grinning squinting face">😆</span>`;
    } else {
      return `<span for="img" aria-label="grin">😊</span>`;
    }
  },

  is_my_name: (pageUser, userId) => {
    return pageUser === userId;
  },
};
