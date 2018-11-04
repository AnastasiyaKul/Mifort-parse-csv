"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require('validator');
var validators = [
    validateAge,
    validateName,
    validateSurname,
    validateMail,
    validateDate,
    validatePhone,
    validateTime
];
function validateAge(obj, validationInfo) {
    var isValid = true;
    if (!validator.isNumeric(obj['Age'])) {
        validationInfo['Age'] = {
            value: obj['Age'],
            errors: ['Возраст должен быть числом']
        };
        isValid = false;
    }
    if (!validator.isInt(obj['Age'], { min: 1, max: 99 })) {
        if (validationInfo.hasOwnProperty('Age')) {
            ['errors'].push('Ожидается возраст от 1 до 99');
        }
        else {
            validationInfo['Age'] = {
                value: obj['Age'],
                errors: ['Ожидается возраст от 1 до 99']
            };
        }
        isValid = false;
    }
    return isValid;
}
exports.validateAge = validateAge;
function validateName(obj, validationInfo) {
    var isValid = true;
    if (!validator.isAlpha(obj['Name'])) {
        validationInfo['Name'] = {
            value: obj['Name'],
            errors: ['Имя должно состоять только из букв']
        };
        isValid = false;
    }
    if (!validator.isLength(obj['Name'], { min: 1, max: 20 })) {
        if (validationInfo.hasOwnProperty('Name')) {
            ['errors'].push('Ожидается длина от 1 до 20 символов');
        }
        else {
            validationInfo['Name'] = {
                value: obj['Name'],
                errors: ['Ожидается длина от 1 до 20 символов']
            };
        }
        isValid = false;
    }
    return isValid;
}
exports.validateName = validateName;
function validateSurname(obj, validationInfo) {
    var isValid = true;
    if (!validator.isAlpha(obj['Surname'])) {
        validationInfo['Surname'] = {
            value: obj['Surname'],
            errors: ['Фамилия должна состоять только из букв']
        };
        isValid = false;
    }
    if (!validator.isLength(obj['Surname'], { min: 1, max: 20 })) {
        if (validationInfo.hasOwnProperty('Surname')) {
            ['errors'].push('Ожидается длина от 1 до 20 символов');
        }
        else {
            validationInfo['Surname'] = {
                value: obj['Surname'],
                errors: ['Ожидается длина от 1 до 20 символов']
            };
        }
        isValid = false;
    }
    return isValid;
}
exports.validateSurname = validateSurname;
function validateMail(obj, validationInfo) {
    var isValid = true;
    if (!validator.isEmail(obj['Mail'], { domain_specific_validation: true })) {
        validationInfo['Mail'] = {
            value: obj['Mail'],
            errors: ['Неверный формат почты']
        };
        isValid = false;
    }
    return isValid;
}
exports.validateMail = validateMail;
function validateDate(obj, validationInfo) {
    var isValid = true;
    if (!validator.isBefore(obj['DateOfReg'])) {
        validationInfo['DateOfReg'] = {
            value: obj['DateOfReg'],
            errors: ['Неверная дата']
        };
        isValid = false;
    }
    return isValid;
}
exports.validateDate = validateDate;
function validatePhone(obj, validationInfo) {
    var isValid = true;
    if (!/^\+?375 ?(17|29|33|44|25) ?\d{7}$/.test(obj['Phone'])) {
        validationInfo['Phone'] = {
            value: obj['Phone'],
            errors: ['Неверный формат телефона']
        };
        isValid = false;
    }
    return isValid;
}
exports.validatePhone = validatePhone;
function validateTime(obj, validationInfo) {
    var isValid = true;
    if (!/^([0-1]\d)|(2[0-4])(:|.)[0-5]\d$/.test(obj['Time'])) {
        validationInfo['Time'] = {
            value: obj['Time'],
            errors: ['Неверный формат времени']
        };
        isValid = false;
    }
    return isValid;
}
exports.validateTime = validateTime;
function validate(obj) {
    var isValid = true;
    var validationInfo = {};
    for (var i = 0; i < validators.length; i++) {
        if (!validators[i](obj, validationInfo)) {
            isValid = false;
        }
    }
    return {
        isValid: isValid,
        validationInfo: validationInfo
    };
}
exports.validate = validate;
