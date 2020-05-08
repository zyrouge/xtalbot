async function generateKey() {
  const tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let keyOut = '';

  for (let i = 0; i < 6; i += 1) {
    for (let y = 0; y < 5; y += 1) {
      const random = Math.floor((Math.random() * 35) + 1);
      const char = tokens.charAt(random);
      keyOut += char;
    }

    if (i !== 5) {
      keyOut += '-';
    }
  }

  return keyOut;
}

module.exports = generateKey;