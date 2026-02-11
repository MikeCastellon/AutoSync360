exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      hasPostmarkApi: !!process.env.POST_MARK_API,
      hasFromEmail: !!process.env.FROM_EMAIL,
      hasToEmail: !!process.env.TO_EMAIL,
      fromEmail: process.env.FROM_EMAIL,
      toEmail: process.env.TO_EMAIL,
      // Don't expose the actual API key, just check if it exists and show first/last chars
      postmarkApiPreview: process.env.POST_MARK_API
        ? `${process.env.POST_MARK_API.substring(0, 4)}...${process.env.POST_MARK_API.slice(-4)}`
        : 'NOT SET'
    })
  };
};
