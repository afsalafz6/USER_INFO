let db = require("../config/connection"),
    ObjectID = require("mongodb").ObjectID,
    dbConfig = require("../config/collection"),

_user = {

        /****** Create list Data******/

        createUser: async (data) => {
            console.log('data in create list', data);
            try {
                let usrExist= await db.get().collection(dbConfig.USER)
                .findOne({$or: [
                    {PHONE:data.phone},
                    {EMAIL:data.email},
                ]});
                if (usrExist) {
                    return {
                        isCreated: false,
                        message: "Email or Phone already Exist",
                    };
                } else {
                    let newUser = await db
                        .get()
                        .collection(dbConfig.USER)
                        .insertOne(await _user.arrangeUserForCreation(data));
                    if (newUser) {
                        return {
                            isCreated: true,
                            message: "User Created Successfully",
                        };
                    } else {
                        return {
                            isCreated: false,
                            message: "Internal Server Error Please Try After Some Time",
                        };
                    }
                }
            } catch (e) {
                return { isCreated: false, message: e.message };
            }
        },
        arrangeUserForCreation: async (data) => {
            console.log('data in arrangeForCreation', data)
                return {
                    FIRST_NAME: data.fname,
                    LAST_NAME: data.lname,
                    INTRODUCTION: data.introduction,
                    EMAIL: data.email,
                    PHONE: data.phone,
                    EXPERIENCE: data.experience,
                    ACHIEVEMENT: data.achievement,
                    CREATED_ON: new Date()
                }

        },

        getUserData: async () => {
            try {
                let count = await db
                    .get()
                    .collection(dbConfig.USER)
                    .find()
                    .count();
                let listArray = await db
                    .get().collection(dbConfig.USER).aggregate([
                        {
                            $project: {
                                _id: "$_id",
                                fname: "$FIRST_NAME",
                                lname: "$LAST_NAME",
                                introduction: "$INTRODUCTION",
                                email: "$EMAIL",
                                phone: "$PHONE",
                                experience: "$EXPERIENCE",
                                achievement: "$ACHIEVEMENT"
                            }
                        }
                    ])
                    .toArray()
                return { data: listArray, count: count };
            } catch (e) {
                console.log(e)
            }
        },

        /****** get details using id******/
        getUserDetailsUsingId: async (id) => {
            console.log('LIST id in edit helper', id)
                let getList = await db
                    .get()
                    .collection(dbConfig.USER)
                    .aggregate([
                        {
                            $match: { _id: ObjectID(id) },
                        },
                        {
                            $project: {
                                _id: "$_id",
                                fname: "$FIRST_NAME",
                                lname: "$LAST_NAME",
                                introduction: "$INTRODUCTION",
                                email: "$EMAIL",
                                phone: "$PHONE",
                                experience: "$EXPERIENCE",
                                achievement: "$ACHIEVEMENT"
                            },
                        },
                    ])
                    .toArray();
                return getList[0];
        },
};

module.exports = _user;