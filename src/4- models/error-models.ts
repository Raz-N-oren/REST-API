export class ErrorModel {
    public constructor(public message: string, public status: number) { }
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route: string) {
        super(`Route ${route} not exist`, 404);
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(id: number) {
        super(`Id ${id} not exist`, 404);
    }
}