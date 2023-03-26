import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikeOrDislikeDB, PostDB, PostWithCreatorDB, POST_LIKE, USER_ROLES } from "../../src/types"

export class PostDatabaseMock extends BaseDatabase{
    public static TABLE_POSTS = "posts"

    public insertPost = async (newPostDB: PostDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public updatePost = async (idToEdit: string, newPostDB: PostDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public deletePost = async (idToDelete: string): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public likeOrDislikePost = async (likeDislike: LikeOrDislikeDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public removeLikeDislike = async (likeDislike: LikeOrDislikeDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public updateLikeDislike = async (likeDislike: LikeOrDislikeDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public findPostsById = async (id: string): Promise<PostDB | undefined>  => {
        switch (id) {
            case "p001":
                return {
                    id: "id-mock",
                    creator_id: "creator-id-mock",
                    content: "Contéudo do post",
                    likes: 1,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }

    public findLikeDislike = async (likeDislikeToFind: LikeOrDislikeDB): Promise <POST_LIKE | null> => {
        if(likeDislikeToFind){
            const likeDislikeDB = {
                user_id: "string",
                post_id: "string",
                like: 1
            }
          
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }

    public getPostsWithCreators = async (): Promise<PostWithCreatorDB[]>  => {
        return [
            {
                id: "id-mock",
                creator_id: "creator-id-mock",
                content: "Contéudo do post",
                likes: 1,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Creator Mock"
            }
        ]
    }

    public findPostWithCreator = async (postId: string): Promise<PostWithCreatorDB | undefined>  => {
        switch (postId) {
            case "p001":
                return {
                    id: "id-mock",
                    creator_id: "creator-id-mock",
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

    public getPostById = async (postId: string): Promise<PostWithCreatorDB[]>  => {
        return [
            {
                id: "id-mock",
                creator_id: "creator-id-mock",
                content: "Contéudo do post",
                likes: 1,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "Creator Mock"
            }
        ]
    }
}

