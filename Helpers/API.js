exports.respond = (status, message, data) => ({
  status,
  message,
  data: data || {},
});
