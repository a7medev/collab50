const capetalize = (str: string) => {
  return str
    .split(' ')
    .map((word) => {
      const lowercased = word.toLowerCase();
      return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
    })
    .join(' ');
};

export default capetalize;
