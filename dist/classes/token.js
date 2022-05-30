"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.getJwtToken = function (payload) {
        // Firmar token con el usuario, la semilla y la fecha de caducidad de la semilla
        return jsonwebtoken_1.default.sign({ usuario: payload }, this.seed, { expiresIn: this.caducidad });
    };
    Token.comprobarToken = function (userToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1.default.verify(userToken, _this.seed, function (err, decoded) {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    };
    Token.seed = 'La-cosita-de-mi-cosita-me-da-cosita';
    Token.caducidad = '30d';
    return Token;
}());
exports.default = Token;
