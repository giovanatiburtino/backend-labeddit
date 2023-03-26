import { CommentDB, CommentWithCreatorDB, COMMENT_LIKE, LikeOrDislikeCommentDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase{
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_comments"

    public async getCommentsWithCreators(postId: string): Promise <CommentWithCreatorDB[]> {
        const result: CommentWithCreatorDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select(
            "comments.id",
            "comments.post_id",
            "comments.user_id AS creator_id",
            "comments.content",
            "comments.likes",
            "comments.dislikes",
            "comments.created_at",
            "comments.updated_at",
            "users.name AS creator_name"
        ).join("users", "comments.user_id", "=", "users.id").where("comments.post_id", postId)

        return result
    }

    public async findCommentsWithCreator(commentId: string): Promise <CommentWithCreatorDB | undefined>{
        const result: CommentWithCreatorDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).select(
            "comments.id",
            "comments.post_id",
            "comments.user_id AS creator_id",
            "comments.content",
            "comments.likes",
            "comments.dislikes",
            "comments.created_at",
            "comments.updated_at",
            "users.name AS creator_name"
        ).join("users", "comments.user_id", "=", "users.id").where("comments.id", commentId)

        return result[0]
    }

    public async insertComment(newCommentDB: CommentDB): Promise <void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(newCommentDB)
    }

    public async updateComment(idToEdit: string, newCommentDB: CommentDB): Promise <void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).update(newCommentDB).where({id: idToEdit})
    }

    public async likeOrDislikeComment(likeDislike: LikeOrDislikeCommentDB): Promise <void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES).insert(likeDislike)
    }

    public async findLikeDislike(likeDislikeToFind: LikeOrDislikeCommentDB): Promise <COMMENT_LIKE | null>{
        const [ likeDislikeDB ]: LikeOrDislikeCommentDB[] = await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES).select().where({
            user_id: likeDislikeToFind.user_id,
            comment_id: likeDislikeToFind.comment_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }

    public async removeLikeDislike(likeDislike: LikeOrDislikeCommentDB): Promise <void>{
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES).delete().where({
            user_id: likeDislike.user_id,
            comment_id: likeDislike.comment_id
        })
    }

    public async updateLikeDislike(likeDislike: LikeOrDislikeCommentDB){
        await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES).update(likeDislike).where({
            user_id: likeDislike.user_id,
            comment_id: likeDislike.comment_id
        }) 
    }
}

