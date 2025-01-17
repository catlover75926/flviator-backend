import { setlog } from "../helper";

import mongoose, { Types } from "mongoose";

const SocketUserSchema = new mongoose.Schema({
    socketId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    userInfo: {
        type: Object,
        require: true
    },
}, {
    timestamps: true,
    versionKey: false
});

const SocketUserModel = mongoose.model("socketuser", SocketUserSchema);

export const getAllUsers = async () => {
    try {
        const users = await SocketUserModel.findOne({})
        return {
            status: true,
            data: users
        }
    } catch (error) {
        setlog('getAllSocketUsers', error)
        return { status: false, message: "Something went wrong." }
    }
}

export const getUserBySocketId = async (socketId: string) => {
    try {
        const user: any = await SocketUserModel.findOne({ socketId })
        return user?.userInfo
    } catch (error) {
        setlog('getUserBySocketId', error)
        return { status: false, message: "Something went wrong." }
    }
}

export const getSocketUserById = async (userId: string) => {
    try {
        const user: any = await SocketUserModel.findOne({ userId })
        return user?.userInfo
    } catch (error) {
        setlog('getSocketUserById', error)
        return { status: false, message: "Something went wrong." }
    }
}

export const addSocketUser = async (
    socketId: string,
    userId: string,
    userInfo: object
) => {
    try {
        const user = await SocketUserModel.findOne({ userId });
        let userData: any = {
            socketId,
            userId,
            userInfo
        }
        if (!user) {
            await SocketUserModel.create(userData)
        } else {
            userData = await SocketUserModel.findOneAndUpdate({ userId }, userData)
        }
        return userData
    } catch (error) {
        setlog('addSocketUser', error)
        return false
    }
}

export const updateSocketUser = async (
    _id: number,
    updateData: object,
) => {
    try {
        await SocketUserModel.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, {
            $set: updateData
          })
        return true
    } catch (error) {
        setlog('updateSocketUser', error)
        return false
    }
}

export const updateSocketUserByUserId = async (
    userId: string,
    updateData: object,
) => {
    try {
        await SocketUserModel.findOneAndUpdate({ userId }, {
            $set: updateData
          })
        return true
    } catch (error) {
        setlog('updateSocketUser', error)
        return false
    }
}

export const updateSocketUserBySocketId = async (
    socketId: string,
    updateData: object,
) => {
    try {
        await SocketUserModel.findOneAndUpdate({ socketId }, {
            $set: updateData
          })
        return true
    } catch (error) {
        setlog('updateSocketUser', error)
        return false
    }
}

export const deleteSocketUser = async (
    _id: number
) => {
    try {
        await SocketUserModel.deleteOne({ _id: new Types.ObjectId(_id) })
        return true
    } catch (error) {
        setlog('deleteSocketUser', error)
        return false
    }
}

export const deleteSocketUserBySocketId = async (
    socketId: string
) => {
    try {
        await SocketUserModel.deleteOne({ socketId })
        return true
    } catch (error) {
        setlog('deleteSocketUser', error)
        return false
    }
}

export default SocketUserModel;