import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { CreateCommentInputDTO, GetCommentsInputDTO, GetCommentsOutputDTO, LikeOrDislikeCommentInputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Comment } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentWithCreatorDB, COMMENT_LIKE, LikeOrDislikeCommentDB } from "../types";

export class CommentBusiness{
    constructor(
        private postDatabase: PostDatabase,
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ){}


    public getComments = async (input: GetCommentsInputDTO): Promise <GetCommentsOutputDTO> => {
        const { token, postId } = input

        if(token === undefined){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)
        
        if(payload === null){
            throw new BadRequestError("Token inválido.")
        }

        const commentsWithCreatorDB: CommentWithCreatorDB[] = await this.commentDatabase.getCommentsWithCreators(postId)

        const comments = commentsWithCreatorDB.map((commentsWithCreatorDB) => {
            const comment = new Comment(
                commentsWithCreatorDB.id,
                commentsWithCreatorDB.post_id,
                commentsWithCreatorDB.content,
                commentsWithCreatorDB.likes,
                commentsWithCreatorDB.dislikes,
                commentsWithCreatorDB.created_at,
                commentsWithCreatorDB.updated_at,
                commentsWithCreatorDB.user_id,
                commentsWithCreatorDB.creator_name
            )

            return comment.toBusinessModel()
        })

        const output: GetCommentsOutputDTO = comments

        return output

    }

    public createComments = async (input: CreateCommentInputDTO): Promise <void> => {
        const { postId, token, content } = input


        if(typeof content !== "string"){
            throw new BadRequestError("'Content' deve ser uma string.")
        }

        if(token === undefined){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)
        
        if(payload === null){
            throw new BadRequestError("Token inválido.")
        }

        const postExists = await this.postDatabase.findPostsById(postId)

        if(!postExists){
            throw new NotFoundError("'post' não encontrado")
        }

        const id = this.idGenerator.generate()

        const comment = new Comment(
            id,
            postId,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )
        
        const commentDB = comment.toDBModel()

        await this.commentDatabase.insertComment(commentDB)
    }

    public likeOrDislikeComment = async (input: LikeOrDislikeCommentInputDTO): Promise <void> => {
        const { idToLikeOrDislike, token, like } = input


        if(token === undefined){
            throw new BadRequestError("'Token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)
        
        if(payload === null){
            throw new BadRequestError("Token inválido.")
        }


        if(typeof like !== "boolean"){
            throw new BadRequestError("Like deve ser boolean.")
        }


        const commentWithCreatorDB = await this.commentDatabase.findCommentsWithCreator(idToLikeOrDislike)

        if(!commentWithCreatorDB){
            throw new NotFoundError("O post não foi encontrado. Verifique a id.")
        }

        const likeSQLite = like ? 1 : 0 

        const likeDislike: LikeOrDislikeCommentDB = {
            user_id: payload.id,
            comment_id: commentWithCreatorDB.id,
            like: likeSQLite
        }

        const comment = new Comment(
            commentWithCreatorDB.id,
            commentWithCreatorDB.post_id,
            commentWithCreatorDB.content,
            commentWithCreatorDB.likes,
            commentWithCreatorDB.dislikes,
            commentWithCreatorDB.created_at,
            commentWithCreatorDB.updated_at,
            commentWithCreatorDB.user_id,
            commentWithCreatorDB.creator_name
        )

        const likeDislikeExists = await this.commentDatabase.findLikeDislike(likeDislike)

        if(likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED){
            if(like){
                await this.commentDatabase.removeLikeDislike(likeDislike)
                comment.removeLike()
            } else {
                await this.commentDatabase.updateLikeDislike(likeDislike)
                comment.removeLike()
                comment.addDislike()
            }

        } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED){
            if(like){
                await this.commentDatabase.updateLikeDislike(likeDislike)
                comment.removeDislike()
                comment.addLike()
            } else {
                await this.commentDatabase.removeLikeDislike(likeDislike)
                comment.removeDislike()
            }

        } else {
            await this.commentDatabase.likeOrDislikeComment(likeDislike)

            if(like){
                comment.addLike()
            } else {
                comment.addDislike()
            }

        }

        const updatedCommentDB = comment.toDBModel()

        await this.commentDatabase.updateComment(idToLikeOrDislike, updatedCommentDB)
    }
}