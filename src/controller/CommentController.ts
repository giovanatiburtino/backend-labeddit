import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness";
import { CreateCommentInputDTO, GetCommentsInputDTO, LikeOrDislikeCommentInputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class CommentController{
    constructor(
        private commentBusiness: CommentBusiness
    ){}

    public getComments = async (req: Request, res: Response) => {
        try {
            const input: GetCommentsInputDTO = {
                postId: req.params.id,
                token: req.headers.authorization
            }
            
            const output = await this.commentBusiness.getComments(input)
            
            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public createComment = async (req: Request, res: Response) => {
        try {
            const input: CreateCommentInputDTO = {
                postId: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.commentBusiness.createComments(input)

            res.status(201).end()
            
        } catch (error) {
            console.log(error)

            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislikeComment = async (req: Request, res: Response) => {
        try {
            const input: LikeOrDislikeCommentInputDTO = {
                idToLikeOrDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            await this.commentBusiness.likeOrDislikeComment(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)
            
            if(req.statusCode === 200){
                res.status(500)
            }

            if(error instanceof Error){
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            } 
        }
    }
}

