const cookieOption = {
    httpOnly: true,
    secure: false,
    samesite: "lax",
    maxAge: 30*24*60*60*1000,
}

module.exports = cookieOption;