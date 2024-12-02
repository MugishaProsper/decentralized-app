import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (user, res) => {
  try {
    const payload = { id : user.id, email : user.email, username : user.username };
    const token = jwt.sign(payload, 'usafhiusdfiu', { expiresIn : '1h'});

    res.cookie('auth_token', token, { httpOnly : true, secure : 'production', sameSite : 'strict' });
    return res.status(200).json({ message : 'Authenticated' })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : 'Server error' })
  }
}