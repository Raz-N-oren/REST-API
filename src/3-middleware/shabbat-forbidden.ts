import { NextFunction, Request, Response } from "express";

function shabbatForbidden(request: Request, response: Response, next: NextFunction) {

    const now = new Date();
    const day = now.getDay() + 1;
    if(day===7){
        response.send("Can't get service on Shabbat");
        return;
    }

    // Transfer flow to next middleware or to controller:
    next();
}

export default shabbatForbidden;