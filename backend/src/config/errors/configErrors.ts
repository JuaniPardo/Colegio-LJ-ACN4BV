export class MissingJWTSecretError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}