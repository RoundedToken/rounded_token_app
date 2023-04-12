import userModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async registration(email, password, nickname) {
        let candidate = await userModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exist`);
        }

        candidate = await userModel.findOne({ nickname });
        if (candidate) {
            throw ApiError.BadRequest(`User with nickname ${nickname} already exist`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = v4();

        const user = await userModel.create({
            email,
            password: hashPassword,
            activationLink,
            nickname,
        });
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) throw ApiError.BadRequest('Incorrect activation link');
        user.isActivated = true;
        user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) throw ApiError.BadRequest('Email not found');
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) throw ApiError.BadRequest('Wrong password');
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        await tokenService.removeToken(refreshToken);
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }
}

export default new UserService();
