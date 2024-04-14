import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { type GameData } from "@/types/gameData";

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
    const data: GameData = await request.json();
    setGameData(data);

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

  return NextResponse.json(
    {
      code: StatusCodes.OK,
      status: ReasonPhrases.OK,
      data: {
        messages: "OK",
      },
    },
    { status: StatusCodes.OK }
  );
}
