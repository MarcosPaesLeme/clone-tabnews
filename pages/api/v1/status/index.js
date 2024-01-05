function status(request, response) {
  return response.status(200).json({ chave: "tocando no HTTP" });
}

export default status;
