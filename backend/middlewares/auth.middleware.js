export const authoriseToken = async (req, res, next) => {
  const token = req.cookies.auth_token;
  if(!token){
    return res.status(403).json({ message : "unauthorised" })
  }
  jwt.verify(token, 'usafhiusdfiu', (err, user) => {
    return res.status(403).json({ message : 'Forbidden. Invalid token'})
  });
  req.user = user;
  next();
}