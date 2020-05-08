module.exports = async (xtal, warn) => {
    if (JSON.stringify(warn).toLowerCase().includes('discordapierror')) return;
    console.log(warn);
  };