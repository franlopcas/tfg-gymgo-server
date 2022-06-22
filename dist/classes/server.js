"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    //public port: number = 3000;
    function Server() {
        // Crea una instancia del servidor
        this.app = express_1.default();
        this.port = process.env.PORT || 3000;
    }
    Server.prototype.start = function (callback) {
        // Hace correr el servidor
        this.app.listen(this.port, callback);
    };
    return Server;
}());
exports.default = Server;
