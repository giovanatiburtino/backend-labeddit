import { PostBusiness } from "../../src/business/PostBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { GetPostsInputDTO } from "../../src/dtos/userDTO"

describe("getPosts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("deve retornar uma lista com todos os posts", async () => {
        const input: GetPostsInputDTO = {
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPosts(input)
        expect(response).toHaveLength(1)
        expect(response).toContainEqual({
            id: "id-mock",
            content: "Contéudo do post",
            likes: 1,
            dislikes: 0,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            creator: {
                id: "creator-id-mock",
                name: "Creator Mock"
            }
        })
    })
})
