function dataError(err, req, res, next) {
    // console.log(err)
    let code = 500
    let msg = `Internal server Error`
    //400 data tidak lengkap atau salah format
    //401 format dan data benar, tapi salah salah satu

    if (err.name === 'INPUT NOT FOUND') { //error login email
        code = 400;
        msg = 'PLEASE INPUT YOUR EMAIL OR PASSWORD';
    } else if (err.name === 'LOGIN_INVALID') { //error login password
        code = 400;
        msg = 'EMAIL OR PASSWORD IS NOT VALID';
    } else if (err.name === 'INPUT NOT MINIMUM') { //error invalid token user
        code = 401;
        msg = 'PLEASE INPUT LONGER WORD FOR NICKNAME'
    } else if (err.message === 'INVALID_TOKEN') { //error invalid token user
        code = 401;
        msg = 'Unauthorized, Invalid Token';
    } else if (err.name === 'NOT_ENOUGH_ACCESS') { //error AuthZ tidak ada acces token / bukan role admin
        code = 403;
        msg = "Forbiden Access";
    } else if (err.name === 'NOT_FOUND') { //error detail Products gak ada ID
        code = 404;
        msg = 'Post not found';
    } else if (err.name === 'SequelizeValidationError') { // error post product &  register (email/password)
        code = 400;
        // msg = "password not valid";
        msg = err.errors.map((el) => el.message)
    } else if (err.name === 'SequelizeUniqueConstraintError') { //error detail Products gak ada ID
        code = 400;
        msg = err.errors.map((el) => el.message)

    }
    res.status(code).json({
        error: msg,
    });
}
module.exports = dataError