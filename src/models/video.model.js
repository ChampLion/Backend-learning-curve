import mongoose, {schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: true
    }
},{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Videos = mongoose.models('Videos',videoSchema)