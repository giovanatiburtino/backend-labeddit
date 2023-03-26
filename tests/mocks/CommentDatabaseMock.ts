import { BaseDatabase } from "../../src/database/BaseDatabase"
import { CommentDB, CommentWithCreatorDB, COMMENT_LIKE, LikeOrDislikeCommentDB } from "../../src/types"

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public insertComment = async (newCommentDB: CommentDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public updateComment = async (idToEdit: string, newCommentDB: CommentDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public likeOrDislikeComment = async (likeDislike: LikeOrDislikeCommentDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public removeLikeDislike = async (likeDislike: LikeOrDislikeCommentDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public updateLikeDislike = async (likeDislike: LikeOrDislikeCommentDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public getCommentsWithCreators = async (postId: string): Promise<CommentWithCreatorDB[]>  => {
        return [
            {
                id: "id-mock",
                post_id: "post-id-mock",
                user_id: "user-id-mock",
                content: "Contéudo do post",
                likes: 1,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Creator Mock"
            }
        ]
    }


    public findCommentsWithCreator = async (commentId: string): Promise<CommentWithCreatorDB | undefined>  => {
        switch (commentId) {
            case "id-mock":
                return {
                    id: "id-mock",
                    post_id: "post-id-mock",
                    user_id: "user-id-mock",
                    content: "Contéudo do post",
                    likes: 1,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "Creator Mock"
                }
            default:
                return undefined
        }
    }


    public findLikeDislike = async (likeDislikeToFind: LikeOrDislikeCommentDB): Promise <COMMENT_LIKE | null> => {
        if(likeDislikeToFind){
            const likeDislikeDB = {
                user_id: "user-id-mock",
                comment_id: "comment-id-mock",
                like: 1
            }
          
            return likeDislikeDB.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }
}

