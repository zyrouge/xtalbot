module.exports = async (xtal, error) => {
    if (JSON.stringify(error).toLowerCase().includes('discordapierror')) return;
    console.log(error.message);
  };