import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const fileData = async () =>{

    return [
        // START EVANGELION
        {
            id: "18ca0da4-af55-461e-9489-9a170e51e1b4",
            file_id: "6982491e-5817-47a4-84d0-c6445841c43a",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/6982491e-5817-47a4-84d0-c6445841c43a"
        },
        {
            id: "3b84cd73-5a8c-4285-8a17-2fa6e680e848",
            file_id: "22fe17e0-b786-43a8-bdb1-401535beed2f",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/22fe17e0-b786-43a8-bdb1-401535beed2f"
        },
        {
            id: "0b95c1cd-65ce-41b5-9344-f5c8765dcb6c",
            file_id: "6802e7af-08f6-47b8-8483-04d8a2fc722b",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/6802e7af-08f6-47b8-8483-04d8a2fc722b"
        },
        {
            id: "cbd765c0-79ab-480f-bcbe-c42e010a2dd0",
            file_id: "e31a97c1-dade-422b-bfc5-a4130405f41f",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/e31a97c1-dade-422b-bfc5-a4130405f41f"
        },
        {
            id: "bbc7dd49-7cd7-4cfc-ac67-6e8ecae0a31c",
            file_id: "2dbeb5e2-f196-4625-ae4b-ca6aff6dad0a",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/2dbeb5e2-f196-4625-ae4b-ca6aff6dad0a"
        },
        // END EVANGELION
        // START JOJO
        {
            id: "adaa0cad-ff31-4338-bd87-3d5ed64ef976",
            file_id: "9e070c85-099b-46b4-b577-e5bc3cf2025b",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/9e070c85-099b-46b4-b577-e5bc3cf2025b"
        },
        {
            id: "24c8527f-d78e-43d8-9f94-e9b0cce01d27",
            file_id: "c8ecf788-97fe-4754-970d-76b32541ca26",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/c8ecf788-97fe-4754-970d-76b32541ca26"
        },
        {
            id: "07f6a0a6-e835-4add-9125-1563caca4113",
            file_id: "129c98b5-f11d-4a6b-bedd-9def40c9d4ce",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/129c98b5-f11d-4a6b-bedd-9def40c9d4ce"
        },
        {
            id: "f0589528-ee61-4ccf-ba83-bf532265c5e0",
            file_id: "bc729384-650d-46fe-8633-2fb3cd59956d",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/bc729384-650d-46fe-8633-2fb3cd59956d"
        },
        {
            id: "3934a65b-e8de-47ea-b256-9682d25ba344",
            file_id: "740aba13-6e70-4975-8adc-225bb0d6e53e",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/740aba13-6e70-4975-8adc-225bb0d6e53e"
        },
        {
            id: "c666038d-4f0f-4053-ad80-e7ffbdf8e0f4",
            file_id: "b412bc58-536d-4c71-83f4-e34844144813",
            user_id: "90530696-1da8-4156-9b77-538d344d53ca",
            bucket_name: "test1",
            url: "cdn.animakuro.com/test1/b412bc58-536d-4c71-83f4-e34844144813"
        },
    ]
} 