export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            message: err.message,
            errorList: err.errorList?.map((e) => e.msg) || [],
        });
    } else {
        next(err)
    }
}

export const unhautorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({
            success: false,
            message: err.message
        })
    } else {
        next(err)
    }
}

export const notFoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            message: err.message
        })
    } else {
        next(err)
    }
}

export const genericErrorHandler = (err, req, res, next) => {
    console.log("Generic Error", err);

    if (res.status === 500) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}