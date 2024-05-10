import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { type GameData } from "@/types/gameData";

import logger from "@/lib/logger";
import { getGameData, setGameData } from "@/lib/gameData";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      code: StatusCodes.OK,
      status: ReasonPhrases.OK,
      data: {
        gameData: getGameData(),
      },
    },
    { status: StatusCodes.OK }
  );
}

export async function POST(request: NextRequest) {
  try {
    const data: {
      auth: string;
      game_data: GameData;
    } = await request.json();

    if (data?.auth !== process.env.SECRET) {
      const ip = request.headers.get("X-Forwarded-For");
      logger.info(
        `Someone is trying to access the API. [POST ${request.nextUrl.pathname} from ${ip}]`
      );

      return NextResponse.json(
        {
          code: StatusCodes.OK,
          status: ReasonPhrases.OK,
          data: {
            messages: "Player data received!",
          },
        },
        { status: StatusCodes.OK }
      );
    }

    setGameData(data?.game_data);

    return NextResponse.json(
      {
        code: StatusCodes.OK,
        status: ReasonPhrases.OK,
        data: {
          messages: "Player data received!",
        },
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        code: StatusCodes.BAD_REQUEST,
        status: ReasonPhrases.BAD_REQUEST,
        errors: {
          message: "Failed to parse JSON body. Invalid JSON format!",
        },
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
