export class ErrorModel {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route: string) {
        super(`Route ${route} not exist`, 404);
    }
}
