import { AnimeStillsType, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const animeStillsData = async () =>{

    return [
        // START EVANGELION
        {
          id: "36cdc68e-419c-4700-945d-0dca2adbab90",
          type: AnimeStillsType.IMAGE,
          priority: 1,
          url: null,
          anime_id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
          frame_id: "18ca0da4-af55-461e-9489-9a170e51e1b4",
        },
        {
          id: "8a362fdb-c6a0-4071-bfae-941096b166b0",
          type: AnimeStillsType.IMAGE,
          priority: 2,
          url: null,
          anime_id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
          frame_id: "3b84cd73-5a8c-4285-8a17-2fa6e680e848",
        },
        {
          id: "f1865d52-f274-4671-9eec-3887b242f9d0",
          type: AnimeStillsType.IMAGE,
          priority: 3,
          url: null,
          anime_id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
          frame_id: "0b95c1cd-65ce-41b5-9344-f5c8765dcb6c",
        },
        {
          id: "c5955586-505a-4dea-8e1a-53442cc685b6",
          type: AnimeStillsType.IMAGE,
          priority: 4,
          url: null,
          anime_id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
          frame_id: "cbd765c0-79ab-480f-bcbe-c42e010a2dd0",
        },
        {
          id: "a34e1c84-5c40-49f3-b47f-8217b75275d5",
          type: AnimeStillsType.IMAGE,
          priority: 0,
          url: null,
          anime_id: "59b92892-1258-43a9-8d68-3db4f3b076b5",
          frame_id: "bbc7dd49-7cd7-4cfc-ac67-6e8ecae0a31c",
        },
        // END EVANGELION
        // START JOJO
        {
            id: "d5d44238-f075-42bc-8b5a-a5c858db51ca",
            type: AnimeStillsType.VIDEO,
            priority: 0,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "adaa0cad-ff31-4338-bd87-3d5ed64ef976",
        },
        {
            id: "f895ace4-06b8-490f-8321-af86ec0d6e6e",
            type: AnimeStillsType.IMAGE,
            priority: 1,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "07f6a0a6-e835-4add-9125-1563caca4113",
        },
        {
            id: "9ecc876d-5fbf-4c54-bffd-553e011d5785",
            type: AnimeStillsType.IMAGE,
            priority: 2,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "3934a65b-e8de-47ea-b256-9682d25ba344",
        },
        {
            id: "5510e0a1-57f8-4ec5-baf9-252e4f9233ac",
            type: AnimeStillsType.IMAGE,
            priority: 3,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "24c8527f-d78e-43d8-9f94-e9b0cce01d27",
        },
        {
            id: "f2d01070-f4ee-43b4-b61f-9ab74aca5f19",
            type: AnimeStillsType.IMAGE,
            priority: 4,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "c666038d-4f0f-4053-ad80-e7ffbdf8e0f4",
        },
        {
            id: "e4940881-9635-4b8d-9ce3-4959e99a1234",
            type: AnimeStillsType.IMAGE,
            priority: 5,
            url: null,
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
            frame_id: "f0589528-ee61-4ccf-ba83-bf532265c5e0",
        },
        {
            id: "ee584121-d88c-47ad-abff-381a01d55e4e",
            type: AnimeStillsType.VIDEO,
            priority: null,
            url: "https://www.youtube.com/watch?v=GCedUsUTNdA",
            anime_id: "02bfd954-3cf5-47a1-953b-daad7054c6d6",
        }
        // END JOJO
      ]
} 