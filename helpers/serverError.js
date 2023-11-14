const handleServerError = res => {
  return res.status(500).json({ message: 'Internal Server Error' })
}

export default handleServerError